import { ImageResponse } from "next/og";

/**
 * Branded cover image for blog posts, made on the fly:
 *   /blog-cover/?title=How%20to%20...&category=SEO
 * 1200x630 works as both the article cover and the social share image.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Obsidian Six Blog").slice(0, 140);
  const category = (searchParams.get("category") || "Insights").slice(0, 40);
  const size = title.length > 90 ? 52 : title.length > 60 ? 60 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #031a3f 0%, #052D69 55%, #1d4ed8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>OBSIDIAN SIX</div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.45)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 800, lineHeight: 1.12, letterSpacing: -1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          <div style={{ display: "flex" }}>obsidiansix.com/blogs</div>
          <div style={{ display: "flex", width: 160, height: 6, borderRadius: 3, background: "#60a5fa" }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    }
  );
}
