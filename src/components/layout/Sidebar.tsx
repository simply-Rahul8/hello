
import React from 'react';
import { Home, Layers, Users, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn(
      "bg-gradient-to-b from-[#282625] to-[#6E1F87] min-h-screen w-[160px] text-white flex flex-col",
      className
    )}>
      {/* Logo & header */}
      <div className="p-4 flex items-center gap-2">
        <div className="flex items-center">
          <img
            src='/assets/gaddr.png'
            alt='Logo'
            className='h-18 w-30 rounded-full'
          />
        </div>
      </div>

      {/* Workspace Section */}
      <div className="mt-8 space-y-1">
        <p className="px-4 text-xs text-purple-300 mb-2">Workspaces</p>

        <div className="flex items-center px-4 py-2 bg-[#5c1a77] rounded-md">
          <div className="h-15 w-15 rounded-full overflow-hidden flex-shrink-0 mr-2 relative">
            <img
              src="/assets/user-icon.png"
              alt="User"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 space-y-1">
          <NavItem icon={<Home size={16} />} label="Home" active />
          <NavItem icon={<Layers size={16} />} label="Agenda" />
          <NavItem icon={<Users size={16} />} label="Members" />
          <NavItem icon={<Settings size={16} />} label="Settings" />
        </div>

        {/* Projects Dropdown */}
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity duration-300">
            <p className="text-xs text-purple-300 font-medium">Projects</p>
            <ChevronDown size={16} className="text-purple-300 transition-transform duration-300 group-hover:rotate-180" />
          </div>
          <hr className="border-purple-400 mt-2" />
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => {
  return (
    <div
      className={cn(
        "flex items-center px-4 py-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:bg-[#1f1d1c] cursor-pointer",
        active && "bg-[#1f1d1c]"
      )}
    >
      <div className="flex-shrink-0 w-6 mr-2 text-white">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar;
