import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const Requirement = () => {
  const [jobRequirements, setJobRequirements] = useState('');
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!jobRequirements.trim()) {
      toast.error("Please provide some job requirements");
      return;
    }
    toast.success("Job requirements saved!");
    // In a real app, we'd save this data before navigating
    navigate('/outsourcing/job-posting');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.name.endsWith('.zip')) {
        toast.success(`Template uploaded: ${file.name}`);
        setShowTemplateDialog(false);
      } else {
        toast.error("Please upload a ZIP file");
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Workspace Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">workspace</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-gradient-to-b from-blue-100 to-blue-200 rounded-xl p-8">
          <div className="relative">
            {/* Stars - keep existing code */}
            <div className="absolute top-2 left-20 text-blue-400 text-4xl">✦</div>
            <div className="absolute top-14 right-36 text-blue-300 text-2xl">✦</div>
            <div className="absolute top-40 left-36 text-blue-500 text-3xl">✦</div>
            <div className="absolute bottom-10 right-64 text-blue-300 text-2xl">✦</div>
            <div className="absolute bottom-36 left-72 text-blue-200 text-xl">✦</div>

            {/* Android Icon Circle */}
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300 mb-6">
              <div className="text-white text-2xl">
                {/* Android icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 16V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12" />
                  <path d="M1 16h22" />
                  <path d="M12 6h.01" />
                  <path d="M12 16v4" />
                  <path d="M8 16v4" />
                  <path d="M16 16v4" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell us what you need</h2>
              <p className="text-lg text-gray-700">Ready to create the perfect job ad? Let's get started!</p>
            </div>

            <div className="max-w-3xl mx-auto mb-6">
              <p className="text-gray-700 text-center mb-4">
                We'll guide you to create the perfect job ad. The more detail you provide, the better we can help 
                you find the right person.
              </p>

              <Textarea 
                className="min-h-32 bg-white"
                placeholder="Enter a few bullet points or a full description..." 
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              <Button 
                variant="default" 
                className="bg-[#2d2e51] hover:bg-[#22223e]"
                onClick={handleNext}
              >
                Next
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-white"
                onClick={() => setShowTemplateDialog(true)}
              >
                Create from template
              </Button>
              
              <Button 
                variant="link" 
                className="text-blue-600"
              >
                I prefer creating the brief on my own
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hidden file input */}
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".zip"
          onChange={handleFileUpload}
        />
        
        {/* Template upload dialog */}
        <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Template</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer" onClick={triggerFileInput}>
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Drop your ZIP file here or click to browse</p>
                <p className="text-xs text-gray-500 mt-1">Only ZIP files are supported</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Cancel</Button>
              <Button onClick={triggerFileInput}>Select File</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default Requirement;
