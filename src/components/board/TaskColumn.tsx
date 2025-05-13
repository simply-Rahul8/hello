
import React from 'react';
import { Plus, X, MoreHorizontal, Clock, Users, Paperclip } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
      
      {tasks.map(task => (
        <Card key={task.id} className="mb-3 bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <input type="checkbox" className="h-4 w-4 mt-1" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Move to In Progress</DropdownMenuItem>
                  <DropdownMenuItem>Move to Completed</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h3 className="font-medium text-black">{task.title}</h3>
            {task.list && (
              <div className="mt-1 text-xs text-gray-500">
                in list <span className="text-blue-500">{task.list.replace('_', ' ')}</span>
              </div>
            )}
            <div className="mt-5 space-y-2">
              <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-800">
                <Users size={14} />
                <span>Add assignees</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-800">
                <Clock size={14} />
                <span>Add a deadline</span>
              </button>
            </div>
            
            <Link to="/outsourcing/talent-announcement" className="block w-full mt-3">
              <button className="w-full bg-[#33C3F0] text-white py-1.5 px-2 rounded-md flex items-center justify-center gap-1 text-sm hover:bg-[#28acd7] transition-colors">
                <span>Outsource talent for task</span>
              </button>
            </Link>
          </CardContent>
        </Card>
      ))}

      <button className="task-add-button" onClick={onAddTask}>
        <Plus size={16} />
        <span>Add a task</span>
      </button>
    </div>
  );
};

export default TaskColumn;
