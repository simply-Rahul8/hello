
import React from 'react';
import { MoreHorizontal, Clock, Users, Paperclip } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  list?: string;
  assignees?: string[];
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Sample team members data (in a real app, this would come from props or context)
  const teamMembers = [
    { id: '1', name: 'John Doe', initials: 'JD', color: 'bg-blue-500' },
    { id: '2', name: 'Jane Smith', initials: 'JS', color: 'bg-green-500' },
    { id: '3', name: 'Alex Johnson', initials: 'AJ', color: 'bg-purple-500' },
  ];

  // Find assigned members for this task
  const assignedMembers = task.assignees?.map(id => 
    teamMembers.find(member => member.id === id)
  ).filter(Boolean) || [];

  const handleTaskComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    toast.success(`Task ${e.target.checked ? 'completed' : 'marked as incomplete'}: ${task.title}`);
  };

  const handleEdit = () => {
    toast.info(`Editing task: ${task.title}`);
  };

  const handleDelete = () => {
    toast.success(`Task deleted: ${task.title}`);
  };

  const handleMoveTask = (to: string) => {
    toast.success(`Task moved to ${to}: ${task.title}`);
  };

  return (
    <Card className="mb-3 bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <input 
            type="checkbox" 
            className="h-4 w-4 mt-1 rounded-sm border-gray-300 text-blue-500 focus:ring-blue-500"
            onChange={handleTaskComplete}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 rounded-md p-1 hover:bg-gray-100">
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMoveTask('To Do')}>
                Move to To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveTask('In Progress')}>
                Move to In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMoveTask('Completed')}>
                Move to Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleDelete} 
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        {task.list && (
          <div className="mt-1 text-xs text-gray-500">
            in list <span className="text-blue-500">{task.list.replace('_', ' ')}</span>
          </div>
        )}
        
        {/* Assignees display */}
        {assignedMembers.length > 0 && (
          <div className="mt-3 flex items-center gap-1">
            <div className="flex -space-x-2">
              {assignedMembers.map((member, index) => (
                member && (
                  <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className={`${member.color} text-white text-xs`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                )
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              {assignedMembers.length === 1 
                ? '1 assignee' 
                : `${assignedMembers.length} assignees`}
            </span>
          </div>
        )}
        
        <div className="mt-3 space-y-2">
          {assignedMembers.length === 0 && (
            <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md">
              <Users size={14} />
              <span>Add assignees</span>
            </button>
          )}
          <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md">
            <Clock size={14} />
            <span>Add a deadline</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md">
            <Paperclip size={14} />
            <span>Add attachment</span>
          </button>
        </div>
        
        <Link to="/outsourcing/announcement" className="block w-full mt-3">
          <button className="w-full bg-[#33C3F0] text-white py-1.5 px-2 rounded-md flex items-center justify-center gap-1 text-sm hover:bg-[#28acd7] transition-colors">
            <span>Outsource talent for task</span>
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
