
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Calendar, Users, X, Check } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { id: string; title: string; list: string; assignees?: string[] }) => void;
  columnId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, columnId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);
  
  const teamMembers = [
    { id: '1', name: 'John Doe', initials: 'JD', color: 'bg-blue-500' },
    { id: '2', name: 'Jane Smith', initials: 'JS', color: 'bg-green-500' },
    { id: '3', name: 'Alex Johnson', initials: 'AJ', color: 'bg-purple-500' },
    { id: '4', name: 'Lisa Brown', initials: 'LB', color: 'bg-orange-500' },
  ];

  const dateOptions = [
    { label: 'Today', value: new Date().toLocaleDateString() },
    { label: 'Tomorrow', value: new Date(Date.now() + 86400000).toLocaleDateString() },
    { label: 'Next Week', value: new Date(Date.now() + 7 * 86400000).toLocaleDateString() }
  ];

  const handleSave = () => {
    if (taskTitle.trim()) {
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        title: taskTitle,
        list: columnId,
        assignees: selectedAssignees
      });
      setTaskTitle('');
      setSelectedAssignees([]);
      setDueDate(null);
      onClose();
      toast.success("Task created successfully!");
    } else {
      toast.error("Please enter a task title");
    }
  };

  const toggleAssignee = (id: string) => {
    setSelectedAssignees(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectDate = (date: string) => {
    setDueDate(date);
    setShowDatePicker(false);
    toast.success("Due date added");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Attachment added: ${file.name}`);
    }
  };

  const columnNames: Record<string, string> = {
    'to_do': 'To Do',
    'in_progress': 'In Progress',
    'completed': 'Completed'
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create Task in {columnNames[columnId] || 'Column'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div>
            <Input 
              autoFocus
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full text-base"
            />
          </div>
          
          {/* Selected assignees */}
          {selectedAssignees.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedAssignees.map(id => {
                const member = teamMembers.find(m => m.id === id);
                return member ? (
                  <div 
                    key={id} 
                    className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className={`${member.color} text-white text-xs`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{member.name}</span>
                    <button 
                      onClick={() => toggleAssignee(id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Due date display */}
          {dueDate && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 w-fit">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm">{dueDate}</span>
              <button 
                onClick={() => setDueDate(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <div className="flex items-center space-x-3">
            <DropdownMenu open={showDatePicker} onOpenChange={setShowDatePicker}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-gray-100">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>Add deadline</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {dateOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.label}
                    onClick={() => handleSelectDate(option.value)}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-gray-100">
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span>Add assignees</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {teamMembers.map(member => (
                  <DropdownMenuItem 
                    key={member.id} 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleAssignee(member.id)}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={`${member.color} text-white text-xs`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                    {selectedAssignees.includes(member.id) && (
                      <Check size={16} className="text-green-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <label>
              <Button variant="outline" size="sm" className="hover:bg-gray-100" as="div">
                <Paperclip size={16} className="mr-2 text-gray-500" />
                <span>Add attachment</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </Button>
            </label>
          </div>
        </div>
        
        <DialogFooter className="border-t pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
