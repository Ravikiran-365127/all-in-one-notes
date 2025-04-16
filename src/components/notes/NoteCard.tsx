
import { motion } from "framer-motion";
import { Edit, Trash2, Mic, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NoteType {
  id: number;
  title: string;
  content: string;
  tags: string[];
  color: string;
  type: string;
}

interface NoteCardProps {
  note: NoteType;
  deleteNote: (id: number) => void;
}

export default function NoteCard({ note, deleteNote }: NoteCardProps) {
  return (
    <motion.div
      key={note.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${note.color} dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{note.title}</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            onClick={() => deleteNote(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 line-clamp-3">{note.content}</p>
      
      {note.type === "voice" && (
        <div className="mt-2 flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-7">
            <Mic className="h-3 w-3 mr-1" /> Play Voice
          </Button>
        </div>
      )}
      
      {note.type === "image" && (
        <div className="mt-2 h-24 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
          <Image className="h-6 w-6 text-slate-400" />
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1">
          {note.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/50 dark:bg-slate-700/50 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-slate-500">2 days ago</span>
      </div>
    </motion.div>
  );
}
