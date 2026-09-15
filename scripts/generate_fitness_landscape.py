"""Generate smooth (single-peak) and rugged (many-peak) fitness landscapes.

The surface is built as a sum of positive Gaussian bumps on a flat floor, so
fitness is always >= baseline: peaks rise, nothing dips into a well.

Usage (from the repository root):
    python3 scripts/generate_fitness_landscape.py          # website figure
    python3 scripts/generate_fitness_landscape.py --pair   # smooth + rugged side by side

The default writes public/img/research/fitness_landscape_rugged.png, the
image shown in the "Origins of Life" section of the Research page.

Requirements: numpy, matplotlib, pillow (see scripts/requirements.txt).
"""

import argparse
import io
from pathlib import Path

import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LightSource, LinearSegmentedColormap
from PIL import Image

REPO_ROOT = Path(__file__).resolve().parent.parent
WEBSITE_IMAGE = REPO_ROOT / "public" / "img" / "research" / "fitness_landscape_rugged.png"

# Blue floor -> pale midtones -> orange peaks, matching the reference look.
FITNESS_CMAP = LinearSegmentedColormap.from_list("fitness", [
    (0.00, "#2a4d6e"), (0.35, "#5a8bb0"), (0.50, "#dce8f0"),
    (0.70, "#f2dcae"), (0.85, "#eda85a"), (1.00, "#d9633a"),
])


def gaussian_peaks(X, Y, centers, heights, widths):
    """Sum positive Gaussian bumps over a meshgrid.

    Args:
        X, Y: meshgrid coordinate arrays.
        centers: list of (cx, cy) peak locations.
        heights: peak amplitudes (all positive -> no wells).
        widths: per-peak standard deviations (smaller = sharper peaks).

    Returns:
        Z array, elementwise >= 0.
    """
    Z = np.zeros_like(X)
    for (cx, cy), h, w in zip(centers, heights, widths):
        Z += h * np.exp(-((X - cx) ** 2 + (Y - cy) ** 2) / (2.0 * w ** 2))
    return Z


def style_axes(ax):
    """Remove the axis entirely for a clean, transparent surface."""
    ax.set_axis_off()


def plot_landscape(ax, Z, X, Y, vert_exag=0.6):
    """Render one hillshaded surface onto a 3D axis."""
    ls = LightSource(azdeg=315, altdeg=55)
    rgb = ls.shade(Z, cmap=FITNESS_CMAP, vert_exag=vert_exag, blend_mode="soft")
    surf = ax.plot_surface(X, Y, Z, facecolors=rgb, shade=False,
                           antialiased=True, rstride=1, cstride=1)
    # Wireframe grid drawn on the surface (set after, since facecolors
    # already claims the edgecolors kwarg inside plot_surface).
    surf.set_edgecolor((0.12, 0.12, 0.20, 0.55))
    surf.set_linewidth(0.25)
    ax.set_box_aspect((1, 1, 0.55))
    ax.view_init(elev=32, azim=-55)
    ax.set_zlim(0, max(1.0, Z.max() * 1.05))
    style_axes(ax)


def build_landscapes(grid_n=90, span=3.0, seed=1):
    """Return (X, Y, Z_smooth, Z_rugged)."""
    g = np.linspace(-span, span, grid_n)
    X, Y = np.meshgrid(g, g)

    # Smooth: a single broad central peak.
    Z_smooth = gaussian_peaks(X, Y, [(0.0, 0.0)], [1.0], [1.3])

    # Rugged: a jittered grid of sharp peaks with varied heights.
    rng = np.random.default_rng(seed)
    base = np.linspace(-span * 0.7, span * 0.7, 4)
    centers, heights, widths = [], [], []
    for cx in base:
        for cy in base:
            centers.append((cx + rng.uniform(-0.4, 0.4),
                            cy + rng.uniform(-0.4, 0.4)))
            heights.append(rng.uniform(0.4, 1.0))
            widths.append(rng.uniform(0.28, 0.5))
    Z_rugged = gaussian_peaks(X, Y, centers, heights, widths)
    return X, Y, Z_smooth, Z_rugged


def save_pair(outfile="fitness_landscapes.png"):
    """Original two-panel figure: smooth and rugged landscapes side by side."""
    X, Y, Z_smooth, Z_rugged = build_landscapes()
    fig = plt.figure(figsize=(15, 7))
    for i, (Z, title) in enumerate([(Z_smooth, "Smooth"), (Z_rugged, "Rugged")]):
        ax = fig.add_subplot(1, 2, i + 1, projection="3d")
        plot_landscape(ax, Z, X, Y)
        ax.set_title(title, color="#333333", fontsize=14, pad=0)
    fig.subplots_adjust(left=0, right=1, top=1, bottom=0, wspace=0.0)
    fig.savefig(outfile, dpi=150, transparent=True)
    plt.close(fig)
    print("smooth z-range:", round(float(Z_smooth.min()), 3),
          "to", round(float(Z_smooth.max()), 3))
    print("rugged z-range:", round(float(Z_rugged.min()), 3),
          "to", round(float(Z_rugged.max()), 3))
    print("wrote", outfile)


def save_website_image(outfile=WEBSITE_IMAGE, width=760, pad=12):
    """Rugged landscape only: no title, cropped, resized and palette-compressed."""
    X, Y, _, Z_rugged = build_landscapes()
    fig = plt.figure(figsize=(7.5, 7))
    ax = fig.add_subplot(1, 1, 1, projection="3d")
    plot_landscape(ax, Z_rugged, X, Y)
    fig.subplots_adjust(left=0, right=1, top=1, bottom=0)
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=200, transparent=True)
    plt.close(fig)
    buf.seek(0)
    rgba = np.array(Image.open(buf).convert("RGBA"))

    # The figure background is transparent; crop to the visible surface.
    ys, xs = np.nonzero(rgba[..., 3] > 5)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, rgba.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, rgba.shape[1])
    img = Image.fromarray(rgba[y0:y1, x0:x1], "RGBA")

    # Retina-friendly size for a ~250-330 CSS px figure, then 256-colour palette.
    img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    img = img.quantize(colors=256, method=Image.Quantize.FASTOCTREE,
                       dither=Image.Dither.FLOYDSTEINBERG)
    Path(outfile).parent.mkdir(parents=True, exist_ok=True)
    img.save(outfile, optimize=True)
    print(f"wrote {outfile} ({img.width}x{img.height}, "
          f"{Path(outfile).stat().st_size // 1024} KB)")


def main():
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--pair", action="store_true",
                        help="write the two-panel smooth/rugged figure instead")
    parser.add_argument("-o", "--output", help="output file path")
    args = parser.parse_args()
    if args.pair:
        save_pair(args.output or "fitness_landscapes.png")
    else:
        save_website_image(args.output or WEBSITE_IMAGE)


if __name__ == "__main__":
    main()
