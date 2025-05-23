
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { ContactSection } from '@/components/contact/contact-section';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the 3D Avatar component
const DynamicAvatar3D = dynamic(() => import('@/components/three/Avatar3D'), {
  ssr: false, // Ensure it's client-side only
  loading: () => <div className="w-full h-[300px] md:h-[400px] bg-secondary/30 rounded-lg flex items-center justify-center"><p className="text-muted-foreground">Loading 3D Model...</p></div>,
});


export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="py-12 md:py-16 bg-card rounded-lg shadow-xl border border-border/50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 text-primary">
                Mouheb Sliti
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold mb-4 text-primary/90">
                XR Developer / Backend Engineer
              </p>
            </div>
            <p className="text-lg sm:text-xl text-foreground/80 max-w-xl mx-auto md:mx-0">
              Discover innovative XR (VR/AR/MR) projects developed with passion and cutting-edge technology.
              Let&apos;s build the future of immersive experiences together.
            </p>
            <div className="pt-2">
              <Link href="#portfolio">
                <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                  Explore Projects
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center mt-8 md:mt-0">
            <DynamicAvatar3D />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-4xl font-bold text-center mb-10 text-primary">My Work</h2>
        <PortfolioGrid />
      </section>

      <ContactSection />
    </div>
  );
}
