"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Brain, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import { WordCloudVisualization } from "./WordCloudVisualization";

interface JargonTooltipProps {
  text: string;
  position: { x: number; y: number };
  category: string;
  onClose: () => void;
}

interface Explanation {
  definition: string;
  context: string;
  examples: string[];
  relatedTerms: string[];
  difficulty: "basic" | "intermediate" | "advanced";
}

export function JargonTooltip({ text, position, category, onClose }: JargonTooltipProps) {
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const generateExplanation = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, category }),
      });

      if (!response.ok) {
        throw new Error('Failed to get explanation');
      }

      const data = await response.json();
      setExplanation(data);
    } catch (error) {
      console.error('Error getting explanation:', error);
      // Fallback to mock explanation
      const mockExplanation: Explanation = {
        definition: getMockDefinition(text, category),
        context: getMockContext(text, category),
        examples: getMockExamples(text, category),
        relatedTerms: getMockRelatedTerms(text, category),
        difficulty: getMockDifficulty(text),
      };
      setExplanation(mockExplanation);
    }

    setLoading(false);
  }, [text, category]);

  useEffect(() => {
    generateExplanation();
  }, [generateExplanation]);

  const getMockDefinition = (term: string, cat: string): string => {
    const definitions: Record<string, string> = {
      "artificial intelligence": "The simulation of human intelligence processes by machines, especially computer systems, including learning, reasoning, and self-correction.",
      "machine learning": "A subset of AI that enables computers to learn and improve from experience without being explicitly programmed for each specific task.",
      "neural networks": "Computing systems vaguely inspired by biological neural networks, consisting of interconnected artificial neurons that process information.",
      "deep learning": "A subset of machine learning using neural networks with multiple layers to model complex patterns in data.",
      "gradient descent": "An optimization algorithm that finds local minima by iteratively moving in the direction of steepest descent.",
      "overfitting": "When a model learns training data too specifically, including noise, reducing its ability to generalize to new data.",
      "regularization": "Techniques used to prevent overfitting by adding constraints or penalties to the model complexity.",
      "epidemiology": "The study of the distribution and determinants of health-related states in specified populations, forming the foundation of public health.",
      "herd immunity": "The indirect protection from infectious disease when a significant portion of a population becomes immune, protecting vulnerable individuals.",
      "biostatistics": "The application of statistical methods to biological and health data, essential for medical research and public health decisions.",
      "incidence": "The frequency with which new cases of a disease occur in a population during a specified time period.",
      "prevalence": "The total number of cases of a disease present in a population at a given time, regardless of when they occurred.",
      "cohort study": "A longitudinal observational study following groups of people over time to identify factors associated with disease development.",
      "jurisprudence": "The theory, philosophy, and science of law, examining the principles underlying legal systems and judicial decisions.",
      "tort": "A civil wrong that causes harm to another person, resulting in legal liability for compensation rather than criminal punishment.",
      "due process": "The constitutional guarantee of fair treatment through the judicial system, ensuring legal rights are respected.",
      "habeas corpus": "A fundamental legal principle requiring that detained persons be brought before a court to determine the lawfulness of their detention.",
      "stare decisis": "The legal doctrine requiring courts to follow precedents established in previous similar cases, ensuring consistency in judicial decisions.",
      "negligence": "A tort involving the failure to exercise reasonable care, resulting in harm to another person or their property.",
      "precedent": "A legal decision that establishes a principle or rule used by courts when deciding subsequent cases with similar issues.",
      "algorithm": "A set of rules or instructions given to a computer to help it solve problems or complete tasks.",
    };

    return definitions[term.toLowerCase()] || `A specialized term in ${cat} referring to ${term.toLowerCase()}.`;
  };

  const getMockContext = (term: string, cat: string): string => {
    const contexts: Record<string, string> = {
      "ml": "In machine learning contexts, this term is fundamental to understanding how systems learn from data.",
      "law": "In legal terminology, this concept is essential for understanding rights and procedures.",
      "epidemiology": "In public health, this term helps explain disease patterns and prevention strategies.",
      "movies": "In entertainment industry, this refers to production and creative processes.",
    };

    return contexts[cat] || `This term is commonly used in ${cat} to describe important concepts.`;
  };

  const getMockExamples = (term: string, cat: string): string[] => {
    return [
      `Example 1: ${term} is used when...`,
      `Example 2: In ${cat}, ${term} applies to...`,
      `Example 3: A practical case of ${term} would be...`,
    ];
  };

  const getMockRelatedTerms = (term: string, cat: string): string[] => {
    const related: Record<string, string[]> = {
      "artificial intelligence": ["machine learning", "deep learning", "neural networks", "automation"],
      "machine learning": ["artificial intelligence", "algorithms", "data science", "predictive modeling"],
      "epidemiology": ["biostatistics", "public health", "disease surveillance", "population health"],
      "jurisprudence": ["legal theory", "constitutional law", "legal philosophy", "case law"],
    };

    return related[term.toLowerCase()] || ["related term 1", "related term 2", "related term 3"];
  };

  const getMockDifficulty = (term: string): "basic" | "intermediate" | "advanced" => {
    const basicTerms = ["algorithm", "data", "law", "health"];
    const advancedTerms = ["jurisprudence", "biostatistics", "neural networks"];

    if (basicTerms.some(t => term.toLowerCase().includes(t))) return "basic";
    if (advancedTerms.some(t => term.toLowerCase().includes(t))) return "advanced";
    return "intermediate";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "basic": return "text-green-600 bg-green-100";
      case "intermediate": return "text-yellow-600 bg-yellow-100";
      case "advanced": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div
        className="fixed z-50 bg-white rounded-lg shadow-lg border p-4 max-w-sm"
        style={{
          left: Math.min(position.x - 100, window.innerWidth - 250),
          top: Math.max(position.y - 80, 10),
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Analyzing "{text}"...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl border max-w-lg"
      style={{
        left: Math.min(position.x - 200, window.innerWidth - 500),
        top: Math.max(position.y - 100, 10),
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{text}</h3>
            {explanation && (
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(explanation.difficulty)}`}>
                {explanation.difficulty}
              </span>
            )}
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {explanation && (
          <>
            <p className="text-sm text-gray-700 mb-3">
              {explanation.definition}
            </p>

            <p className="text-xs text-gray-600 mb-3">
              {explanation.context}
            </p>

            {!expanded ? (
              <Button
                onClick={() => setExpanded(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            ) : (
              <Tabs defaultValue="examples" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="related">Related</TabsTrigger>
                  <TabsTrigger value="cloud">Cloud</TabsTrigger>
                </TabsList>

                <TabsContent value="examples" className="mt-3">
                  <div className="space-y-2">
                    {explanation.examples.map((example, index) => (
                      <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        {example}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="related" className="mt-3">
                  <div className="space-y-1">
                    {explanation.relatedTerms.map((term, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs h-7"
                      >
                        <BookOpen className="h-3 w-3 mr-2" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cloud" className="mt-3">
                  <WordCloudVisualization
                    words={explanation.relatedTerms}
                    centerWord={text}
                  />
                </TabsContent>
              </Tabs>
            )}
          </>
        )}
      </div>
    </div>
  );
}
