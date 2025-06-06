'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb, BookOpen, Link as LinkIcon } from "lucide-react";
import Image from 'next/image';

type Resource = {
  id: string;
  name: string;
  type: 'documentation' | 'video' | 'article';
  url: string;
};

type Module = {
  id: string;
  name: string;
  description: string;
  resources: Resource[];
  image?: string;
};

type LearningPath = {
  id: string;
  name: string;
  description: string;
  modules: Module[];
};

type RoleLearningPaths = {
  [role: string]: LearningPath[];
};

const learningPathsData: RoleLearningPaths = {
  "frontend": [
    {
      id: "fe-path-1",
      name: "Frontend Fundamentals",
      description: "Master the basics of frontend development.",
      modules: [
        {
          id: "fe-module-1",
          name: "HTML & CSS",
          description: "Learn the building blocks of web pages.",
          image: "https://placehold.co/600x400.png",
          resources: [
            { id: "res-1", name: "MDN HTML Guide", type: "documentation", url: "#" },
            { id: "res-2", name: "CSS Tricks", type: "article", url: "#" },
          ],
        },
        {
          id: "fe-module-2",
          name: "JavaScript Basics",
          description: "Understand core JavaScript concepts.",
          image: "https://placehold.co/600x400.png",
          resources: [
            { id: "res-3", name: "Eloquent JavaScript", type: "documentation", url: "#" },
            { id: "res-4", name: "JS for Cats", type: "article", url: "#" },
          ],
        },
      ],
    },
  ],
  "backend": [
    {
      id: "be-path-1",
      name: "Backend Foundations",
      description: "Build robust server-side applications.",
      modules: [
        {
          id: "be-module-1",
          name: "Node.js & Express",
          description: "Learn server-side JavaScript.",
          image: "https://placehold.co/600x400.png",
          resources: [
            { id: "res-5", name: "Node.js Docs", type: "documentation", url: "#" },
          ],
        },
      ],
    },
  ],
};

export default function LearningPathsPage() {
  const [selectedRole, setSelectedRole] = useState<string>("frontend");
  const paths = learningPathsData[selectedRole] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground font-headline">Learning Paths</h1>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-full sm:w-[200px] bg-card shadow">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontend">Frontend Engineer</SelectItem>
            <SelectItem value="backend">Backend Engineer</SelectItem>
            <SelectItem value="qa">QA Engineer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paths.length > 0 ? paths.map((path) => (
        <Card key={path.id} className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Lightbulb className="h-6 w-6 text-primary" />
              {path.name}
            </CardTitle>
            <CardDescription>{path.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {path.modules.map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger className="text-lg font-medium hover:no-underline">
                    {module.name}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <p className="text-muted-foreground">{module.description}</p>
                    {module.image && (
                       <Image 
                         src={module.image} 
                         alt={module.name} 
                         width={300} 
                         height={200} 
                         className="rounded-md object-cover aspect-video"
                         data-ai-hint="technology code" 
                       />
                    )}
                    <h4 className="font-semibold text-md flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Resources:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {module.resources.map((resource) => (
                        <li key={resource.id}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <LinkIcon className="h-4 w-4" />
                            {resource.name} ({resource.type})
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )) : (
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No learning paths available for the selected role.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
