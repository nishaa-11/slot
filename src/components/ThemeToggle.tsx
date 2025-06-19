
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // After mounting, we can safely show the theme toggle
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative h-12 w-20 rounded-full overflow-hidden border-primary/20 transition-all duration-500 p-1",
        isHovered && "shadow-[0_0_15px_rgba(156,163,175,0.5)]",
        theme === "dark" ? "border-primary/10 bg-slate-900" : "bg-white"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-1 bg-primary/10 rounded-full"
        animate={{
          x: theme === "dark" ? "calc(100% - 2px)" : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ width: "calc(50% - 2px)" }}
      />
      <div className="relative w-full h-full flex items-center justify-between px-2">
        <Sun
          className={cn(
            "h-5 w-5 transition-all duration-500",
            theme === "dark" ? "opacity-50" : "text-yellow-500"
          )}
        />
        <Moon
          className={cn(
            "h-5 w-5 transition-all duration-500",
            theme === "dark" ? "text-blue-400" : "opacity-50"
          )}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
          theme === "dark" ? "from-blue-900/30 to-purple-900/30" : "from-yellow-500/20 to-orange-500/20",
          isHovered && "opacity-100"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
