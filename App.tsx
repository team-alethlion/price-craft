import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { INITIAL_TIERS, INITIAL_DESIGN, AppState, PricingTier, GlobalDesign } from './types';
import { EditorPanel } from './components/EditorPanel';
import { AIGenerator } from './components/AIGenerator';
import { Header } from './components/Header';
import { PreviewCanvas } from './components/PreviewCanvas';
import { PricingGrid } from './components/PricingGrid';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    tiers: INITIAL_TIERS,
    design: INITIAL_DESIGN,
  });
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // We keep the previewRef for simple interactions, but exportRef for the snapshot
  const previewRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const updateTier = (updatedTier: PricingTier) => {
    setState(prev => ({
      ...prev,
      tiers: prev.tiers.map(t => t.id === updatedTier.id ? updatedTier : t)
    }));
  };

  const deleteTier = (id: string) => {
    setState(prev => ({
      ...prev,
      tiers: prev.tiers.filter(t => t.id !== id)
    }));
  };

  const addTier = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      title: 'New Plan',
      price: '0',
      currency: '$',
      frequency: '/mo',
      description: 'Description for new plan',
      features: [{ text: 'Feature 1', included: true }],
      isPopular: false,
      buttonText: 'Select Plan',
      buttonUrl: '#'
    };
    setState(prev => ({
      ...prev,
      tiers: [...prev.tiers, newTier]
    }));
  };

  const updateDesign = (designUpdate: Partial<GlobalDesign>) => {
    setState(prev => ({
      ...prev,
      design: { ...prev.design, ...designUpdate }
    }));
  };

  const handleAIApply = (newTiers: PricingTier[]) => {
    setState(prev => ({
      ...prev,
      tiers: newTiers
    }));
  };

  const handleDownloadPDF = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);

    try {
      // Small delay to ensure render states settle if needed
      await new Promise(resolve => setTimeout(resolve, 100));

      const element = exportRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        // We capture the background from the style of the element
        backgroundColor: state.design.backgroundColor, 
        logging: false,
        width: 1280, // Enforce capture width
        windowWidth: 1280, // Simulate window width for media queries if needed
      });

      const imgData = canvas.toDataURL('image/png');
      
      // PDF Calculation based on the captured canvas ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [imgWidth, imgHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('pricing-cards.pdf');
    } catch (err) {
      console.error("PDF Export failed", err);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <EditorPanel 
        state={state}
        updateTier={updateTier}
        deleteTier={deleteTier}
        addTier={addTier}
        updateDesign={updateDesign}
        onOpenAI={() => setIsAIModalOpen(true)}
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <Header onExport={handleDownloadPDF} isExporting={isExporting} />
        
        {/* Live Preview (Responsive) */}
        <PreviewCanvas state={state} ref={previewRef} />
      </main>

      {/* 
        Snapshot Stage (Hidden) 
        - Fixed width (1280px) to ensure "Standard Desktop" layout
        - Positioned off-screen so user doesn't see it
        - Renders the exact same content but forced into desktop mode
      */}
      <div style={{ position: 'absolute', top: 0, left: -9999, width: '1280px', visibility: 'visible' }}>
        <div 
            ref={exportRef} 
            className="p-16 flex flex-col items-center justify-center min-h-[800px]"
            style={{ backgroundColor: state.design.backgroundColor }}
        >
             <div className="w-full">
                <PricingGrid state={state} forceDesktop={true} />
             </div>
             <div className="mt-12 text-center text-sm opacity-50 font-medium" style={{ color: state.design.textColor }}>
                Generated with PriceCraft
             </div>
        </div>
      </div>

      <AIGenerator 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        onApply={handleAIApply} 
      />
    </div>
  );
};

export default App;