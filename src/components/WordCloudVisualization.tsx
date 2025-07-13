"use client";

import { useEffect, useRef } from 'react';

interface WordCloudVisualizationProps {
  words: string[];
  centerWord: string;
}

export function WordCloudVisualization({ words, centerWord }: WordCloudVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    svg.innerHTML = ''; // Clear previous content

    const width = 300;
    const height = 150;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create a simple radial layout
    const allWords = [centerWord, ...words.slice(0, 6)]; // Limit to 7 words total

    allWords.forEach((word, index) => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      if (index === 0) {
        // Center word
        text.setAttribute('x', centerX.toString());
        text.setAttribute('y', centerY.toString());
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', '18');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#3b82f6');
      } else {
        // Surrounding words
        const angle = ((index - 1) * 2 * Math.PI) / (allWords.length - 1);
        const radius = 60 + Math.random() * 20; // Add some randomness
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        text.setAttribute('x', x.toString());
        text.setAttribute('y', y.toString());
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', (12 + Math.random() * 4).toString());
        text.setAttribute('fill', '#6b7280');
        text.setAttribute('opacity', '0.8');
      }

      text.textContent = word;
      svg.appendChild(text);
    });
  }, [words, centerWord]);

  return (
    <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-lg">
      <svg
        ref={svgRef}
        width="300"
        height="150"
        className="overflow-visible"
      />
    </div>
  );
}
