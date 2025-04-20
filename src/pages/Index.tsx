
import React, { useState } from "react";
import { BoardData, Task } from "@/types/task";
import { initialBoardData } from "@/data/mockData";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import TaskBoard from "@/components/TaskBoard";
import TaskModal from "@/components/TaskModal";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

const Index = () => {
  const [boardData, setBoardData] = useState<BoardData>(initialBoardData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // Get the selected task from the board data
  const selectedTask = selectedTaskId ? boardData.tasks[selectedTaskId] : undefined;
  
  // Handle opening the modal for creating a new task
  const handleNewTask = () => {
    setSelectedTaskId(null);
    setIsModalOpen(true);
  };
  
  // Handle opening the modal for editing an existing task
  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };
  
  // Handle creating or updating a task
  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTaskId) {
      // Update existing task
      const updatedTask = {
        ...boardData.tasks[selectedTaskId],
        ...taskData
      };
      
      const oldStatus = boardData.tasks[selectedTaskId].status;
      const newStatus = taskData.status || oldStatus;
      
      // If status changed, update column taskIds
      if (oldStatus !== newStatus) {
        // Remove from old column
        const oldColumnTaskIds = [...boardData.columns[oldStatus].taskIds];
        const taskIndex = oldColumnTaskIds.indexOf(selectedTaskId);
        if (taskIndex !== -1) {
          oldColumnTaskIds.splice(taskIndex, 1);
        }
        
        // Add to new column
        const newColumnTaskIds = [...boardData.columns[newStatus].taskIds];
        newColumnTaskIds.push(selectedTaskId);
        
        // Update board data with new task and columns
        setBoardData({
          ...boardData,
          tasks: {
            ...boardData.tasks,
            [selectedTaskId]: updatedTask as Task
          },
          columns: {
            ...boardData.columns,
            [oldStatus]: {
              ...boardData.columns[oldStatus],
              taskIds: oldColumnTaskIds
            },
            [newStatus]: {
              ...boardData.columns[newStatus],
              taskIds: newColumnTaskIds
            }
          }
        });
      } else {
        // Just update the task without changing columns
        setBoardData({
          ...boardData,
          tasks: {
            ...boardData.tasks,
            [selectedTaskId]: updatedTask as Task
          }
        });
      }
      
      toast("Task updated successfully");
    } else {
      // Create new task
      const newTaskId = uuidv4();
      const status = taskData.status || "todo";
      
      const newTask: Task = {
        id: newTaskId,
        title: taskData.title || "New Task",
        description: taskData.description || "",
        status,
        priority: taskData.priority || "medium",
        deadline: taskData.deadline || new Date(),
        createdAt: new Date()
      };
      
      // Add task to board data
      setBoardData({
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [newTaskId]: newTask
        },
        columns: {
          ...boardData.columns,
          [status]: {
            ...boardData.columns[status],
            taskIds: [...boardData.columns[status].taskIds, newTaskId]
          }
        }
      });
      
      toast("Task created successfully");
    }
    
    // Close the modal
    setIsModalOpen(false);
  };
  
  // Handle deleting a task
  const handleDeleteTask = () => {
    if (selectedTaskId) {
      const taskToDelete = boardData.tasks[selectedTaskId];
      const column = boardData.columns[taskToDelete.status];
      
      // Filter out the task from its column
      const updatedTaskIds = column.taskIds.filter(id => id !== selectedTaskId);
      
      // Create a copy of tasks without the deleted task
      const { [selectedTaskId]: deletedTask, ...remainingTasks } = boardData.tasks;
      
      // Update board data
      setBoardData({
        ...boardData,
        tasks: remainingTasks,
        columns: {
          ...boardData.columns,
          [column.id]: {
            ...column,
            taskIds: updatedTaskIds
          }
        }
      });
      
      toast("Task deleted successfully");
      setIsModalOpen(false);
    }
  };
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNewTask={handleNewTask} />
        
        <main className="flex-1 overflow-hidden">
          <TaskBoard
            data={boardData}
            onTaskClick={handleTaskClick}
            onDataChange={setBoardData}
          />
        </main>
        
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          onDelete={selectedTaskId ? handleDeleteTask : undefined}
          task={selectedTask}
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
