// Shown instantly while the Work page loads, so the click feels immediate.
export default function Loading() {
  return (
    <div className="px-5 md:px-14" aria-busy="true">
      <p className="p-10 w-full bg-white"></p>
      <div className="my-10 h-12 w-64 animate-pulse rounded bg-slate-100" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-5 w-48 animate-pulse rounded bg-slate-100" />
            <div className="h-52 md:h-80 w-full animate-pulse rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
