
import { NoteType } from "./NoteCard";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
  layout: string;
  deleteNote: (id: number) => void;
  selectNote: (id: number) => void;
}

export default function NoteList({ notes, layout, deleteNote, selectNote }: NoteListProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Your Notes</h2>
      {notes.length > 0 ? (
        <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
          {notes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              deleteNote={deleteNote}
              selectNote={selectNote}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 border border-dashed rounded-lg">
          No notes found. Create a new note to get started!
        </div>
      )}
    </>
  );
}
