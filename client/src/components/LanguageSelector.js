import React from 'react';
import { useTranslation } from 'react-i18next';


const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="p-2 text-right">
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="border p-1 rounded"
        value={i18n.language} 
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
