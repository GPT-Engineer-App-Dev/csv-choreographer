import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Papa from 'papaparse';

const CSVUploader = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const headers = result.data[0];
          const data = result.data.slice(1).filter(row => row.some(cell => cell !== ''));
          onFileUpload(data, headers);
        },
        header: false,
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <Button onClick={() => fileInputRef.current.click()}>
        Upload CSV
      </Button>
    </div>
  );
};

export default CSVUploader;