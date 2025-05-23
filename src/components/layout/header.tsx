import Link from 'next/link';
import { CodeXml } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 bg-background shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
          <CodeXml className="h-8 w-8" />
          <span>Portfolio Pilot</span>
        </Link>
        <nav>
          <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
            Manage Projects
          </Link>
        </nav>
      </div>
    </header>
  );
}
