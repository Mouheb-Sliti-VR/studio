"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface PortfolioFiltersProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export function PortfolioFilters({ allTags, selectedTags, onTagToggle }: PortfolioFiltersProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedTags = showAll ? allTags : allTags.slice(0, 10);

  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Tag className="mr-2 h-5 w-5 text-primary" />
        Filter by Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {displayedTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            onClick={() => onTagToggle(tag)}
            className="cursor-pointer text-sm px-3 py-1 transition-all hover:bg-accent hover:text-accent-foreground"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      {allTags.length > 10 && (
        <Button variant="link" onClick={() => setShowAll(!showAll)} className="mt-2 px-0 text-primary">
          {showAll ? 'Show Less' : `Show All (${allTags.length}) Tags`}
        </Button>
      )}
    </div>
  );
}
