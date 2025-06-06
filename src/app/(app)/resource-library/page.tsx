'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Library, Link as LinkIcon, Search } from "lucide-react";
import Image from 'next/image';

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  image?: string;
};

const resourcesData: Resource[] = [
  {
    id: "res-doc-1",
    title: "Company Onboarding Handbook",
    description: "Essential information for all new interns.",
    url: "#",
    tags: ["onboarding", "general", "hr"],
    category: "General",
    image: "https://placehold.co/300x200.png",
  },
  {
    id: "res-tech-1",
    title: "Frontend Development Guidelines",
    description: "Best practices for frontend coding standards.",
    url: "#",
    tags: ["frontend", "coding", "react"],
    category: "Technology",
    image: "https://placehold.co/300x200.png",
  },
  {
    id: "res-tool-1",
    title: "Git & GitHub Cheatsheet",
    description: "Quick reference for common Git commands.",
    url: "#",
    tags: ["git", "tools", "version control"],
    category: "Tools",
    image: "https://placehold.co/300x200.png",
  },
  {
    id: "res-proj-1",
    title: "Project Phoenix Documentation",
    description: "Detailed documentation for Project Phoenix.",
    url: "#",
    tags: ["project phoenix", "backend", "api"],
    category: "Projects",
    image: "https://placehold.co/300x200.png",
  }
];

export default function ResourceLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = useMemo(() => {
    if (!searchTerm) return resourcesData;
    return resourcesData.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground font-headline flex items-center gap-2">
        <Library className="h-8 w-8 text-primary" />
        Resource Library
      </h1>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 bg-card shadow"
        />
      </div>

      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="shadow-lg flex flex-col hover:shadow-xl transition-shadow duration-200">
              {resource.image && (
                <div className="relative w-full h-48">
                   <Image 
                     src={resource.image} 
                     alt={resource.title} 
                     layout="fill" 
                     objectFit="cover" 
                     className="rounded-t-lg"
                     data-ai-hint="documentation book" 
                   />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{resource.title}</CardTitle>
                <Badge variant="outline" className="w-fit">{resource.category}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                <div className="space-x-1 space-y-1">
                  {resource.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardContent className="pt-0">
                 <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Access Resource
                  </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No resources found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
