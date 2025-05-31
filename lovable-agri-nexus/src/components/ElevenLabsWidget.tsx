import { useEffect } from 'react';

const ElevenLabsWidget = () => {
  useEffect(() => {
    // Add the script tag
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: '80px', // Below navbar
      right: '20px',
      zIndex: 1000
    }}>
      <elevenlabs-convai agent-id="agent_01jwh7cjj2ff5sj1760607tsrs"></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsWidget;