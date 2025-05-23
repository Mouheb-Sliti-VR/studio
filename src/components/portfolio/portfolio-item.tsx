
import Image from 'next/image';
import type { PortfolioProject } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadCnCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, DownloadCloud } from 'lucide-react';
import {
  Dialog,
  DialogContent,
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
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg group">
        <DialogTrigger asChild>
          <CardHeader className="p-0 cursor-pointer" aria-label={`View details for ${project.title}`}>
            <div className="aspect-video relative w-full overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
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
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-background z-10 border-b border-border rounded-t-lg">
          <DialogTitle className="text-2xl md:text-3xl font-poppins">{project.title}</DialogTitle>
          {(project.client || project.date) && (
            <div className="mt-1 text-xs text-muted-foreground">
              {project.client && <span>Client: {project.client}</span>}
              {project.client && project.date && <span className="mx-2">|</span>}
              {project.date && <span>Date: {project.date}</span>}
            </div>
          )}
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted border border-border shadow-inner">
            <video
              controls
              className="w-full h-full object-contain"
              poster={project.imageUrl}
              data-ai-hint="project demo video"
              key={project.videoUrl || project.id} 
            >
              <source src={project.videoUrl || `https://placehold.co/1280x720.mp4?text=${encodeURIComponent(project.title)}+Demo`} type="video/mp4" />
              Your browser does not support the video tag. A demo video would appear here.
            </video>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-primary font-poppins">About this project</h3>
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
              <p>{project.longDescription || project.description}</p>
            </div>
          </div>

          {project.projectUrl && project.projectUrl !== '#' && (
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-all">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project / Source
                </a>
              </Button>
            </div>
          )}
          
          {project.tags.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-primary font-poppins">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
