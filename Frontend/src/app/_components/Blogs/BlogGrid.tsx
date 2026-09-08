// src/app/_components/Blogs/BlogGrid.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Post {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    slug: string;
    date: string;
    jetpack_featured_media_url?: string;
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string }>;
    };
}

export default function BlogGrid({ posts }: { posts: Post[] }) {
    
    const getImageUrl = (post: Post): string => {
        if (post.jetpack_featured_media_url) return post.jetpack_featured_media_url;
        const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        if (featured) return featured;
        const match = post.content.rendered.match(/<img [^>]*src="([^"]+)"/);
        if (match && match[1]) return match[1];
        return '/founder.jpg';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
            {posts.map((post) => {
                const imageUrl: string = getImageUrl(post);

                return (
                    <Link 
                        href={`/blogs/${post.slug}`} 
                        key={post.id} 
                        className="group flex flex-col"
                    >
                        <article className="flex flex-col h-full">
                            {/* IMAGE CONTAINER FIXES:
                                1. Removed h-72 (fixed height).
                                2. Added aspect-video (16:9) for mobile.
                                3. Added md:aspect-[4/3] for tablets/desktop.
                                4. Added bg-slate-50 to look cleaner if images have transparency.
                            */}
                            <div className="relative aspect-video md:aspect-4/3 w-full mb-6 bg-slate-50 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                                <Image
                                    src={imageUrl} 
                                    alt={post.title.rendered}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    // object-cover ensures the container is filled. 
                                    // If you want NO cropping at all, change 'object-cover' to 'object-contain'
                                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                    unoptimized 
                                />
                            </div>

                            <div className="flex flex-col flex-grow px-1 md:px-0">
                                <p className="text-[#052D69] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-2 md:mb-3">
                                    {new Date(post.date).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric'
                                    })}
                                </p>

                                <h2
                                    className="text-xl md:text-2xl font-bold text-slate-900 leading-[1.2] mb-3 transition-colors duration-300 group-hover:text-[#052D69]"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />

                                <div
                                    className="text-slate-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 md:mb-6"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />

                                <div className="mt-auto flex items-center text-sm font-bold text-black group-hover:text-[#052D69] transition-colors">
                                    <span className="inline-block border-b-2 border-[#052D69] transition-all group-hover:pr-4 pb-1">
                                        Read Story
                                    </span>
                                    <svg
                                        className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </article>
                    </Link>
                );
            })}
        </div>
    );
}