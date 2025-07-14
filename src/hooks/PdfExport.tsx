'use cleint';
import React, { useState } from 'react';
import jsPDF from 'jspdf';

const ExportPdf = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();

      // Add Title
      doc.setFontSize(18);
      doc.text('Exported PDF', 14, 22);

      // Add some sample content
      doc.setFontSize(12);
      doc.text('This is a sample exported PDF content.', 14, 40);

      // Save the PDF
      doc.save(`export-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExportPDF}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isExporting ? 'Exporting...' : 'Export PDF'}
    </button>
  );
};

export default ExportPdf;
