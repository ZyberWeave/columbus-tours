import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaLink, 
  FaWhatsapp 
} from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-3">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook size={18} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter size={18} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={18} />
      </a>
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Copy link"
      >
        <FaLink size={18} />
      </button>
    </div>
  );
};

export default ShareButtons;