import type { ReactNode } from 'react';

export const metadata = {
  title: 'Admin Login | Obsidian Six',
  description: 'Secure admin login for Obsidian Six',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
