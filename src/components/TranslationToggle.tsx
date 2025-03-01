import React from 'react';
import { Languages } from 'lucide-react';

interface TranslationToggleProps {
  showTranslation: boolean;
  toggleTranslation: () => void;
}

const TranslationToggle: React.FC<TranslationToggleProps> = ({ 
  showTranslation, 
  toggleTranslation 
}) => {
  return (
    <div className="flex items-center justify-end mb-4">
      <button
        onClick={toggleTranslation}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Languages size={16} />
        <span>{showTranslation ? '隐藏中文翻译' : '显示中文翻译'}</span>
      </button>
    </div>
  );
};

export default TranslationToggle;