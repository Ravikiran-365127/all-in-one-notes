
import { Button } from "@/components/ui/button";
import { Edit, Save, Tag, Trash2 } from "lucide-react";
import NoteEditor from "./NoteEditor";

interface CurrentNoteEditorProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  noteContent: string;
  setNoteContent: (value: string) => void;
}

export default function CurrentNoteEditor({ 
  isEditing, 
  setIsEditing, 
  noteContent, 
  setNoteContent 
}: CurrentNoteEditorProps) {
  return (
    <div className="border rounded-lg p-4 mb-8 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Note Title"
          className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full dark:text-white"
          defaultValue="My Note"
        />
        <div className="flex gap-2">
          {isEditing ? (
            <Button size="sm" onClick={() => setIsEditing(false)}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          <Button size="sm" variant="outline">
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
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded text-xs">work</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs">ideas</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">+ Add Tag</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
