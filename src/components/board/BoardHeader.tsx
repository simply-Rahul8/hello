
import React from 'react';
import { Bell, Layers, Lock } from 'lucide-react';

const BoardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className="mr-4 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-700">
          <span>P</span>
        </div>
        <h1 className="text-xl font-bold">Project name</h1>
        
        <div className="flex ml-6 space-x-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-sm bg-gray-200"></div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} className="text-gray-700" />
        </button>
        
        <button className="flex items-center gap-2 text-gray-700 font-medium px-3 py-1 border rounded-md">
          <Lock size={16} />
          <span>Logged</span>
        </button>
        
        <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center"></div>
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default BoardHeader;
