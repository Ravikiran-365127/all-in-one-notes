
import { useState, useRef, useEffect } from "react";
import { Type, Pen, Image, Mic, Paintbrush } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NoteEditorProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  noteContent: string;
  setNoteContent: (value: string) => void;
}

export default function NoteEditor({ isEditing, setIsEditing, noteContent, setNoteContent }: NoteEditorProps) {
  const [activeEditor, setActiveEditor] = useState<string>("text");
  const [recordingVoice, setRecordingVoice] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  
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

  return (
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
  );
}
