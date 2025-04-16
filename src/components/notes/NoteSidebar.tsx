
import { Link } from "react-router-dom";
import { FileText, Hash } from "lucide-react";

interface NoteSidebarProps {
  activeNotebook: string;
  changeNotebook: (notebook: string) => void;
  activeTag: string | null;
  changeTag: (tag: string) => void;
}

export default function NoteSidebar({ 
  activeNotebook, 
  changeNotebook, 
  activeTag, 
  changeTag 
}: NoteSidebarProps) {
  
  const notebooks = ["All Notes", "Personal", "Work", "Ideas"];
  const tags = ["work", "ideas", "meetings", "design"];
  
  return (
    <div className="lg:col-span-1">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 sticky top-20">
        <h2 className="text-lg font-semibold mb-4">Notebooks</h2>
        <ul className="space-y-2">
          {notebooks.map((notebook) => (
            <li 
              key={notebook}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                activeNotebook === notebook 
                  ? "bg-indigo-100 dark:bg-indigo-900/50" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              onClick={() => changeNotebook(notebook)}
            >
              <FileText className="h-4 w-4" />
              <span>{notebook}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag}
              className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 cursor-pointer ${
                activeTag === tag 
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300" 
                  : "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300"
              }`}
              onClick={() => changeTag(tag)}
            >
              <Hash className="h-3 w-3" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
