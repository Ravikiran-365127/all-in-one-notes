
import { useState } from "react";
import NoteHeader from "@/components/notes/NoteHeader";
import NoteSidebar from "@/components/notes/NoteSidebar";
import NoteTools from "@/components/notes/NoteTools";
import CurrentNoteEditor from "@/components/notes/CurrentNoteEditor";
import NoteList from "@/components/notes/NoteList";
import NoteFeaturesBanner from "@/components/notes/NoteFeaturesBanner";
import NoteFooter from "@/components/notes/NoteFooter";
import { NoteType } from "@/components/notes/NoteCard";

export default function Notes() {
  // State management
  const [noteContent, setNoteContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");
  const [layout, setLayout] = useState<string>("grid");

  // Sample notes
  const [notes, setNotes] = useState<NoteType[]>([
    {
      id: 1,
      title: "Project Ideas",
      content: "Here are some creative project ideas for the new quarter...",
      tags: ["work", "ideas"],
      color: "bg-amber-100",
      type: "text",
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Key points from the team meeting on feature prioritization...",
      tags: ["work", "meetings"],
      color: "bg-blue-100",
      type: "text",
    },
    {
      id: 3,
      title: "Design Inspiration",
      content: "Visual concepts for the new landing page...",
      tags: ["design", "inspiration"],
      color: "bg-green-100",
      type: "image",
    },
    {
      id: 4,
      title: "Voice Memo",
      content: "Recorded thoughts about the product roadmap...",
      tags: ["ideas", "voice"],
      color: "bg-purple-100",
      type: "voice",
    },
  ]);

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "New Note",
      content: "",
      tags: [],
      color: "bg-white",
      type: "text",
    };
    
    setNotes([newNote, ...notes]);
  };

  // Delete a note
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <NoteHeader theme={theme} toggleTheme={toggleTheme} createNewNote={createNewNote} />

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <NoteSidebar />

            {/* Main Content */}
            <div className="lg:col-span-3">
              <NoteTools layout={layout} setLayout={setLayout} />
              
              <CurrentNoteEditor 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                noteContent={noteContent}
                setNoteContent={setNoteContent}
              />

              <NoteList notes={notes} layout={layout} deleteNote={deleteNote} />
            </div>
          </div>
        </div>

        <NoteFeaturesBanner />
        <NoteFooter />
      </div>
    </div>
  );
}
