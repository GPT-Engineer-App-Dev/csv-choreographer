import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';

const CSVTable = ({ data, headers, onRowUpdate, onRowAdd, onRowDelete }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleCellChange = (rowIndex, header, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [header]: value };
    setTableData(updatedData);
    onRowUpdate(updatedData[rowIndex], rowIndex);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    onRowAdd(newRow);
  };

  const handleDeleteRow = (rowIndex) => {
    onRowDelete(rowIndex);
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            {headers.map((header) => (
              <TableHead key={header} className="font-bold">{header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {headers.map((header) => (
                <TableCell key={header} className="p-0">
                  <Input
                    value={row[header] || ''}
                    onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                    className="w-full h-full border-none focus:ring-0"
                  />
                </TableCell>
              ))}
              <TableCell className="text-right">
                <Button size="sm" variant="destructive" onClick={() => handleDeleteRow(rowIndex)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button onClick={handleAddRow}>
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
      </div>
    </div>
  );
};

export default CSVTable;