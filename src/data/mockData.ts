
import { BoardData, Priority, Status, Task } from "../types/task";

// Helper to create a consistent date in the future
const getFutureDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Create mock tasks
const createMockTasks = (): Record<string, Task> => {
  const tasks: Record<string, Task> = {};
  
  // Todo tasks
  tasks["task-1"] = {
    id: "task-1",
    title: "Design new dashboard layout",
    description: "Create wireframes and mockups for the new analytics dashboard",
    status: "todo",
    priority: "high",
    deadline: getFutureDate(5),
    createdAt: new Date()
  };
  
  tasks["task-2"] = {
    id: "task-2",
    title: "Update user documentation",
    description: "Update the user guide with new features from the latest release",
    status: "todo",
    priority: "medium",
    deadline: getFutureDate(7),
    createdAt: new Date()
  };
  
  tasks["task-3"] = {
    id: "task-3",
    title: "Research competitor features",
    description: "Analyze top 3 competitors and create a feature comparison report",
    status: "todo",
    priority: "low",
    deadline: getFutureDate(10),
    createdAt: new Date()
  };
  
  // In Progress tasks
  tasks["task-4"] = {
    id: "task-4",
    title: "Implement authentication flow",
    description: "Develop and test the new OAuth integration",
    status: "inprogress",
    priority: "high",
    deadline: getFutureDate(3),
    createdAt: new Date()
  };
  
  tasks["task-5"] = {
    id: "task-5",
    title: "Optimize database queries",
    description: "Review and optimize slow-performing database queries",
    status: "inprogress",
    priority: "medium",
    deadline: getFutureDate(4),
    createdAt: new Date()
  };
  
  // Done tasks
  tasks["task-6"] = {
    id: "task-6",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment workflow",
    status: "done",
    priority: "high",
    deadline: getFutureDate(-2),
    createdAt: new Date()
  };
  
  tasks["task-7"] = {
    id: "task-7",
    title: "Create onboarding email sequence",
    description: "Design and write copy for the 5-email onboarding sequence",
    status: "done",
    priority: "medium",
    deadline: getFutureDate(-5),
    createdAt: new Date()
  };
  
  return tasks;
};

// Create initial board data
export const initialBoardData: BoardData = {
  tasks: createMockTasks(),
  columns: {
    "todo": {
      id: "todo",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"]
    },
    "inprogress": {
      id: "inprogress",
      title: "In Progress",
      taskIds: ["task-4", "task-5"]
    },
    "done": {
      id: "done",
      title: "Done",
      taskIds: ["task-6", "task-7"]
    }
  },
  columnOrder: ["todo", "inprogress", "done"]
};
