
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import KanbanBoard from '@/components/board/KanbanBoard';

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My bakery</h1>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Logged</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">All my projects</span>
          </div>
        </div>
        <KanbanBoard />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
