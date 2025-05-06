
import React from 'react';
import { Home, Layers, Users, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-[#282625] to-[#6E1F87] min-h-screen w-[180px] text-white flex flex-col",
      className
    )}>
      {/* Logo & header */}
      <div className="p-4 flex items-center gap-2">
        <div className="flex items-center">
          <img
            src='/lovable-uploads/f5cfae2c-7cc8-4c8d-80c1-9443d9e9eb08.png'
            alt='Gaddr Logo'
            className='h-8'
          />
        </div>
      </div>

      {/* Workspaces Section */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-300 mb-2">Workspaces</p>

        <div className="flex items-center gap-2 bg-[#5c1a77] rounded-md p-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-purple-800 font-bold text-sm">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Workspace</span>
            <span className="text-xs text-gray-300">name</span>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-300 font-medium">BUSINESS SUITE</p>
          <ChevronDown size={14} className="text-gray-300" />
        </div>
      </div>

      <div className="px-4 py-2 text-xs text-gray-300">
        <p className="mb-1">Project planning and</p>
        <p className="mb-2">management</p>
        <p className="ml-2 mb-1 text-[11px]">Task creation & management</p>
        <p className="ml-2 mb-1">Outsourcing</p>
        <p className="ml-2 mb-1">Overview</p>
      </div>

      {/* Navigation Links */}
      <div className="mt-4 space-y-1">
        <NavItem icon={<Home size={16} />} label="Home" active />
        <NavItem icon={<Bell size={16} />} label="Notifications" badge={true} />
      </div>

      <div className="mt-auto mb-4">
        <NavItem icon={<Bell size={16} />} label="Notifications" badge={true} />
        <NavItem icon={<Layers size={16} />} label="Overview" />
        <NavItem icon={<Users size={16} />} label="Members (3)" />
        <NavItem icon={<Settings size={16} />} label="Settings" />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge }) => {
  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#1f1d1c] cursor-pointer",
        active && "bg-[#1f1d1c]"
      )}
    >
      <div className="flex-shrink-0 w-6 mr-2 text-white relative">
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></div>
        )}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar;
