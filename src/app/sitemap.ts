import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// Force Next.js to generate this as a static file during build
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://obsidiansix.com';

  // 1. Define where your indexable content lives (adjust the folder name)
  // If your pages are in 'src/app/blog/[slug]', use the folder where the .md files are.
  const contentDirectory = path.join(process.cwd(), 'content'); 
  
  let dynamicEntries: MetadataRoute.Sitemap = [];

  // 2. Automatically read files from your content folder
  if (fs.existsSync(contentDirectory)) {
    const files = fs.readdirSync(contentDirectory);

    dynamicEntries = files
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => {
        // Remove the file extension to create the URL slug
        const slug = file.replace(/\.mdx?$/, '');
        return {
          url: `${baseUrl}/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
  }

  // 3. Combine your main landing pages with the auto-generated ones
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contactus`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-marketing-agency-uae`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/financial-marketing-services-uae`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...dynamicEntries,
  ];
}