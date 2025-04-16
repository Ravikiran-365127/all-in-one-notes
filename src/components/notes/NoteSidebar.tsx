
import { Link } from "react-router-dom";
import { FileText, Hash } from "lucide-react";

export default function NoteSidebar() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 sticky top-20">
        <h2 className="text-lg font-semibold mb-4">Notebooks</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded">
            <FileText className="h-4 w-4" />
            <span>All Notes</span>
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
            <FileText className="h-4 w-4" />
            <span>Personal</span>
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
            <FileText className="h-4 w-4" />
            <span>Work</span>
          </li>
          <li className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
            <FileText className="h-4 w-4" />
            <span>Ideas</span>
          </li>
        </ul>

        <h2 className="text-lg font-semibold mt-6 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded text-xs font-medium flex items-center gap-1">
            <Hash className="h-3 w-3" /> work
          </span>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs font-medium flex items-center gap-1">
            <Hash className="h-3 w-3" /> ideas
          </span>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs font-medium flex items-center gap-1">
            <Hash className="h-3 w-3" /> meetings
          </span>
          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs font-medium flex items-center gap-1">
            <Hash className="h-3 w-3" /> design
          </span>
        </div>
      </div>
    </div>
  );
}
