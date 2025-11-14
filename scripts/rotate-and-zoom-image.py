from PIL import Image
import os

# Path to the image
image_path = "public/images/products/load-break-switch-open.jpg"

# Check if image exists
if os.path.exists(image_path):
    # Open the image
    img = Image.open(image_path)
    
    # Rotate 90 degrees clockwise (right rotation)
    rotated_img = img.rotate(-90, expand=True)
    
    # Zoom in by 20% (crop to center 80% and resize back)
    width, height = rotated_img.size
    zoom_factor = 1.2
    
    # Calculate crop box for zoom
    left = width * (1 - 1/zoom_factor) / 2
    top = height * (1 - 1/zoom_factor) / 2
    right = width * (1 + 1/zoom_factor) / 2
    bottom = height * (1 + 1/zoom_factor) / 2
    
    # Crop and resize
    zoomed_img = rotated_img.crop((left, top, right, bottom))
    final_img = zoomed_img.resize((width, height), Image.Resampling.LANCZOS)
    
    # Save the modified image
    final_img.save(image_path, quality=95)
    
    print(f"[v0] Image rotated and zoomed: {image_path}")
else:
    print(f"[v0] Image not found: {image_path}")
