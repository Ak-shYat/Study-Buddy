"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2, StickyNote } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  selectedText?: string;
  timestamp: Date;
  category?: string;
}

interface NotesSidebarProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  selectedText: string;
}

export function NotesSidebar({ notes, setNotes, selectedText }: NotesSidebarProps) {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [showNewNote, setShowNewNote] = useState(false);

  const createNote = () => {
    if (!newNoteTitle.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      selectedText: selectedText || undefined,
      timestamp: new Date(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setShowNewNote(false);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (editingNote === noteId) {
      setEditingNote(null);
    }
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map(note =>
      note.id === noteId ? { ...note, ...updates } : note
    ));
  };

  const createNoteFromSelection = () => {
    if (!selectedText) return;

    setNewNoteTitle(`Note: ${selectedText.slice(0, 30)}...`);
    setNewNoteContent(`Selected text: "${selectedText}"\n\nNotes:\n`);
    setShowNewNote(true);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Notes</h3>
          <Button
            onClick={() => setShowNewNote(true)}
            size="sm"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {selectedText && (
          <Button
            onClick={createNoteFromSelection}
            size="sm"
            className="w-full mb-2"
            variant="secondary"
          >
            <StickyNote className="h-4 w-4 mr-2" />
            Note Selection
          </Button>
        )}
      </div>

      {showNewNote && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <Input
            placeholder="Note title..."
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="mb-2"
          />
          <Textarea
            placeholder="Write your note..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            className="mb-2 min-h-[100px]"
          />
          <div className="flex space-x-2">
            <Button onClick={createNote} size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={() => {
                setShowNewNote(false);
                setNewNoteTitle("");
                setNewNoteContent("");
              }}
              size="sm"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No notes yet. Select text and create your first note!
          </div>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="p-3">
              {editingNote === note.id ? (
                <div className="space-y-2">
                  <Input
                    value={note.title}
                    onChange={(e) => updateNote(note.id, { title: e.target.value })}
                    className="text-sm"
                  />
                  <Textarea
                    value={note.content}
                    onChange={(e) => updateNote(note.id, { content: e.target.value })}
                    className="text-sm min-h-[80px]"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setEditingNote(null)}
                      size="sm"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      className="font-medium text-sm text-gray-900 cursor-pointer hover:text-blue-600"
                      onClick={() => setEditingNote(note.id)}
                    >
                      {note.title}
                    </h4>
                    <Button
                      onClick={() => deleteNote(note.id)}
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <Trash2 className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>

                  {note.selectedText && (
                    <div className="mb-2 p-2 bg-blue-50 rounded text-xs text-blue-800 border-l-2 border-blue-300">
                      "{note.selectedText}"
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                    {note.content}
                  </p>

                  <div className="text-xs text-gray-400">
                    {note.timestamp.toLocaleDateString()} {note.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
