import React, { useEffect, useState } from 'react';

const Phone_loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black overflow-hidden">

      {/* Background gradient sky */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, #0a0005 0%, #1a0800 40%, #2d1000 70%, #000000 100%)'
      }} />

      {/* Orange horizon glow */}
      <div className="absolute w-full pointer-events-none" style={{
        bottom: '22%',
        height: '140px',
        background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(255,100,0,0.3) 0%, transparent 100%)'
      }} />

      {/* City silhouette */}
      <svg className="absolute w-full pointer-events-none" viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice"
        style={{ bottom: '18%' }}>
        <g fill="#0d0500">
          <rect x="0"   y="100" width="30" height="120" />
          <rect x="5"   y="70"  width="18" height="150" />
          <rect x="28"  y="105" width="25" height="115" />
          <rect x="55"  y="55"  width="20" height="165" />
          <rect x="60"  y="30"  width="10" height="190" />
          <rect x="80"  y="80"  width="35" height="140" />
          <rect x="90"  y="50"  width="15" height="170" />
          <rect x="118" y="90"  width="28" height="130" />
          <rect x="148" y="45"  width="22" height="175" />
          <rect x="152" y="18"  width="12" height="202" />
          <rect x="172" y="65"  width="30" height="155" />
          <rect x="205" y="38"  width="25" height="182" />
          <rect x="210" y="10"  width="14" height="210" />
          <rect x="232" y="70"  width="28" height="150" />
          <rect x="263" y="52"  width="20" height="168" />
          <rect x="285" y="82"  width="32" height="138" />
          <rect x="290" y="58"  width="18" height="162" />
          <rect x="320" y="48"  width="24" height="172" />
          <rect x="325" y="22"  width="12" height="198" />
          <rect x="347" y="88"  width="30" height="132" />
          <rect x="378" y="65"  width="22" height="155" />
        </g>
        {/* Window lights */}
        <g fill="#ffaa00" opacity="0.55">
          <rect x="62"  y="38" width="2" height="2" />
          <rect x="62"  y="46" width="2" height="2" />
          <rect x="67"  y="42" width="2" height="2" />
          <rect x="153" y="25" width="2" height="2" />
          <rect x="157" y="19" width="2" height="2" />
          <rect x="153" y="33" width="2" height="2" />
          <rect x="211" y="16" width="2" height="2" />
          <rect x="215" y="12" width="2" height="2" />
          <rect x="211" y="24" width="2" height="2" />
          <rect x="326" y="30" width="2" height="2" />
          <rect x="330" y="24" width="2" height="2" />
          <rect x="91"  y="58" width="2" height="2" />
          <rect x="91"  y="66" width="2" height="2" />
          <rect x="291" y="65" width="2" height="2" />
          <rect x="291" y="73" width="2" height="2" />
        </g>
      </svg>

      {/* Road */}
      <div className="absolute bottom-0 w-full pointer-events-none" style={{
        height: '20%',
        background: 'linear-gradient(0deg, #0a0a0a 0%, #0d0600 100%)'
      }} />
      {/* Lane dashes */}
      <div className="absolute w-full flex justify-center gap-3 pointer-events-none" style={{ bottom: '11%' }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ height: '1px', width: '28px', background: 'rgba(255,130,0,0.25)' }} />
        ))}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)',
      }} />

      {/* ── TOP TAG ── */}
      <div className="relative z-10 pt-10 flex flex-col items-center"
        style={{ animation: 'fadeDown 0.6s ease forwards', opacity: 0, animationDelay: '0.15s' }}>
        <div style={{
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: '9px',
          letterSpacing: '0.35em',
          color: '#ff9500',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,149,0,0.45)',
          padding: '3px 12px',
        }}>
          ★ &nbsp;PHOENIX PRESENTS&nbsp; ★
        </div>
      </div>

      {/* ── MAIN TITLE ── */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">

        {/* AVENIR — single line */}
        <div className="w-full text-center"
          style={{ animation: 'glitchIn 0.9s ease forwards', opacity: 0, animationDelay: '0.45s' }}>
          <span style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(72px, 23vw, 104px)',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            display: 'block',
            color: 'transparent',
            WebkitTextStroke: '2.5px #ff9500',
            textShadow: '0 0 40px rgba(255,149,0,0.45), 5px 0 0 rgba(255,50,0,0.25), -3px 0 0 rgba(255,210,0,0.2)',
          }}>
            AVENIR
          </span>
        </div>

        {/* 2K26 — filled orange-yellow */}
        <div style={{ animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '0.75s', marginTop: '-6px' }}>
          <span style={{
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            fontSize: 'clamp(52px, 17vw, 80px)',
            fontWeight: 900,
            letterSpacing: '0.1em',
            lineHeight: 1,
            display: 'block',
            color: '#ffb300',
            textShadow: '0 0 24px rgba(255,180,0,0.55), 3px 3px 0 rgba(160,70,0,0.9)',
          }}>
            2K26
          </span>
        </div>

        {/* Divider tagline */}
        <div className="mt-3 px-6 py-1"
          style={{
            animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '1s',
            borderTop: '1px solid rgba(255,149,0,0.25)',
            borderBottom: '1px solid rgba(255,149,0,0.25)',
          }}>
          <span style={{
            fontFamily: "'Courier New', monospace",
            fontSize: '10px',
            letterSpacing: '0.32em',
            color: 'rgba(255,149,0,0.65)',
            textTransform: 'uppercase',
          }}>
            The Future Is Now
          </span>
        </div>
      </div>

      {/* ── BOTTOM: PROGRESS ── */}
      <div className="relative z-10 w-full px-8 pb-10 flex flex-col items-center gap-3"
        style={{ animation: 'fadeUp 0.8s ease forwards', opacity: 0, animationDelay: '1.2s' }}>

        {/* Dynamic status */}
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '10px',
          letterSpacing: '0.28em',
          color: 'rgba(255,149,0,0.5)',
          textTransform: 'uppercase',
        }}>
          {progress < 30 ? 'Initializing...' : progress < 60 ? 'Loading assets...' : progress < 90 ? 'Almost there...' : 'Entering the city...'}
        </span>

        {/* Progress bar */}
        <div className="w-full">
          <div className="w-full" style={{ height: '3px', background: 'rgba(255,255,255,0.08)' }}>
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #ff5500, #ffb300)',
                boxShadow: '0 0 12px rgba(255,149,0,0.9), 0 0 24px rgba(255,100,0,0.4)',
                transition: 'width 80ms linear',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: '9px', color: 'rgba(255,149,0,0.35)', letterSpacing: '0.2em' }}>
              AVENIR 2K26
            </span>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: '9px', color: 'rgba(255,149,0,0.65)', letterSpacing: '0.15em' }}>
              {progress}%
            </span>
          </div>
        </div>

        {/* Bottom label */}
        <div className="flex items-center gap-3 mt-1">
          <div style={{ width: '22px', height: '1px', background: 'rgba(255,149,0,0.25)' }} />
          <span style={{
            fontFamily: "'Arial Black', sans-serif",
            fontSize: '8px',
            letterSpacing: '0.4em',
            color: 'rgba(255,149,0,0.3)',
            textTransform: 'uppercase',
          }}>
          </span>
          <div style={{ width: '22px', height: '1px', background: 'rgba(255,149,0,0.25)' }} />
        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glitchIn {
          0%   { opacity: 0; transform: skewX(-10deg) translateX(-12px); }
          35%  { opacity: 1; transform: skewX(4deg)  translateX(5px); }
          55%  { transform: skewX(-2deg) translateX(-2px); }
          100% { opacity: 1; transform: skewX(0)  translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Phone_loader;