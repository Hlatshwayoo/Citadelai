import React from 'react';
import { ArrowRight } from 'lucide-react';
import CitadelMasthead from './CitadelMasthead';

interface HeroProps {
  onGetStarted?: () => void;
  onExploreModels?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onExploreModels }) => {
  return (
    <section
      className="relative w-full h-screen min-h-[720px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-[#A3A7AA] select-none"
      style={{ containerType: 'size' }}
    >
      {/* 1. Base Plate: High-Resolution Concrete Textured Background + Studio Scene */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/images/6OeO0J1IaO0kPaNmvOWes6nrKo.webp"
          alt="Citadel background plate"
          className="absolute inset-0 w-full h-full object-cover object-[74%_50%] lg:object-[100%_50%] pointer-events-none"
          style={{
            filter: 'contrast(1.08) brightness(1.02)',
            imageRendering: '-webkit-optimize-contrast',
          }}
          draggable={false}
        />
      </div>

      {/* 2. Middle Layer: Dynamically sized & aligned CitadelMasthead */}
      <CitadelMasthead />

      {/* 3. Horizontal Red Laser Line across the entire width (top ~43.5%) */}
      <div
        className="absolute left-0 right-0 top-[43.5%] h-[2px] bg-[#FF2D16] z-20 pointer-events-none animate-em-line"
        style={{
          boxShadow: '0 0 8px rgba(255,45,22,0.85), 0 0 2px #FF2D16',
        }}
      />

      {/* 4. Top Layer: High-Clarity Robot Cutout (Overlaps the "CITADEL" Masthead in 3D) */}
      <div className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden">
        <img
          src="/images/uYajC1T9XE75vDikUq6BB2sPx6g.webp"
          alt="A humanoid robot in a matte black helmet with a thin red visor line"
          className="absolute inset-0 w-full h-full object-cover object-[74%_50%] lg:object-[100%_50%] pointer-events-none"
          style={{
            filter: 'contrast(1.15) brightness(1.04) saturate(1.05)',
            imageRendering: '-webkit-optimize-contrast',
          }}
          draggable={false}
        />

        {/* Visor Slit Illumination highlight on the helmet */}
        <div
          className="absolute left-[54%] sm:left-[56%] lg:left-[59%] top-[43.2%] w-[12%] sm:w-[9%] lg:w-[7.5%] h-[4px] rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #FF2D16 0%, #FFFFFF 50%, #FF2D16 100%)',
            boxShadow: '0 0 12px #FF2D16, 0 0 4px #FFFFFF',
            transform: 'rotate(-1.5deg)',
          }}
        />
      </div>

      {/* Spacer to push content down below the nav */}
      <div className="w-full h-24 sm:h-28" />

      {/* 5. Lower-Left Copy Section: Positioned cleanly with zero clashing */}
      <div className="relative z-40 max-w-[1400px] w-full mx-auto px-6 sm:px-10 lg:px-12 mt-auto pb-10 sm:pb-14 lg:pb-18 pointer-events-auto">
        <div className="max-w-[440px] sm:max-w-[490px] lg:max-w-[530px] flex flex-col items-start gap-4 sm:gap-5">
          {/* Headline - Clean, bold, highly legible with subtle cinematic fade-in-up */}
          <h1 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-semibold text-[#0B0B0C] tracking-tight leading-[1.12] text-balance animate-fade-in-up">
            Build, deploy and scale AI software.
          </h1>

          {/* Subtitle - Subtle fade-in-up with 150ms delay */}
          <p className="text-sm sm:text-base text-[#383C40] font-normal leading-relaxed text-balance animate-fade-in-up animation-delay-150">
            One secure platform to design, import, build and publish AI-powered applications.
          </p>

          {/* Action CTAs: Black Pill Button + Text Link with 300ms delay */}
          <div className="flex items-center gap-5 sm:gap-6 pt-2 animate-fade-in-up animation-delay-300">
            <button
              onClick={() =>
                onGetStarted
                  ? onGetStarted()
                  : document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0B0B0C] hover:bg-[#1C1D20] active:scale-[0.98] rounded-full transition-all duration-200 shadow-md cursor-pointer focus:outline-none"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() =>
                onExploreModels
                  ? onExploreModels()
                  : document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#0B0B0C] hover:text-[#FF2D16] transition-colors cursor-pointer focus:outline-none"
            >
              <span>Explore models</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
