# DermaStation Integration Guide

Complete guide for connecting the frontend and backend.

## 📁 Project Structure

```
DermaStation/
├── api.py                          # FastAPI backend server
├── api_requirements.txt            # Additional API dependencies
├── src/                            # Python backend code
│   ├── model.py
│   ├── inference.py
│   ├── train.py
│   └── utils.py
├── outputs/artifacts/              # Trained model files
│   └── skin_multitask_vit_final.pth
└── Skin Analysis Platform front/  # React frontend
    ├── src/
    │   ├── app/
    │   │   ├── services/
    │   │   │   └── api.ts          # API service layer
    │   │   └── components/
    │   │       ├── DermaStationWebsite.tsx  # Updated with API calls
    │   │       └── dermastation/
    │   │           └── SkinAnalysisSection.tsx  # Updated with loading/error
    │   └── main.tsx
    ├── .env                        # Environment configuration
    └── package.json
```

## 🚀 Quick Start

### 1. Backend Setup

```powershell
# Install API dependencies
pip install -r api_requirements.txt

# Start the backend server
python api.py
```

The backend will start on `http://localhost:8000`

**Verify it's running:**
- Open browser: http://localhost:8000
- Should see: `{"status": "online", "message": "DermaStation API is running"}`

### 2. Frontend Setup

```powershell
# Navigate to frontend directory
cd "Skin Analysis Platform front"

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev
```

The frontend will start on `http://localhost:5173` (or similar)

## 🔧 Configuration

### Backend Configuration

**api.py** - Main settings:
- Port: `8000` (change in `uvicorn.run()`)
- CORS: Currently allows all origins (`allow_origins=["*"]`)
- Model path: `outputs/artifacts/skin_multitask_vit_final.pth`

**For production:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # Specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Frontend Configuration

**`.env` file:**
```env
VITE_API_URL=http://localhost:8000
```

**For production:**
```env
VITE_API_URL=https://api.dermastation.com
```

## 📡 API Endpoints

### GET `/`
Health check endpoint
```json
{
  "status": "online",
  "message": "DermaStation API is running",
  "model_loaded": true,
  "device": "cuda"
}
```

### GET `/api/health`
Detailed health check
```json
{
  "status": "healthy",
  "device": "cuda",
  "skin_types": ["dry", "normal", "oily"],
  "skin_issues": ["acne", "dark_spots", "wrinkles", "redness", "large_pores"]
}
```

### POST `/api/analyze`
Analyze skin image

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` (image file)

**Response:**
```json
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
```

## 🔄 Data Flow

1. **User uploads image** → `SkinAnalysisSection.tsx`
2. **Image sent to API** → `api.ts` service layer
3. **Backend processes** → `api.py` calls model
4. **Model inference** → Returns predictions
5. **Response transformed** → `api.ts` converts to frontend format
6. **Results displayed** → `ResultsSection.tsx`

## 🎯 Key Features

### ✅ Real Backend Integration
- Connects to FastAPI server
- Sends actual images for analysis
- Receives real AI predictions

### ✅ Fallback Mode
- Automatically detects if backend is offline
- Uses mock data when backend unavailable
- Seamless user experience

### ✅ Loading States
- Animated loading screen during analysis
- Step-by-step progress indicators
- Smooth transitions

### ✅ Error Handling
- Network error detection
- User-friendly error messages
- Retry functionality

## 🧪 Testing

### Test Backend
```powershell
# Check if backend is running
curl http://localhost:8000/api/health

# Test with image (PowerShell)
$form = @{
    file = Get-Item "path\to\test-image.jpg"
}
Invoke-RestMethod -Uri "http://localhost:8000/api/analyze" -Method Post -Form $form
```

### Test Frontend
1. Start both backend and frontend
2. Upload an image
3. Verify loading animation appears
4. Check results display correctly
5. Test error handling (stop backend, try upload)

## 🐛 Troubleshooting

### Backend Issues

**Model not loading:**
```
Error: Model not loaded
```
- Check if `outputs/artifacts/skin_multitask_vit_final.pth` exists
- Verify model file is not corrupted
- Check console for detailed error messages

**CORS errors:**
```
Access to fetch blocked by CORS policy
```
- Verify CORS middleware is configured
- Check `allow_origins` includes your frontend URL
- Restart backend after changes

### Frontend Issues

**API connection failed:**
- Verify backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`
- Restart frontend dev server after `.env` changes

**Mock data always showing:**
- Backend health check might be failing
- Check browser console for errors
- Verify backend `/api/health` endpoint responds

## 📦 Deployment

### Backend Deployment

**Option 1: Docker**
```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt api_requirements.txt ./
RUN pip install -r requirements.txt -r api_requirements.txt
COPY . .
CMD ["python", "api.py"]
```

**Option 2: Cloud Platform (Render, Railway, etc.)**
- Upload code to GitHub
- Connect repository
- Set start command: `python api.py`
- Configure environment variables

### Frontend Deployment

**Build for production:**
```powershell
cd "Skin Analysis Platform front"
pnpm build
```

**Deploy to:**
- Vercel: `vercel deploy`
- Netlify: `netlify deploy`
- GitHub Pages: Upload `dist/` folder

**Update `.env` for production:**
```env
VITE_API_URL=https://your-backend-url.com
```

## 🔐 Security Considerations

1. **CORS**: Restrict to specific domains in production
2. **File Upload**: Add file size limits (currently handled by FastAPI)
3. **Rate Limiting**: Consider adding rate limiting for API
4. **HTTPS**: Use HTTPS in production for both frontend and backend
5. **API Keys**: Consider adding authentication for production

## 📝 Code Changes Summary

### New Files Created:
1. `api.py` - FastAPI backend server
2. `api_requirements.txt` - API dependencies
3. `src/app/services/api.ts` - Frontend API service
4. `.env` - Environment configuration

### Modified Files:
1. `DermaStationWebsite.tsx` - Added API integration
2. `SkinAnalysisSection.tsx` - Added loading/error states

### No Changes To:
- UI components (Button, Card, etc.)
- Styling (CSS/Tailwind)
- Layout and design
- Other components

## 🎉 Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend connects to backend
- [ ] Image upload works
- [ ] Loading animation displays
- [ ] Results show real predictions
- [ ] Error handling works (test by stopping backend)
- [ ] Fallback mode works when backend offline

## 📞 Support

If you encounter issues:
1. Check console logs (both frontend and backend)
2. Verify all dependencies are installed
3. Ensure model file exists
4. Test endpoints individually
5. Check CORS configuration

---

**Built with:**
- Backend: FastAPI + PyTorch
- Frontend: React + TypeScript + Vite
- AI Model: Vision Transformer (ViT)
