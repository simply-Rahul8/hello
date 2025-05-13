
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  assignees?: string[];
  list?: string;
}

const KanbanBoard: React.FC = () => {
  // Sample task data
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: '1', 
      title: 'Design a logo', 
      inProgress: true,
      list: 'in_progress',
      assignees: [] 
    },
    { 
      id: '2', 
      title: 'Design a logo', 
      list: 'to_do',
      assignees: [] 
    },
    { 
      id: '3', 
      title: 'Write a task', 
      list: 'completed',
      assignees: [] 
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');

  // Filter tasks by their list
  const todoTasks = tasks.filter(task => task.list === 'to_do');
  const inProgressTasks = tasks.filter(task => task.list === 'in_progress');
  const completedTasks = tasks.filter(task => task.list === 'completed');

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const openTaskModal = (columnId: string) => {
    setCurrentColumn(columnId);
    setIsModalOpen(true);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
      <TaskColumn 
        title="To do" 
        count={todoTasks.length}
        tasks={todoTasks}
        onAddTask={() => openTaskModal('to_do')}
      />
      <TaskColumn 
        title="In progress" 
        count={inProgressTasks.length}
        tasks={inProgressTasks}
        onAddTask={() => openTaskModal('in_progress')}
      />
      <TaskColumn 
        title="Completed" 
        count={completedTasks.length}
        tasks={completedTasks}
        onAddTask={() => openTaskModal('completed')}
      />

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
        columnId={currentColumn}
      />
    </div>
  );
};

export default KanbanBoard;
