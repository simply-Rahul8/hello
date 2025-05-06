
import React from 'react';
import TaskColumn from './TaskColumn';

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  assignees?: string[];
}

const KanbanBoard: React.FC = () => {
  const todoTasks: Task[] = [];
  
  const inProgressTasks: Task[] = [
    { 
      id: '1', 
      title: 'Design a logo', 
      inProgress: true,
      assignees: [] 
    }
  ];
  
  const completedTasks: Task[] = [];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
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
