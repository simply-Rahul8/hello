import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  Layers,
  Users,
  Settings,
  ChevronDown,
  Bell,
  Briefcase,
  FileText,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [planningExpanded, setPlanningExpanded] = useState(true);
  const [outsourcingExpanded, setOutsourcingExpanded] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className={cn(
      "bg-gradient-to-b from-[#282625] to-[#6E1F87] min-h-screen w-[220px] text-white flex flex-col",
      className
    )}>
      {/* Logo & header */}
      <div className="p-4 flex items-center gap-2">
        <div className="flex items-center">
          <img
            src='../../assets/gaddr.png'
            alt='Gaddr Logo'
            className='h-12'
          />
        </div>
      </div>

      {/* White separator */}
      <div className="border-t border-white/20 mx-2 my-2"></div>

      {/* Workspaces Section */}
      <div className="px-4 py-2">
        <p className="text-xs text-gray-300 mb-2">Workspaces</p>

        <div className="flex items-center gap-2 bg-[#5c1a77] rounded-md p-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-purple-800 font-bold text-sm">
          <img
            src='../../assets/user-icon.png'
            alt='user Logo'
            className='h-8'
          />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Workspace</span>
            <span className="text-xs text-gray-300">name</span>
          </div>
        </div>
      </div>

      {/* White separator */}
      <div className="border-t border-white/20 mx-2 my-2"></div>

      {/* Navigation */}
      <div className="mt-2 px-4 flex-1">
        {/* Business Suite Header */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-300 font-medium">BUSINESS SUITE</p>
          <ChevronDown size={14} className="text-gray-300" />
        </div>

        <div className="border-t border-white/20 mx-0 my-2"></div>

        {/* Project Planning Section */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setPlanningExpanded(!planningExpanded)}
          >
            <p className="text-xs text-gray-300">Project planning and</p>
            <ChevronDown
              size={14}
              className={cn(
                "text-gray-300 transition-transform",
                planningExpanded ? "transform rotate-180" : ""
              )}
            />
          </div>
          <p className="text-xs text-gray-300 mb-2">management</p>

          {planningExpanded && (
            <div className="pl-2 mt-1 space-y-1">
              <NavItem
                icon={<Home size={16} />}
                label="Dashboard"
                active={isActive('/dashboard')}
                onClick={() => navigate('/dashboard')}
              />
              <NavItem
                icon={<Layers size={16} />}
                label="Task creation & management"
                active={isActive('/dashboard')}
                onClick={() => navigate('/dashboard')}
              />
              <NavItem
                icon={<Users size={16} />}
                label="Overview"
                active={isActive('/dashboard')}
                onClick={() => navigate('/dashboard')}
              />
            </div>
          )}
        </div>

        {/* White separator */}
        <div className="border-t border-white/20 mx-0 my-2"></div>

        {/* Outsourcing Section */}
        <div className="mt-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setOutsourcingExpanded(!outsourcingExpanded)}
          >
            <p className="text-xs text-gray-300 font-medium">Outsourcing</p>
            <ChevronDown
              size={14}
              className={cn(
                "text-gray-300 transition-transform",
                outsourcingExpanded ? "transform rotate-180" : ""
              )}
            />
          </div>

          <div className="border-t border-white/20 mx-0 my-2"></div>

          {outsourcingExpanded && (
            <div className="pl-2 mt-1 space-y-1">
              <NavItem
                icon={<FileText size={16} />}
                label="Announcement"
                active={isActive('/outsourcing/announcement')}
                onClick={() => navigate('/outsourcing/announcement')}
              />
              <NavItem
                icon={<Briefcase size={16} />}
                label="Requirement"
                active={isActive('/outsourcing/requirement')}
                onClick={() => navigate('/outsourcing/requirement')}
              />
              <NavItem
                icon={<FileText size={16} />}
                label="Job Posting"
                active={isActive('/outsourcing/job-posting')}
                onClick={() => navigate('/outsourcing/job-posting')}
              />
              <NavItem
                icon={<CalendarDays size={16} />}
                label="Project Deadline"
                active={isActive('/outsourcing/project-deadline')}
                onClick={() => navigate('/outsourcing/project-deadline')}
              />
            </div>
          )}
        </div>
      </div>

      {/* White separator */}
      <div className="border-t border-white/20 mx-2 my-2"></div>

      {/* Footer Nav */}
      <div className="mt-auto mb-4 space-y-1 px-4">
        <NavItem icon={<Bell size={16} />} label="Notifications" badge={true} />
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
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge, onClick }) => {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer border-b border-white/20",
        // Removed dark background
        active && "font-semibold"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-6 mr-2 text-white relative">
        {icon}
        {badge && (
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full"></div>
        )}
      </div>
      <span className="text-sm truncate">{label}</span>
    </div>
  );
};

export default Sidebar;
