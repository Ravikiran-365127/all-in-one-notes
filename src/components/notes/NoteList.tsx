
import { NoteType } from "./NoteCard";
import NoteCard from "./NoteCard";

interface NoteListProps {
  notes: NoteType[];
  layout: string;
  deleteNote: (id: number) => void;
}

export default function NoteList({ notes, layout, deleteNote }: NoteListProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Your Notes</h2>
      <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </>
  );
}
