from pathlib import Path

replacements = [
    ("bg-gradient-to-b from-[#118708] via-[#FAA800] to-[#935001]", "bg-[#118708]"),
    ("bg-gradient-to-br from-[#118708] via-[#FAA800] to-[#935001]", "bg-[#118708]"),
    ("bg-gradient-to-br from-[#118708] to-[#935001]", "bg-[#118708]"),
    ("bg-gradient-to-b from-[#118708] to-[#935001]", "bg-[#118708]"),
    ("bg-gradient-to-br from-[#f4fdf5] to-[#fff8ef]", "bg-[#f4fdf5]"),
    ("bg-gradient-to-br from-[#f4fdf5] to-white", "bg-[#f4fdf5]"),
    ("bg-gradient-to-br from-emerald-50 via-white to-cipresa-50", "bg-cipresa-50"),
    ("bg-gradient-to-br from-cipresa-50 to-emerald-50", "bg-cipresa-50"),
    ("bg-gradient-to-br from-[#fff8ef] to-[#ffe6b0]", "bg-[#fff8ef]"),
    ("bg-gradient-to-r from-[#fff8ef] to-[#ffe6b0]", "bg-[#fff8ef]"),
    ("bg-gradient-to-br from-cipresa-100 to-cipresa-50", "bg-cipresa-100"),
    ("bg-gradient-to-br from-cipresa-400 to-cipresa-600", "bg-cipresa-600"),
    ("bg-gradient-to-br from-cipresa-500 to-cipresa-600", "bg-cipresa-600"),
    ("bg-gradient-to-r from-cipresa-200 to-transparent", "bg-cipresa-200"),
    ("bg-gradient-to-r from-cipresa-600 to-cipresa-500", "bg-cipresa-600"),
    (
        "bg-gradient-to-r from-cipresa-600 via-africa-dawn to-earth-500",
        "bg-cipresa-600",
    ),
    ("bg-gradient-to-t from-black/40 to-transparent", "bg-black/40"),
    ("bg-gradient-to-t from-slate-950/40 to-transparent", "bg-slate-950/40"),
    (
        "bg-gradient-to-t from-cipresa-950/85 via-cipresa-950/10 to-transparent",
        "bg-cipresa-950/85",
    ),
    ("bg-gradient-to-t from-black/60 via-transparent to-transparent", "bg-black/60"),
    ("bg-gradient-to-t from-black/50 via-transparent to-transparent", "bg-black/50"),
    ("bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent", "bg-gray-950"),
    ("bg-gradient-to-b from-cipresa-950 via-cipresa-900 to-gray-950", "bg-cipresa-950"),
    (
        "bg-gradient-to-br from-cipresa-950 via-cipresa-900 to-gray-950",
        "bg-cipresa-950",
    ),
    (
        "bg-gradient-to-b from-cipresa-950 via-cipresa-900 to-gray-950 text-white",
        "bg-cipresa-950 text-white",
    ),
    (
        "bg-[radial-gradient(circle_at_top_left,_rgba(17,135,8,0.12),_transparent_32%),linear-gradient(135deg,_#f8fafc_0%,_#f7f3ea_100%)]",
        "bg-[#f8fafc]",
    ),
    (
        "bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.12),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#eefcf4_100%)]",
        "bg-[#f8fafc]",
    ),
]

for path in Path("src").rglob("*"):
    if path.is_file() and path.suffix in {".ts", ".tsx", ".js", ".jsx", ".css"}:
        text = path.read_text(encoding="utf-8")
        updated = text
        for old, new in replacements:
            updated = updated.replace(old, new)
        if updated != text:
            path.write_text(updated, encoding="utf-8")

css_path = Path("src/app/globals.css")
css_text = css_path.read_text(encoding="utf-8")
css_text = css_text.replace(
    """  .gradient-text {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-[#118708] via-[#FAA800] to-[#935001];
  }
  .gradient-border {
    position: relative;
    border-radius: inherit;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(17,135,8,0.45), rgba(250,168,0,0.4));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
""",
    """  .gradient-text {
    color: #118708;
  }
  .gradient-border {
    position: relative;
    border-radius: inherit;
    border: 1px solid rgba(17, 135, 8, 0.2);
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(17, 135, 8, 0.08);
    pointer-events: none;
  }
""",
)
css_text = css_text.replace(
    """  .bg-grid {
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(17,135,8,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(250,168,0,0.05) 1px, transparent 1px);
  }
  .bg-dot {
    background-image: radial-gradient(rgba(17,135,8,0.12) 1px, transparent 1px);
    background-size: 24px 24px;
  }
""",
    """  .bg-grid {
    background-size: 40px 40px;
    background-image: radial-gradient(rgba(17,135,8,0.08) 1px, transparent 1px);
  }
  .bg-dot {
    background-image: radial-gradient(rgba(17,135,8,0.12) 1px, transparent 1px);
    background-size: 24px 24px;
  }
""",
)
css_text = css_text.replace(
    "background: linear-gradient(135deg, #118708 0%, #FAA800 46%, #935001 100%);",
    "background: #118708;",
)
css_text = css_text.replace(
    "background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);",
    "background: rgba(255,255,255,0.12);",
)
css_text = css_text.replace(
    "background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);",
    "background: rgba(255,255,255,0.12);",
)
css_text = css_text.replace(
    "background: linear-gradient(135deg, rgba(17,135,8,0.45), rgba(250,168,0,0.4));",
    "background: rgba(17,135,8,0.2);",
)
css_text = css_text.replace(
    "background: linear-gradient(135deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%);",
    "background: rgba(255,255,255,0.16);",
)
css_text = css_text.replace(
    "background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);",
    "background: rgba(255,255,255,0.12);",
)
css_text = css_text.replace("background: #062503;", "background: #118708;")
css_path.write_text(css_text, encoding="utf-8")
