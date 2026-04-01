import sys
from PIL import Image

def process(in_path, out_path, black_thresh=40, white_thresh=120):
    try:
        img = Image.open(in_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for r, g, b, a in datas:
            # Calculate apparent brightness
            brightness = (r + g + b) / 3.0
            
            if brightness < black_thresh:
                # Fully transparent for dark enough pixels (the black background)
                newData.append((0, 0, 0, 0))
            elif brightness < white_thresh:
                # Partial transparency to blend edges (anti-aliasing)
                # Map brightness from black_thresh to white_thresh to an alpha from 0 to 255
                alpha = int(255 * (brightness - black_thresh) / (white_thresh - black_thresh))
                # For partial pixels, keep their color but adjust alpha
                # However, if it's supposed to be white/orange, we want to maintain color
                newData.append((r, g, b, alpha))
            else:
                # Fully opaque for brighter pixels
                newData.append((r, g, b, 255))

        img.putdata(newData)
        img.save(out_path, "PNG")
        print(f"Success! Saved transparent logo to {out_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_black.py <input> <output>")
    else:
        process(sys.argv[1], sys.argv[2])
