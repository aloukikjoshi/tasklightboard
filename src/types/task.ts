
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  deadline: Date;
  createdAt: Date;
}

export interface Column {
  id: Status;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: Status[];
}
