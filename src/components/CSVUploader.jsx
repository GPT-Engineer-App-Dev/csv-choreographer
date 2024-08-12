import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';

const CSVUploader = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file) => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0];
          const data = result.data.slice(1).filter(row => row.some(cell => cell !== ''));
          onFileUpload(data, headers, file.name);
        },
        header: false,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-primary bg-primary/10' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleFileChange(e.target.files[0])}
        ref={fileInputRef}
        className="hidden"
      />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your CSV file here, or
      </p>
      <Button
        onClick={() => fileInputRef.current.click()}
        className="mt-2"
      >
        Select File
      </Button>
    </div>
  );
};

export default CSVUploader;