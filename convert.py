import os
from PIL import Image
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

root_dir = r"c:/Users/Kaylee King/Desktop/Cairn-Agency/Custoemr/HILdetailing/assets"

for dirpath, _, filenames in os.walk(root_dir):
    for f in filenames:
        if f.lower().endswith(".heic"):
            full_path = os.path.join(dirpath, f)
            jpg_path = os.path.splitext(full_path)[0] + ".jpg"
            if not os.path.exists(jpg_path):
                print(f"Converting {full_path}")
                try:
                    img = Image.open(full_path)
                    img.convert('RGB').save(jpg_path, "JPEG")
                except Exception as e:
                    print(e)
