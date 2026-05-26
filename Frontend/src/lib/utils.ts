/**
 * Recursively normalizes any media paths starting with "uploads/" or "/uploads/"
 * to use the absolute backend API base URL so the frontend can retrieve them.
 * Leaves text descriptions, templates, slugs, and empty strings untouched.
 */
export const normalizeMediaUrls = (obj: any, apiBase: string): any => {
  if (obj === null || obj === undefined) return obj;

  // Handle String Parsing precisely
  if (typeof obj === "string") {
    // 1. If it's an empty string, leave it alone
    if (obj.trim() === "") return obj;

    // 2. If it is already an absolute HTTP/HTTPS URL, don't change it
    if (obj.startsWith("http://") || obj.startsWith("https://")) {
      return obj;
    }

    // 3. Match relative or absolute paths inside the backend uploads folder
    if (obj.startsWith("/uploads/") || obj.startsWith("uploads/")) {
      const cleanPath = obj.replace(/^\/+/, ""); // Removes any leading slashes
      const cleanApiBase = apiBase.replace(/\/+$/, ""); // Removes any trailing slashes from API base
      return `${cleanApiBase}/${cleanPath}`;
    }

    // 4. Safe Default: If it's plain text (like "template", descriptions, names), leave it untouched!
    return obj;
  }

  // Recursively handle arrays (e.g., gallery, tags, results)
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeMediaUrls(item, apiBase));
  }

  // Recursively handle objects (e.g., challenge, twoImage)
  if (typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = normalizeMediaUrls(obj[key], apiBase);
      }
    }
    return newObj;
  }

  return obj;
};

export const getSlug = (slug: string): string => {
  try {
    const url = new URL(slug);
    // Remove leading or trailing slashes from the pathname
    return url.pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    // If slug is not a URL, just strip leading/trailing slashes
    return slug.replace(/^\/+|\/+$/g, "");
  }
};