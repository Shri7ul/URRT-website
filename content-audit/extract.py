"""Extract structured content from the archived URRT site pages."""
import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup

RAW = Path(__file__).parent / "raw"
OUT = Path(__file__).parent

PAGES = [
    ("index.html", "https://rescuerover.uiu.ac.bd/index.html"),
    ("Advisors.html", "https://rescuerover.uiu.ac.bd/Advisors.html"),
    ("Assets.html", "https://rescuerover.uiu.ac.bd/Assets.html"),
    ("Join.html", "https://rescuerover.uiu.ac.bd/Join.html"),
    ("contact.html", "https://rescuerover.uiu.ac.bd/contact.html"),
    ("gears.html", "https://rescuerover.uiu.ac.bd/gears.html"),
    ("member.html", "https://rescuerover.uiu.ac.bd/member.html"),
    ("projects.html", "https://rescuerover.uiu.ac.bd/projects.html"),
    ("sponsor.html", "https://rescuerover.uiu.ac.bd/sponsor.html"),
    ("video.html", "https://rescuerover.uiu.ac.bd/video.html"),
    ("webmaster.html", "https://rescuerover.uiu.ac.bd/webmaster.html"),
]

# Scripts/styles/nav/footer noise
STRIP = ["script", "style", "noscript", "svg", "nav", "footer", "header"]


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def extract(fname: str, url: str) -> dict:
    html = (RAW / fname).read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(html, "lxml")

    title = clean(soup.title.get_text()) if soup.title else ""
    metas = {}
    for m in soup.find_all("meta"):
        k = m.get("name") or m.get("property")
        v = m.get("content")
        if k and v:
            metas[k] = clean(v)

    headings = []
    for h in soup.find_all(re.compile(r"^h[1-6]$")):
        t = clean(h.get_text())
        if t:
            headings.append({"level": h.name, "text": t})

    # Body copy from paragraphs / list items, excluding chrome
    body = BeautifulSoup(html, "lxml")
    for tag in body(STRIP):
        tag.decompose()
    paragraphs = []
    for p in body.find_all(["p", "li", "blockquote", "figcaption"]):
        t = clean(p.get_text())
        if len(t) > 2 and t not in paragraphs:
            paragraphs.append(t)

    images = []
    for img in soup.find_all("img"):
        images.append(
            {
                "src": img.get("src", ""),
                "alt": clean(img.get("alt", "")),
                "has_alt": bool(img.get("alt", "").strip()),
            }
        )

    links = []
    for a in soup.find_all("a", href=True):
        links.append({"href": a["href"], "text": clean(a.get_text())})

    iframes = [f.get("src", "") for f in soup.find_all("iframe")]

    # Contact-ish strings
    text_all = clean(soup.get_text(" "))
    emails = sorted(set(re.findall(r"[\w.+-]+@[\w-]+\.[\w.]+", text_all)))
    phones = sorted(set(re.findall(r"(?:\+?880|0)\d[\d\s-]{7,14}\d", text_all)))

    return {
        "source_file": fname,
        "source_url": url,
        "title": title,
        "meta": metas,
        "headings": headings,
        "paragraphs": paragraphs,
        "images": images,
        "links": links,
        "iframes": iframes,
        "emails": emails,
        "phones": phones,
        "word_count": len(text_all.split()),
    }


def main():
    records = []
    for fname, url in PAGES:
        if not (RAW / fname).exists():
            print(f"MISSING {fname}", file=sys.stderr)
            continue
        records.append(extract(fname, url))

    with (OUT / "extracted-content.jsonl").open("w", encoding="utf-8") as fh:
        for r in records:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")

    for r in records:
        print(
            f"{r['source_file']:<16} words={r['word_count']:<6} "
            f"h={len(r['headings']):<3} img={len(r['images']):<3} links={len(r['links']):<3} "
            f"emails={len(r['emails'])}"
        )
    print(f"\nWrote {len(records)} records")


if __name__ == "__main__":
    main()
