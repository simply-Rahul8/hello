
import React from 'react';
import { Plus, X, MoreHorizontal, Clock, Users, Paperclip, CheckSquare, Eye, Tag, ListChecks } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
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
            {task.inProgress && (
              <div className="flex justify-between items-center mb-2">
                <input type="checkbox" className="h-4 w-4" />
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            )}
            <h3 className="font-medium text-black">{task.title}</h3>
            {task.inProgress && (
              <div className="mt-6">
                <div className="flex flex-col gap-3 text-gray-500 text-sm">
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Users size={14} />
                    <span>Add assignees</span>
                  </button>
                  
                  <button className="w-full bg-[#33C3F0] text-white py-1.5 px-2 rounded-md flex items-center justify-center gap-1 text-sm">
                    <span>Outsource talent for task</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Clock size={14} />
                    <span>Add a deadline</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <CheckSquare size={14} />
                    <span>Select a priority</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Paperclip size={14} />
                    <span>Add a description</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Paperclip size={14} />
                    <span>Attach a file</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Eye size={14} />
                    <span>Add watchers</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <Tag size={14} />
                    <span>Add labels</span>
                  </button>
                  
                  <button className="flex items-center gap-2 hover:text-gray-800">
                    <ListChecks size={14} />
                    <span>Add subtasks</span>
                  </button>
                </div>
              </div>
            )}
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
