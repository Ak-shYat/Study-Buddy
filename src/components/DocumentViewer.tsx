"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react";
import { WelcomeMessage } from "./WelcomeMessage";

interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadDate: Date;
}

interface DocumentViewerProps {
  selectedDocument: Document | null;
  selectedCategory: string;
  setSelectedText: (text: string) => void;
  setTooltipPosition: (position: { x: number; y: number }) => void;
  setShowTooltip: (show: boolean) => void;
  onSelectSampleDocument?: () => void;
}

export function DocumentViewer({
  selectedDocument,
  selectedCategory,
  setSelectedText,
  setTooltipPosition,
  setShowTooltip,
  onSelectSampleDocument,
}: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && selectedText.length > 0) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect) {
        setSelectedText(selectedText);
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
        setShowTooltip(true);
      }
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const word = getWordAtPosition(target, e.clientX, e.clientY);

    if (word) {
      setSelectedText(word);
      setTooltipPosition({
        x: e.clientX,
        y: e.clientY - 10,
      });
      setShowTooltip(true);
    }
  };

  const getWordAtPosition = (element: HTMLElement, x: number, y: number): string => {
    const range = document.caretRangeFromPoint(x, y);
    if (!range) return "";

    const textNode = range.startContainer;
    const offset = range.startOffset;

    if (textNode.nodeType === Node.TEXT_NODE) {
      const text = textNode.textContent || "";
      const words = text.split(/\s+/);
      let currentOffset = 0;

      for (const word of words) {
        if (offset >= currentOffset && offset <= currentOffset + word.length) {
          return word.replace(/[^\w]/g, "");
        }
        currentOffset += word.length + 1;
      }
    }

    return "";
  };



  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {selectedDocument ? selectedDocument.name : "No document selected"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 min-w-[50px] text-center">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {selectedDocument ? (
          <Card className="max-w-4xl mx-auto bg-white shadow-lg">
            <div
              ref={contentRef}
              className="p-8 leading-relaxed text-gray-800"
              style={{ fontSize: `${zoom}%` }}
              onMouseUp={handleTextSelection}
              onDoubleClick={handleDoubleClick}
            >
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-wrap leading-7 text-gray-800">
                  {selectedDocument.content}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <WelcomeMessage onSelectSampleDocument={() => onSelectSampleDocument?.()} />
        )}
      </div>
    </div>
  );
}
