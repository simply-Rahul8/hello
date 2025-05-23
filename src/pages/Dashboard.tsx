
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import KanbanBoard from '@/components/board/KanbanBoard';
import { Button } from '@/components/ui/button';
import { Share, Linkedin } from 'lucide-react';
import { redirectToLinkedIn } from '@/utils/LinkedinUtils';

const Dashboard = () => {
  const handleShareOnLinkedIn = () => {
    const content = `My bakery is looking for talented designers to help with branding and logo design. 
    Visit our job posting page to learn more and apply!`;
    
    redirectToLinkedIn(content);
  };

  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My bakery</h1>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Logged</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">All my projects</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 flex items-center gap-1"
              onClick={handleShareOnLinkedIn}
            >
              <Linkedin className="h-4 w-4" />
              Post Job on LinkedIn
            </Button>
          </div>
        </div>
        <KanbanBoard />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
