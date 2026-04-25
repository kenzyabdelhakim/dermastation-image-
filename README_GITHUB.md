# 🌟 DermaStation - AI-Powered Skin Analysis Platform

<div align="center">

![DermaStation](https://img.shields.io/badge/DermaStation-AI%20Skin%20Analysis-ff69b4?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-ee4c2c?style=for-the-badge&logo=pytorch)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi)

**Full-stack AI application for intelligent skin type classification and issue detection**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Documentation](#-documentation)

</div>

---

## 📋 Overview

DermaStation is a complete full-stack AI application that analyzes facial skin images to:
- **Classify skin type** (Dry, Normal, Oily) with confidence scores
- **Detect skin issues** (Acne, Dark Spots, Wrinkles, Redness, Large Pores)
- **Provide recommendations** based on analysis results

Built with a **Vision Transformer (ViT)** model for accurate multi-task learning, featuring a modern React frontend and FastAPI backend.

---

## ✨ Features

### 🤖 AI Model
- **Vision Transformer (ViT)** architecture
- **Multi-task learning** (skin type + issues simultaneously)
- **Transfer learning** from pre-trained google/vit-base-patch16-224
- **ONNX export** for deployment optimization
- **CPU/GPU support** with automatic detection

### 🎨 Frontend
- **Modern React** with TypeScript
- **Beautiful UI** with Framer Motion animations
- **Responsive design** for all devices
- **Real-time analysis** with loading states
- **Error handling** with automatic fallback
- **Product recommendations** based on results

### ⚡ Backend
- **FastAPI** REST API
- **CORS enabled** for frontend integration
- **Automatic model loading** on startup
- **Health check endpoints**
- **Interactive API docs** (Swagger UI)
- **Type-safe** request/response handling

### 🛠️ Additional Tools
- **Desktop GUI** (Tkinter) for standalone use
- **CLI inference** for batch processing
- **Training pipeline** with synthetic data generation
- **Evaluation metrics** and visualization

---

## 🎯 Demo

### Web Application
![Web Demo](https://via.placeholder.com/800x400/1a1a2e/e94560?text=DermaStation+Web+Interface)

### Analysis Results
![Results](https://via.placeholder.com/800x400/16213e/2ecc71?text=Skin+Analysis+Results)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+ (for frontend)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/kenzyabdelhakim/dermastation-image.git
cd dermastation-image

# Install Python dependencies
pip install -r requirements.txt
pip install -r api_requirements.txt

# Install frontend dependencies
cd "Skin Analysis Platform front"
npm install
cd ..
```

### Running the Application

**Option 1: Full Stack (Recommended)**

```bash
# Terminal 1: Start Backend
python api.py

# Terminal 2: Start Frontend
cd "Skin Analysis Platform front"
npm run dev
```

Then open: **http://localhost:5173**

**Option 2: Desktop GUI**

```bash
python src/gui.py
```

**Option 3: CLI Inference**

```bash
# Single image
python src/inference.py --image path/to/image.jpg

# Camera capture
python src/inference.py --use_camera
```

---

## 📁 Project Structure

```
dermastation-image/
├── api.py                          # FastAPI backend server
├── api_requirements.txt            # API dependencies
├── requirements.txt                # Core dependencies
├── start_backend.ps1              # Quick start script
│
├── src/                           # Python source code
│   ├── model.py                   # ViT model architecture
│   ├── train.py                   # Training pipeline
│   ├── inference.py               # CLI inference
│   ├── gui.py                     # Desktop GUI
│   └── utils.py                   # Utilities & dataset
│
├── Skin Analysis Platform front/  # React frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   └── api.ts        # API service layer
│   │   │   └── components/       # React components
│   │   └── styles/               # CSS & themes
│   ├── .env                      # Environment config
│   └── package.json
│
├── outputs/                       # Generated files
│   ├── artifacts/                # Trained models
│   ├── evaluation/               # Metrics & plots
│   ├── processed_data/           # Train/val/test splits
│   └── raw_data/                 # Original dataset
│
└── docs/                         # Documentation
    ├── INTEGRATION_GUIDE.md
    ├── IMPLEMENTATION_SUMMARY.md
    └── QUICK_START.md
```

---

## 🎓 Training Your Own Model

### Using Kaggle Dataset

```bash
python src/train.py \
    --dataset dima806/skin-types-image-detection-vit \
    --epochs 10 \
    --batch_size 16 \
    --lr 3e-5
```

### Using Custom Dataset

1. Organize images in folders by skin type:
```
data/
├── dry/
├── normal/
└── oily/
```

2. Create annotations CSV (optional):
```csv
filename,skin_type,acne,dark_spots,wrinkles,redness,large_pores
img001.jpg,oily,1,0,0,1,1
img002.jpg,dry,0,1,1,0,0
```

3. Train:
```bash
python src/train.py --epochs 20 --batch_size 32
```

---

## 🔌 API Documentation

### Endpoints

#### `GET /`
Health check
```json
{
  "status": "online",
  "message": "DermaStation API is running",
  "model_loaded": true,
  "device": "cuda"
}
```

#### `GET /api/health`
Detailed health status
```json
{
  "status": "healthy",
  "device": "cuda",
  "skin_types": ["dry", "normal", "oily"],
  "skin_issues": ["acne", "dark_spots", "wrinkles", "redness", "large_pores"]
}
```

#### `POST /api/analyze`
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

### Interactive API Docs

Start the backend and visit: **http://localhost:8000/docs**

---

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:8000/api/health

# Test analysis (PowerShell)
$form = @{file = Get-Item "test-image.jpg"}
Invoke-RestMethod -Uri "http://localhost:8000/api/analyze" -Method Post -Form $form

# Run Python tests
pytest tests/
```

---

## 🎨 Frontend Development

```bash
cd "Skin Analysis Platform front"

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

For production:
```env
VITE_API_URL=https://api.dermastation.com
```

---

## 📊 Model Architecture

```
                    ┌──────────────────────┐
   Image (224x224) │  ViT Backbone         │
   ───────────────►│  (google/vit-base)    │
                    │  Shared features      │
                    └─────────┬────────────┘
                              │ CLS token (768-d)
                    ┌─────────┴────────────┐
                    │                      │
              ┌─────▼─────┐         ┌──────▼──────┐
              │ Type Head │         │ Issue Head  │
              │ Dropout   │         │ Dropout     │
              │ Linear(3) │         │ Linear(5)   │
              │ Softmax   │         │ Sigmoid     │
              └───────────┘         └─────────────┘
                    │                      │
              Skin Type             Skin Issues
              (dry/normal/oily)     (multi-label)
```

**Training:**
- Loss: CrossEntropyLoss (type) + BCEWithLogitsLoss (issues)
- Optimizer: AdamW
- Scheduler: CosineAnnealingLR
- Data Augmentation: Random flip, rotation, color jitter

---

## 🚢 Deployment

### Backend (Docker)

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt api_requirements.txt ./
RUN pip install -r requirements.txt -r api_requirements.txt
COPY . .
CMD ["python", "api.py"]
```

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy dist/ folder
```

### Environment Setup

**Backend:**
- Set `CORS_ORIGINS` to your frontend domain
- Use HTTPS in production
- Add rate limiting
- Implement authentication

**Frontend:**
- Update `VITE_API_URL` to production backend
- Enable HTTPS
- Configure CDN
- Add analytics

---

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 2 steps
- **[Integration Guide](INTEGRATION_GUIDE.md)** - Complete setup instructions
- **[Implementation Summary](IMPLEMENTATION_SUMMARY.md)** - Technical deep dive
- **[API Documentation](http://localhost:8000/docs)** - Interactive API docs

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Vision Transformer (ViT)** - Google Research
- **Hugging Face Transformers** - Model implementation
- **FastAPI** - Modern web framework
- **React** - Frontend framework
- **Framer Motion** - Animation library

---

## 📧 Contact

**Kenzy Abdelhakim** - [@kenzyabdelhakim](https://github.com/kenzyabdelhakim)

Project Link: [https://github.com/kenzyabdelhakim/dermastation-image](https://github.com/kenzyabdelhakim/dermastation-image)

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=kenzyabdelhakim/dermastation-image&type=Date)](https://star-history.com/#kenzyabdelhakim/dermastation-image&Date)

---

<div align="center">

**Made with ❤️ by Kenzy Abdelhakim**

[⬆ Back to Top](#-dermastation---ai-powered-skin-analysis-platform)

</div>
