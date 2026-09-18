// src/app/_components/Blogs/BlogCard.tsx

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  getBlogImage,
  type BlogPost,
} from "./blogs.data";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({
  post,
}: BlogCardProps) {
  const imageUrl = getBlogImage(post);

  const formattedDate = new Date(
    post.date
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
// console.log("Blogs", post)
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex h-full flex-col"
    >
      <article className="flex h-full flex-col">
        {/* IMAGE */}
        {/* <div
          className="
            relative
            mb-6
            aspect-video
            w-full
            overflow-hidden
            bg-slate-50
            shadow-sm
            transition-all
            duration-500
            group-hover:shadow-xl
            md:aspect-[4/3]
          "
        >
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-contain
              transition-transform
              duration-700
              ease-out
              group-hover:scale-105
            "
            unoptimized
          />
        </div> */}
        <div className="relative overflow-hidden aspect-4/3 bg-slate-100 mb-3">
        <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            flex
            grow
            flex-col
            px-1
            md:px-0
          "
        >
          {/* DATE */}
          <p
            className="
              mb-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.2em]
              text-[#052D69]
              md:mb-3
              md:text-[11px]
            "
          >
            {formattedDate}
          </p>

          {/* TITLE */}
          <h2
            className="
              mb-1
              text-xl
              font-bold
              leading-[1.2]
              text-slate-900
              transition-colors
              duration-300
              group-hover:text-[#052D69]
              md:text-xl
              line-clamp-2 overflow-hidden text-ellipsis
            "
            dangerouslySetInnerHTML={{
              __html: post.title.rendered,
            }}
          />

          {/* EXCERPT */}
          <div
            className="
              mb-4
              line-clamp-2
              text-sm
              leading-relaxed
              text-slate-500
              md:mb-2
              md:line-clamp-2
            "
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />

          {/* READ STORY */}
          <div
            className="
              flex
              items-center
              text-sm
              font-bold
              text-black
              transition-colors
              duration-300
              group-hover:text-[#052D69]
            "
          >
            <span
              className="
                inline-block
                border-b-2
                border-[#052D69]
                pb-1
                transition-all
                duration-300
                group-hover:pr-4
              "
            >
              Read Story
            </span>

            <ArrowRight
              size={16}
              className="
                ml-2
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>
        </div>
      </article>
    </Link>
  );
}