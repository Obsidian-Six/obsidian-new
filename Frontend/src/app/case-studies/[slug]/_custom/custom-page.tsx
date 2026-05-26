import { lazy, Suspense } from "react";

export default async function CustomPage({ slug }: { slug: string }) {
  const CustomComponent = lazy(() => import(`./${slug}/page.tsx`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomComponent />
    </Suspense>
  );
}
