
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link } from "lucide-react";

interface JobDetailsFormProps {
  companyTitle: string;
  setCompanyTitle: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
  contactPhone: string;
  setContactPhone: (value: string) => void;
  skills: string[];
  setSkills: (skills: string[]) => void;
  newSkill: string;
  setNewSkill: (skill: string) => void;
  uploadedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (skill: string) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  companyTitle, setCompanyTitle,
  jobDescription, setJobDescription,
  contactEmail, setContactEmail,
  contactPhone, setContactPhone,
  skills, setSkills,
  newSkill, setNewSkill,
  uploadedFile, handleFileChange,
  handleAddSkill, handleRemoveSkill
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="company-title">Title of your company *</Label>
        <Textarea 
          id="company-title" 
          placeholder="Ex: Apple company Inc." 
          className="mt-2 resize-none"
          value={companyTitle}
          onChange={(e) => setCompanyTitle(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="logo-file">Company logo file</Label>
        <div className="mt-2 border border-gray-300 rounded-md p-4">
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-3" onClick={() => document.getElementById('logo-upload')?.click()}>
              <span>Attach a file</span>
            </Button>
            <div className="text-sm text-gray-500">
              {uploadedFile ? uploadedFile.name : 'Drag & drop your company logo here (.jpg, .png, .SVG)'}
            </div>
            <input 
              id="logo-upload"
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="job-description">Job description *</Label>
        <Card className="mt-2">
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
              id="job-description" 
              placeholder="The more details you provide, the better we can help you find the right person."
              rows={6}
              className="border-none resize-none focus-visible:ring-0 p-0"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Label className="mb-2 block">What skills are required? *</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map(skill => (
            <div 
              key={skill} 
              className="bg-gray-100 rounded-md px-2 py-1 text-sm flex items-center"
            >
              {skill}
              <button 
                onClick={() => handleRemoveSkill(skill)} 
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <Input
            placeholder="Add skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleAddSkill} type="button" variant="outline">
            + Add skills
          </Button>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">Preferred years of experience *</Label>
        <div className="space-y-2">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="0-2 Yrs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 Yrs</SelectItem>
              <SelectItem value="3-5">3-5 Yrs</SelectItem>
              <SelectItem value="6-10">6-10 Yrs</SelectItem>
              <SelectItem value="10+">10+ Yrs</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="3-5 Yrs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 Yrs</SelectItem>
              <SelectItem value="3-5">3-5 Yrs</SelectItem>
              <SelectItem value="6-10">6-10 Yrs</SelectItem>
              <SelectItem value="10+">10+ Yrs</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="6-10 Yrs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2 Yrs</SelectItem>
              <SelectItem value="3-5">3-5 Yrs</SelectItem>
              <SelectItem value="6-10">6-10 Yrs</SelectItem>
              <SelectItem value="10+">10+ Yrs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label className="mb-2 block">Contact information for candidates (email, phone number, etc)</Label>
        <div className="space-y-3">
          <div className="flex items-center">
            <Input 
              placeholder="Enter contact email..." 
              className="w-full" 
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
            <span className="text-red-500 ml-2">*</span>
          </div>
          <div className="flex items-center">
            <Input 
              placeholder="Enter contact phone number..." 
              className="w-full"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)} 
            />
            <span className="text-red-500 ml-2">*</span>
          </div>
          <Input placeholder="LinkedIn profile URL..." className="w-full" />
          <Button variant="outline" className="w-full" type="button">
            + Add other contact method
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForm;
