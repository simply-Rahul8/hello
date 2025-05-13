
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Calendar, Tag, FileText, Paperclip, Users, Clock, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  inProgress?: boolean;
  assignees?: string[];
  list?: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  columnId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, columnId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [showAssigneesDropdown, setShowAssigneesDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [priority, setPriority] = useState('');
  
  // Sample team members (in a real app, this would come from props or context)
  const teamMembers = [
    { id: '1', name: 'John Doe', initials: 'JD', color: 'bg-blue-500' },
    { id: '2', name: 'Jane Smith', initials: 'JS', color: 'bg-green-500' },
    { id: '3', name: 'Alex Johnson', initials: 'AJ', color: 'bg-purple-500' },
  ];
  
  const priorityOptions = [
    { id: 'high', label: 'High', color: 'bg-red-500' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { id: 'low', label: 'Low', color: 'bg-green-500' },
  ];

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('Please provide a task title');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      list: columnId,
      assignees: selectedAssignees,
    };
    
    onSave(newTask);
    toast.success('Task created successfully');
    resetForm();
    onClose();
  };

  const toggleAssignee = (id: string) => {
    setSelectedAssignees(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const setPriorityValue = (priorityId: string) => {
    setPriority(priorityId);
    setShowPriorityDropdown(false);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedAssignees([]);
    setPriority('');
  };

  const handleAddDeadline = () => {
    toast.info("Add deadline feature clicked");
  };

  const handleAddDescription = () => {
    toast.info("Add description feature clicked");
  };

  const handleAttachFile = () => {
    toast.info("Attach file feature clicked");
  };

  const handleAddWatchers = () => {
    toast.info("Add watchers feature clicked");
  };

  const handleAddLabels = () => {
    toast.info("Add labels feature clicked");
  };

  const handleAddSubtasks = () => {
    toast.info("Add subtasks feature clicked");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input 
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 text-lg font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />
          
          <div className="text-sm text-gray-500">
            {columnId && (
              <div className="text-xs">
                in list <span className="text-blue-500">{columnId.replace('_', ' ')}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <button
                className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md"
                onClick={() => setShowAssigneesDropdown(!showAssigneesDropdown)}
              >
                <Users size={16} />
                <span>
                  {selectedAssignees.length === 0 
                    ? 'Add assignees' 
                    : `${selectedAssignees.length} assignee${selectedAssignees.length > 1 ? 's' : ''}`}
                </span>
              </button>
              
              {showAssigneesDropdown && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-1">
                  {teamMembers.map(member => (
                    <button
                      key={member.id}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
                        selectedAssignees.includes(member.id) ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleAssignee(member.id)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={`${member.color} text-white text-xs`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                      {selectedAssignees.includes(member.id) && (
                        <CheckSquare size={16} className="ml-auto text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAddDeadline}
            >
              <Clock size={16} />
              <span>Add a deadline</span>
            </button>

            <div className="relative">
              <button
                className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              >
                <Tag size={16} />
                <span>{priority ? `Priority: ${priorityOptions.find(p => p.id === priority)?.label}` : 'Select a priority'}</span>
              </button>
              
              {showPriorityDropdown && (
                <div className="absolute z-10 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg p-1">
                  {priorityOptions.map(option => (
                    <button
                      key={option.id}
                      className={`flex items-center gap-2 w-full text-left p-2 rounded-md ${
                        priority === option.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setPriorityValue(option.id)}
                    >
                      <span className={`h-3 w-3 rounded-full ${option.color}`}></span>
                      <span>{option.label}</span>
                      {priority === option.id && (
                        <CheckSquare size={16} className="ml-auto text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAddDescription}
            >
              <FileText size={16} />
              <span>Add a description</span>
            </button>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAttachFile}
            >
              <Paperclip size={16} />
              <span>Attach a file</span>
            </button>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAddWatchers}
            >
              <Users size={16} />
              <span>Add watchers</span>
            </button>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAddLabels}
            >
              <Tag size={16} />
              <span>Add labels</span>
            </button>
            
            <button
              className="flex items-center gap-2 text-gray-600 text-sm p-1 hover:bg-gray-50 rounded-md w-full text-left"
              onClick={handleAddSubtasks}
            >
              <CheckSquare size={16} />
              <span>Add subtasks</span>
            </button>
            
            <Button 
              onClick={handleSave} 
              className="w-full bg-[#9b87f5] hover:bg-[#8a74e2] text-white mt-3"
              variant="outline"
              size="sm"
            >
              Create task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
