
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, DownloadCloud } from "lucide-react";
import Link from "next/link";

interface ContactLink {
  href: string;
  text: string;
  icon: React.ElementType;
  ariaLabel: string;
  download?: boolean; 
}

const contactLinks: ContactLink[] = [
  {
    href: "mailto:mouheb.sliti@example.com", 
    text: "Email Me",
    icon: Mail,
    ariaLabel: "Send an email to Mouheb Sliti",
  },
  {
    href: "https://www.linkedin.com/in/mouhebsliti/", 
    text: "LinkedIn",
    icon: Linkedin,
    ariaLabel: "View Mouheb Sliti's LinkedIn profile",
  },
  {
    href: "/MouhebSliti_Resume.pdf", 
    text: "Download CV",
    icon: DownloadCloud,
    ariaLabel: "Download Mouheb Sliti's CV",
    download: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto shadow-xl rounded-xl border border-border/70 overflow-hidden">
          <CardHeader className="text-center bg-card p-6">
            <CardTitle className="text-3xl font-bold text-primary font-poppins">
              Let's Connect
            </CardTitle>
            <CardDescription className="text-md text-foreground/80 mt-2 max-w-md mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities. 
              Feel free to reach out or download my CV.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 bg-card">
            <div className="flex flex-wrap justify-center gap-4"> {/* Changed to flex for horizontal layout */}
              {contactLinks.map((link) => (
                <Button
                  key={link.text}
                  asChild
                  variant="outline"
                  size="lg" // size="lg" provides good padding
                  className="py-3 text-base justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out group shadow-sm hover:shadow-md" // Removed w-full, adjusted py and text size
                >
                  <Link href={link.href} target={link.download ? "_blank" : "_blank"} rel="noopener noreferrer" aria-label={link.ariaLabel} download={link.download ? 'MouhebSliti_Resume.pdf' : undefined}>
                    <link.icon className="mr-2 h-5 w-5 text-primary group-hover:text-accent-foreground transition-colors duration-300" /> {/* Adjusted icon size slightly */}
                    {link.text}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
