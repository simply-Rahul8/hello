
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Image, Linkedin, Share } from "lucide-react";
import { toast } from 'sonner';
import { generateHashtags } from "@/utils/LinkedinUtils";

interface LinkedInPreviewProps {
  companyTitle: string;
  jobDescription: string;
  skills: string[];
  contactEmail: string;
  contactPhone: string;
  useHashtags: boolean;
  setUseHashtags: (value: boolean) => void;
  linkedinImage: File | null;
  linkedinImagePreview: string | null;
  setLinkedinImage: (file: File | null) => void;
  setLinkedinImagePreview: (preview: string | null) => void;
  postVisibility: string;
  setPostVisibility: (visibility: string) => void;
  isPublishing: boolean;
  handlePublishToLinkedIn: () => void;
  handleCopyToClipboard: () => void;
  handleLinkedinImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  companyTitle, jobDescription, skills, 
  contactEmail, contactPhone, 
  useHashtags, setUseHashtags,
  linkedinImage, linkedinImagePreview,
  setLinkedinImage, setLinkedinImagePreview,
  postVisibility, setPostVisibility,
  isPublishing, handlePublishToLinkedIn,
  handleCopyToClipboard, handleLinkedinImageChange
}) => {
  return (
    <div className="space-y-6">
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
                {generateHashtags(skills, useHashtags) || "#UX/UI #Illustration #HTML #WebDesign #Research"}
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
              <Button variant="outline" size="sm" className="ml-2" onClick={() => {
                navigator.clipboard.writeText("https://gaddr.com/jobs/design-logo-bakery?ref=linkedin-share");
                toast.success("URL copied to clipboard!");
              }}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        
      </div>
    </div>
  );
};

export default LinkedInPreview;
