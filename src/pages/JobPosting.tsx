
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin } from "lucide-react";
import { toast } from 'sonner';
import AppLayout from "@/components/layout/AppLayout";
import JobDetailsForm from "@/components/job-posting/JobDetailsForm";
import LinkedInPreview from "@/components/job-posting/LinkedInPreview";
import { formatLinkedInPost, redirectToLinkedIn } from "@/utils/LinkedinUtils";

const JobPosting: React.FC = () => {
  // Original state
  const [skills, setSkills] = useState<string[]>([
    'UX/UI', 'Illustration', 'HTML', 'Web design', 'Research/validate', 'Team work', 'Photoshop'
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // LinkedIn post state
  const [companyTitle, setCompanyTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [useHashtags, setUseHashtags] = useState(true);
  const [linkedinImage, setLinkedinImage] = useState<File | null>(null);
  const [linkedinImagePreview, setLinkedinImagePreview] = useState<string | null>(null);
  const [postVisibility, setPostVisibility] = useState('public');
  const [isPublishing, setIsPublishing] = useState(false);
  
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

  // Function to handle LinkedIn post publishing
  const handlePublishToLinkedIn = () => {
    // Check required fields
    if (!companyTitle) {
      toast.error("Please enter your company title");
      return;
    }
    
    if (!jobDescription) {
      toast.error("Please provide a job description");
      return;
    }
    
    if (!contactEmail) {
      toast.error("Please provide a contact email");
      return;
    }
    
    setIsPublishing(true);
    
    // Format the post content
    const postContent = formatLinkedInPost(
      companyTitle,
      jobDescription,
      skills,
      contactEmail,
      contactPhone,
      useHashtags
    );
    
    // Directly redirect to LinkedIn
    redirectToLinkedIn(postContent);
    
    // Reset publishing state after a delay (since we're redirecting away)
    setTimeout(() => {
      setIsPublishing(false);
    }, 500);
  };
  
  // Function to copy the job post to clipboard
  const handleCopyToClipboard = () => {
    const postContent = formatLinkedInPost(
      companyTitle,
      jobDescription,
      skills,
      contactEmail,
      contactPhone,
      useHashtags
    );
    
    navigator.clipboard.writeText(postContent)
      .then(() => toast.success("Job post copied to clipboard!"))
      .catch(() => toast.error("Failed to copy. Please try again."));
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
          
          <TabsContent value="form">
            <JobDetailsForm 
              companyTitle={companyTitle}
              setCompanyTitle={setCompanyTitle}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              contactEmail={contactEmail}
              setContactEmail={setContactEmail}
              contactPhone={contactPhone}
              setContactPhone={setContactPhone}
              skills={skills}
              setSkills={setSkills}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              uploadedFile={uploadedFile}
              handleFileChange={handleFileChange}
              handleAddSkill={handleAddSkill}
              handleRemoveSkill={handleRemoveSkill}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <LinkedInPreview 
              companyTitle={companyTitle}
              jobDescription={jobDescription}
              skills={skills}
              contactEmail={contactEmail}
              contactPhone={contactPhone}
              useHashtags={useHashtags}
              setUseHashtags={setUseHashtags}
              linkedinImage={linkedinImage}
              linkedinImagePreview={linkedinImagePreview}
              setLinkedinImage={setLinkedinImage}
              setLinkedinImagePreview={setLinkedinImagePreview}
              postVisibility={postVisibility}
              setPostVisibility={setPostVisibility}
              isPublishing={isPublishing}
              handlePublishToLinkedIn={handlePublishToLinkedIn}
              handleCopyToClipboard={handleCopyToClipboard}
              handleLinkedinImageChange={handleLinkedinImageChange}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 pt-4 flex justify-start gap-4">
          <Button 
            className="bg-purple-600 flex items-center gap-2"
            onClick={() => {
              document.querySelector('[data-value="preview"]')?.dispatchEvent(new MouseEvent('click'));
              setTimeout(handlePublishToLinkedIn, 300);
            }}
          >
            <Linkedin size={16} />
            Publish to LinkedIn
          </Button>
          <Button variant="outline" onClick={() => toast.success("Draft saved successfully!")}>
            Save post as draft
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default JobPosting;
