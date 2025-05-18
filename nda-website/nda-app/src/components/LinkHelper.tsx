'use client';

import React, { useState } from 'react';

interface LinkHelperProps {
  onSelectLink: (url: string) => void;
}

const LinkHelper: React.FC<LinkHelperProps> = ({ onSelectLink }) => {
  const [showHelper, setShowHelper] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState('');
  const [error, setError] = useState('');

  const services = [
    {
      id: 'gdrive',
      name: 'Google Drive',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
          <path d="M14.655 0L7.654 0 0 7.655 0 16.345 7.654 24 16.345 24 24 16.345 24 7.655 14.655 0zM10.225 15.87c-.479.473-1.183.759-2.009.759-.19 0-.379-.019-.545-.048v2.53h-1.215v-6.753c.378-.058.909-.101 1.66-.101 1.201 0 2.06.254 2.662.772.56.476.913 1.225.913 2.12 0 .92-.361 1.694-1.466 2.721zm4.334-.048c.761 0 1.195-.202 1.542-.466l.312.934c-.347.312-.979.504-1.705.504-.979 0-1.705-.258-2.2-.728-.488-.459-.743-1.144-.743-1.959 0-.807.283-1.529.817-2.024.519-.477 1.225-.758 2.165-.758 1.368 0 2.153.852 2.153 2.552 0 .202-.012.37-.035.53h-3.833c.035 1.178.757 1.415 1.527 1.415z" />
          <path d="M14.32 14.375c.021-.501-.324-.909-.888-.909-.53 0-.967.379-1.041.909H14.32z" />
        </svg>
      ),
      instructions: 'For Google Drive, make sure your document is set to &quot;Anyone with the link can view&quot;.',
      placeholder: 'https://drive.google.com/file/d/...',
      formatLink: (link: string) => {
        // Extract file ID from Google Drive link
        const match = link.match(/\/d\/([^/]+)/);
        if (match && match[1]) {
          return `https://drive.google.com/file/d/${match[1]}/view?usp=sharing`;
        }
        return link;
      }
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l-6 3.6 6 3.6-6 3.6 6 3.6 6-3.6-6-3.6 6-3.6z" />
          <path d="M6 14.4l6 3.6 6-3.6-6-3.6z" />
          <path d="M6 21.6l6-3.6 6 3.6-6 3.6z" />
        </svg>
      ),
      instructions: 'For Dropbox, create a shared link and make sure it&apos;s set to &quot;Anyone with the link can view&quot;.',
      placeholder: 'https://www.dropbox.com/s/...',
      formatLink: (link: string) => {
        // Convert Dropbox link to direct link if needed
        if (link.includes('dropbox.com/s/')) {
          return link.replace('?dl=0', '?dl=1');
        }
        return link;
      }
    },
    {
      id: 'onedrive',
      name: 'OneDrive',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.5 18.5h-7.8c-1.3 0-2.4-0.9-2.6-2.2-0.3-1.6 0.9-3 2.4-3 0.3-2.1 1.9-3.8 4-4.1 2.5-0.3 4.6 1.4 5.1 3.5 0.2-0.1 0.5-0.1 0.7-0.1 1.2 0 2.2 0.9 2.3 2.1 0.1 1.3-0.9 2.4-2.1 2.4h-2v1.4z" />
          <path d="M14.4 14.4c-0.2-0.4-0.4-0.8-0.7-1.2-0.5-0.5-1.2-0.9-1.9-1 0-0.1 0-0.3 0-0.4 0-2.2-1.8-4-4-4-0.4 0-0.7 0.1-1.1 0.2 0.7-1.3 2.1-2.2 3.7-2.2 2.3 0 4.2 1.9 4.2 4.2 0 0.4-0.1 0.7-0.2 1.1 1.9 0.2 3.4 1.6 3.9 3.4h-3.9v-0.1z" />
        </svg>
      ),
      instructions: 'For OneDrive, create a sharing link with &quot;Anyone with the link can view&quot; permissions.',
      placeholder: 'https://1drv.ms/...',
      formatLink: (link: string) => link
    }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setLinkInput('');
    setError('');
  };

  const handleApply = () => {
    if (!linkInput) {
      setError('Please enter a link');
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (service) {
      const formattedLink = service.formatLink(linkInput);
      onSelectLink(formattedLink);
      setShowHelper(false);
      setLinkInput('');
      setSelectedService(null);
    }
  };

  return (
    <div className="mb-4">
      {!showHelper ? (
        <button
          type="button"
          onClick={() => setShowHelper(true)}
          className="text-primary hover:text-blue-700 text-sm font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need help creating a document link?
        </button>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium">Document Link Helper</h3>
            <button
              type="button"
              onClick={() => setShowHelper(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Select where your document is hosted:</p>
            <div className="flex flex-wrap gap-2">
              {services.map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(service.id)}
                  className={`flex items-center p-2 rounded border ${
                    selectedService === service.id
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-current mr-2">{service.icon}</span>
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {selectedService && (
            <>
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  {services.find(s => s.id === selectedService)?.instructions}
                </p>
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder={services.find(s => s.id === selectedService)?.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <button
                type="button"
                onClick={handleApply}
                className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
              >
                Use This Link
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkHelper;
