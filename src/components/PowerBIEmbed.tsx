import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Maximize2 } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initializeEmbed = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate loading process
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
          <iframe 
            title="projetBI20_10" 
            width="1140" 
            height="541.25" 
            src="https://app.powerbi.com/reportEmbed?reportId=0adf0086-c7fd-4dcb-b2b7-eeafa31ad5ae&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730" 
            frameBorder="0" 
            allowFullScreen={true}
            style={{ border: 0, width: '100%', minHeight: '541.25px' }}
          />
        )}
      </motion.div>
    </div>
  );
}
