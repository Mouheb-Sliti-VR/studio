
"use server";

import { z } from 'zod';
import { suggestTags as suggestTagsFlow, type SuggestTagsInput } from '@/ai/flows/suggest-tags';
import type { PortfolioProject } from './types';
import { mockProjects } from './data'; // Import mockProjects

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
// No longer parsing tags as comma-separated string from this schema,
// as tags are handled separately by the form's state.
const ProjectFormActionSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
  longDescription: z.string().optional(),
  imageUrl: z.string().url("Invalid URL format.").or(z.literal('')).optional(),
  projectUrl: z.string().url("Invalid URL format.").or(z.literal('')).optional(),
  client: z.string().optional(),
  date: z.string().optional(),
  // tags are part of PortfolioProject but come from form state, not directly from FormData here
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

// This function now accepts the full project data including tags from the form state.
export async function saveProject(projectData: Omit<PortfolioProject, 'id' | 'dataAiHint'>): Promise<{ success: boolean; message: string; project?: PortfolioProject }> {
  // Validate core fields (optional: zod schema could be used here too if desired for runtime check on projectData)
  console.log("Saving project:", projectData);

  const newProject: PortfolioProject = {
    ...projectData,
    id: Math.random().toString(36).substring(7), // Generate a simple unique ID
    imageUrl: projectData.imageUrl || 'https://placehold.co/600x400.png', // Default image if none provided
    // videoUrl will be part of projectData if provided by the form
    dataAiHint: projectData.title.toLowerCase().split(' ').slice(0,2).join(' ') || 'custom project' // Basic AI hint from title
  };

  // Add the new project to the beginning of the mockProjects array
  mockProjects.unshift(newProject); 
  
  // In a real app with a database, you would also revalidate the path to the homepage
  // to ensure the new data is fetched, e.g., revalidatePath('/');

  return { success: true, message: "Project saved successfully (simulated, in-memory).", project: newProject };
}
