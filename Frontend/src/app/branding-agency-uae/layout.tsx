import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Branding Agency in UAE | Brand Identity & Logo Design',
    description: 'Transform your brand with Obsidian Six. We specialize in brand consulting, strategy, logo design, packaging, identity frameworks, and 3D visualisations in the UAE.',
    alternates: { canonical: '/branding-agency-uae' },
};

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
