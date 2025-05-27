
import { PortfolioGrid } from '@/components/portfolio/portfolio-grid';
import { ContactSection } from '@/components/contact/contact-section';
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
              I’m a versatile Computer Science Engineer and Unity Certified Professional Developer passionate about immersive XR experiences and scalable, event-driven backends. I take projects from concept to deployment — building interactive 3D applications, architecting multiplayer servers, and managing CI/CD pipelines on GCP.
            </p>
            <p className="text-base text-foreground/80 max-w-xl mx-auto md:mx-0">
              Driven by curiosity and a love for continuous learning, I stay ahead of emerging technologies and embrace challenges beyond my core stack. My strength lies in blending technical depth, creative problem-solving, and a DevOps mindset to deliver reliable, high-performance solutions across platforms.
            </p>
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
