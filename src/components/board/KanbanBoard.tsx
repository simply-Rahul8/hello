
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
  const todoTasks: Task[] = [];
  
  const inProgressTasks: Task[] = [
    { 
      id: '1', 
      title: 'Design a logo', 
      inProgress: true,
      list: 'in_progress',
      assignees: [] 
    }
  ];
  
  const completedTasks: Task[] = [];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
      <TaskColumn 
        title="To do" 
        count={0}
        tasks={todoTasks}
      />
      <TaskColumn 
        title="In progress" 
        count={1}
        tasks={inProgressTasks} 
      />
      <TaskColumn 
        title="Completed" 
        count={0}
        tasks={completedTasks}
      />
    </div>
  );
};

export default KanbanBoard;
