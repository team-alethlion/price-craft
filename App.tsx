import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { INITIAL_TIERS, INITIAL_DESIGN, AppState, PricingTier, GlobalDesign } from './types';
import { EditorPanel } from './components/EditorPanel';
import { AIGenerator } from './components/AIGenerator';
import { Header } from './components/Header';
import { PreviewCanvas } from './components/PreviewCanvas';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    tiers: INITIAL_TIERS,
    design: INITIAL_DESIGN,
  });
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const previewRef = useRef<HTMLDivElement>(null);

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
    if (!previewRef.current) return;
    setIsExporting(true);

    try {
      // Small delay to ensure render states settle if needed
      await new Promise(resolve => setTimeout(resolve, 100));

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: state.design.backgroundColor, // Capture the set background
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
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
        
        <PreviewCanvas state={state} ref={previewRef} />
      </main>

      <AIGenerator 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        onApply={handleAIApply} 
      />
    </div>
  );
};

export default App;