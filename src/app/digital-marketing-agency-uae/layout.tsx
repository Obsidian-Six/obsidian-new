import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Marketing Agency in UAE | SEO & SMM',
    description: 'Performance-driven digital marketing agency in UAE offering SEO, SMM, PPC and branding services.',
    alternates: { canonical: '/digital-marketing-agency-uae' },
};

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}