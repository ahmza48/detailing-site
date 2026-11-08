"""Build the site's logo files and icons from the owner's PetroHill Energy logo (transparent PNG).

    python scripts/build-logos.py      (needs Pillow and NumPy)

Writes public/logo/petrohill-energy-logo.png (original colours, for light backgrounds: schema logo and
drawing watermark), public/logo/petrohill-energy-logo-on-dark.png (tagline lightened for the navy
header and footer) and src/app/icon.png / apple-icon.png (the P+H mark). The watermark is burned into
the drawing excerpts, so run `npm run proof` after rebuilding.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/logo/PetroHill Energy Logo Update.png"
OUT = ROOT / "public/logo"
APP = ROOT / "src/app"
NAVY = (0, 36, 56)

# "ENERGY & INDUSTRIAL SUPPORT" sits in these rows, right of the mark. In the artwork it is dark grey,
# which disappears on navy; on dark backgrounds it takes the light grey of the "Hill" highlights.
TAG_ROWS = (466, 530)
TAG_FROM_X = 690
TAG_ON_DARK = (205, 211, 216)

src = Image.open(SRC).convert("RGBA")
px = np.asarray(src).copy()

# Strip the faint haze of near-transparent pixels left by the background removal, keeping the
# anti-aliased edges next to solid artwork.
near = np.asarray(Image.fromarray(((px[..., 3] > 200) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(7))) > 0
px[(px[..., 3] < 40) & ~near, 3] = 0


def trim(arr, pad):
    img = Image.fromarray(arr)
    box = img.crop(img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    out = Image.new("RGBA", (box.width + 2 * pad, box.height + 2 * pad), (0, 0, 0, 0))
    out.paste(box, (pad, pad))
    return out


def fit_height(img, h):
    return img.resize((round(img.width * h / img.height), h), Image.LANCZOS)


# Full logo, original colours.
on_light = fit_height(trim(px, 8), 300)
on_light.save(OUT / "petrohill-energy-logo.png", optimize=True)

# Full logo for navy: tagline recoloured, everything else untouched.
dark = px.copy()
tag = dark[TAG_ROWS[0]:TAG_ROWS[1], TAG_FROM_X:]
tag[tag[..., 3] > 0, :3] = TAG_ON_DARK
on_dark = fit_height(trim(dark, 8), 300)
on_dark.save(OUT / "petrohill-energy-logo-on-dark.png", optimize=True)

# The P+H mark alone: everything connected to the P and the H, grown from a seed in each.
solid = px[..., 3] > 40
region = np.zeros_like(solid)
for y, x0, x1 in ((545, 120, 260), (530, 250, 520)):
    xs = np.where(solid[y, x0:x1])[0]
    region[y, x0 + xs[len(xs) // 2]] = True
while True:
    grown = (np.asarray(Image.fromarray(region.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(3))) > 0) & solid
    if (grown == region).all():
        break
    region = grown
mark = px.copy()
mark[~region, 3] = 0
mark_img = trim(mark, 0)
assert mark_img.width < 700, f"mark merged with the wordmark ({mark_img.width}px wide)"


def icon(size, pad, background=None):
    canvas = Image.new("RGBA", (size, size), background + (255,) if background else (0, 0, 0, 0))
    m = mark_img.copy()
    m.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


icon(512, 12).save(APP / "icon.png", optimize=True)
icon(180, 16, NAVY).convert("RGB").save(APP / "apple-icon.png", optimize=True)

for name, img in (("on-light", on_light), ("on-dark", on_dark), ("mark", mark_img)):
    print(name, img.size, round(img.width / img.height, 3))
