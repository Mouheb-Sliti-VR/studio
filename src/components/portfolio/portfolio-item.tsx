
import Image from 'next/image';
import type { PortfolioProject } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadCnCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface PortfolioItemProps {
  project: PortfolioProject;
}

export function PortfolioItem({ project }: PortfolioItemProps) {
  return (
    <Dialog>
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
        <DialogTrigger asChild>
          <CardHeader className="p-0 cursor-pointer" aria-label={`View details for ${project.title}`}>
            <div className="aspect-video relative w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                data-ai-hint={project.dataAiHint || 'technology project'}
              />
            </div>
          </CardHeader>
        </DialogTrigger>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
          <ShadCnCardDescription className="text-sm text-muted-foreground mb-3 overflow-hidden text-ellipsis">
            {project.description}
          </ShadCnCardDescription>
          {/* Tags removed from here */}
        </CardContent>
        {/* CardFooter removed as per request */}
      </Card>

      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-y-auto">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-background z-10 border-b border-border">
          <DialogTitle className="text-2xl md:text-3xl">{project.title}</DialogTitle>
          {(project.client || project.date) && (
            <DialogDescription className="mt-1">
              {project.client && <p className="text-sm text-muted-foreground">Client: {project.client}</p>}
              {project.date && <p className="text-sm text-muted-foreground">Date: {project.date}</p>}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-6 p-6"> {/* Removed flex-grow and overflow-y-auto here */}
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted border border-border shadow-inner">
            <video
              controls
              className="w-full h-full object-contain"
              poster={project.imageUrl} // Use main project image as poster for video
              data-ai-hint="project demo video"
              key={project.videoUrl || project.id} // Re-render if src changes
            >
              <source src={project.videoUrl || `https://placehold.co/1280x720.mp4?text=${encodeURIComponent(project.title)}+Demo`} type="video/mp4" />
              Your browser does not support the video tag. A demo video would appear here.
            </video>
          </div>
          
          <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
             <h3 className="text-xl font-semibold mb-2 text-foreground">About this project</h3>
            <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground/90">
              {project.longDescription || project.description}
            </p>
          </div>

          {project.projectUrl && project.projectUrl !== '#' && (
            <div className="mt-2">
              <Button asChild variant="outline" size="sm">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project / Source
                </a>
              </Button>
            </div>
          )}
          
          {project.tags.length > 0 && (
            <div>
              <h4 className="text-md font-semibold mb-2 text-foreground">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
