
import os, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DEV = ROOT / "dev"

title_re = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
href_re = re.compile(r'href=["\'](.*?)["\']', re.IGNORECASE)
src_re  = re.compile(r'src=["\'](.*?)["\']', re.IGNORECASE)
link_re = re.compile(r'<link[^>]+href=["\'](.*?)["\']', re.IGNORECASE)

def normalize(path_str, base):
    p = path_str.split("#")[0].split("?")[0].strip()
    if not p or p.startswith(("http://", "https://", "mailto:", "tel:")):
        return None
    full = (base.parent / p).resolve()
    try:
        full.relative_to(DEV)
    except Exception:
        return None
    return str(full.relative_to(DEV))

def scan():
    html_files = sorted(DEV.glob("*.html"))
    if not html_files:
        print("No HTML files found under ./dev")
        sys.exit(1)

    errors = 0
    titles = {}
    for f in html_files:
        text = f.read_text(encoding="utf-8", errors="ignore")
        title_match = title_re.search(text)
        title = title_match.group(1).strip() if title_match else ""
        titles.setdefault(title, []).append(f.name)

        hrefs = href_re.findall(text)
        srcs  = src_re.findall(text)
        links = link_re.findall(text)
        refs = set()
        for r in hrefs + srcs + links:
            norm = normalize(r, f)
            if norm:
                refs.add(norm)

        missing = [r for r in refs if not (DEV / r).exists()]
        if missing:
            errors += len(missing)
            print(f"❌ {f.name}: missing {len(missing)} reference(s):")
            for m in missing:
                print(f"   - {m}")
        else:
            print(f"✅ {f.name}: all references resolved")

    # Duplicate titles
    dupes = {t: ps for t, ps in titles.items() if t and len(ps) > 1}
    if dupes:
        print("\n⚠️ Duplicate <title> values detected:")
        for t, ps in dupes.items():
            print(f'  "{t}" → {", ".join(ps)}')

    if errors:
        print(f"\nSummary: {errors} missing reference(s) found.")
        sys.exit(2)
    else:
        print("\nSummary: all good!")

if __name__ == "__main__":
    scan()
