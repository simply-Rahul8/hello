
import React from 'react';
import { Plus, X, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  list?: string;
  assignees?: string[];
}

interface TaskColumnProps {
  title: string;
  count: number;
  tasks: Task[];
  onAddTask: () => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, count, tasks, onAddTask }) => {
  const handleClearColumn = () => {
    toast.success(`Cleared all tasks from ${title}`);
  };
  
  return (
    <div className="task-column bg-gray-50 rounded-md p-3">
      <div className="task-column-header flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="task-column-title font-medium">{title}</span>
          <span className="text-gray-500 text-sm">({count})</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-500 hover:text-gray-700 rounded p-1 hover:bg-gray-200"
            onClick={handleClearColumn}
          >
            <X size={18} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-500 hover:text-gray-700 rounded p-1 hover:bg-gray-200">
                <MoreHorizontal size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Sort by Priority</DropdownMenuItem>
              <DropdownMenuItem>Sort by Due Date</DropdownMenuItem>
              <DropdownMenuItem>Sort by Name</DropdownMenuItem>
              <DropdownMenuItem onClick={handleClearColumn} className="text-red-500">
                Clear All Tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="task-column-content max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <button 
        className="task-add-button mt-3 w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-md py-2 text-gray-600 hover:bg-gray-50 transition-colors"
        onClick={onAddTask}
      >
        <Plus size={16} />
        <span>Add a task</span>
      </button>
    </div>
  );
};

export default TaskColumn;
