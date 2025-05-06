
import React from 'react';
import { Plus, X, MoreHorizontal, Clock, Users, Paperclip } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

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
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, count, tasks }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 min-h-[200px] w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{title}</span>
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
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
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
            
            <button className="w-full bg-[#33C3F0] text-white py-1.5 px-2 rounded-md flex items-center justify-center gap-1 text-sm mt-3">
              <span>Outsource talent for task</span>
            </button>
          </CardContent>
        </Card>
      ))}

      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded flex items-center justify-center gap-2 mt-2">
        <Plus size={16} />
        <span>Add a task</span>
      </button>
    </div>
  );
};

export default TaskColumn;
