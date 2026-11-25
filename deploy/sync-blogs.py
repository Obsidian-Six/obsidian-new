#!/usr/bin/env python3
"""
Push blog posts from content/blogs/*.md into the Obsidian Six CMS.

Runs on the server (called by deploy/auto-deploy.sh) and uses BLOG_API_KEY from
Backend/.env, so the key never leaves the server.

File format (front matter is JSON, body is Markdown):

    ---json
    {
      "title": "…",
      "slug": "…",
      "publishAt": "2026-11-27T09:30:00+05:30",
      "excerpt": "…",
      "category": "…",
      "tags": ["…"],
      "coverImage": "https://…",
      "coverImageAlt": "…",
      "seo": { "metaTitle": "…", "metaDescription": "…", "focusKeyword": "…" },
      "faq": [{ "question": "…", "answer": "…" }],
      "status": "auto"          # optional: "auto" (default), "draft"
    }
    ---
    Markdown body…

Usage:
    python3 deploy/sync-blogs.py content/blogs/2026-11-27-some-post.md [...]
    python3 deploy/sync-blogs.py --all
    python3 deploy/sync-blogs.py --check FILE   # validate only, no network
"""
import datetime as dt
import glob
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = os.environ.get("BLOG_API", "https://api.obsidiansix.com/api/blogs")

REQUIRED = ["title", "slug", "publishAt", "seo"]


def read_api_key():
    key = os.environ.get("BLOG_API_KEY")
    if key:
        return key
    env_path = os.path.join(REPO, "Backend", ".env")
    with open(env_path, encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("BLOG_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("BLOG_API_KEY not found in Backend/.env")


def parse_post(path):
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    if not text.startswith("---json\n"):
        raise ValueError("file must start with ---json")
    end = text.find("\n---\n", 8)
    if end == -1:
        raise ValueError("front matter is not closed with ---")
    meta = json.loads(text[8:end])
    body = text[end + 5 :].strip()
    missing = [k for k in REQUIRED if not meta.get(k)]
    if missing:
        raise ValueError(f"missing front matter: {', '.join(missing)}")
    if len(body.split()) < 300:
        raise ValueError("body is shorter than 300 words")
    publish_at = dt.datetime.fromisoformat(meta["publishAt"])
    if publish_at.tzinfo is None:
        publish_at = publish_at.replace(tzinfo=dt.timezone(dt.timedelta(hours=5, minutes=30)))
    return meta, body, publish_at


def build_payload(meta, body, publish_at):
    now = dt.datetime.now(dt.timezone.utc)
    if meta.get("status") == "draft":
        status = "draft"
    else:
        status = "scheduled" if publish_at > now else "published"
    seo = meta.get("seo") or {}
    return {
        "title": meta["title"],
        "slug": meta["slug"],
        "contentFormat": "markdown",
        "content": body,
        "excerpt": meta.get("excerpt", ""),
        "category": meta.get("category", ""),
        "tags": meta.get("tags", []),
        "author": meta.get("author", "Obsidian Six"),
        "coverImage": meta.get("coverImage", ""),
        "coverImageAlt": meta.get("coverImageAlt", meta["title"]),
        "status": status,
        "publishedAt": publish_at.astimezone(dt.timezone.utc).isoformat(),
        "seo": {
            "metaTitle": seo.get("metaTitle", ""),
            "metaDescription": seo.get("metaDescription", ""),
            "focusKeyword": seo.get("focusKeyword", ""),
            "canonicalUrl": seo.get("canonicalUrl", ""),
            "ogImage": seo.get("ogImage", ""),
            "noindex": bool(seo.get("noindex", False)),
        },
        "faq": meta.get("faq", []),
    }


def request(method, url, key, payload=None):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("x-api-key", key)
    req.add_header("Content-Type", "application/json")
    req.add_header("User-Agent", "obsidian-blog-sync/1.0")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as err:
        try:
            return err.code, json.loads(err.read().decode("utf-8"))
        except Exception:
            return err.code, {"message": str(err)}


def find_existing(slug, key):
    status, data = request("GET", f"{API}/admin/all?q={urllib.parse.quote(slug)}", key)
    if status != 200:
        raise RuntimeError(f"lookup failed ({status}): {data.get('message')}")
    for post in data.get("data", []):
        if post.get("slug") == slug:
            return post["_id"]
    return None


def main(argv):
    check_only = "--check" in argv
    args = [a for a in argv if not a.startswith("--")]
    if "--all" in argv:
        args = sorted(glob.glob(os.path.join(REPO, "content", "blogs", "*.md")))
    if not args:
        print(__doc__)
        return 1

    key = None if check_only else read_api_key()
    failures = 0
    for path in args:
        name = os.path.basename(path)
        try:
            meta, body, publish_at = parse_post(path)
            payload = build_payload(meta, body, publish_at)
            if check_only:
                print(f"OK   {name}: {len(body.split())} words, {payload['status']} for {payload['publishedAt']}")
                continue
            post_id = find_existing(payload["slug"], key)
            if post_id:
                status, data = request("PUT", f"{API}/{post_id}", key, payload)
                action = "updated"
            else:
                status, data = request("POST", API, key, payload)
                action = "created"
            if status not in (200, 201):
                raise RuntimeError(f"{status}: {data.get('message')}")
            print(f"OK   {name}: {action} ({payload['status']}, {payload['publishedAt']})")
        except Exception as exc:  # keep going with the other files
            failures += 1
            print(f"FAIL {name}: {exc}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
