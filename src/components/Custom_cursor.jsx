import { useEffect, useState } from "react";

const Custom_cursor = () => {
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById("gta-cursor");

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      id="gta-cursor"
      className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{ transform: isClicking ? 'translate(-50%, -50%) scale(0.85)' : 'translate(-50%, -50%) scale(1)' }}
    >
      {/* OUTER ROTATING RING */}
      <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="absolute inset-0 rounded-full border-2 border-[#00ff41] opacity-30" 
             style={{ 
               boxShadow: '0 0 20px rgba(0,255,65,0.4), inset 0 0 20px rgba(0,255,65,0.2)',
               borderStyle: 'dashed'
             }} />
      </div>

      {/* PULSING RING */}
      <div className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 animate-pulse">
        <div className="absolute inset-0 rounded-full border border-[#00ff41] opacity-40" 
             style={{ boxShadow: '0 0 15px rgba(0,255,65,0.6)' }} />
      </div>

      {/* CORNER BRACKETS - TOP LEFT */}
      <div className="absolute top-2 left-2">
        <div className="w-3 h-0.5 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        <div className="w-0.5 h-3 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
      </div>

      {/* CORNER BRACKETS - TOP RIGHT */}
      <div className="absolute top-2 right-2">
        <div className="w-3 h-0.5 bg-[#00ff41] ml-auto shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        <div className="w-0.5 h-3 bg-[#00ff41] ml-auto shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
      </div>

      {/* CORNER BRACKETS - BOTTOM LEFT */}
      <div className="absolute bottom-2 left-2">
        <div className="w-0.5 h-3 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        <div className="w-3 h-0.5 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
      </div>

      {/* CORNER BRACKETS - BOTTOM RIGHT */}
      <div className="absolute bottom-2 right-2">
        <div className="w-0.5 h-3 bg-[#00ff41] ml-auto shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        <div className="w-3 h-0.5 bg-[#00ff41] ml-auto shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
      </div>

      {/* CROSSHAIR LINES */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Horizontal */}
        <div className="absolute top-1/2 left-1/2 w-16 h-0.5 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
          <div className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-transparent" />
        </div>
        {/* Vertical */}
        <div className="absolute top-1/2 left-1/2 w-0.5 h-16 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41] to-transparent shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
          <div className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-transparent" />
        </div>
      </div>

      {/* CENTER DOT WITH PULSE */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2">
        <div className={`absolute inset-0 rounded-full bg-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,1),0_0_30px_rgba(0,255,65,0.5)] ${isClicking ? 'animate-ping' : ''}`} />
        <div className="absolute inset-0 rounded-full bg-[#00ff41]" />
      </div>

      {/* SCAN LINE EFFECT */}
      <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '2s' }}>
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent animate-pulse" 
               style={{ 
                 top: '25%',
                 animationDuration: '1.5s',
                 boxShadow: '0 0 10px rgba(0,255,65,0.8)'
               }} />
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent animate-pulse" 
               style={{ 
                 top: '50%',
                 animationDuration: '1.8s',
                 boxShadow: '0 0 10px rgba(0,255,65,0.8)'
               }} />
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent animate-pulse" 
               style={{ 
                 top: '75%',
                 animationDuration: '2.1s',
                 boxShadow: '0 0 10px rgba(0,255,65,0.8)'
               }} />
        </div>
      </div>

      {/* DIAGONAL ACCENT LINES */}
      <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-40">
        <div className="absolute top-0 left-1/2 w-0.5 h-4 -translate-x-1/2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
        <div className="absolute bottom-0 left-1/2 w-0.5 h-4 -translate-x-1/2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
        <div className="absolute left-0 top-1/2 w-4 h-0.5 -translate-y-1/2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
        <div className="absolute right-0 top-1/2 w-4 h-0.5 -translate-y-1/2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
      </div>
    </div>
  );
};

export default Custom_cursor;