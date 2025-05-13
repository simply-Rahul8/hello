
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Calendar, Users } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { id: string; title: string; list: string; assignees?: string[] }) => void;
  columnId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, columnId }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSave = () => {
    if (taskTitle.trim()) {
      onSave({
        id: Math.random().toString(36).substr(2, 9),
        title: taskTitle,
        list: columnId,
        assignees: []
      });
      setTaskTitle('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Create Task</DialogTitle>
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
          
          <div className="flex items-center space-x-3">
            <ContextMenu>
              <ContextMenuTrigger>
                <Button variant="outline" size="sm" className="hover:bg-gray-100">
                  <Calendar size={16} className="mr-2 text-gray-500" />
                  <span>Add deadline</span>
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem>Today</ContextMenuItem>
                <ContextMenuItem>Tomorrow</ContextMenuItem>
                <ContextMenuItem>This week</ContextMenuItem>
                <ContextMenuItem>Next week</ContextMenuItem>
                <ContextMenuItem>Custom date</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            
            <ContextMenu>
              <ContextMenuTrigger>
                <Button variant="outline" size="sm" className="hover:bg-gray-100">
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span>Add assignees</span>
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem>John Doe</ContextMenuItem>
                <ContextMenuItem>Jane Smith</ContextMenuItem>
                <ContextMenuItem>Alex Johnson</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            
            <Button variant="outline" size="sm" className="hover:bg-gray-100">
              <Paperclip size={16} className="mr-2 text-gray-500" />
              <span>Add attachment</span>
            </Button>
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
