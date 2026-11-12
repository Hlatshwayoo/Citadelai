import React, { useEffect, useRef, useState } from 'react';

// Replace your existing middle layer with <CitadelMasthead />.
// The hero parent must have position: relative.
// Load Saira Extra Condensed weight 100 in your font stylesheet:
// https://fonts.googleapis.com/css2?family=Saira+Extra+Condensed:wght@100&display=swap
// Keep this layer between the background image and the foreground cutout.

export default function CitadelMasthead() {
  const textRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(46.75);

  useEffect(() => {
    let disposed = false;
    const fit = () => {
      const el = textRef.current;
      if (!el || disposed) return;
      const probe = document.createElement('span');
      probe.textContent = 'CITADEL';
      Object.assign(probe.style, {
        position: 'absolute',
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        fontFamily: '"Saira Extra Condensed", sans-serif',
        fontWeight: '100',
        fontSize: '100px',
        letterSpacing: '-0.01em',
        lineHeight: '1',
      });
      document.body.appendChild(probe);
      const width = probe.getBoundingClientRect().width;
      probe.remove();
      if (width > 0) setSize(10000 / width);
    };
    document.fonts.load('100 100px "Saira Extra Condensed"').then(fit);
    document.fonts.ready.then(fit);
    document.fonts.addEventListener('loadingdone', fit);
    return () => {
      disposed = true;
      document.fonts.removeEventListener('loadingdone', fit);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-[28px] top-[43.5%] -translate-y-[52%] z-10 pointer-events-none select-none animate-fade-in"
      style={{ containerType: 'inline-size' }}
    >
      <span
        ref={textRef}
        className="block whitespace-nowrap uppercase text-[#0B0B0C]"
        style={{
          fontFamily: '"Saira Extra Condensed", sans-serif',
          fontWeight: 100,
          fontSize: `min(${size}cqw, 38vh)`,
          lineHeight: 0.78,
          letterSpacing: '-0.01em',
          transform: 'translateY(-6.333333%) scaleY(0.62)',
          transformOrigin: 'center center',
        }}
      >
        CITADEL
      </span>
    </div>
  );
}
