
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
    <div className="task-column bg-gray-100 rounded-md overflow-hidden flex flex-col">
      <div className="task-column-header flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="task-column-title font-medium">{title}</span>
          <span className="text-gray-500 text-sm">({count})</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-500 hover:text-gray-700 rounded p-1 hover:bg-gray-200"
            onClick={handleClearColumn}
          >
            <X size={16} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-500 hover:text-gray-700 rounded p-1 hover:bg-gray-200">
                <MoreHorizontal size={16} />
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
      
      <div className="task-column-content flex-grow overflow-y-auto px-4 pb-2 max-h-[calc(100vh-280px)]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <button 
        className="px-4 py-2 mx-4 my-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded flex items-center justify-center text-sm font-medium"
        onClick={onAddTask}
      >
        <Plus size={16} className="mr-1" />
        Add a task
      </button>
    </div>
  );
};

export default TaskColumn;
