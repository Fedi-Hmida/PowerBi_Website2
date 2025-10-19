import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Maximize2, Download } from 'lucide-react';
import PowerBIService, { PowerBIConfig } from '../services/powerbi';
import LoadingOverlay from './LoadingOverlay';

interface PowerBIEmbedProps {
  reportId: string;
  height?: number;
  onError?: (error: Error) => void;
}

export default function PowerBIEmbed({ 
  reportId, 
  height = 600,
  onError 
}: PowerBIEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [embedConfig, setEmbedConfig] = useState<PowerBIConfig | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const powerBIService = PowerBIService.getInstance();

  useEffect(() => {
    const initializeEmbed = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const config = await powerBIService.getEmbedConfig(reportId);
        setEmbedConfig(config);

        // In a real implementation, you would embed the Power BI report here
        // For now, we'll simulate the loading process
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Power BI report';
        setError(errorMessage);
        setIsLoading(false);
        onError?.(err as Error);
      }
    };

    initializeEmbed();
  }, [reportId, onError]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Export functionality would be implemented here');
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Erreur du Rapport Power BI
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Control Panel */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          onClick={handleRefresh}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Actualiser</span>
        </button>
        <button
          onClick={handleFullscreen}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
          <span>{isFullscreen ? 'Quitter le Plein Écran' : 'Plein Écran'}</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Exporter</span>
        </button>
      </div>

      {/* Power BI Container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <LoadingOverlay 
          isVisible={isLoading}
          message="Chargement du rapport Power BI..."
          variant="inline"
          className="absolute inset-0 z-10"
        />

        {!isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="bg-gradient-to-r from-[#0085C3]/10 via-[#FFD100]/10 to-[#009F3D]/10 p-8 rounded-xl">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <AlertCircle className="w-16 h-16 text-[#0085C3] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Intégration du Rapport Power BI
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                    C'est ici que votre rapport Power BI serait intégré. Pour activer l'intégration réelle :
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 text-left max-w-3xl mx-auto mb-6">
                    <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`1. Configurer l'authentification Power BI Service
2. Configurer votre ID de rapport : ${reportId}
3. Mettre à jour le PowerBIService avec les vraies informations d'identification
4. Le rapport sera intégré ici automatiquement`}
                    </pre>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a
                      href="https://docs.microsoft.com/power-bi/developer/embedded/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#0085C3] text-white rounded-lg hover:bg-[#0085C3]/90 transition-colors font-medium"
                    >
                      Documentation Power BI Embed
                    </a>
                    <a
                      href="https://app.powerbi.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Portail Power BI
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
