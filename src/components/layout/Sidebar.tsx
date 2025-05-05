
import React from 'react';
import { Home, Layers, Users, Settings, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <div className={cn("bg-purple min-h-screen w-[160px] text-white flex flex-col", className)}>
      <div className="p-4 flex items-center gap-2">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-white border-2 border-purple"></div>
          </div>
          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center -ml-2">
            <div className="h-4 w-4 rounded-full bg-white border-2 border-purple"></div>
          </div>
        </div>
        <span className="text-xl font-bold">gaddr</span>
      </div>
      
      <div className="mt-8 space-y-1">
        <p className="px-4 text-xs text-purple-light mb-2">Workspaces</p>
        
        <div className="flex items-center px-4 py-2 bg-purple-dark">
          <div className="h-6 w-6 rounded-full bg-gray-300 flex-shrink-0 mr-2"></div>
          <span className="text-sm">Workspace name</span>
        </div>
        
        <div className="mt-6 space-y-1">
          <NavItem icon={<Home size={16} />} label="Home" />
          <NavItem icon={<Layers size={16} />} label="Agenda" />
          <NavItem icon={<Users size={16} />} label="Members" />
          <NavItem icon={<Settings size={16} />} label="Settings" />
        </div>
        
        <div className="mt-6 px-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-purple-light">Projects</p>
            <ChevronDown size={16} className="text-purple-light" />
          </div>
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
    <div className={cn(
      "flex items-center px-4 py-2 hover:bg-purple-dark cursor-pointer",
      active && "bg-purple-dark"
    )}>
      <div className="flex-shrink-0 w-6 mr-2">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default Sidebar;
