# Obsidian Six Blog Playbook

This is the brief for every post on obsidiansix.com/blogs. Whoever writes the daily post, person or Claude, follows it.

The goal is not traffic for its own sake. The goal is **the right readers**: business owners and marketing heads who could hire Obsidian Six. Every post should leave them thinking "these people know exactly what they are talking about".

---

## 1. Who we write for (ICP)

| Segment | Who they are | What keeps them up at night |
|---|---|---|
| **India SMB owners** | Founders and owners of ₹1–100 Cr businesses: hotels, Ayurveda and wellness brands, real estate developers, colleges and coaching institutes, clinics, cafes, manufacturers. Mumbai, Bhopal, Indore, Tier 1 and Tier 2 cities. | Leads are expensive, agencies show vanity numbers, nobody explains what is happening in plain words. |
| **UAE SMEs** | Business setup consultants, real estate brokerages, tourism operators, professional services in Dubai and Abu Dhabi. | Crowded market, high ad costs, new rules (advertiser permits), slow lead follow-up. |
| **International founders** | UK, EU and US founders and agencies who need a reliable development or automation team in India. | Quality, communication, code ownership, data protection. |

Write to one of them per post. The calendar says which.

## 2. Voice: sound like a person, not a machine

Write like a senior marketer explaining something to a business owner over chai. Direct, practical, a little opinionated.

**Do**
- Open with the reader's situation or a sharp fact, never with "In today's digital world".
- Short paragraphs (2–4 sentences). Vary sentence length.
- Use "you" and "we". Say what we would do and why.
- Use Indian and UAE examples, ₹ and AED, real platforms (Zomato, MakeMyTrip, 99acres, Bayut, IndiaMART).
- Give the reader something to do today: a checklist, a calculation, a template, a decision rule.
- Admit trade-offs and when something is NOT worth doing.

**Never use** these words and phrases: delve, elevate, revolutionize, testament, unlock, unleash, game-changer, landscape, realm, navigate the complexities, in today's fast-paced world, in the ever-evolving, it's important to note, harness the power, seamless, robust, cutting-edge, leverage (as a verb), synergy, embark, journey (for business), tapestry, look no further, the bottom line is, in conclusion.

No emojis. No exclamation marks except inside quotes. No "Introduction" or "Conclusion" headings.

## 3. Facts and data: the non-negotiable rules

1. **Every number, date, price, rule or statistic must come from a source you opened today**, published or updated within the last 12 months (official docs can be older if still current). Link it in the sentence where you use it.
2. Prefer primary sources: Google (blog.google, support.google.com, developers.google.com), Meta (facebook.com/business, developers.facebook.com, transparency pages), government (PIB, MeitY, UAE government portals, NMA), regulators (ASCI, RERA, DLD), then reputable trade press (Search Engine Land, Search Engine Journal, afaqs!, exchange4media, Campaign India, The National, Gulf News, Economic Times).
3. **Never invent** statistics, survey results, client names, client results, quotes or "studies show" claims. If you cannot find a number, explain the logic without one, or show a worked example clearly labelled "example" with made-up but realistic inputs.
4. Obsidian Six experience: you may describe how we work and what we usually recommend. Only cite client results that appear in our published case studies (link them).
5. Legal, tax, medical or compliance topics: summarise and link the official source, add one line that this is general information, not legal advice.
6. If research shows the planned angle is outdated or wrong, change the angle. Accuracy beats the calendar.

## 4. SEO rules

| Item | Rule |
|---|---|
| Focus keyword | From the calendar. Use it in the H1/title, the first 100 words, one H2, the slug and the meta description. Do not stuff it: 3–6 times in total. |
| SEO title (`seo.metaTitle`) | 45–60 characters including " \| Obsidian Six". Keyword near the start. |
| Meta description | 130–158 characters. A reason to click, not a summary. Contains the keyword. |
| Slug | From the calendar. Short, lowercase, dashes. Never change a published slug. |
| Length | 1,200–1,800 words for articles; 900–1,300 for weekly news roundups. Never pad. |
| Structure | One H1 (the title, set by the site). 5–8 H2 sections, H3 where useful. No H1 in the body. |
| Featured-snippet block | Right after the intro, a 40–60 word plain answer to the main question, or a short numbered list. |
| Internal links | At least 3: the links listed in the calendar plus one related blog post that already exists. Descriptive anchor text, never "click here". |
| External links | 2–5 authoritative sources (see section 3). |
| FAQ | 3–4 questions people actually search (check Google's "People also ask" and AI Mode follow-ups). 1–3 sentence answers. |
| Images | Cover image: `https://obsidiansix.com/blog-cover/?title=<url-encoded short title>&category=<url-encoded category>`. Alt text describes the topic. |
| Freshness | Put the month and year in the text where it matters ("as of November 2026"). |

## 5. Structure template (articles)

1. **Hook** (2–3 short paragraphs): the reader's problem or the news, why it matters to them now.
2. **Quick answer** block (snippet-ready).
3. **4–6 H2 sections** that do the real work: explain, show the numbers, give the steps.
4. **A practical tool**: checklist, worked calculation, decision table or template.
5. **Common mistakes** or "what we would not do".
6. **What to do this week**: 3–5 concrete actions.
7. **Soft CTA** (one short paragraph): how Obsidian Six helps, linking the relevant service or city page and /contactus/. Never pushy.
8. **FAQ** goes in front matter, not in the body (the site renders it).

### Weekly news roundup (Mondays)

Title format from the calendar. 4–6 items from the last 7 days. For each item an H2 with the change, then: what changed (with source and date), who it affects, what to do. End with "What we are watching next week". Only include items you verified on a primary or reputable source.

## 6. File format

One file per post: `content/blogs/YYYY-MM-DD-<slug>.md`

```
---json
{
  "title": "Post title (this becomes the H1)",
  "slug": "slug-from-calendar",
  "publishAt": "2026-11-27T09:30:00+05:30",
  "excerpt": "1–2 sentences for the blog list (max 220 characters).",
  "category": "Performance Marketing",
  "tags": ["tag one", "tag two", "tag three"],
  "author": "Obsidian Six",
  "coverImage": "https://obsidiansix.com/blog-cover/?title=...&category=...",
  "coverImageAlt": "What the cover shows",
  "seo": {
    "metaTitle": "... | Obsidian Six",
    "metaDescription": "...",
    "focusKeyword": "..."
  },
  "faq": [
    { "question": "...", "answer": "..." }
  ]
}
---
Markdown body. Starts with the hook paragraph. ## for sections, ### for sub-sections.
```

Check a file before committing:

```
python3 deploy/sync-blogs.py --check content/blogs/<file>.md
```

## 7. Publishing flow

1. Commit the file to `main` in `Obsidian-Six/obsidian-new`.
2. Within about 2 minutes the server notices the commit (`deploy/auto-deploy.sh`), sees that only `content/` changed, and pushes the post into the CMS with `deploy/sync-blogs.py`. No rebuild.
3. A future `publishAt` makes the post *scheduled*; it goes live on the site at that time. A past `publishAt` publishes it right away.
4. To fix a published post: edit the same file and commit again. The CMS copy is updated. Edits made in the admin panel are overwritten the next time the file changes, so for big edits change the file.

## 8. Before you commit: quality checklist

- [ ] Would Aadarsh be happy to send this link to a prospect?
- [ ] Every number has a source link from today's research.
- [ ] No banned phrases (section 2). Read the intro out loud: does it sound like a person?
- [ ] Gives the reader something they can do today.
- [ ] Not a near-duplicate of an existing post (check obsidiansix.com/blogs and `content/blogs/`).
- [ ] Focus keyword placement and lengths match section 4.
- [ ] 3+ internal links that exist, 2+ external links that load.
- [ ] `sync-blogs.py --check` passes.
