import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  getStats: () => {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
    recentTasks: Task[];
    recentCompleted: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const getStats = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const recentTasks = tasks.filter(task => task.createdAt >= oneWeekAgo);
    const recentCompleted = recentTasks.filter(task => task.completed).length;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      recentTasks,
      recentCompleted,
    };
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    getStats,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 