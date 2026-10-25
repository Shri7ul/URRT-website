"""Build page / media / link inventories for the URRT audit."""
import csv
import json
import re
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup

HERE = Path(__file__).parent
RAW = HERE / "raw"
BASE = "https://rescuerover.uiu.ac.bd/"

PAGES = [
    "index.html", "Advisors.html", "Assets.html", "Join.html", "contact.html",
    "gears.html", "member.html", "projects.html", "sponsor.html",
    "video.html", "webmaster.html",
]

INTERNAL_PAGES = {p.lower() for p in PAGES}


def load(fname):
    return BeautifulSoup(
        (RAW / fname).read_text(encoding="utf-8", errors="replace"), "lxml"
    )


def main():
    page_rows, media_rows, link_rows = [], [], []
    seen_media = set()
    seen_links = set()

    for fname in PAGES:
        soup = load(fname)
        title = soup.title.get_text(strip=True) if soup.title else ""
        desc = ""
        for m in soup.find_all("meta"):
            if (m.get("name") or "").lower() == "description":
                desc = m.get("content", "")
        h1s = [h.get_text(" ", strip=True) for h in soup.find_all("h1")]
        text = re.sub(r"\s+", " ", soup.get_text(" ")).strip()

        page_rows.append(
            {
                "page": fname,
                "url": BASE + fname,
                "title": title,
                "meta_description": desc,
                "h1": " | ".join(h1s),
                "h1_count": len(h1s),
                "word_count": len(text.split()),
                "img_count": len(soup.find_all("img")),
                "has_canonical": bool(soup.find("link", rel="canonical")),
                "has_og": any(
                    (m.get("property") or "").startswith("og:") for m in soup.find_all("meta")
                ),
                "has_jsonld": bool(soup.find("script", type="application/ld+json")),
            }
        )

        for img in soup.find_all("img"):
            src = img.get("src", "").strip()
            if not src:
                continue
            abs_url = urljoin(BASE + fname, src)
            alt = (img.get("alt") or "").strip()
            key = (fname, abs_url)
            if key in seen_media:
                continue
            seen_media.add(key)
            media_rows.append(
                {
                    "page": fname,
                    "type": "image",
                    "src": src,
                    "absolute_url": abs_url,
                    "alt_text": alt,
                    "has_alt": "yes" if alt else "NO",
                    "caption": "",
                }
            )

        for ifr in soup.find_all("iframe"):
            src = ifr.get("src", "").strip()
            if not src:
                continue
            media_rows.append(
                {
                    "page": fname,
                    "type": "iframe",
                    "src": src,
                    "absolute_url": urljoin(BASE + fname, src),
                    "alt_text": ifr.get("title", ""),
                    "has_alt": "n/a",
                    "caption": "",
                }
            )

        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
                continue
            abs_url = urljoin(BASE + fname, href)
            key = (fname, abs_url)
            if key in seen_links:
                continue
            seen_links.add(key)
            internal = abs_url.startswith(BASE)
            target = abs_url.replace(BASE, "").lower()
            status = ""
            if internal and target not in INTERNAL_PAGES:
                status = "BROKEN/UNKNOWN INTERNAL"
            link_rows.append(
                {
                    "page": fname,
                    "href": href,
                    "absolute_url": abs_url,
                    "link_text": a.get_text(" ", strip=True)[:120],
                    "scope": "internal" if internal else "external",
                    "status": status,
                }
            )

    def write(name, rows, cols):
        with (HERE / name).open("w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=cols)
            w.writeheader()
            w.writerows(rows)
        print(f"{name}: {len(rows)} rows")

    write("page-inventory.csv", page_rows, list(page_rows[0].keys()))
    write("media-inventory.csv", media_rows, list(media_rows[0].keys()))
    write("link-inventory.csv", link_rows, list(link_rows[0].keys()))

    # Flag duplicate media across pages
    counts = {}
    for r in media_rows:
        counts[r["absolute_url"]] = counts.get(r["absolute_url"], 0) + 1
    print("\nUnique media assets:", len(counts))
    print("Images missing alt:", sum(1 for r in media_rows if r["has_alt"] == "NO"))
    print("External links:", sum(1 for r in link_rows if r["scope"] == "external"))
    print("Suspect internal links:", sum(1 for r in link_rows if r["status"]))


if __name__ == "__main__":
    main()
