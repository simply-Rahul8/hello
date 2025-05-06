
import React from 'react';
import { List, Kanban, Calendar, Plus } from 'lucide-react';

const BoardToolbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <button className="flex items-center text-gray-700 px-3 py-1 hover:bg-gray-100 rounded">
          <List size={18} className="mr-2" />
          <span className="font-medium">List</span>
        </button>
        
        <button className="flex items-center text-gray-700 bg-gray-100 px-3 py-1 rounded">
          <Kanban size={18} className="mr-2" />
          <span className="font-medium">Board</span>
        </button>
        
        <button className="flex items-center text-gray-700 px-3 py-1 hover:bg-gray-100 rounded">
          <Calendar size={18} className="mr-2" />
          <span className="font-medium">Calendar</span>
        </button>
      </div>
      
      <button className="flex items-center text-gray-700 px-3 py-1 hover:bg-gray-100 rounded">
        <Plus size={18} className="mr-2" />
        <span className="font-medium">more views</span>
      </button>
    </div>
  );
};

export default BoardToolbar;
