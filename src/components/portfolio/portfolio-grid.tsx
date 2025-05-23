"use client";

import { useState } from 'react';
import type { PortfolioProject } from '@/lib/types';
import { PortfolioItem } from './portfolio-item';
import { mockProjects } from '@/lib/data';

export function PortfolioGrid() {
  const [projects] = useState<PortfolioProject[]>(mockProjects);

  return (
    <section id="portfolio">
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8"> {/* Added pt-8 for spacing after removing filters */}
          {projects.map((project) => (
            <PortfolioItem key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No projects available yet. Check back soon!</p>
        </div>
      )}
    </section>
  );
}
