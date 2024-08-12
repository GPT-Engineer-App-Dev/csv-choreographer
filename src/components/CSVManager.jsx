import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import CSVUploader from './CSVUploader';
import CSVTable from './CSVTable';
import CSVDownloader from './CSVDownloader';

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (data, headers, name) => {
    setCsvData(data);
    setHeaders(headers);
    setFileName(name);
  };

  const handleRowUpdate = (updatedRow, rowIndex) => {
    const updatedData = [...csvData];
    updatedData[rowIndex] = updatedRow;
    setCsvData(updatedData);
  };

  const handleRowAdd = (newRow) => {
    setCsvData([...csvData, newRow]);
  };

  const handleRowDelete = (rowIndex) => {
    const updatedData = csvData.filter((_, index) => index !== rowIndex);
    setCsvData(updatedData);
  };

  const handleClearData = () => {
    setCsvData([]);
    setHeaders([]);
    setFileName('');
  };

  return (
    <div className="space-y-6">
      {csvData.length === 0 ? (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>No CSV file loaded</AlertTitle>
          <AlertDescription>
            Upload a CSV file to get started with editing and managing your data.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>CSV file loaded: {fileName}</AlertTitle>
          <AlertDescription>
            You can now edit, add, or delete rows. Don't forget to download your changes when you're done.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between items-center">
        <CSVUploader onFileUpload={handleFileUpload} />
        {csvData.length > 0 && (
          <Button variant="destructive" onClick={handleClearData}>
            Clear Data
          </Button>
        )}
      </div>
      {csvData.length > 0 && (
        <>
          <CSVTable
            data={csvData}
            headers={headers}
            onRowUpdate={handleRowUpdate}
            onRowAdd={handleRowAdd}
            onRowDelete={handleRowDelete}
          />
          <div className="flex justify-end">
            <CSVDownloader data={csvData} headers={headers} fileName={fileName} />
          </div>
        </>
      )}
    </div>
  );
};

export default CSVManager;