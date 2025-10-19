import React, { useState, useEffect } from 'react';

const icons = ['👑', '🧠', '🤝', '⚔️', '🕌', '🚺'];

export const SplashScreen: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  useEffect(() => {
    // FIX: Changed NodeJS.Timeout to number, as setTimeout in the browser returns a number.
    const timers: number[] = [];
    timers.push(setTimeout(() => setStage(1), 100)); // Stage 1: Fade in title & tagline
    timers.push(setTimeout(() => setStage(2), 2000)); // Stage 2: Title up, tagline out
    timers.push(setTimeout(() => setStage(3), 2500)); // Stage 3: Start icon sequence
    timers.push(setTimeout(() => setStage(4), 3800)); // Stage 4: Show developer
    timers.push(setTimeout(() => setStage(5), 4800)); // Stage 5: Fade out everything

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage === 3) {
      const interval = setInterval(() => {
        setCurrentIcon(prev => (prev + 1));
      }, 200);
      if (currentIcon >= icons.length) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [stage, currentIcon]);
  

  const getOpacity = (s: number) => stage === s ? 'opacity-100' : 'opacity-0';

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${stage === 5 ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative text-center w-full h-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Stage 1 & 2: Title and Tagline */}
        <div className={`transition-all duration-700 ease-in-out ${stage >= 2 ? '-translate-y-32' : 'translate-y-0'}`}>
          <h1 className={`text-6xl font-bold text-gray-800 transition-opacity duration-700 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            تاريخنا
          </h1>
          <p className={`mt-4 text-xl text-gray-500 transition-opacity duration-700 ${stage === 1 ? 'opacity-100' : 'opacity-0'}`}>
            الماضي بين يديك، في أي وقت وأي مكان.
          </p>
        </div>

        {/* Stage 3: Icons */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-4">
          {stage === 3 && icons.map((icon, index) => (
             <span key={index} className={`text-5xl transition-all duration-200 ease-in-out ${currentIcon > index ? 'opacity-100 scale-110' : 'opacity-0 scale-50'}`}>
              {icon}
            </span>
          ))}
        </div>

        {/* Stage 4: Developer */}
        <div className={`absolute bottom-10 transition-opacity duration-500 ${getOpacity(4)}`}>
            <p className="text-gray-600">تطوير وصناعة: أيمن بكور</p>
        </div>
      </div>
    </div>
  );
};