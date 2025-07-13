"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MousePointer2, StickyNote, Lightbulb } from "lucide-react";

interface WelcomeMessageProps {
  onSelectSampleDocument: () => void;
}

export function WelcomeMessage({ onSelectSampleDocument }: WelcomeMessageProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="max-w-2xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to AI based Study Buddy and Assistant
          </h2>
          <p className="text-gray-600 mb-6">
            Transform your reading experience with AI-powered jargon explanations and intelligent note-taking.
          </p>

          <Button
            onClick={onSelectSampleDocument}
            className="mb-8"
            size="lg"
          >
            Try Sample Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start space-x-3">
            <MousePointer2 className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Smart Text Selection</h3>
              <p className="text-sm text-gray-600">
                Double-tap any word or select text for instant AI explanations
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Category-Aware AI</h3>
              <p className="text-sm text-gray-600">
                Explanations adapt to your selected field (Law, ML, Medicine, etc.)
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <StickyNote className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Smart Notes</h3>
              <p className="text-sm text-gray-600">
                Save important text snippets with context for later reference
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">Word Clouds</h3>
              <p className="text-sm text-gray-600">
                Visualize related concepts with interactive word clouds
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            <strong>Getting Started:</strong> Upload a document or select a sample document from the sidebar to begin reading with AI assistance.
          </p>
        </div>
      </Card>
    </div>
  );
}
