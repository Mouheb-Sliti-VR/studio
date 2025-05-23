"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleSuggestTags, saveProject } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, PlusCircle, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { PortfolioProject } from "@/lib/types";

const ProjectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  longDescription: z.string().optional(),
  imageUrl: z.string().url("Invalid URL format.").or(z.literal('')).optional(),
  projectUrl: z.string().url("Invalid URL format.").or(z.literal('')).optional(),
  client: z.string().optional(),
  date: z.string().optional(), // Consider using a date picker for better UX
});

type ProjectFormData = z.infer<typeof ProjectFormSchema>;

interface ProjectFormProps {
  project?: PortfolioProject; // For editing existing projects
  onSave?: (project: PortfolioProject) => void;
}

export function ProjectForm({ project, onSave }: ProjectFormProps) {
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [currentTag, setCurrentTag] = useState("");
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      longDescription: project?.longDescription || "",
      imageUrl: project?.imageUrl || "",
      projectUrl: project?.projectUrl || "",
      client: project?.client || "",
      date: project?.date || "",
    },
  });

  const projectDescription = watch("description");

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSuggestTags = async () => {
    if (!projectDescription || projectDescription.trim().length < 10) {
      toast({
        title: "Description too short",
        description: "Please provide a more detailed description to suggest tags.",
        variant: "destructive",
      });
      return;
    }
    setIsSuggesting(true);
    try {
      const suggested = await handleSuggestTags(projectDescription);
      if (suggested.length > 0) {
        const newTags = Array.from(new Set([...tags, ...suggested]));
        setTags(newTags);
        toast({
          title: "Tags Suggested!",
          description: `${suggested.join(', ')} added to your tags list.`,
        });
      } else {
        toast({
          title: "No new tags suggested",
          description: "Could not find additional relevant tags.",
        });
      }
    } catch (error) {
      toast({
        title: "Error suggesting tags",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const onSubmit = async (data: ProjectFormData) => {
    setIsSaving(true);
    const projectDataToSave = {
      ...data,
      tags,
    };
    
    const result = await saveProject(projectDataToSave);
    toast({
      title: result.success ? "Project Saved!" : "Error Saving Project",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    if (result.success && result.project) {
      if (onSave) {
        onSave(result.project);
      }
      reset(); // Reset form fields
      setTags([]); // Reset tags
    }
    setIsSaving(false);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">{project ? "Edit Project" : "Add New Project"}</CardTitle>
        <CardDescription>
          {project ? "Update the details of your project." : "Fill in the details to add a new project to your portfolio."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input id="title" {...field} placeholder="Project Title" />}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Short Description (for card view)</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea id="description" {...field} placeholder="A brief summary of the project" />}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="longDescription">Full Description (for details view)</Label>
            <Controller
              name="longDescription"
              control={control}
              render={({ field }) => <Textarea id="longDescription" {...field} placeholder="Detailed explanation of the project" className="min-h-[150px]" />}
            />
            {errors.longDescription && <p className="text-sm text-destructive mt-1">{errors.longDescription.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex items-center gap-2">
              <Input 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag();}}}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}><PlusCircle className="h-4 w-4 mr-2" /> Add Tag</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={onSuggestTags} disabled={isSuggesting || !projectDescription}>
              {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Suggest Tags with AI
            </Button>
          </div>

          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => <Input id="imageUrl" {...field} placeholder="https://example.com/image.png" />}
            />
            {errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}
          </div>

          <div>
            <Label htmlFor="projectUrl">Project URL (Live Demo/Repo)</Label>
            <Controller
              name="projectUrl"
              control={control}
              render={({ field }) => <Input id="projectUrl" {...field} placeholder="https://example.com/project-demo" />}
            />
            {errors.projectUrl && <p className="text-sm text-destructive mt-1">{errors.projectUrl.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client (Optional)</Label>
              <Controller
                name="client"
                control={control}
                render={({ field }) => <Input id="client" {...field} placeholder="Client Name" />}
              />
            </div>
            <div>
              <Label htmlFor="date">Project Date (Optional)</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <Input id="date" type="date" {...field} />}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (project ? "Update Project" : "Add Project")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
