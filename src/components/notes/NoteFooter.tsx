
import { Link } from "react-router-dom";

export default function NoteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-medium mb-4">All Notes App</h3>
            <p className="text-slate-400">
              The ultimate free all-in-one notes app that combines the best of every platform.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/notes" className="hover:text-indigo-300">Rich Text Editing</Link></li>
              <li><Link to="/notes" className="hover:text-indigo-300">Handwriting</Link></li>
              <li><Link to="/notes" className="hover:text-indigo-300">Voice Recording</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-indigo-300">Documentation</Link></li>
              <li><Link to="#" className="hover:text-indigo-300">Community</Link></li>
              <li><Link to="#" className="hover:text-indigo-300">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="hover:text-indigo-300">Twitter</Link></li>
              <li><Link to="#" className="hover:text-indigo-300">GitHub</Link></li>
              <li><Link to="#" className="hover:text-indigo-300">Discord</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            © 2025 All Notes App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
