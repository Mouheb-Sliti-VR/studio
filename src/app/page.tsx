
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { ContactSection } from '@/components/contact/contact-section';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { ClientAvatar3D } from '@/components/layout/client-avatar-3d';


export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="py-12 md:py-16 bg-card rounded-lg shadow-xl border border-border/50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-6">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              About Me
            </h2>
            <p className="text-base text-foreground/80 max-w-xl mx-auto md:mx-0">
              I'm a Unity Certified Professional Developer and Computer Science Engineer specializing in immersive 3D and XR experiences and simulations. I lead the full development lifecycle—from crafting interactive gameplay to building scalable, event-driven backends and multiplayer servers. Fully embracing the DevOps philosophy, I handle everything from coding and testing to CI/CD, cloud deployment on GCP, and performance monitoring.
            </p>
            <p className="text-base text-foreground/80 max-w-xl mx-auto md:mx-0">
              Driven by a passion for exploration and continuous learning, I actively seek out new technologies and challenges beyond my core expertise. My rare combination of creative vision, deep technical skills, and end-to-end ownership makes me a uniquely versatile engineer capable of delivering impactful, eco-conscious experiences that perform seamlessly across platforms.
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
          <div className="w-full h-[250px] md:h-[350px] flex items-center justify-center mt-8 md:mt-0"> {/* Reduced height */}
            <ClientAvatar3D />
          </div>
        </div>
      </section>

      <section id="portfolio">
        <h2 className="text-4xl font-bold text-center mb-10 text-primary">My Work</h2>
        <PortfolioGrid />
      </section>

      <ContactSection />
    </div>
  );
}
