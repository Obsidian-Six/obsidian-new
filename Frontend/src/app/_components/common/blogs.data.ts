export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  jetpack_featured_media_url?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

export const BLOGS_API =
  "https://public-api.wordpress.com/wp/v2/sites/obsidiansixblogs.wordpress.com/posts";

export function getBlogImage(
  post: BlogPost
): string {
  /*
   * 1. Jetpack featured image
   */
  if (post.jetpack_featured_media_url) {
    return post.jetpack_featured_media_url;
  }

  /*
   * 2. Embedded WordPress featured image
   */
  const featured =
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url;

  if (featured) {
    return featured;
  }

  /*
   * 3. First image inside content
   */
  const match =
    post.content.rendered.match(
      /<img [^>]*src="([^"]+)"/
    );

  if (match?.[1]) {
    return match[1];
  }

  /*
   * 4. Fallback
   */
  return "/founder.jpg";
}

export async function getBlogs(): Promise<
  BlogPost[]
> {
  try {
    const response = await fetch(
      `${BLOGS_API}?_embed&per_page=100`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Blog API error: ${response.status}`
      );
    }

    const data: unknown =
      await response.json();

    return Array.isArray(data)
      ? (data as BlogPost[])
      : [];
  } catch (error) {
    console.error(
      "Failed to fetch blogs:",
      error
    );

    return [];
  }
}