'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { PdfExport } from '../icons/Icons';
import * as XLSX from 'xlsx';

// Define TypeScript interfaces
interface ColumnMap {
  [key: string]: string;
}

interface ExportDataProps {
  data?: Record<string, any>[];
  filename?: string;
  exportType?: 'pdf' | 'excel' | 'both';
  pdfTitle?: string;
  pdfSubtitle?: string;
  excelSheetName?: string;
  columnMapping?: ColumnMap;
}

const ExportData: React.FC<ExportDataProps> = ({ 
  data = [], 
  filename = 'export',
  exportType = 'both', // 'pdf', 'excel', or 'both'
  pdfTitle = 'Exported PDF',
  pdfSubtitle = 'Generated Report',
  excelSheetName = 'Sheet1',
  columnMapping = {} // Map data keys to user-friendly column names
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Format date for filenames
  const getFormattedDate = (): string => {
    return new Date().toISOString().split('T')[0];
  };

  const handleExportPDF = async (): Promise<void> => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      let yPosition = 20;

      // Add PDF Title
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(pdfTitle, 14, yPosition);
      yPosition += 10;

      // Add subtitle
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(pdfSubtitle, 14, yPosition);
      yPosition += 15;

      // Add date
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, yPosition);
      yPosition += 10;

      // If no data, add message
      if (!data.length) {
        doc.text('No data available for export.', 14, yPosition);
      } else {
        // Create table headers
        const headers = Object.keys(data[0]).map(key => columnMapping[key] || key);
        
        // Create table rows
        const rows = data.map(item => {
          return Object.keys(item).map(key => {
            // Convert non-string values to string
            const value = item[key];
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value);
          });
        });

        // Calculate column widths based on content
        const colWidths = headers.map((header, index) => {
          const headerWidth = doc.getStringUnitWidth(header) * 5;
          const maxContentWidth = Math.max(...rows.map(row => 
            doc.getStringUnitWidth(row[index]) * 5
          ));
          return Math.min(Math.max(headerWidth, maxContentWidth), 40); // Cap max width
        });

        // Draw table
        doc.setFontSize(10);
        
        // Draw header row
        let xPosition = 14;
        doc.setFont('helvetica', 'bold');
        headers.forEach((header, i) => {
          doc.text(header, xPosition, yPosition);
          xPosition += colWidths[i] + 5; // Add padding between columns
        });
        yPosition += 7;
        doc.line(14, yPosition - 3, xPosition - 5, yPosition - 3); // Divider line

        // Draw data rows
        doc.setFont('helvetica', 'normal');
        rows.forEach((row, rowIndex) => {
          // Check if we need a new page
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          
          xPosition = 14;
          row.forEach((cell, colIndex) => {
            // Truncate cell content if too long
            const truncatedCell = cell.length > 25 ? cell.substring(0, 22) + '...' : cell;
            doc.text(truncatedCell, xPosition, yPosition);
            xPosition += colWidths[colIndex] + 5;
          });
          yPosition += 7;
          
          // Add light divider after each row except the last
          if (rowIndex < rows.length - 1) {
            doc.setDrawColor(200, 200, 200); // Light gray
            doc.line(14, yPosition - 3, xPosition - 5, yPosition - 3);
            doc.setDrawColor(0, 0, 0); // Reset to black
          }
        });
      }

      // Save the PDF
      doc.save(`${filename}-${getFormattedDate()}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  const handleExportExcel = async (): Promise<void> => {
    setIsExporting(true);
    try {
      // If no data, create a simple empty worksheet
      if (!data.length) {
        const ws = XLSX.utils.aoa_to_sheet([['No data available for export']]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, excelSheetName);
        XLSX.writeFile(wb, `${filename}-${getFormattedDate()}.xlsx`);
        return;
      }

      // Process data to ensure exportable format
      const processedData = data.map(item => {
        const processed: Record<string, any> = {};
        Object.keys(item).forEach(key => {
          // Use the key to get the mapped name, or fall back to the original key
          const newKey = key in columnMapping ? columnMapping[key] : key;
          let value = item[key];
          
          // Handle special data types
          if (value === null || value === undefined) {
            value = '';
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            value = JSON.stringify(value);
          }
          
          processed[newKey] = value;
        });
        return processed;
      });

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(processedData);
      
      // Add some formatting
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:A1');
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_col(C) + '1';
        if (!ws[address]) continue;
        ws[address].s = { font: { bold: true } };
      }

      // Create workbook and add the worksheet
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, excelSheetName);
      
      // Generate Excel file
      XLSX.writeFile(wb, `${filename}-${getFormattedDate()}.xlsx`);
    } catch (error) {
      console.error('Failed to export Excel:', error);
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  // Component for dropdown menu options
  const ExportOptions = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
      <div className="py-1">
        <button 
          onClick={handleExportPDF}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Export as PDF
        </button>
        <button 
          onClick={handleExportExcel}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Export as Excel
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {exportType === 'pdf' ? (
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center gap-2 md:px-4 px-3 h-10 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <PdfExport />
              <p className="md:text-[17px] text-xs">Export PDF</p>
            </>
          )}
        </button>
      ) : exportType === 'excel' ? (
        <button
          onClick={handleExportExcel}
          disabled={isExporting}
          className="flex items-center gap-2 md:px-4 px-3 h-10 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Exporting...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="md:text-[17px] text-xs">Export Excel</p>
            </>
          )}
        </button>
      ) : (
        <div>
          <button
            onClick={() => setShowOptions(!showOptions)}
            disabled={isExporting}
            className="flex items-center gap-2 md:px-4 px-3 h-10 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="md:text-[17px] text-xs">Export</p>
                <svg 
                  className={`w-4 h-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
          {showOptions && <ExportOptions />}
        </div>
      )}
    </div>
  );
};

export default ExportData;