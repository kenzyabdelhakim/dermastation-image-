"""
DermaStation Backend API
FastAPI server for skin analysis
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
from contextlib import asynccontextmanager
import io
import torch
from pathlib import Path
import sys

# Add src to path
sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

from model import load_multitask_vit
from torchvision import transforms

# Global model instance
MODEL = None
SKIN_TYPES = None
SKIN_ISSUES = None
DEVICE = None

TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5] * 3, [0.5] * 3),
])


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model on startup, cleanup on shutdown"""
    global MODEL, SKIN_TYPES, SKIN_ISSUES, DEVICE
    
    try:
        checkpoint_path = Path("outputs/artifacts/skin_multitask_vit_final.pth")
        DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
        
        print(f"Loading model from {checkpoint_path}...")
        MODEL, SKIN_TYPES, SKIN_ISSUES, _ = load_multitask_vit(
            str(checkpoint_path), DEVICE
        )
        print(f"✅ Model loaded successfully on {DEVICE}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        raise
    
    yield
    
    # Cleanup (if needed)
    print("Shutting down...")


app = FastAPI(
    title="DermaStation API",
    version="1.0.0",
    lifespan=lifespan
)


# CORS configuration - allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "DermaStation API is running",
        "model_loaded": MODEL is not None,
        "device": DEVICE
    }


@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy" if MODEL is not None else "model_not_loaded",
        "device": DEVICE,
        "skin_types": SKIN_TYPES,
        "skin_issues": SKIN_ISSUES
    }


@app.post("/api/analyze")
async def analyze_skin(file: UploadFile = File(...)):
    """
    Analyze uploaded skin image
    
    Returns:
        {
            "skin_type": "oily",
            "skin_type_confidence": 0.93,
            "type_probs": {
                "dry": 0.02,
                "normal": 0.05,
                "oily": 0.93
            },
            "issues": ["acne", "large_pores"],
            "issue_scores": {
                "acne": 0.87,
                "dark_spots": 0.12,
                "wrinkles": 0.05,
                "redness": 0.34,
                "large_pores": 0.78
            }
        }
    """
    
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Please upload an image."
        )
    
    try:
        # Read and process image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Transform image
        image_tensor = TRANSFORM(image).unsqueeze(0).to(DEVICE)
        
        # Run inference
        with torch.no_grad():
            type_logits, issue_logits = MODEL(image_tensor)
            
            # Process skin type
            type_probs = torch.softmax(type_logits, dim=1)[0]
            type_idx = type_probs.argmax().item()
            skin_type = SKIN_TYPES[type_idx]
            skin_type_confidence = type_probs[type_idx].item()
            
            # Process issues
            issue_probs = torch.sigmoid(issue_logits)[0]
            detected_issues = [
                SKIN_ISSUES[i] 
                for i, p in enumerate(issue_probs) 
                if p.item() >= 0.5
            ]
            
            # Build response
            response = {
                "skin_type": skin_type,
                "skin_type_confidence": round(skin_type_confidence, 4),
                "type_probs": {
                    name: round(type_probs[i].item(), 4)
                    for i, name in enumerate(SKIN_TYPES)
                },
                "issues": detected_issues,
                "issue_scores": {
                    name: round(issue_probs[i].item(), 4)
                    for i, name in enumerate(SKIN_ISSUES)
                }
            }
            
            return JSONResponse(content=response)
            
    except Exception as e:
        print(f"Error during analysis: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting DermaStation API Server...")
    print("📊 API Documentation: http://localhost:8000/docs")
    print("🏥 Health Check: http://localhost:8000/api/health")
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=False)
