
import React from 'react';
import { Bell, Lock } from 'lucide-react';

const BoardHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">My bakery</h1>
        
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

        {/* Profile pictures */}
        <div className="flex -space-x-2">
          <div className="h-8 w-8 rounded-full bg-[#33C3F0] flex items-center justify-center text-white text-xs border-2 border-white">
            AP
          </div>
          <div className="h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center text-white text-xs border-2 border-white">
            JP
          </div>
          <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 relative border-2 border-white">
            <img
              src="/assets/profileImage.png"
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
