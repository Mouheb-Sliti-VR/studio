
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  videoUrl?: string; // Added for demo video
  tags: string[];
  projectUrl?: string;
  client?: string;
  date?: string;
  dataAiHint?: string; // For placeholder image search keywords
}
