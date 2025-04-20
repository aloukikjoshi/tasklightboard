
import React from "react";
import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { formatDate, getDateColor, isOverdue } from "@/utils/dateUtils";
import { Clock, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onClick: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityColors = {
    low: "bg-priority-low",
    medium: "bg-priority-medium",
    high: "bg-priority-high",
  };
  
  const handleClick = () => {
    onClick(task.id);
  };
  
  return (
    <Card 
      className="task-card group animate-fade-in" 
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`priority-indicator ${priorityColors[task.priority]}`} />
          <h3 className="font-medium line-clamp-1">{task.title}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClick(task.id);
          }}
        >
          <Pencil size={14} />
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className={`date-badge ${getDateColor(task.deadline)}`}>
          <Clock size={12} />
          <span>{formatDate(task.deadline)}</span>
        </div>
        {isOverdue(task.deadline) && task.status !== "done" && (
          <span className="text-xs text-destructive font-medium">Overdue</span>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
