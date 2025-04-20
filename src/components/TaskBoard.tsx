
import React, { useState } from "react";
import { BoardData, Task, Status } from "@/types/task";
import TaskCard from "./TaskCard";
import { ClipboardList, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

interface TaskBoardProps {
  data: BoardData;
  onTaskClick: (taskId: string) => void;
  onDataChange: (newData: BoardData) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ data, onTaskClick, onDataChange }) => {
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    setDraggingTaskId(taskId);
    
    // Add styling
    if (e.currentTarget) {
      e.currentTarget.classList.add("dragging");
    }
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingTaskId(null);
    
    // Remove styling
    if (e.currentTarget) {
      e.currentTarget.classList.remove("dragging");
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: Status) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData("taskId");
    const task = data.tasks[taskId];
    
    if (task && task.status !== columnId) {
      // Find source and destination columns
      const sourceColumn = data.columns[task.status];
      const destColumn = data.columns[columnId];
      
      // Remove from source column
      const sourceTaskIds = [...sourceColumn.taskIds];
      const taskIndex = sourceTaskIds.indexOf(taskId);
      if (taskIndex !== -1) {
        sourceTaskIds.splice(taskIndex, 1);
      }
      
      // Add to destination column
      const destTaskIds = [...destColumn.taskIds];
      destTaskIds.push(taskId);
      
      // Update the task status
      const updatedTask = { ...task, status: columnId };
      
      // Create the new board data
      const newData: BoardData = {
        ...data,
        tasks: {
          ...data.tasks,
          [taskId]: updatedTask
        },
        columns: {
          ...data.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            taskIds: sourceTaskIds
          },
          [destColumn.id]: {
            ...destColumn,
            taskIds: destTaskIds
          }
        }
      };
      
      // Update the board data
      onDataChange(newData);
      
      // Show toast notification
      const statusMap = {
        todo: "To Do",
        inprogress: "In Progress",
        done: "Done"
      };
      
      toast(`"${task.title}" moved to ${statusMap[columnId]}`);
    }
  };
  
  const getColumnHeader = (columnId: Status): JSX.Element => {
    const column = data.columns[columnId];
    const columnTitle = column.title;
    const taskCount = column.taskIds.length;
    
    return (
      <div className="column-header">
        {columnId === "todo" && <ClipboardList size={20} className="text-status-todo" />}
        {columnId === "inprogress" && <ClipboardList size={20} className="text-status-inprogress" />}
        {columnId === "done" && <ClipboardList size={20} className="text-status-done" />}
        <span>{columnTitle}</span>
        <span className="ml-2 text-muted-foreground text-sm">({taskCount})</span>
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
        
        return (
          <div 
            key={columnId}
            className="task-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            {getColumnHeader(columnId)}
            
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragEnd={handleDragEnd}
                >
                  <TaskCard
                    task={task}
                    onClick={onTaskClick}
                  />
                </div>
              ))}
              
              {tasks.length === 0 && (
                <div className="p-4 text-center text-muted-foreground text-sm italic border border-dashed rounded-md">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskBoard;
