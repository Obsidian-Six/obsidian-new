import { getAllPosts, toCardPost } from "@/lib/blog";

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
  jetpack_featured_media_url?: string | undefined;
  category?: string;
  coverImageAlt?: string;
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
  return "/images/gradient-hero.png";
}

/** Latest posts from the CMS (falls back to WordPress until posts are imported). */
export async function getBlogs(): Promise<BlogPost[]> {
  const posts = await getAllPosts(12);
  return posts.map((p, i) => toCardPost(p, i));
}
