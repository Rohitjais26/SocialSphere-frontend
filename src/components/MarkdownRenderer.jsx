import React from 'react';

// Renders basic text content with general styling for legal documents
export default function MarkdownRenderer({ title, content }) {
  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-32 font-sans">
      <div className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          {title}
        </h1>
        <pre className="whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}