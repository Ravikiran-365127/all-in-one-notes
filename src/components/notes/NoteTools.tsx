
import { Grid, List, Network, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoteToolsProps {
  layout: string;
  setLayout: (layout: string) => void;
}

export default function NoteTools({ layout, setLayout }: NoteToolsProps) {
  return (
    <div className="mb-6 flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <Button 
          variant={layout === "grid" ? "default" : "outline"}
          size="sm" 
          onClick={() => setLayout("grid")}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button 
          variant={layout === "list" ? "default" : "outline"}
          size="sm" 
          onClick={() => setLayout("list")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant={layout === "graph" ? "default" : "outline"}
          size="sm" 
          onClick={() => setLayout("graph")}
        >
          <Network className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="pl-10 pr-4 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}
