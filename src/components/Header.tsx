"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Settings, Search, BookOpen } from "lucide-react";

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { value: "general", label: "General" },
  { value: "movies", label: "Movies & Entertainment" },
  { value: "ml", label: "Machine Learning" },
  { value: "law", label: "Law & Legal" },
  { value: "sociology", label: "Sociology" },
  { value: "epidemiology", label: "Epidemiology" },
  { value: "technology", label: "Technology" },
  { value: "medicine", label: "Medicine" },
  { value: "finance", label: "Finance" },
  { value: "academia", label: "Academic Research" },
];

export function Header({ selectedCategory, setSelectedCategory }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">Study Buddy</h1>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Field:</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
