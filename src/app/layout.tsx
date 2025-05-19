import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StreamFM',
  description: 'A modern Life FM radio streaming experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 antialiased">{children}</body>
    </html>
  );
}
