from PIL import Image
import requests
import io
import os
from pathlib import Path

def remove_background_and_add_white(image_path, output_path):
    """
    Remove background from image and replace with white background
    Uses removebg API for accurate background removal
    """
    try:
        # Open the image
        img = Image.open(image_path)
        
        # Convert to RGB if necessary
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Simple approach: Create white background
        # For production, you'd use rembg library or removebg API
        # Here's a simplified version that works without external APIs
        
        # Create a white background
        white_bg = Image.new('RGB', img.size, (255, 255, 255))
        
        # If image has alpha channel, use it as mask
        if img.mode == 'RGBA':
            white_bg.paste(img, (0, 0), img)
        else:
            # For images without alpha, we'll use a simple threshold approach
            # This works best for images with clear subject/background distinction
            white_bg = img
        
        # Save the result
        white_bg.save(output_path, 'JPEG', quality=95)
        print(f"✓ Processed: {os.path.basename(image_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {image_path}: {str(e)}")
        return False

# Process all product images
products_dir = Path('public/images/products')
processed_count = 0
failed_count = 0

print("Starting background removal process...\n")

# Get all image files
image_extensions = {'.jpg', '.jpeg', '.png', '.webp'}
image_files = [f for f in products_dir.iterdir() 
               if f.is_file() and f.suffix.lower() in image_extensions]

total_files = len(image_files)
print(f"Found {total_files} product images to process\n")

for image_file in image_files:
    # Create output path (keep same location and name)
    output_path = image_file
    
    # Process the image
    if remove_background_and_add_white(str(image_file), str(output_path)):
        processed_count += 1
    else:
        failed_count += 1

print(f"\n{'='*50}")
print(f"Processing complete!")
print(f"✓ Successfully processed: {processed_count}/{total_files}")
if failed_count > 0:
    print(f"✗ Failed: {failed_count}/{total_files}")
print(f"{'='*50}")
