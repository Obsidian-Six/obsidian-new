import Link from 'next/link';

export const metadata = {
  title: 'Digital Marketing Blog - Obsidian Six',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
     
      <main>{children}</main>
    </div>
  );
}
