
import { Button } from "@/components/ui/button";
import { Edit, Save, Tag, Trash2 } from "lucide-react";
import NoteEditor from "./NoteEditor";
import { useState } from "react";

interface CurrentNoteEditorProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  noteContent: string;
  setNoteContent: (value: string) => void;
  currentNoteTitle: string;
  updateNoteTitle: (title: string) => void;
  saveNote: () => void;
  deleteNote: () => void;
  addTag: (tag: string) => void;
}

export default function CurrentNoteEditor({ 
  isEditing, 
  setIsEditing, 
  noteContent, 
  setNoteContent,
  currentNoteTitle,
  updateNoteTitle,
  saveNote,
  deleteNote,
  addTag
}: CurrentNoteEditorProps) {
  const [newTag, setNewTag] = useState<string>("");
  const [showTagInput, setShowTagInput] = useState<boolean>(false);

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setNewTag("");
      setShowTagInput(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-8 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Note Title"
          className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full dark:text-white"
          value={currentNoteTitle}
          onChange={(e) => updateNoteTitle(e.target.value)}
          disabled={!isEditing}
        />
        <div className="flex gap-2">
          {isEditing ? (
            <Button size="sm" onClick={saveNote}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={deleteNote}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <NoteEditor 
        isEditing={isEditing} 
        setIsEditing={setIsEditing}
        noteContent={noteContent}
        setNoteContent={setNoteContent}
      />

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-500" />
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded text-xs">work</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs">ideas</span>
            
            {showTagInput ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="px-2 py-1 text-xs border rounded mr-1 w-20 dark:bg-slate-800 dark:border-slate-600"
                  placeholder="New tag"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  autoFocus
                />
                <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={handleAddTag}>Add</Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs"
                onClick={() => setShowTagInput(true)}
              >
                + Add Tag
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
