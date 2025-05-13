
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
          <Link to="/dashboard">
            <Button variant="default">Dashboard</Button>
          </Link>
          <Link to="/talent-announcement">
            <Button variant="default">Talent Announcement</Button>
          </Link>
          <Link to="/job-requirements">
            <Button variant="outline">Job Requirements</Button>
          </Link>
          <Link to="/job-posting">
            <Button variant="outline">Job Posting</Button>
          </Link>
          <Link to="/project-deadline">
            <Button variant="outline">Project Deadline</Button>
          </Link>
          <Link to="/NotFound">
            <Button variant="outline">NotFound</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
