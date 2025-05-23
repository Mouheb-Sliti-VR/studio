"use client";

import { useState, useMemo } from 'react';
import type { PortfolioProject } from '@/lib/types';
import { PortfolioItem } from './portfolio-item';
import { PortfolioFilters } from './portfolio-filters';
import { mockProjects, getAllTags } from '@/lib/data'; // Using mock data for now

export function PortfolioGrid() {
  const [projects] = useState<PortfolioProject[]>(mockProjects);
  const [allTags] = useState<string[]>(getAllTags());
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) {
      return projects;
    }
    return projects.filter((project) =>
      selectedTags.every((tag) => project.tags.includes(tag))
    );
  }, [projects, selectedTags]);

  return (
    <section id="portfolio">
      <PortfolioFilters
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <PortfolioItem key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </section>
  );
}
