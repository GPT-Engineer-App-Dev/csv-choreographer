import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Papa from 'papaparse';

const CSVDownloader = ({ data, headers, fileName }) => {
  const handleDownload = () => {
    const csv = Papa.unparse([headers, ...data]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `edited_${fileName || 'data.csv'}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button onClick={handleDownload}>
      <Download className="mr-2 h-4 w-4" />
      Download CSV
    </Button>
  );
};

export default CSVDownloader;