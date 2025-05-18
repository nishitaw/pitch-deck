'use client';

import React, { useEffect, useState } from 'react';

interface Document {
  _id: string;
  title: string;
  description?: string;
  url: string;
  createdAt: string;
}

interface DocumentListProps {
  email: string;
}

const DocumentList: React.FC<DocumentListProps> = ({ email }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/documents?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch documents');
        }

        setDocuments(data.documents || []);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [email]);

  if (loading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No documents available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc) => (
        <div key={doc._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-primary mb-2">{doc.title}</h3>

          {doc.description && (
            <p className="text-black text-sm mb-3">{doc.description}</p>
          )}

          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-secondary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-300 border border-orange-700"
            style={{ color: '#FFFFFF' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open Document
          </a>

          <p className="text-xs text-gray-500 mt-2">
            Added: {new Date(doc.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
