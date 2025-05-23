
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

interface ContactLink {
  href: string;
  text: string;
  icon: React.ElementType;
  ariaLabel: string;
}

// You can update these details with your actual contact information
const contactLinks: ContactLink[] = [
  {
    href: "mailto:mouheb.sliti@example.com",
    text: "Email Me",
    icon: Mail,
    ariaLabel: "Send an email to Mouheb Sliti",
  },
  {
    href: "https://www.linkedin.com/in/mouhebsliti/", // Replace with your actual LinkedIn profile
    text: "LinkedIn",
    icon: Linkedin,
    ariaLabel: "View Mouheb Sliti's LinkedIn profile",
  },
  {
    href: "https://github.com/mouhebsliti", // Replace with your actual GitHub profile
    text: "GitHub",
    icon: Github,
    ariaLabel: "View Mouheb Sliti's GitHub profile",
  },
  {
    href: "tel:+1234567890", // Replace with your actual phone number
    text: "Call Me",
    icon: Phone,
    ariaLabel: "Call Mouheb Sliti",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-12">
      <Card className="max-w-2xl mx-auto shadow-xl rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Connect With Me</CardTitle>
          <CardDescription className="text-lg text-foreground/80 mt-2">
            Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 pb-6 px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {contactLinks.map((link) => (
              <Button
                key={link.text}
                asChild
                variant="outline"
                className="w-full py-6 text-base justify-start hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out group"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
                  <link.icon className="mr-3 h-6 w-6 text-primary group-hover:text-accent-foreground transition-colors duration-300" />
                  {link.text}
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
