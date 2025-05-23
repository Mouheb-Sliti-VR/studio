import Link from 'next/link';

export function Header() {
  return (
    <header className="py-6 bg-card shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex flex-col text-primary hover:text-primary/90 transition-colors">
          <span className="text-2xl font-bold font-poppins">Mouheb Sliti</span>
          <span className="text-sm font-poppins text-foreground/80">XR Developer / Backend Engineer</span>
        </Link>
        <nav>
          {/* Navigation items can be added here if needed */}
        </nav>
      </div>
    </header>
  );
}
