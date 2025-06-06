'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
};

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I set up my development environment?",
    answer: "Please refer to the 'Development Environment Setup Guide' in the Resource Library. It contains step-by-step instructions for Windows, macOS, and Linux.",
    category: "Technical Setup",
    keywords: ["environment", "setup", "dev", "install"],
  },
  {
    id: "faq-2",
    question: "Who is my mentor?",
    answer: "Your mentor details should have been shared with you via email by HR. If not, please reach out to your direct manager or the HR department.",
    category: "General",
    keywords: ["mentor", "guidance", "help"],
  },
  {
    id: "faq-3",
    question: "What are the coding standards?",
    answer: "Our coding standards are documented in the 'Coding Best Practices Guide' available in the Resource Library. Key aspects include formatting, naming conventions, and commenting.",
    category: "Development",
    keywords: ["coding", "standards", "styleguide", "linting"],
  },
  {
    id: "faq-4",
    question: "How do I submit code for review?",
    answer: "Code should be submitted via Pull Requests on GitHub. Ensure your PR description is clear and links to the relevant task/issue. Tag your mentor and at least one other team member for review.",
    category: "Development",
    keywords: ["code review", "pull request", "github", "submit"],
  },
];

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqData;
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground font-headline flex items-center gap-2">
        <HelpCircle className="h-8 w-8 text-primary" />
        Frequently Asked Questions
      </h1>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 bg-card shadow"
        />
      </div>

      {filteredFaqs.length > 0 ? (
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem value={faq.id} key={faq.id}>
                  <AccordionTrigger className="text-left hover:no-underline text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-muted-foreground">
                    {faq.answer}
                    <p className="text-xs mt-2 text-muted-foreground/70">Category: {faq.category}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ) : (
         <Card className="shadow-lg">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">No FAQs found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
