
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'To Do' | 'In Progress' | 'Complete';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  createdBy: string;
  createdByName: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByUser: (userId: string) => Task[];
  getTasksStats: () => {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load mock data
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Setup Project Architecture',
        description: 'Initialize the project structure with proper folder organization',
        assignedTo: '1',
        assignedToName: 'Admin User',
        createdBy: '2',
        createdByName: 'Manager User',
        priority: 'High',
        status: 'Complete',
        dueDate: '2024-12-25',
        tags: ['setup', 'architecture'],
        createdAt: '2024-12-20',
        updatedAt: '2024-12-23'
      },
      {
        id: '2',
        title: 'Implement User Authentication',
        description: 'Add JWT-based authentication system with role management',
        assignedTo: '2',
        assignedToName: 'Manager User',
        createdBy: '1',
        createdByName: 'Admin User',
        priority: 'Critical',
        status: 'In Progress',
        dueDate: '2024-12-28',
        tags: ['auth', 'security'],
        createdAt: '2024-12-21',
        updatedAt: '2024-12-29'
      },
      {
        id: '3',
        title: 'Design Task Dashboard',
        description: 'Create responsive dashboard with charts and task overview',
        assignedTo: '3',
        assignedToName: 'Regular User',
        createdBy: '2',
        createdByName: 'Manager User',
        priority: 'Medium',
        status: 'To Do',
        dueDate: '2024-12-31',
        tags: ['ui', 'dashboard'],
        createdAt: '2024-12-22',
        updatedAt: '2024-12-22'
      },
      {
        id: '4',
        title: 'API Integration Testing',
        description: 'Test all API endpoints and ensure proper error handling',
        assignedTo: '1',
        assignedToName: 'Admin User',
        createdBy: '1',
        createdByName: 'Admin User',
        priority: 'High',
        status: 'To Do',
        dueDate: '2024-12-26',
        tags: ['testing', 'api'],
        createdAt: '2024-12-23',
        updatedAt: '2024-12-23'
      }
    ];
    
    setTasks(mockTasks);
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getTasksByUser = (userId: string) => {
    return tasks.filter(task => task.assignedTo === userId);
  };

  const getTasksStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Complete').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const overdue = tasks.filter(task => 
      new Date(task.dueDate) < new Date() && task.status !== 'Complete'
    ).length;

    return { total, completed, inProgress, overdue };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTasksByUser,
    getTasksStats,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
