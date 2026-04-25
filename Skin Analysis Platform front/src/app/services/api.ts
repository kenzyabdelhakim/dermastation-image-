/**
 * DermaStation API Service
 * Handles all communication with the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface BackendAnalysisResponse {
  skin_type: string;
  skin_type_confidence: number;
  type_probs: {
    dry: number;
    normal: number;
    oily: number;
  };
  issues: string[];
  issue_scores: {
    acne: number;
    dark_spots: number;
    wrinkles: number;
    redness: number;
    large_pores: number;
  };
}

export interface AnalysisData {
  skinType: {
    type: string;
    confidence: number;
    probabilities: {
      dry: number;
      normal: number;
      oily: number;
    };
  };
  issues: {
    name: string;
    score: number;
    detected: boolean;
    icon: string;
  }[];
  uploadedImage: string;
}

/**
 * Convert base64 data URL to File object
 */
function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * Transform backend response to frontend format
 */
function transformBackendResponse(
  backendData: BackendAnalysisResponse,
  imageDataUrl: string
): AnalysisData {
  // Capitalize first letter
  const capitalize = (str: string) => 
    str.charAt(0).toUpperCase() + str.slice(1);

  // Map issue names to display names
  const issueNameMap: Record<string, string> = {
    acne: 'Acne',
    dark_spots: 'Dark Spots',
    wrinkles: 'Wrinkles',
    redness: 'Redness',
    large_pores: 'Large Pores'
  };

  const issueIconMap: Record<string, string> = {
    acne: 'acne',
    dark_spots: 'spots',
    wrinkles: 'wrinkles',
    redness: 'redness',
    large_pores: 'pores'
  };

  return {
    skinType: {
      type: capitalize(backendData.skin_type),
      confidence: Math.round(backendData.skin_type_confidence * 100),
      probabilities: {
        dry: Math.round(backendData.type_probs.dry * 100),
        normal: Math.round(backendData.type_probs.normal * 100),
        oily: Math.round(backendData.type_probs.oily * 100)
      }
    },
    issues: Object.entries(backendData.issue_scores).map(([key, score]) => ({
      name: issueNameMap[key] || capitalize(key.replace('_', ' ')),
      score: Math.round(score * 100),
      detected: backendData.issues.includes(key),
      icon: issueIconMap[key] || key
    })),
    uploadedImage: imageDataUrl
  };
}

/**
 * Check if backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) return false;
    
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}

/**
 * Analyze skin image
 * @param imageDataUrl - Base64 encoded image data URL
 * @returns Analysis results in frontend format
 */
export async function analyzeSkin(imageDataUrl: string): Promise<AnalysisData> {
  try {
    // Convert data URL to File
    const file = dataURLtoFile(imageDataUrl, 'skin-image.jpg');
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Send request
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Server error: ${response.status} ${response.statusText}`
      );
    }
    
    const backendData: BackendAnalysisResponse = await response.json();
    
    // Transform to frontend format
    return transformBackendResponse(backendData, imageDataUrl);
    
  } catch (error) {
    console.error('Analysis error:', error);
    throw error;
  }
}

/**
 * Generate mock data for offline/fallback mode
 */
export function generateMockAnalysis(imageDataUrl: string): AnalysisData {
  // Random but consistent mock data
  const skinTypes = ['Dry', 'Normal', 'Oily'];
  const randomType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  
  return {
    skinType: {
      type: randomType,
      confidence: 85 + Math.floor(Math.random() * 10),
      probabilities: {
        dry: Math.floor(Math.random() * 30),
        normal: Math.floor(Math.random() * 30),
        oily: Math.floor(Math.random() * 30)
      }
    },
    issues: [
      { name: 'Acne', score: Math.floor(Math.random() * 100), detected: Math.random() > 0.5, icon: 'acne' },
      { name: 'Dark Spots', score: Math.floor(Math.random() * 100), detected: Math.random() > 0.5, icon: 'spots' },
      { name: 'Wrinkles', score: Math.floor(Math.random() * 100), detected: Math.random() > 0.5, icon: 'wrinkles' },
      { name: 'Redness', score: Math.floor(Math.random() * 100), detected: Math.random() > 0.5, icon: 'redness' },
      { name: 'Large Pores', score: Math.floor(Math.random() * 100), detected: Math.random() > 0.5, icon: 'pores' }
    ],
    uploadedImage: imageDataUrl
  };
}
