
import React from 'react';
import TaskColumn from './TaskColumn';

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  assignees?: string[];
  list?: string;
}

const KanbanBoard: React.FC = () => {
  // Sample task data
  const todoTasks: Task[] = [
    { 
      id: '2', 
      title: 'Design a logo', 
      list: 'to_do',
      assignees: [] 
    }
  ];
  
  const inProgressTasks: Task[] = [
    { 
      id: '1', 
      title: 'Design a logo', 
      inProgress: true,
      list: 'in_progress',
      assignees: [] 
    }
  ];
  
  const completedTasks: Task[] = [
    { 
      id: '3', 
      title: 'Write a task', 
      list: 'completed',
      assignees: [] 
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
      <TaskColumn 
        title="To do" 
        count={todoTasks.length}
        tasks={todoTasks}
      />
      <TaskColumn 
        title="In progress" 
        count={inProgressTasks.length}
        tasks={inProgressTasks} 
      />
      <TaskColumn 
        title="Completed" 
        count={completedTasks.length}
        tasks={completedTasks}
      />
    </div>
  );
};

export default KanbanBoard;
