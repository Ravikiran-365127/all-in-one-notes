
import { Link } from "react-router-dom";
import { SunMoon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainNav from "@/components/MainNav";

interface NoteHeaderProps {
  theme: string;
  toggleTheme: () => void;
  createNewNote: () => void;
}

export default function NoteHeader({ theme, toggleTheme, createNewNote }: NoteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mr-8">
              All Notes
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <SunMoon className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={createNewNote} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
