
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="py-6 bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 text-primary hover:text-primary/80 transition-colors duration-300 group">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-accent transition-colors duration-300">
            <Image
              src="/profile-pic.jpg"
              alt="Mouheb Sliti profile picture"
              layout="fill"
              objectFit="cover"
              data-ai-hint="profile picture"
            />
          </div>
          <div>
            <span className="text-2xl font-bold font-poppins block group-hover:text-accent transition-colors duration-300">Mouheb Sliti</span>
            <span className="text-sm font-poppins text-foreground/80 block">XR Developer / Backend Engineer</span>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
