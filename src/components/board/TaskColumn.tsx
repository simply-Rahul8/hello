
import React from 'react';
import { Plus, X, MoreHorizontal } from 'lucide-react';

interface TaskColumnProps {
  title: string;
  count: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, count }) => {
  return (
    <div className="task-column">
      <div className="task-column-header">
        <div className="flex items-center gap-2">
          <span className="task-column-title">{title}</span>
          <span className="text-gray-500 text-sm">({count})</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      
      <button className="task-add-button">
        <Plus size={16} />
        <span>Add a task</span>
      </button>
    </div>
  );
};

export default TaskColumn;
