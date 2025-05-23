import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="py-6 bg-card shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4 text-primary hover:text-primary/90 transition-colors">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/50">
            <Image
              src="/profile-pic.jpg" // Make sure you save your image as profile-pic.jpg in the /public folder
              alt="Mouheb Sliti profile picture"
              layout="fill"
              objectFit="cover"
              data-ai-hint="profile picture"
            />
          </div>
          <div>
            <span className="text-2xl font-bold font-poppins block">Mouheb Sliti</span>
            <span className="text-sm font-poppins text-foreground/80 block">XR Developer / Backend Engineer</span>
          </div>
        </Link>
        <nav>
          {/* Navigation items can be added here if needed */}
        </nav>
      </div>
    </header>
  );
}
