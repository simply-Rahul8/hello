
import React, { useState } from 'react';
import { MoreHorizontal, Clock, Users, Paperclip, FileText, Tag, CheckSquare } from 'lucide-react';
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

  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleOutsourceTask = () => {
    // Navigate to outsourcing page
    toast.info('Navigating to outsource talent page');
  };

  const handleAddAssignees = () => {
    toast.info('Add assignees clicked');
  };

  const handleAddDeadline = () => {
    toast.info('Add deadline clicked');
  };

  const handleAddPriority = () => {
    toast.info('Add priority clicked');
  };

  const handleAddDescription = () => {
    toast.info('Add description clicked');
  };

  const handleAttachFile = () => {
    toast.info('Attach file clicked');
  };

  const handleAddWatchers = () => {
    toast.info('Add watchers clicked');
  };

  const handleAddLabels = () => {
    toast.info('Add labels clicked');
  };

  const handleAddSubtasks = () => {
    toast.info('Add subtasks clicked');
  };

  return (
    <Card className="mb-2 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-md overflow-hidden">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded-sm border-gray-300 text-[#9b87f5] focus:ring-[#9b87f5] mr-2"
              onChange={handleTaskComplete}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600 rounded-md p-1 hover:bg-gray-100">
                <MoreHorizontal size={14} />
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

        <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>

        {/* Task options that expand on click */}
        <div className={`mt-2 space-y-1 ${isExpanded ? 'block' : 'hidden'}`}>
          {assignedMembers.length === 0 && (
            <button 
              className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
              onClick={handleAddAssignees}
            >
              <Users size={12} />
              <span>Add assignees</span>
            </button>
          )}
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddDeadline}
          >
            <Clock size={12} />
            <span>Add a deadline</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddPriority}
          >
            <Tag size={12} />
            <span>Select a priority</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddDescription}
          >
            <FileText size={12} />
            <span>Add a description</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAttachFile}
          >
            <Paperclip size={12} />
            <span>Attach a file</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddWatchers}
          >
            <Users size={12} />
            <span>Add watchers</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddLabels}
          >
            <Tag size={12} />
            <span>Add labels</span>
          </button>
          
          <button 
            className="flex items-center gap-2 text-gray-500 text-xs hover:text-gray-800 p-1 hover:bg-gray-50 rounded-md w-full"
            onClick={handleAddSubtasks}
          >
            <CheckSquare size={12} />
            <span>Add subtasks</span>
          </button>
          
          <Link 
            to="/outsourcing/announcement" 
            className="flex items-center justify-center w-full bg-[#33C3F0] text-white py-1 px-2 rounded-md text-xs mt-2 hover:bg-[#28acd7] transition-colors"
          >
            Outsource talent for task
          </Link>
        </div>
        
        {/* Show assignees if any */}
        {assignedMembers.length > 0 && !isExpanded && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex -space-x-2">
              {assignedMembers.map((member, index) => (
                member && (
                  <Avatar key={member.id} className="h-5 w-5 border-2 border-white">
                    <AvatarFallback className={`${member.color} text-white text-[10px]`}>
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                )
              ))}
            </div>
          </div>
        )}
        
        {/* Button to toggle expanded view */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 w-full flex justify-center items-center"
        >
          <div className="h-5 w-5 text-gray-400 hover:bg-gray-100 rounded-full flex items-center justify-center">
            {isExpanded ? '▲' : '▼'}
          </div>
        </button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
