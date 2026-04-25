import { useState } from 'react';
import { Navbar } from './dermastation/Navbar';
import { HeroSection } from './dermastation/HeroSection';
import { SkinAnalysisSection } from './dermastation/SkinAnalysisSection';
import { ResultsSection } from './dermastation/ResultsSection';
import { ProductsSection } from './dermastation/ProductsSection';
import { VendingMachineSection } from './dermastation/VendingMachineSection';
import { Footer } from './dermastation/Footer';
import { analyzeSkin, checkBackendHealth, generateMockAnalysis } from '../services/api';

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

export const DermaStationWebsite: React.FC = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = () => {
    setShowAnalysis(true);
    setError(null);
    const element = document.getElementById('analysis-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleImageUpload = async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    setError(null);
    setShowResults(false);

    try {
      // Check if backend is available
      const isBackendHealthy = await checkBackendHealth();
      
      let data: AnalysisData;
      
      if (isBackendHealthy) {
        // Use real backend
        console.log('Using real backend for analysis...');
        data = await analyzeSkin(imageDataUrl);
      } else {
        // Fallback to mock data
        console.warn('Backend unavailable, using mock data...');
        // Add delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 3500));
        data = generateMockAnalysis(imageDataUrl);
      }

      setAnalysisData(data);
      setShowResults(true);
      setIsAnalyzing(false);

      // Scroll to results
      setTimeout(() => {
        const element = document.getElementById('results-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      console.error('Analysis failed:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to analyze image. Please try again.'
      );
      setIsAnalyzing(false);
      
      // Show error for 5 seconds, then allow retry
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection onStartAnalysis={handleStartAnalysis} />

      {showAnalysis && (
        <div id="analysis-section">
          <SkinAnalysisSection 
            onImageUpload={handleImageUpload}
            isAnalyzing={isAnalyzing}
            error={error}
          />
        </div>
      )}

      {showResults && analysisData && (
        <div id="results-section">
          <ResultsSection data={analysisData} />
        </div>
      )}

      <ProductsSection skinType={analysisData?.skinType.type} />
      <VendingMachineSection />
      <Footer />
    </div>
  );
};
