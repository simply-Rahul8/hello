
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Image, Hash, Send } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const JobPosting: React.FC = () => {
  // Original state
  const [skills, setSkills] = useState<string[]>([
    'UX/UI', 'Illustration', 'HTML', 'Web design', 'Research/validate', 'Team work', 'Photoshop'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // New state for LinkedIn preview
  const [companyTitle, setCompanyTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [useHashtags, setUseHashtags] = useState(true);
  const [linkedinImage, setLinkedinImage] = useState<File | null>(null);
  const [linkedinImagePreview, setLinkedinImagePreview] = useState<string | null>(null);
  const [postVisibility, setPostVisibility] = useState('public');
  
  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  // Function to handle LinkedIn image upload
  const handleLinkedinImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLinkedinImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLinkedinImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle adding skills
  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Function to handle removing skills
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Generate hashtags from skills
  const generateHashtags = () => {
    if (!useHashtags) return '';
    return skills.slice(0, 5).map(skill => `#${skill.replace(/\s+/g, '')}`).join(' ');
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">FlowerWork will help you to create an announcement for LinkedIn to find the right talent. You can post in on both Personal and Gaddr Job's LinkedIn accounts.</h1>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Outsource task: <span className="italic">"Design a logo for a bakery"</span></h2>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">Edit title of outsourced task: <span className="text-black">[Current title: "Design a logo for a bakery"]</span></p>
          </div>
        </div>
        
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="form">Job Details</TabsTrigger>
            <TabsTrigger value="preview">LinkedIn Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            <div className="bg-white p-4 border border-gray-300 rounded-lg">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Preview of your post</h2>
              </div>
              
              {/* LinkedIn Post Preview */}
              <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Post Header */}
                <div className="p-3 border-b border-gray-200 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                    {companyTitle ? companyTitle.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <div>
                    <div className="font-semibold">{companyTitle || 'gaddr'}</div>
                    <div className="text-xs text-gray-500">10h • ☑</div>
                  </div>
                  <div className="ml-auto flex">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                      <span>...</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500">
                      <span>✕</span>
                    </Button>
                  </div>
                </div>
                
                {/* Post Content */}
                <div className="p-4">
                  <div className="text-sm mb-4">
                    {jobDescription || "Looking for a talented graphic designer to work on an exciting bakery logo design project! The ideal candidate should have experience in brand identity design and a passion for creating memorable visual identities."}
                  </div>
                  
                  {/* Skills as hashtags */}
                  {useHashtags && (
                    <div className="text-sm text-blue-600 mb-4">
                      {generateHashtags() || "#UX/UI #Illustration #HTML #WebDesign #Research"}
                    </div>
                  )}
                  
                  {/* Contact info */}
                  {(contactEmail || contactPhone) && (
                    <div className="text-sm mb-4">
                      <div>Contact: {contactEmail}</div>
                      {contactPhone && <div>Phone: {contactPhone}</div>}
                    </div>
                  )}
                  
                  {/* Image preview */}
                  {linkedinImagePreview && (
                    <div className="mb-4 border border-gray-200 rounded overflow-hidden">
                      <img 
                        src={linkedinImagePreview} 
                        alt="Job post image" 
                        className="w-full h-auto max-h-96 object-contain"
                      />
                    </div>
                  )}
                </div>
                
                {/* Post Actions */}
                <div className="border-t border-gray-200 flex p-2">
                  <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center gap-1 text-gray-600">
                    <span>👍</span> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center gap-1 text-gray-600">
                    <span>💬</span> Comment
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center gap-1 text-gray-600">
                    <span>↪️</span> Repost
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center gap-1 text-gray-600">
                    <span>📤</span> Send
                  </Button>
                </div>
              </div>
              
              {/* LinkedIn Preview Options */}
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="text-base font-semibold mb-2">Post visibility</h3>
                  <RadioGroup value={postVisibility} onValueChange={setPostVisibility} className="flex">
                    <div className="flex items-center mr-4">
                      <RadioGroupItem value="public" id="public" className="mr-2" />
                      <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="connections" id="connections" className="mr-2" />
                      <Label htmlFor="connections">Connections</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="use-hashtags" className="text-base font-medium">Use hashtags</Label>
                    <p className="text-sm text-gray-500">Include hashtags from skills in your post</p>
                  </div>
                  <Switch 
                    id="use-hashtags" 
                    checked={useHashtags} 
                    onCheckedChange={setUseHashtags} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin-image" className="text-base font-medium block mb-2">Add image to LinkedIn post</Label>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => document.getElementById('linkedin-image-upload')?.click()}
                      className="flex items-center gap-2"
                    >
                      <Image size={16} />
                      <span>Add image</span>
                    </Button>
                    {linkedinImage && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setLinkedinImage(null);
                          setLinkedinImagePreview(null);
                        }}
                        className="text-red-500"
                      >
                        Remove image
                      </Button>
                    )}
                    <input 
                      id="linkedin-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLinkedinImageChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="share-url" className="text-base font-medium block mb-2">Share URL</Label>
                  <div className="flex">
                    <Input 
                      id="share-url"
                      value="https://gaddr.com/jobs/design-logo-bakery?ref=linkedin-share"
                      readOnly
                      className="flex-1 bg-gray-50 text-gray-500"
                    />
                    <Button variant="outline" size="sm" className="ml-2">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="bg-purple-600 flex items-center gap-2">
                <Send size={16} />
                Publish Post
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                Save post as draft
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 flex justify-start gap-4">
          <Button className="bg-purple-600">
            Publish Post
          </Button>
          <Button variant="outline">
            Save post as draft
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default JobPosting;

