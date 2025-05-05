
import React from 'react';
import Sidebar from './Sidebar';
import BoardHeader from '../board/BoardHeader';
import BoardToolbar from '../board/BoardToolbar';
import KanbanBoard from '../board/KanbanBoard';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <BoardHeader />
        <BoardToolbar />
        <main className="flex-1">
          {children || <KanbanBoard />}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
