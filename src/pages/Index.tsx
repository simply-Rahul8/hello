
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Available Pages</h1>
        <div className="flex flex-col gap-4">
          <Link to="/job-requirements">
            <Button variant="default">Job Requirements</Button>
          </Link>
          <Link to="/job-posting">
            <Button variant="outline">Job Posting</Button>
          </Link>
          <Link to="/project-deadline">
            <Button variant="outline">Project Deadline</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
