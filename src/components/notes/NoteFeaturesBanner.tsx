
import { Type, Pen, Image, Mic, FolderTree, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NoteFeaturesBanner() {
  return (
    <>
      {/* Feature Banner */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Experience All Features for Free</h2>
              <p className="text-indigo-100 max-w-md">
                Rich text editing, handwriting, collaboration, and more — all completely free.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-100">
                Explore Features
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* App Features Quick Overview */}
      <div className="container mx-auto px-4 py-12 bg-slate-50 dark:bg-slate-800/50 mt-8">
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">All Features at Your Fingertips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Type className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Rich Text</h3>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Pen className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Handwriting</h3>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Image className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Images</h3>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Mic className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Voice Notes</h3>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <FolderTree className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Organization</h3>
          </div>
          <div className="p-4 flex flex-col items-center">
            <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-medium dark:text-white">Collaboration</h3>
          </div>
        </div>
      </div>
    </>
  );
}
