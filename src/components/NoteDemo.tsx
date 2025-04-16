
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NoteDemoProps {
  activeFeature: string;
}

const NoteDemo = ({ activeFeature }: NoteDemoProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [textContent, setTextContent] = useState("");
  
  const fullTextContent = "This is how easily you can capture your thoughts with rich text formatting, **bold emphasis**, and _stylish italics_. Create lists, add links, and organize with headings.";
  
  useEffect(() => {
    if (activeFeature === "text") {
      setIsTyping(true);
      let currentIndex = 0;
      setTextContent("");
      
      const interval = setInterval(() => {
        if (currentIndex <= fullTextContent.length) {
          setTextContent(fullTextContent.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [activeFeature]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">All Notes App</div>
        <div className="w-16"></div>
      </div>
      
      <Tabs value={activeFeature} className="w-full">
        <TabsContent value="text" className="m-0 p-0">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Project Ideas</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Edited just now</span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                {textContent}
                {isTyping && <span className="inline-block w-1 h-5 bg-indigo-600 dark:bg-indigo-400 ml-0.5 animate-pulse"></span>}
              </p>
            </div>
            <div className="flex gap-2 mt-8">
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">B</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">I</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">U</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">•</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">1.</button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="m-0 p-0">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Design Inspiration</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Edited 2 hours ago</span>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>Color palette ideas for the new landing page:</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                <p className="text-sm mt-2 text-center text-slate-700 dark:text-slate-300">Primary Gradient</p>
              </div>
              <div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-amber-300 to-orange-500"></div>
                <p className="text-sm mt-2 text-center text-slate-700 dark:text-slate-300">Accent Colors</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">Add Image</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Annotate</button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="voice" className="m-0 p-0">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Meeting Notes</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Recorded today</span>
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Voice Note #12</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">3:42 • Transcribed automatically</p>
                </div>
                <button className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className={cn(
                  "h-10",
                  "relative",
                  "flex items-center"
                )}>
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
              </div>
              
              <div className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                <p>"We should target Q3 for the new feature release. Marketing team will need at least two weeks to prepare materials..."</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">Record New</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Import Audio</button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sketch" className="m-0 p-0">
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">App Wireframe</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">Edited yesterday</span>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 flex items-center justify-center p-4">
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 400 250" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-slate-700 dark:text-slate-300"
              >
                <rect x="50" y="20" width="300" height="40" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="60" y="80" width="150" height="150" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="230" y="80" width="110" height="70" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <rect x="230" y="160" width="110" height="70" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="120" cy="120" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="150" y1="180" x2="110" y2="180" stroke="currentColor" strokeWidth="2"/>
                <line x1="130" y1="180" x2="130" y2="200" stroke="currentColor" strokeWidth="2"/>
                <path 
                  className="sketch-path" 
                  d="M250 110 C270 90, 290 130, 310 110" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
                <path 
                  className="sketch-path" 
                  d="M250 190 L260 180 L270 200 L290 170 L310 190" 
                  fill="transparent" 
                  stroke="currentColor" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex gap-2 mt-6">
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">Pen Tool</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Shape Tool</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Eraser</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoteDemo;
