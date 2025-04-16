
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PricingCard = ({ 
  title, 
  price, 
  period = "", 
  description, 
  features, 
  cta,
  popular = false
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-xl border p-6 shadow-sm",
        popular 
          ? "border-indigo-600 dark:border-indigo-500" 
          : "border-gray-200 dark:border-gray-800",
        popular
          ? "bg-indigo-50 dark:bg-indigo-950/30"
          : "bg-white dark:bg-slate-900"
      )}
    >
      {popular && (
        <div className="mb-4">
          <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Popular
          </span>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-400">
              <Check className="h-3 w-3" />
            </div>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={cn(
          "w-full",
          popular 
            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
            : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:bg-slate-900 dark:text-indigo-400 dark:border-indigo-500 dark:hover:bg-indigo-950/50"
        )}
      >
        {cta}
      </Button>
    </motion.div>
  );
};

export default PricingCard;
