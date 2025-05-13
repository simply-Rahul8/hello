
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DateTimePicker } from "@/components/DateTimePicker";

const ProjectDeadline: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [skills, setSkills] = useState<string[]>([
    'UX/UI', 'Illustration', 'HTML', 'Web design', 'Research/validate'
  ]);
  const [additionalSkill, setAdditionalSkill] = useState("");

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachments(Array.from(e.target.files));
    }
  };

  // Handle adding a skill
  const handleAddSkill = () => {
    if (additionalSkill.trim() && !skills.includes(additionalSkill.trim())) {
      setSkills([...skills, additionalSkill.trim()]);
      setAdditionalSkill("");
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Navigate to previous month in calendar
  const prevMonth = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() - 1);
      setSelectedDate(newDate);
    }
  };

  // Navigate to next month in calendar
  const nextMonth = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setMonth(newDate.getMonth() + 1);
      setSelectedDate(newDate);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-6">workspace</h1>
        
        <div className="space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium mb-2">
              Project name *
            </label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full"
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center border-b border-gray-200 pb-2 mb-2">
                  <div className="flex space-x-2 mr-4">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="h-5 border-r border-gray-300 mx-2"></div>
                  <div className="flex space-x-2 mr-4">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="h-5 border-r border-gray-300 mx-2"></div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="h-5 border-r border-gray-300 mx-2"></div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Add description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border-none resize-none focus-visible:ring-0 p-0"
                />
                <div className="text-xs text-gray-500 mt-2">
                  Characters used: 0 (max 60). You should add info on language and end result purpose.
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Attachments */}
          <div>
            <h2 className="text-sm font-medium mb-2">Attachments</h2>
            <div className="border border-gray-300 rounded-md p-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center">
                  <Button variant="outline" size="sm" className="mr-3">
                    or select files
                  </Button>
                  <span className="text-sm text-gray-500">
                    Drag & drop any file or document that might help (max 25 MB)
                  </span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          
          {/* Skills Required */}
          <div>
            <h2 className="text-sm font-medium mb-2">What skills are required? *</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map(skill => (
                <div 
                  key={skill} 
                  className="bg-gray-100 rounded-md px-3 py-1 text-sm flex items-center gap-1"
                >
                  {skill}
                  <button 
                    onClick={() => handleRemoveSkill(skill)} 
                    className="text-gray-500 hover:text-gray-700 ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex">
                <Input
                  placeholder="Freewriting"
                  value={additionalSkill}
                  onChange={(e) => setAdditionalSkill(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleAddSkill}>
              + Add skill
            </Button>
          </div>
          
          {/* Project Deadline */}
          <div>
            <h2 className="text-sm font-medium mb-2">Does your project have a deadline? *</h2>
            <div className="text-xs text-gray-500 mb-3">
              Pick a deadline when you need the work done
            </div>
            
            {/* Calendar and Time Selection Component */}
            <div className="border rounded-md p-4 max-w-md">
              <DateTimePicker 
                date={selectedDate}
                setDate={setSelectedDate}
                time={selectedTime}
                setTime={setSelectedTime}
              />
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs font-medium mb-1">Project deadline</div>
                  <div className="text-xs">Due date:</div>
                  <div className="text-sm font-medium">
                    {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium mb-1">Hour:</div>
                  <div className="text-sm font-medium">{selectedTime}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment Section */}
          <div>
            <h2 className="text-sm font-medium mb-2">How do you want to pay?</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-300 rounded-md p-4 flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Pay by hour</h3>
                  <p className="text-xs text-gray-500">Hourly billing for extended projects, billed for the hours spent</p>
                </div>
              </div>
              
              <div className="border border-gray-300 rounded-md p-4 flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Pay a fixed price</h3>
                  <p className="text-xs text-gray-500">Agree on a price before starting work for the assignment</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button>Next</Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProjectDeadline;
