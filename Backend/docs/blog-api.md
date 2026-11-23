# Blog CMS API

Base URL: `https://api.obsidiansix.com/api/blogs`

## Authentication

| Who | How |
|---|---|
| Admin panel | `Authorization: Bearer <token>` from `/api/auth/login` |
| Automation (scripts, Claude, Zapier, n8n) | `x-api-key: <BLOG_API_KEY>` |

`BLOG_API_KEY` lives in `Backend/.env`. It must be at least 24 characters. Generate one with:

```
openssl rand -hex 32
```

Without `BLOG_API_KEY` in `.env`, API-key access is switched off and only the admin panel works.

## Create a post

`POST /api/blogs`

```json
{
  "title": "How Much Does SEO Cost in India?",
  "contentFormat": "markdown",
  "content": "Intro paragraph...\n\n## First section\n\n...",
  "excerpt": "Optional. Taken from the first paragraph when empty.",
  "slug": "optional-custom-slug",
  "status": "draft",
  "publishedAt": "2027-01-15T04:30:00Z",
  "category": "SEO",
  "tags": ["seo", "pricing"],
  "coverImage": "https://... or /uploads/...",
  "coverImageAlt": "What the image shows",
  "author": "Obsidian Six",
  "seo": {
    "metaTitle": "Optional, max ~60 characters",
    "metaDescription": "Optional, 120–160 characters",
    "focusKeyword": "seo cost in india",
    "canonicalUrl": "",
    "ogImage": "",
    "noindex": false
  },
  "faq": [{ "question": "Is SEO a one-time cost?", "answer": "No..." }]
}
```

- `contentFormat` is `"html"` (default) or `"markdown"`. Content is cleaned on save: scripts, styles and unsafe attributes are removed, an H1 in the body becomes an H2, and outside links open in a new tab.
- `status`: `draft` (not on the site), `published`, or `scheduled`. A scheduled post appears on the site once `publishedAt` has passed.
- The slug is made from the title when left out. A slug that is already taken returns `409`.

Example with curl:

```
curl -X POST https://api.obsidiansix.com/api/blogs \
  -H "x-api-key: $BLOG_API_KEY" -H "Content-Type: application/json" \
  -d @post.json
```

## Other endpoints

| Method | Path | Access | What it does |
|---|---|---|---|
| GET | `/api/blogs?page=1&limit=12&category=SEO&tag=ads` | Public | Live posts, newest first (no body content) |
| GET | `/api/blogs/slug/:slug` | Public | One live post. Returns `{ redirect: "<new-slug>" }` for a renamed slug |
| GET | `/api/blogs/admin/all?status=draft&q=seo` | Admin / API key | All posts including drafts |
| GET | `/api/blogs/admin/:id` | Admin / API key | One post with content |
| PUT | `/api/blogs/:id` | Admin / API key | Update any field. Renaming a live post's slug keeps the old URL working (301) |
| DELETE | `/api/blogs/:id` | Admin / API key | Delete a post |
| POST | `/api/blogs/upload` | Admin / API key | Upload an image (multipart field `image`). Returns `{ path: "/uploads/..." }` |
| POST | `/api/blogs/import/wordpress` | Admin / API key | Copy posts from the old WordPress.com blog. Add `?overwrite=true` to refresh ones already imported |

## On the website

- `/blogs/` and `/blogs/<slug>/` are rendered on the server from this API and refresh within 60 seconds of a change.
- Each post gets its title tag, meta description, canonical URL, Open Graph tags, `BlogPosting`, `BreadcrumbList` and (when FAQs exist) `FAQPage` structured data.
- Live posts are added to `/sitemap.xml` (refreshed hourly) unless marked `noindex` or given an outside canonical.
- Until posts exist in the CMS, the site keeps showing the old WordPress.com posts.
