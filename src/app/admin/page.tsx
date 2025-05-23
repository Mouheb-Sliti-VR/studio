import { ProjectForm } from '@/components/admin/project-form';
import { ListChecks } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold flex items-center">
          <ListChecks className="mr-3 h-10 w-10 text-primary" />
          Manage Portfolio Projects
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Add new projects to showcase your work. Use AI to help you with tagging!
        </p>
      </header>
      
      <ProjectForm />
      
      {/* 
        Future enhancements could include a list of existing projects for editing/deleting.
        For now, this page focuses on adding new projects.
      */}
    </div>
  );
}
