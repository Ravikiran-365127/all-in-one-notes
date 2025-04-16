
import { useState, useEffect } from "react";
import { toast } from "sonner";
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
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const [layout, setLayout] = useState<string>(localStorage.getItem("layout") || "grid");
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [currentNoteTitle, setCurrentNoteTitle] = useState<string>("New Note");
  const [activeNotebook, setActiveNotebook] = useState<string>("All Notes");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // User specific data (in a real app, this would come from authentication)
  const [userId, setUserId] = useState<string>("user1");
  const [username, setUsername] = useState<string>("Demo User");

  // Sample notes
  const [notes, setNotes] = useState<NoteType[]>(() => {
    const savedNotes = localStorage.getItem(`notes_${userId}`);
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: 1,
        title: "Project Ideas",
        content: "Here are some creative project ideas for the new quarter...",
        tags: ["work", "ideas"],
        color: "bg-amber-100",
        type: "text",
        userId: "user1"
      },
      {
        id: 2,
        title: "Meeting Notes",
        content: "Key points from the team meeting on feature prioritization...",
        tags: ["work", "meetings"],
        color: "bg-blue-100",
        type: "text",
        userId: "user1"
      },
      {
        id: 3,
        title: "Design Inspiration",
        content: "Visual concepts for the new landing page...",
        tags: ["design", "inspiration"],
        color: "bg-green-100",
        type: "image",
        userId: "user1"
      },
      {
        id: 4,
        title: "Voice Memo",
        content: "Recorded thoughts about the product roadmap...",
        tags: ["ideas", "voice"],
        color: "bg-purple-100",
        type: "voice",
        userId: "user1"
      },
    ];
  });

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`notes_${userId}`, JSON.stringify(notes));
  }, [notes, userId]);

  // Save theme and layout preferences
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("layout", layout);
    
    // Apply dark mode to the HTML element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, layout]);
  
  // Filter notes by active notebook or tag
  const filteredNotes = notes.filter(note => {
    // Filter by userId
    if (note.userId !== userId) return false;
    
    // Filter by notebook (in a real app, notes would have a notebook property)
    if (activeNotebook !== "All Notes") {
      // This is a placeholder. In a real app, you'd check the notebook property
      return false;
    }
    
    // Filter by tag
    if (activeTag && (!note.tags || !note.tags.includes(activeTag))) {
      return false;
    }
    
    return true;
  });

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1,
      title: "New Note",
      content: "",
      tags: [],
      color: "bg-white",
      type: "text",
      userId: userId
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNote.id);
    setCurrentNoteTitle("New Note");
    setNoteContent("");
    setIsEditing(true);
    
    toast.success("New note created!");
  };

  // Delete a note
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    
    if (currentNoteId === id) {
      setCurrentNoteId(null);
      setCurrentNoteTitle("");
      setNoteContent("");
    }
    
    toast.success("Note deleted!");
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    toast.success(`${theme === "light" ? "Dark" : "Light"} mode activated!`);
  };
  
  // Select a note to edit
  const selectNote = (id: number) => {
    const selectedNote = notes.find(note => note.id === id);
    if (selectedNote) {
      setCurrentNoteId(id);
      setCurrentNoteTitle(selectedNote.title);
      setNoteContent(selectedNote.content);
      setIsEditing(false);
    }
  };
  
  // Save the current note
  const saveNote = () => {
    if (currentNoteId) {
      setNotes(notes.map(note => 
        note.id === currentNoteId 
          ? { ...note, title: currentNoteTitle, content: noteContent }
          : note
      ));
      setIsEditing(false);
      toast.success("Note saved!");
    }
  };
  
  // Update note title
  const updateNoteTitle = (title: string) => {
    setCurrentNoteTitle(title);
  };

  // Change active notebook
  const changeNotebook = (notebook: string) => {
    setActiveNotebook(notebook);
    setActiveTag(null);
  };
  
  // Change active tag
  const changeTag = (tag: string) => {
    setActiveTag(tag);
  };
  
  // Add tag to current note
  const addTagToNote = (tag: string) => {
    if (currentNoteId) {
      setNotes(notes.map(note => {
        if (note.id === currentNoteId) {
          const updatedTags = [...(note.tags || [])];
          if (!updatedTags.includes(tag)) {
            updatedTags.push(tag);
          }
          return { ...note, tags: updatedTags };
        }
        return note;
      }));
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <NoteHeader theme={theme} toggleTheme={toggleTheme} createNewNote={createNewNote} />

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <NoteSidebar 
              activeNotebook={activeNotebook}
              changeNotebook={changeNotebook}
              activeTag={activeTag}
              changeTag={changeTag}
            />

            {/* Main Content */}
            <div className="lg:col-span-3">
              <NoteTools 
                layout={layout} 
                setLayout={setLayout} 
              />
              
              <CurrentNoteEditor 
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                noteContent={noteContent}
                setNoteContent={setNoteContent}
                currentNoteTitle={currentNoteTitle}
                updateNoteTitle={updateNoteTitle}
                saveNote={saveNote}
                deleteNote={() => currentNoteId && deleteNote(currentNoteId)}
                addTag={addTagToNote}
              />

              <NoteList 
                notes={filteredNotes} 
                layout={layout} 
                deleteNote={deleteNote}
                selectNote={selectNote}
              />
            </div>
          </div>
        </div>

        <NoteFeaturesBanner />
        <NoteFooter />
      </div>
    </div>
  );
}
