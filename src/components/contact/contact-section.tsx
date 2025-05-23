
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
  download?: boolean; // Added for CV download
}

const contactLinks: ContactLink[] = [
  {
    href: "mailto:mouheb.sliti@example.com", // Replace with your actual email
    text: "Email Me",
    icon: Mail,
    ariaLabel: "Send an email to Mouheb Sliti",
  },
  {
    href: "https://www.linkedin.com/in/mouhebsliti/", // Replace with your actual LinkedIn
    text: "LinkedIn",
    icon: Linkedin,
    ariaLabel: "View Mouheb Sliti's LinkedIn profile",
  },
  {
    href: "/MouhebSliti_Resume.pdf", // You'll need to add MouhebSliti_Resume.pdf to your /public folder
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
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <Button
                  key={link.text}
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full py-6 text-lg justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out group shadow-sm hover:shadow-md"
                >
                  <Link href={link.href} target={link.download ? "_blank" : "_blank"} rel="noopener noreferrer" aria-label={link.ariaLabel} download={link.download ? 'MouhebSliti_Resume.pdf' : undefined}>
                    <link.icon className="mr-3 h-6 w-6 text-primary group-hover:text-accent-foreground transition-colors duration-300" />
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
