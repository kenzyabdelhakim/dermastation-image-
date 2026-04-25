# DermaStation - Quick Start Guide

## 🚀 Start in 2 Steps

### Step 1: Start Backend
```powershell
python api.py
```
✅ Backend running on **http://localhost:8000**

### Step 2: Start Frontend
```powershell
cd "Skin Analysis Platform front"
pnpm dev
```
✅ Frontend running on **http://localhost:5173**

---

## 📋 Quick Commands

### Backend
```powershell
# Start server
python api.py

# Test health
curl http://localhost:8000/api/health

# View API docs
# Open: http://localhost:8000/docs
```

### Frontend
```powershell
# Install dependencies (first time only)
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

---

## 🧪 Quick Test

1. Open frontend in browser
2. Click "Start Analysis"
3. Upload a face image
4. Wait for loading animation
5. View results!

---

## 🐛 Quick Troubleshooting

### Backend won't start
```powershell
# Install dependencies
pip install fastapi uvicorn python-multipart
```

### Frontend can't connect
- Check backend is running on port 8000
- Verify `.env` file exists with `VITE_API_URL=http://localhost:8000`

### Always shows mock data
- Backend might be offline
- Check `http://localhost:8000/api/health` in browser

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `api.py` | Backend server |
| `src/app/services/api.ts` | Frontend API calls |
| `.env` | Configuration |
| `INTEGRATION_GUIDE.md` | Full documentation |

---

## ✅ Success Indicators

**Backend Ready:**
```
✅ Model loaded successfully on cpu
INFO: Uvicorn running on http://0.0.0.0:8000
```

**Frontend Ready:**
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## 🎯 What to Test

- [ ] Upload image
- [ ] See loading animation
- [ ] View results with real predictions
- [ ] Try different images
- [ ] Test error handling (stop backend, try upload)
- [ ] Verify fallback mode works

---

**Need help?** Check `INTEGRATION_GUIDE.md` for detailed instructions.
