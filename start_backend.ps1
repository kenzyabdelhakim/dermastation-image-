# DermaStation Backend Startup Script
Write-Host "🚀 Starting DermaStation Backend..." -ForegroundColor Cyan

# Check if model exists
if (-not (Test-Path "outputs/artifacts/skin_multitask_vit_final.pth")) {
    Write-Host "❌ Error: Model file not found!" -ForegroundColor Red
    Write-Host "Expected: outputs/artifacts/skin_multitask_vit_final.pth" -ForegroundColor Yellow
    Write-Host "Please train the model first using: python src/train.py" -ForegroundColor Yellow
    exit 1
}

# Check if API requirements are installed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
pip show fastapi uvicorn python-multipart > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing API dependencies..." -ForegroundColor Yellow
    pip install -r api_requirements.txt
}

Write-Host "✅ Dependencies OK" -ForegroundColor Green
Write-Host ""
Write-Host "🔥 Starting FastAPI server on http://localhost:8000" -ForegroundColor Cyan
Write-Host "📊 API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "🏥 Health Check: http://localhost:8000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the server
python api.py
