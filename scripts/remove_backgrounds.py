from PIL import Image, ImageFilter
import requests
from io import BytesIO
import numpy as np
from rembg import remove

# List of all product images that need background removal
image_urls = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PLASTIC%20MCB%20ENCLOSURE%20WITH%20DIN%20CHANEL.JPG-niCxVtXupNeMvpSbhUp294YSWCjGbF.jpeg",  # PLASTIC MCB ENCLOSURE WITH DIN CHANEL
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PLUG%20OPEN%20SP%26TP%20IN%20METAL%20SHEET%20ENCLOSURE.JPG-Ikj8DukwIFFU0vZ3y7xB4xMyvXyG0O.jpeg",  # PLUG OPEN SP&TP IN METAL SHEET ENCLOSURE
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SINGLE%20PHASE%20SPN%20DISTRIBUTION%20BOARD%20SINGLE%20DOOR.JPG-Iq74Isjfn9JuaK7jvpUbRSU6Y4Aw4I.jpeg",  # SINGLE PHASE SPN DISTRIBUTION BOARD SINGLE DOOR
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SINGLE%20PHASE%20TPN%20DISTRIBUTION%20BOARD%20TRANSPARENT%20COVER.JPG-R9fkY9mWKIqXTZhX8GI85JbOsSkiJW.jpeg",  # SINGLE PHASE TPN DISTRIBUTION BOARD TRANSPARENT COVER
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SOCKET%20OPEN%20SP%20%26%20TP.JPG-FLEMIeikpTaeJ50ExARoukW4TDX15T.jpeg",  # SOCKET OPEN SP & TP
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SWITCH%20CUM%20CHANGE%20OVER%20THREE%20POLE.JPG-h5B4H82FFqTVlGDd2CJ1CCBcUNS0Gv.jpeg",  # SWITCH CUM CHANGE OVER THREE POLE
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PORCELAIN%20FUSE%20KIT%20KAT%20WITH%20EXTENSION%20PATTI.JPG-ENlImiLAnIHjMORqbhPIP6H4BmrOMu.jpeg",  # PORCELAIN FUSE KIT KAT WITH EXTENSION PATTI
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STEEL%20METAL%20MCB%20ENCLOSURE.JPG-ZUJSfaOZW81C8oiEBj5JnEUxAGqsHW.jpeg",  # STEEL METAL MCB ENCLOSURE
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PLUG%20AND%20SOCKET%20BOARD%20SP%20%26%20TP.JPG-cypVSTOBZCwsvcNvz6JT3pOIsVxS4T.jpeg",  # PLUG AND SOCKET BOARD SP & TP
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PORCELAIN%20FUSE%20KIT%20KAT.JPG-WgN38W0XTy0Fffjb2HeGeBGG1RrBMH.jpeg",  # PORCELAIN FUSE KIT KAT
    # Previous MCB images
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5051.JPG-PdYcQ5u30GxKrgY9IrojpZo594tWus.jpeg",  # MCB DP red handles
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5048.JPG-EZEHoWhz2weHA9kOYi6mANCX4pKROW.jpeg",  # MCB SP blue handle
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5045.JPG-RvI9R7VK7oWCMlnhMJwwrXX4hZrJOI.jpeg",  # MCB TP blue handles
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5047.JPG-IIcygm4qQoWWBLrJpjfEjOk4Kammva.jpeg",  # MCB TP blue handles alt
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5049.JPG-qJA1OAn0GK5e778scY1z7iDpHFpXO4.jpeg",  # MCB DP blue handles
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5050.JPG-ZQnHrzf8OvIWGMWxSAv9n89V9WRCkg.jpeg",  # MCB FP blue handles
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5052.JPG-Z33byCR8T9Lf2SZkDZ97VX4hNyu3eI.jpeg",  # Isolator 4P red
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5055.JPG-23LFZgjfEy7XbFSBJ1AipXKEH0aTdM.jpeg",  # Mini trip breaker
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5053.JPG-NO1Imr31HVTD5oBsVf66jH9bSaZZnf.jpeg",  # Isolator SP switches
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5054.JPG-rd1BVQeGdd2zfq6lLqFiOFu6hk4dpP.jpeg",  # Changeover switch DP
]

image_names = [
    "plastic-mcb-enclosure-din.jpg",
    "plug-open-metal-enclosure.jpg", 
    "spn-distribution-board-single-door.jpg",
    "tpn-distribution-board-transparent.jpg",
    "socket-open-sp-tp.jpg",
    "switch-changeover-three-pole.jpg",
    "porcelain-fuse-kitkat-extension.jpg",
    "steel-mcb-enclosure.jpg",
    "plug-socket-board-sp-tp.jpg",
    "porcelain-fuse-kitkat.jpg",
    "mcb-dp-c-curve-red.jpg",
    "mcb-sp-c-curve-blue.jpg",
    "mcb-tp-c-curve-blue.jpg",
    "mcb-tp-c-curve-blue-alt.jpg",
    "mcb-dp-c-curve-blue.jpg",
    "mcb-fp-c-curve-blue.jpg",
    "isolator-4p-red.jpg",
    "mini-trip-breaker.jpg",
    "isolator-sp-switches.jpg",
    "changeover-switch-dp.jpg",
]

def remove_background_and_make_white(image_url, output_name):
    """Remove background from image and replace with white background"""
    try:
        print(f"[v0] Processing {output_name}...")
        
        # Download the image
        response = requests.get(image_url)
        response.raise_for_status()
        
        # Open the image
        input_image = Image.open(BytesIO(response.content))
        
        # Convert to RGB if necessary
        if input_image.mode != 'RGB':
            input_image = input_image.convert('RGB')
        
        # Remove background using rembg
        output_image = remove(input_image)
        
        # Create white background
        white_bg = Image.new('RGB', output_image.size, (255, 255, 255))
        
        # Paste the image with removed background onto white background
        white_bg.paste(output_image, mask=output_image.split()[-1])  # Use alpha channel as mask
        
        # Save the processed image
        white_bg.save(f"public/images/products/{output_name}", "JPEG", quality=95)
        
        print(f"[v0] Successfully processed {output_name}")
        return True
        
    except Exception as e:
        print(f"[v0] Error processing {output_name}: {str(e)}")
        return False

def main():
    """Process all product images to remove backgrounds"""
    print("[v0] Starting background removal process...")
    
    successful = 0
    failed = 0
    
    for url, name in zip(image_urls, image_names):
        if remove_background_and_make_white(url, name):
            successful += 1
        else:
            failed += 1
    
    print(f"[v0] Background removal complete!")
    print(f"[v0] Successfully processed: {successful} images")
    print(f"[v0] Failed to process: {failed} images")

if __name__ == "__main__":
    main()
