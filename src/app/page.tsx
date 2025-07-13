"use client";

import { useState } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadDate: Date;
}

interface Note {
  id: string;
  title: string;
  content: string;
  selectedText?: string;
  timestamp: Date;
  category?: string;
}
import { Header } from "@/components/Header";
import { DocumentSidebar } from "@/components/DocumentSidebar";
import { DocumentViewer } from "@/components/DocumentViewer";
import { NotesSidebar } from "@/components/NotesSidebar";
import { JargonTooltip } from "@/components/JargonTooltip";
import { sampleDocuments } from "@/lib/sampleDocuments";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSelectSampleDocument = () => {
    setSelectedDocument(sampleDocuments[0]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-1 overflow-hidden">
        <DocumentSidebar
          documents={documents}
          selectedDocument={selectedDocument}
          setSelectedDocument={setSelectedDocument}
          setDocuments={setDocuments}
        />

        <DocumentViewer
          selectedDocument={selectedDocument}
          selectedCategory={selectedCategory}
          setSelectedText={setSelectedText}
          setTooltipPosition={setTooltipPosition}
          setShowTooltip={setShowTooltip}
          onSelectSampleDocument={handleSelectSampleDocument}
        />

        <NotesSidebar
          notes={notes}
          setNotes={setNotes}
          selectedText={selectedText}
        />
      </div>

      {showTooltip && (
        <JargonTooltip
          text={selectedText}
          position={tooltipPosition}
          category={selectedCategory}
          onClose={() => setShowTooltip(false)}
        />
      )}
    </div>
  );
}
