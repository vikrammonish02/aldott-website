import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aldott TechSolution | Wind Energy Consulting & R&D',
  description: 'Aldott TechSolution delivers world-class offshore and onshore wind energy R&D, loads, certification, and project delivery.',
  openGraph: {
    title: 'Aldott TechSolution',
    description: 'Engineering-grade wind energy consulting, loads, and certification support.',
    url: 'https://aldott.de',
    siteName: 'Aldott TechSolution',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">Aldott TechSolution</Link>
            <nav className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/about" className="hover:text-primary">About</Link>
              <Link href="/services" className="hover:text-primary">Services</Link>
              <Link href="/projects" className="hover:text-primary">Projects</Link>
              <Link href="/blog" className="hover:text-primary">Blog</Link>
              <Link href="/openfast" className="hover:text-primary">OpenFAST</Link>
              <Link href="/contact" className="btn-primary text-xs">Contact</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-primary text-white mt-16">
          <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
            <div>
              <div className="font-bold text-lg">Aldott TechSolution</div>
              <p className="text-sm mt-2 text-white/80">Wind energy design house delivering loads analysis, certification support, and R&D acceleration.</p>
            </div>
            <div>
              <div className="font-semibold">Offices</div>
              <p className="text-sm text-white/80">Hamburg, Germany</p>
              <p className="text-sm text-white/80">Pune, India</p>
            </div>
            <div>
              <div className="font-semibold">Links</div>
              <div className="flex flex-col text-sm text-white/80">
                <Link href="/contact" className="hover:text-white">Contact</Link>
                <Link href="/blog" className="hover:text-white">Insights</Link>
                <Link href="/openfast" className="hover:text-white">OpenFAST Cloud</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
