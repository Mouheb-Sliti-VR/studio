
"use server";

import { z } from 'zod';
// import { suggestTags as suggestTagsFlow, type SuggestTagsInput } from '@/ai/flows/suggest-tags'; // Removed as it's no longer used
import type { PortfolioProject } from './types';
import { mockProjects } from './data';

// Contact Form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ContactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  // In a real app, you would send an email or save to a database here.
  console.log("Contact form submitted:", parsed.data);

  return {
    message: "Thank you for your message! We'll get back to you soon.",
    success: true,
  };
}

// ProjectFormActionSchema removed as saveProject and related form are removed.
// handleSuggestTags function removed.
// saveProject function removed.
