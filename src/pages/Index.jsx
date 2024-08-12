import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CSVManager from '../components/CSVManager';
import { FileSpreadsheet } from 'lucide-react';

const Index = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-4xl mx-auto mt-8 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2 text-primary flex items-center justify-center">
            <FileSpreadsheet className="mr-2 h-8 w-8" />
            CSV Master
          </CardTitle>
          <CardDescription className="text-xl">
            Edit, Manage, and Export with Ease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CSVManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;