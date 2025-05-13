
import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import { toast } from 'sonner';

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
      assignees: ['1', '3'] 
    },
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
    <div className="flex flex-col p-4 bg-white">
      {/* Board header with tabs */}
      <div className="flex space-x-4 mb-4 border-b border-gray-200">
        <button className="pb-2 px-2 text-sm font-medium border-b-2 border-[#9b87f5]">List</button>
        <button className="pb-2 px-2 text-sm font-medium text-gray-500">Board</button>
        <button className="pb-2 px-2 text-sm font-medium text-gray-500">Calendar</button>
        <button className="pb-2 px-2 text-sm font-medium text-gray-500 flex items-center">
          <span className="mr-1">+</span> more views
        </button>
      </div>
      
      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
      </div>

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
