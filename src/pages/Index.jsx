import React from 'react';
import CSVManager from '../components/CSVManager';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CSV File Manager</h1>
      <CSVManager />
    </div>
  );
};

export default Index;