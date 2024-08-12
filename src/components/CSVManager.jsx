import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CSVUploader from './CSVUploader';
import CSVTable from './CSVTable';
import CSVDownloader from './CSVDownloader';

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (data, headers) => {
    setCsvData(data);
    setHeaders(headers);
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

  return (
    <div className="space-y-6">
      <CSVUploader onFileUpload={handleFileUpload} />
      {csvData.length > 0 && (
        <>
          <CSVTable
            data={csvData}
            headers={headers}
            onRowUpdate={handleRowUpdate}
            onRowAdd={handleRowAdd}
            onRowDelete={handleRowDelete}
          />
          <CSVDownloader data={csvData} headers={headers} />
        </>
      )}
    </div>
  );
};

export default CSVManager;