import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Loader2 } from 'lucide-react';
import pdfExportService, { OlympicStats, TopCountries, TopDisciplines } from '../services/pdfExportService';

interface ExportPDFButtonProps {
  stats: OlympicStats;
  topCountries?: TopCountries;
  topDisciplines?: TopDisciplines;
  variant?: 'default' | 'icon';
  className?: string;
}

export default function ExportPDFButton({ 
  stats, 
  topCountries, 
  topDisciplines,
  variant = 'default',
  className = ''
}: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await pdfExportService.generateOlympicReport(stats, topCountries, topDisciplines);
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleExport}
        disabled={isExporting}
        className={`p-3 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        whileHover={{ scale: isExporting ? 1 : 1.05, y: isExporting ? 0 : -2 }}
        whileTap={{ scale: isExporting ? 1 : 0.95 }}
        title="Exporter en PDF"
      >
        {isExporting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <FileText className="w-5 h-5" />
        )}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleExport}
      disabled={isExporting}
      className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#0085C3] to-[#009F3D] text-white rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      whileHover={{ scale: isExporting ? 1 : 1.02, y: isExporting ? 0 : -2 }}
      whileTap={{ scale: isExporting ? 1 : 0.98 }}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Génération en cours...</span>
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>Exporter en PDF</span>
        </>
      )}
    </motion.button>
  );
}
