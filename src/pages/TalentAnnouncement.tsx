
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Mic, Save, Edit, Copy, Trash2, X } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

type FormValues = {
  positionTitle: string;
  jobDescription: string;
  skillsRequired: string;
  experienceLevel: string;
  locationType: string;
  locationDetails: string;
  compensationRange: string;
  employmentType: string;
  additionalRequirements: string;
};

const TalentAnnouncement = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  
  const form = useForm<FormValues>({
    defaultValues: {
      positionTitle: '',
      jobDescription: '',
      skillsRequired: '',
      experienceLevel: '',
      locationType: '',
      locationDetails: '',
      compensationRange: '',
      employmentType: '',
      additionalRequirements: '',
    },
  });

  const watchedValues = form.watch();
  
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        
        // Simulate transcription (in a real app, this would call an API)
        setTimeout(() => {
          setTranscription("This is a sample transcription of the recorded audio. In a real implementation, this would be the result from a speech-to-text API call.");
          toast.success("Audio transcription completed");
        }, 1500);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.info("Recording started. Click Stop when finished.");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      toast.info("Recording stopped. Processing audio...");
    }
  };
  
  const applyTranscriptionToField = (fieldName: keyof FormValues) => {
    if (transcription) {
      form.setValue(fieldName, transcription);
      toast.success(`Transcription added to ${fieldName}`);
    }
  };
  
  const formatLinkedInAnnouncement = (data: FormValues) => {
    return `🔎 We're hiring a ${data.positionTitle}! 🔎\n\n` +
           `💼 Role Description:\n${data.jobDescription}\n\n` +
           `🌟 Skills Required:\n${data.skillsRequired}\n\n` +
           `📊 Experience Level: ${data.experienceLevel}\n\n` +
           `📍 Location: ${data.locationType}${data.locationDetails ? ` - ${data.locationDetails}` : ''}\n\n` +
           `💰 Compensation Range: ${data.compensationRange}\n\n` +
           `⏰ Employment Type: ${data.employmentType}\n\n` +
           `${data.additionalRequirements ? `📝 Additional Requirements:\n${data.additionalRequirements}\n\n` : ''}` +
           `🔗 Interested? Drop a comment or message me directly!\n` +
           `#Hiring #${data.positionTitle.replace(/\s+/g, '')} #JobOpportunity`;
  };

  const handleCopyToClipboard = () => {
    const announcement = formatLinkedInAnnouncement(form.getValues());
    navigator.clipboard.writeText(announcement)
      .then(() => toast.success("Announcement copied to clipboard!"))
      .catch(() => toast.error("Failed to copy. Please try again."));
  };

  const handleSaveDraft = () => {
    // In a real app, this would save to a database
    localStorage.setItem('talentAnnouncementDraft', JSON.stringify(form.getValues()));
    toast.success("Draft saved successfully!");
  };

  const handleResetForm = () => {
    form.reset();
    toast.info("Form has been reset");
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 max-w-6xl">
        <div className="mb-8 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-lg font-medium text-blue-800">How to use this page</h2>
          <p className="text-blue-700">
            Create a talent outsourcing announcement using the form below. Fill out the details, preview how your
            LinkedIn post will look, and copy the formatted text to paste directly on LinkedIn.
            You can also record voice notes to quickly transcribe content for any field.
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-6">Create Talent Announcement</h1>

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="edit">Edit Form</TabsTrigger>
            <TabsTrigger value="preview">Preview Announcement</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Position Title */}
                  <FormField
                    control={form.control}
                    name="positionTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position Title *</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="e.g. Project Manager" 
                              {...field} 
                            />
                          </FormControl>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => applyTranscriptionToField('positionTitle')}
                            disabled={!transcription}
                            title="Apply transcription to this field"
                          >
                            <Mic className="h-4 w-4" />
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Experience Level */}
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience Level *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Entry Level">Entry Level</SelectItem>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Lead">Lead</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Job Description */}
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description *</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the role and responsibilities" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => applyTranscriptionToField('jobDescription')}
                          disabled={!transcription}
                          className="self-start"
                          title="Apply transcription to this field"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Skills Required */}
                <FormField
                  control={form.control}
                  name="skillsRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills Required *</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. Project Management, Communication, Leadership (comma separated)" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => applyTranscriptionToField('skillsRequired')}
                          disabled={!transcription}
                          className="self-start"
                          title="Apply transcription to this field"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Location Type */}
                  <FormField
                    control={form.control}
                    name="locationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Type *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location Details */}
                  <FormField
                    control={form.control}
                    name="locationDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Details</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. New York City, USA" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Compensation Range */}
                  <FormField
                    control={form.control}
                    name="compensationRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compensation Range</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. $50,000 - $70,000" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Employment Type */}
                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-Time">Full-Time</SelectItem>
                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Freelance">Freelance</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Requirements */}
                <FormField
                  control={form.control}
                  name="additionalRequirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Textarea 
                            placeholder="Any other important criteria or information" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => applyTranscriptionToField('additionalRequirements')}
                          disabled={!transcription}
                          className="self-start"
                          title="Apply transcription to this field"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Voice Note Transcription</h3>
              <div className="flex gap-2 mb-4">
                <Button 
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  variant={isRecording ? "destructive" : "default"}
                >
                  {isRecording ? (
                    <>
                      <X className="mr-2 h-4 w-4" /> Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" /> Start Recording
                    </>
                  )}
                </Button>
              </div>

              {audioBlob && (
                <div className="mb-4">
                  <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
                </div>
              )}

              {transcription && (
                <div className="border p-3 rounded bg-white">
                  <p className="text-sm text-gray-500 mb-2">Transcription:</p>
                  <p className="text-sm">{transcription}</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSaveDraft} variant="outline">
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button onClick={handleResetForm} variant="outline">
                <Trash2 className="mr-2 h-4 w-4" /> Reset Form
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">LinkedIn Preview</h2>
                <Button onClick={handleCopyToClipboard} variant="default">
                  <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap">
                {formatLinkedInAnnouncement(watchedValues)}
              </div>
              
              <div className="mt-4">
                <Button onClick={() => document.querySelector('[data-value="edit"]')?.dispatchEvent(new MouseEvent('click'))} variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Edit Announcement
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default TalentAnnouncement;
