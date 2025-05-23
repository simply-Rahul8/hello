
/**
 * LinkedIn posting utility functions
 */

/**
 * Format the LinkedIn post content from form data
 */
export const formatLinkedInPost = (
  companyTitle: string,
  jobDescription: string,
  skills: string[],
  contactEmail: string,
  contactPhone: string,
  useHashtags: boolean
): string => {
  // Generate hashtags if enabled
  const hashtags = useHashtags 
    ? skills.slice(0, 5).map(skill => `#${skill.replace(/\s+/g, '')}`).join(' ')
    : '';
  
  return `${companyTitle} is hiring!\n\n${jobDescription}\n\nRequired skills: ${skills.join(', ')}\n\nContact: ${contactEmail}${contactPhone ? `\nPhone: ${contactPhone}` : ''}\n\n${hashtags}`;
};

/**
 * Generate hashtags from skills
 */
export const generateHashtags = (skills: string[], useHashtags: boolean): string => {
  if (!useHashtags) return '';
  return skills.slice(0, 5).map(skill => `#${skill.replace(/\s+/g, '')}`).join(' ');
};

/**
 * Redirect to LinkedIn to post job
 */
export const redirectToLinkedIn = (content: string): void => {
  // Encode the post content for the URL
  const encodedContent = encodeURIComponent(content);
  
  // LinkedIn sharing URL
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedContent}`;
  
  // Open LinkedIn in a new tab
  window.open(linkedinShareUrl, '_blank');
};

/**
 * Open LinkedIn share tab
 */
export const openLinkedInShareTab = (content: string): void => {
  // Encode the post content for the URL
  const encodedContent = encodeURIComponent(content);
  
  // LinkedIn sharing URL
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodedContent}`;
  
  // Open in new tab
  window.open(linkedinShareUrl, '_blank');
};
