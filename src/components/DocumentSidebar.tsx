"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Trash2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadDate: Date;
}

interface DocumentSidebarProps {
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (doc: Document | null) => void;
  setDocuments: (docs: Document[]) => void;
}

export function DocumentSidebar({
  documents,
  selectedDocument,
  setSelectedDocument,
  setDocuments
}: DocumentSidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        content,
        uploadDate: new Date(),
      };
      setDocuments([...documents, newDoc]);
    };

    if (file.type === "text/plain" || file.type === "application/json") {
      reader.readAsText(file);
    } else {
      // For other file types, we'll store the file name and handle differently
      const newDoc: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        content: "PDF or other binary file - content to be processed",
        uploadDate: new Date(),
      };
      setDocuments([...documents, newDoc]);
    }
  };

  const deleteDocument = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedDocs = documents.filter(doc => doc.id !== docId);
    setDocuments(updatedDocs);
    if (selectedDocument?.id === docId) {
      setSelectedDocument(null);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
          size="sm"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".txt,.pdf,.doc,.docx,.md"
          className="hidden"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Documents</h3>
        {documents.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No documents uploaded yet
          </div>
        ) : (
          documents.map((doc) => (
            <Card
              key={doc.id}
              className={`p-3 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedDocument?.id === doc.id ? "bg-blue-50 border-blue-200" : ""
              }`}
              onClick={() => setSelectedDocument(doc)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.uploadDate.toLocaleDateString('en-US',{
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => deleteDocument(doc.id, e)}
                  className="h-6 w-6 p-0 hover:bg-red-100"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
