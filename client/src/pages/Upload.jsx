// src/pages/Upload.jsx
import React, { useRef } from "react";

export default function Upload() {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => fileInputRef.current.click();
  const handleFileChange  = e => console.log(e.target.files);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-4">Convert WORD to PDF</h1>
      <p className="text-gray-700 mb-8">
        Make DOC and DOCX files easy to read by converting them to PDF.
      </p>

      {/*  ←—— Here’s the “card” wrapper */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".doc,.docx"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* button + icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleButtonClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg font-medium px-6 py-4 rounded-lg transition"
          >
            Select WORD files
          </button>
          {/* you can swap these SVGs for GoogleDrive/Dropbox logos */}
         
          
        </div>

        <p className="text-center text-gray-600 mt-4">
          or drop WORD documents here
        </p>
      </div>
    </div>
  );
}
