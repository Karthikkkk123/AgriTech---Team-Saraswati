import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (options: any, element: string): void;
          InlineLayout: {
            SIMPLE: number;
          };
        };
      };
    };
  }
}

const TranslateWidget = () => {
  useEffect(() => {
    // Add Google Translate script
    const addScript = document.createElement('script');
    addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);

    // Add initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,bn,te,mr,ta,ur,gu,kn,ml,pa,or,as,sd,en',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    return () => {
      document.body.removeChild(addScript);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div 
      id="google_translate_element" 
      style={{ 
        position: 'fixed', 
        bottom: '20px', 
        left: '20px', 
        zIndex: 9999 
      }}
    />
  );
};

export default TranslateWidget;