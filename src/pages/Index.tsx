
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Pen, Notebook, Bot, Images, Mic, Search, 
  Share2, Lock, Paintbrush, ChevronRight, 
  MessageSquare, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import NoteDemo from "@/components/NoteDemo";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";

export default function Index() {
  const [activeFeature, setActiveFeature] = useState("text");
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Animation for writing text effect
  const [text, setText] = useState("");
  const fullText = "Capture every idea instantly.";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  // Features data
  const features = [
    {
      id: "text",
      title: "Rich Text & Markdown",
      description: "Write with beautiful typography and formatting options that adapt to your style.",
      icon: <Pen className="h-6 w-6" />
    },
    {
      id: "images",
      title: "Image Capture",
      description: "Save images, annotate them, and organize visual inspiration all in one place.",
      icon: <Images className="h-6 w-6" />
    },
    {
      id: "voice",
      title: "Voice Notes",
      description: "Record your thoughts with crystal-clear audio that transcribes automatically.",
      icon: <Mic className="h-6 w-6" />
    },
    {
      id: "sketch",
      title: "Handwriting & Sketches",
      description: "Enjoy natural handwriting and sketching with realistic pen input.",
      icon: <Paintbrush className="h-6 w-6" />
    }
  ];

  // Organization features
  const orgFeatures = [
    {
      title: "Smart Notebooks",
      description: "Organize your notes into nested notebooks that adapt to your workflow.",
      icon: <Notebook className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "AI-Powered Search",
      description: "Find exactly what you need with intelligent search across all your content.",
      icon: <Search className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "Real-Time Collaboration",
      description: "Work together with teammates in real time with shared editing and comments.",
      icon: <Share2 className="h-10 w-10 text-indigo-500" />
    },
    {
      title: "Enhanced Security",
      description: "Keep your ideas safe with end-to-end encryption and privacy controls.",
      icon: <Lock className="h-10 w-10 text-indigo-500" />
    }
  ];
  
  // Pricing options
  const pricingOptions = [
    {
      title: "Free",
      price: "$0",
      description: "Basic note-taking for individuals",
      features: [
        "Unlimited basic notes",
        "3 notebooks",
        "Basic text formatting",
        "Mobile and web access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      title: "Pro",
      price: "$8",
      period: "/month",
      description: "Advanced features for power users",
      features: [
        "Everything in Free",
        "Unlimited notebooks",
        "Full multimedia support",
        "Advanced organization",
        "AI-powered search",
        "Priority support"
      ],
      cta: "Go Pro",
      popular: true
    },
    {
      title: "Team",
      price: "$15",
      period: "/user/month",
      description: "Collaborative tools for teams",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Shared workspaces",
        "Version history",
        "Admin controls",
        "SSO integration"
      ],
      cta: "Try for Teams",
      popular: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "This app transformed how our team captures and shares ideas. The real-time collaboration is seamless.",
      author: "Sarah J.",
      position: "Product Designer",
      rating: 5
    },
    {
      quote: "The multi-modal note taking has revolutionized my workflow. I can capture ideas in any format instantly.",
      author: "Mark T.",
      position: "Content Creator",
      rating: 5
    },
    {
      quote: "I've tried every note app out there, and this combines the best of all worlds with an interface that feels natural.",
      author: "Alex R.",
      position: "Student",
      rating: 4
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pb-20 pt-24 overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Introducing
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                The Ultimate <span className="text-indigo-600 dark:text-indigo-400">All Notes</span> App
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                Fusing the best of Notion, Evernote, OneNote and more into a single, beautiful experience.
              </p>
              <div className="h-16 mt-4">
                <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 min-h-[40px]">
                  {text}<span className="animate-pulse">|</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[500px] overflow-hidden rounded-2xl shadow-xl"
              >
                <NoteDemo activeFeature={activeFeature} />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-10 h-48 w-48 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-900/30" />
        <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-900/30" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Capture Ideas in Any Format
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Take notes the way your brain works, with support for multiple formats that adapt to your thinking.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <Tabs defaultValue="text" value={activeFeature} onValueChange={setActiveFeature} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                {features.map((feature) => (
                  <TabsTrigger key={feature.id} value={feature.id} className="flex items-center gap-2">
                    {feature.icon}
                    <span className="hidden md:inline">{feature.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  {features.map((feature) => (
                    <TabsContent key={feature.id} value={feature.id} className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                      </motion.div>
                    </TabsContent>
                  ))}
                  
                  <ul className="grid gap-2 pt-4">
                    <li className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Instant syncing across all devices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Dark mode that's easy on your eyes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Adjustable layouts to match your workflow</span>
                    </li>
                  </ul>
                </div>
                <div className="relative overflow-hidden rounded-xl border bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-800/50">
                  <NoteDemo activeFeature={activeFeature} />
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Organization Section */}
      <section id="organization" className="py-20 bg-indigo-50 dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Organization
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Advanced Organization Tools
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Keep your notes organized with powerful tools that make finding information effortless.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {orgFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Interactive Demo
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                See It In Action
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the seamless flow between different note formats and organization tools.
              </p>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden rounded-xl border shadow-xl">
              <div className="flex items-center justify-between border-b bg-slate-50 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">All Notes App</div>
                <div className="w-14" />
              </div>
              <div className="aspect-video bg-white dark:bg-slate-950 p-4">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full flex flex-col">
                  <div className="text-xl font-semibold mb-2">My Product Roadmap</div>
                  <div className="text-sm text-gray-500 mb-4">Last edited 2 minutes ago</div>
                  <div className="prose dark:prose-invert max-w-none flex-1">
                    <p>Our next-generation product will focus on three key areas:</p>
                    <ol>
                      <li>User Experience Improvements</li>
                      <li>Performance Optimization</li>
                      <li>New Feature Development</li>
                    </ol>
                    <p>The timeline for delivery will be phased over Q3 and Q4.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Try It Free
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-indigo-50 dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of users who have transformed how they capture and organize ideas.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-700 dark:bg-indigo-700/20 dark:text-indigo-300">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Choose Your Plan
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Simple pricing plans for individuals and teams of all sizes.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingOptions.map((plan, index) => (
              <PricingCard
                key={index}
                title={plan.title}
                price={plan.price}
                period={plan.period}
                description={plan.description}
                features={plan.features}
                cta={plan.cta}
                popular={plan.popular}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform How You Capture Ideas?
              </h2>
              <p className="text-indigo-100 md:text-xl">
                Join thousands of users who have revolutionized their note-taking experience.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-100">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-indigo-500">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium mb-4">All Notes App</h3>
              <p className="text-slate-400">
                The ultimate all-in-one notes app that combines the best of every platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="#features" className="hover:text-indigo-300">Features</Link></li>
                <li><Link to="#pricing" className="hover:text-indigo-300">Pricing</Link></li>
                <li><Link to="#" className="hover:text-indigo-300">Download</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-indigo-300">Blog</Link></li>
                <li><Link to="#" className="hover:text-indigo-300">Documentation</Link></li>
                <li><Link to="#" className="hover:text-indigo-300">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-indigo-300">About Us</Link></li>
                <li><Link to="#" className="hover:text-indigo-300">Careers</Link></li>
                <li><Link to="#" className="hover:text-indigo-300">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-400">
              © 2025 All Notes App. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-indigo-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-300">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
