
import React from 'react';
import { Bell, Lock } from 'lucide-react';

const BoardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {/* Profile image using native img */}
        <div className="mr-4 w-8 h-8 rounded-full overflow-hidden">
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

        {/* Optional extra profile placeholder */}
        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 mr-2 relative">
            <img
              src="/assets/profileImage.png"
              alt="User"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
      </div>
    </div>
  );
};

export default BoardHeader;
