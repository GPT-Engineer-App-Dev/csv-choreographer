import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Trash, Plus, Check, X } from 'lucide-react';

const CSVTable = ({ data, headers, onRowUpdate, onRowAdd, onRowDelete }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({});

  const handleEdit = (rowIndex) => {
    setEditingRow(rowIndex);
  };

  const handleSave = (rowIndex) => {
    onRowUpdate(data[rowIndex], rowIndex);
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleChange = (rowIndex, header, value) => {
    const updatedRow = { ...data[rowIndex], [header]: value };
    onRowUpdate(updatedRow, rowIndex);
  };

  const handleNewRowChange = (header, value) => {
    setNewRow({ ...newRow, [header]: value });
  };

  const handleAddRow = () => {
    onRowAdd(newRow);
    setNewRow({});
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header} className="font-bold">{header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {headers.map((header) => (
                <TableCell key={header}>
                  {editingRow === rowIndex ? (
                    <Input
                      value={row[header]}
                      onChange={(e) => handleChange(rowIndex, header, e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}
              <TableCell className="text-right space-x-2">
                {editingRow === rowIndex ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(rowIndex)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(rowIndex)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onRowDelete(rowIndex)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                <Input
                  placeholder={`New ${header}`}
                  value={newRow[header] || ''}
                  onChange={(e) => handleNewRowChange(header, e.target.value)}
                  className="w-full"
                />
              </TableCell>
            ))}
            <TableCell className="text-right">
              <Button size="sm" onClick={handleAddRow}>
                <Plus className="h-4 w-4 mr-2" />
                Add Row
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CSVTable;