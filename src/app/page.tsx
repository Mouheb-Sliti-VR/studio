
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
            {/* Name and Title removed from here, as they are in the main header */}
            
            <h2 className="text-3xl font-bold text-primary md:text-4xl">
              About Me
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 max-w-xl mx-auto md:mx-0">
              As a Computer Science Engineer, I am passionate about crafting immersive XR experiences, leveraging my expertise in Unity development for VR/AR platforms. My skill set extends to designing robust, event-driven backends that power connected games and applications with seamless real-time interactions.
              I approach projects with a full-stack perspective, from conceptualizing game art and features to developing the backend infrastructure, and finally deploying and monitoring scalable solutions using Docker, GitLab CI/CD, and GCP.
              With a strong focus on R&D and hands-on experience deploying to platforms like Oculus Quest, I am dedicated to pushing the boundaries of XR technology. I ensure operational excellence by monitoring performance with tools such as Unity Analytics, Grafana, and GCP metrics, always aiming for innovative, efficient, and eco-friendly designs for gaming and beyond.
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
            <ClientAvatar3D />
          </div>
        </div>
      </section>

      <section id="portfolio"> {/* Added id="portfolio" for the link to work */}
        <h2 className="text-4xl font-bold text-center mb-10 text-primary">My Work</h2>
        <PortfolioGrid />
      </section>

      <ContactSection />
    </div>
  );
}
