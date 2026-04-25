# Skin Analysis with Multi-Task Vision Transformer (ViT)

Image processing skin analysis project that detects **skin type** AND **skin conditions** simultaneously using a shared ViT backbone.

## Features

- **Multi-task Learning**: Single model predicts both skin type and multiple skin issues
- **Real-time Analysis**: Live camera feed with instant classification
- **Image Upload**: Analyze images from your device
- **Visual Results**: Color-coded confidence bars and issue detection
- **ONNX Export**: Optimized model for deployment

## Output Format

```json
{
  "skin_type": "Oily",
  "skin_type_confidence": 0.93,
  "issues": ["Acne", "Large Pores"],
  "issue_scores": {
    "acne": 0.87,
    "dark_spots": 0.12,
    "wrinkles": 0.05,
    "redness": 0.34,
    "large_pores": 0.78
  }
}
```

## Model Architecture

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

**Skin Types** (single-label): dry, normal, oily

**Skin Issues** (multi-label, can be multiple): acne, dark spots, wrinkles, redness, large pores

## Folder Structure

```
image detection/
├── README.md
├── requirements.txt
└── src/
    ├── model.py              # MultiTaskViT architecture
    ├── utils.py              # Dataset, annotations, evaluation
    ├── train.py              # Multi-task training pipeline
    ├── inference.py          # CLI inference (image/camera/ONNX)
    └── gui.py                # Camera GUI with live detection
```

## Setup

```powershell
pip install -r requirements.txt
```

## Train

```powershell
python src/train.py --epochs 10 --batch_size 16 --lr 3e-5 --num_workers 0
```

The pipeline:
1. Downloads dataset (Kaggle) or generates synthetic demo images
2. Creates train/val/test splits
3. Generates multi-label issue annotations (simulated from skin-type priors, or loaded from `annotations.csv`)
4. Trains shared ViT backbone with two heads (CrossEntropy + BCEWithLogits)
5. Evaluates both tasks on test set
6. Saves `.pth` model + ONNX export

## Inference

### CLI (single image)
```powershell
python src/inference.py --image "path\to\photo.jpg"
```

### CLI (camera capture)
```powershell
python src/inference.py --use_camera
```

### GUI (camera + live detection)
```powershell
python src/gui.py
```

## Extending with Real Annotations

To use real multi-label annotations, create `outputs/annotations.csv`:

```csv
filename,skin_type,acne,dark_spots,wrinkles,redness,large_pores
img001.jpg,oily,1,0,0,1,1
img002.jpg,dry,0,1,1,0,0
```

Place it next to `outputs/processed_data/` and the pipeline will use it instead of simulated labels.

## Training Losses

| Task | Loss | Activation |
|------|------|------------|
| Skin Type | CrossEntropyLoss | Softmax (single label) |
| Skin Issues | BCEWithLogitsLoss | Sigmoid (multi-label) |

Combined loss: `L = L_type + weight * L_issues` (default weight = 1.0, adjustable via `--issue_weight`)
