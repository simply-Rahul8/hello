
import React from 'react';
import { Layers } from 'lucide-react';

const BoardToolbar: React.FC = () => {
  return (
    <div className="flex items-center p-4">
      <div className="flex items-center text-gray-700 mr-6">
        <Layers size={18} className="mr-2" />
        <span className="font-medium">Board</span>
      </div>
    </div>
  );
};

export default BoardToolbar;
