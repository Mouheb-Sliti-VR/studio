import Image from 'next/image';
import type { PortfolioProject } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription as ShadCnCardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface PortfolioItemProps {
  project: PortfolioProject;
}

export function PortfolioItem({ project }: PortfolioItemProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
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
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
        <ShadCnCardDescription className="text-sm text-muted-foreground mb-3 h-20 overflow-hidden text-ellipsis">
          {project.description}
        </ShadCnCardDescription>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 3 && <Badge variant="outline" className="text-xs">+{project.tags.length - 3} more</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              <Info className="mr-2 h-4 w-4" />
              Details
            </Button>
          </DialogTrigger>
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Button>
            </a>
          )}
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {project.client && <p className="text-sm text-muted-foreground">Client: {project.client}</p>}
                {project.date && <p className="text-sm text-muted-foreground">Date: {project.date}</p>}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="aspect-video relative w-full rounded-md overflow-hidden mb-4">
                 <Image
                    src={project.imageUrl}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={project.dataAiHint || 'technology project'}
                  />
              </div>
              <p className="text-base leading-relaxed">{project.longDescription || project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
