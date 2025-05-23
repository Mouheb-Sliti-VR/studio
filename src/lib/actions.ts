"use server";

import { z } from 'zod';
import { suggestTags as suggestTagsFlow, type SuggestTagsInput } from '@/ai/flows/suggest-tags';
import type { PortfolioProject } from './types';

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


// Project Form
const ProjectFormSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal('')),
  tags: z.string().optional(), // Comma-separated tags
});


export async function handleSuggestTags(description: string): Promise<string[]> {
  if (!description || description.trim().length < 10) {
    return [];
  }
  try {
    const input: SuggestTagsInput = { description };
    const result = await suggestTagsFlow(input);
    return result.tags || [];
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return [];
  }
}

// This is a placeholder for saving a project. In a real app, this would interact with a database.
export async function saveProject(projectData: Omit<PortfolioProject, 'id' | 'dataAiHint'>): Promise<{ success: boolean; message: string; project?: PortfolioProject }> {
  console.log("Saving project:", projectData);
  // Simulate saving
  const newProject: PortfolioProject = {
    ...projectData,
    id: Math.random().toString(36).substring(7),
    imageUrl: projectData.imageUrl || 'https://placehold.co/600x400.png',
    dataAiHint: 'custom project'
  };
  // In a real app, you'd add this to your data store.
  // For mockProjects, this won't persist across requests or server restarts.
  // mockProjects.unshift(newProject); 
  return { success: true, message: "Project saved successfully (simulated).", project: newProject };
}
