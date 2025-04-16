import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Pen,
  Type,
  Image,
  Mic,
  Palette,
  FolderTree,
  Tag,
  Search,
  Bell,
  Users,
  Code,
  RefreshCw,
  PlusCircle,
  Save,
  Edit,
  Trash2,
  Hash,
  FileText,
  MessageSquare,
  Paintbrush,
  SunMoon,
  Grid,
  List,
  Network,
} from "lucide-react";

export default function Notes() {
  // State management
  const [activeEditor, setActiveEditor] = useState<string>("text");
  const [noteContent, setNoteContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>("light");
  const [layout, setLayout] = useState<string>("grid");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [recordingVoice, setRecordingVoice] = useState(false);

  // Sample notes
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Project Ideas",
      content: "Here are some creative project ideas for the new quarter...",
      tags: ["work", "ideas"],
      color: "bg-amber-100",
      type: "text",
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Key points from the team meeting on feature prioritization...",
      tags: ["work", "meetings"],
      color: "bg-blue-100",
      type: "text",
    },
    {
      id: 3,
      title: "Design Inspiration",
      content: "Visual concepts for the new landing page...",
      tags: ["design", "inspiration"],
      color: "bg-green-100",
      type: "image",
    },
    {
      id: 4,
      title: "Voice Memo",
      content: "Recorded thoughts about the product roadmap...",
      tags: ["ideas", "voice"],
      color: "bg-purple-100",
      type: "voice",
    },
  ]);

  // Canvas drawing functions
  useEffect(() => {
    if (activeEditor === "sketch" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
      }
    }
  }, [activeEditor, color, lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      setIsDrawing(true);
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setLastX(x);
      setLastY(y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      setLastX(x);
      setLastY(y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Toggle voice recording
  const toggleVoiceRecording = () => {
    setRecordingVoice(!recordingVoice);
  };

  // Create a new note
  const createNewNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "New Note",
      content: "",
      tags: [],
      color: "bg-white",
      type: activeEditor,
    };
    
    setNotes([newNote, ...notes]);
  };

  // Delete a note
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Header */}
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
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
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

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
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

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Tools Menu */}
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

              {/* Editor Area */}
              <div className="border rounded-lg p-4 mb-8 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full dark:text-white"
                    defaultValue="My Note"
                  />
                  <div className="flex gap-2">
                    {isEditing ? (
                      <Button size="sm" onClick={() => setIsEditing(false)}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Tabs defaultValue="text" value={activeEditor} onValueChange={setActiveEditor}>
                    <TabsList>
                      <TabsTrigger value="text" className="flex items-center gap-1">
                        <Type className="h-4 w-4" /> Text
                      </TabsTrigger>
                      <TabsTrigger value="sketch" className="flex items-center gap-1">
                        <Pen className="h-4 w-4" /> Sketch
                      </TabsTrigger>
                      <TabsTrigger value="image" className="flex items-center gap-1">
                        <Image className="h-4 w-4" /> Image
                      </TabsTrigger>
                      <TabsTrigger value="voice" className="flex items-center gap-1">
                        <Mic className="h-4 w-4" /> Voice
                      </TabsTrigger>
                    </TabsList>

                    <div className="p-4 border-t mt-2 dark:border-slate-700">
                      <TabsContent value="text">
                        <Menubar className="mb-4">
                          <MenubarMenu>
                            <MenubarTrigger>Format</MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem>Bold</MenubarItem>
                              <MenubarItem>Italic</MenubarItem>
                              <MenubarItem>Underline</MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                          <MenubarMenu>
                            <MenubarTrigger>Insert</MenubarTrigger>
                            <MenubarContent>
                              <MenubarItem>Link</MenubarItem>
                              <MenubarItem>Table</MenubarItem>
                              <MenubarItem>Code Block</MenubarItem>
                            </MenubarContent>
                          </MenubarMenu>
                        </Menubar>
                        {isEditing ? (
                          <textarea
                            className="w-full h-64 p-4 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            placeholder="Start typing your note..."
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                          />
                        ) : (
                          <div className="w-full h-64 p-4 border rounded-md prose dark:prose-invert max-w-none">
                            {noteContent || (
                              <p className="text-slate-500">This note is empty. Click Edit to add content.</p>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="sketch">
                        <div className="mb-4 flex gap-2">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-10 h-10 rounded-md cursor-pointer"
                          />
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={lineWidth}
                            onChange={(e) => setLineWidth(parseInt(e.target.value))}
                            className="w-32"
                          />
                          <Button variant="outline" size="sm">
                            <Paintbrush className="h-4 w-4 mr-1" /> Brush
                          </Button>
                          <Button variant="outline" size="sm">Clear</Button>
                        </div>
                        <div className="border rounded-md overflow-hidden dark:border-slate-700">
                          <canvas
                            ref={canvasRef}
                            width={800}
                            height={400}
                            className="w-full bg-white dark:bg-slate-800"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="image">
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md">
                          <Image className="h-12 w-12 text-slate-400 mb-4" />
                          <p className="mb-4 text-slate-500 dark:text-slate-400">Drag and drop an image, or click to browse</p>
                          <Button>Upload Image</Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="voice">
                        <div className="flex flex-col items-center justify-center h-64 border rounded-md dark:border-slate-700">
                          <Button 
                            size="lg" 
                            className={recordingVoice ? "bg-red-500 hover:bg-red-600" : ""} 
                            onClick={toggleVoiceRecording}
                          >
                            <Mic className="h-6 w-6 mr-2" />
                            {recordingVoice ? "Stop Recording" : "Start Recording"}
                          </Button>
                          
                          {recordingVoice && (
                            <div className="mt-4 w-full max-w-md">
                              <div className="h-10 relative">
                                <div className="absolute inset-0 flex items-center gap-0.5">
                                  {Array.from({ length: 40 }).map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="flex-1 bg-indigo-500 dark:bg-indigo-400"
                                      initial={{ height: "30%" }}
                                      animate={{ 
                                        height: [
                                          "30%", 
                                          `${Math.random() * 80 + 20}%`, 
                                          "30%"
                                        ]
                                      }}
                                      transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: i * 0.05 % 0.6,
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-center mt-2 text-slate-500 dark:text-slate-400">
                                Recording... 00:12
                              </p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-slate-500" />
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded text-xs">work</span>
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded text-xs">ideas</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">+ Add Tag</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note Grid */}
              <h2 className="text-xl font-bold mb-4 dark:text-white">Your Notes</h2>
              <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                {notes.map((note) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>

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

        {/* Footer */}
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
      </div>
    </div>
  );
}
