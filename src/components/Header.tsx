
import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Plus } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  onNewTask: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTask }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">TaskLight Board</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={onNewTask} 
            className="gap-2"
            size="sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Task</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
