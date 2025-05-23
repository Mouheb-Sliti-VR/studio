
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { ContactSection } from '@/components/contact/contact-section'; // New import
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-card rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-primary">
          Mouheb Sliti
        </h1>
        <p className="text-3xl font-semibold mb-4 text-primary/90">
          XR Developer / Backend Engineer
        </p>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Discover innovative XR (VR/AR/MR) projects developed with passion and cutting-edge technology.
          Let&apos;s build the future of immersive experiences together.
        </p>
        <Link href="#portfolio">
          <Button size="lg">
            Explore Projects
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center mb-10">My Work</h2>
        <PortfolioGrid />
      </section>

      <ContactSection /> {/* Replaced ContactForm with ContactSection */}
    </div>
  );
}
