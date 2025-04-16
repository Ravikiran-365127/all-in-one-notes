
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  rating: number;
}

const TestimonialCard = ({ quote, author, position, rating }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <blockquote className="text-gray-700 dark:text-gray-300 mb-4">"{quote}"</blockquote>
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
          {author.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-semibold">{author}</div>
          <div className="text-xs text-gray-500">{position}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
