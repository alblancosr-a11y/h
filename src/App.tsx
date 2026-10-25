import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Share2, Heart, Star, Settings, Edit2 } from 'lucide-react';
import { BirthdayData, defaultData } from './types';
import Envelope from './components/Envelope';
import Letter from './components/Letter';
import Customizer from './components/Customizer';
import AudioControls from './components/AudioControls';

const App: React.FC = () => {
  const [data, setData] = useState<BirthdayData>(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('d');
    if (sharedData) {
      try {
        return JSON.parse(atob(sharedData));
      } catch (e) {
        console.error("Failed to parse shared data", e);
      }
    }
    const saved = localStorage.getItem('birthday_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [isSharedLink] = useState(() => !!new URLSearchParams(window.location.search).get('d'));

  // Single persistent Audio Element
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    localStorage.setItem('birthday_data', JSON.stringify(data));
  }, [data]);

  // Audio initialization and sync loop
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(data.audioUrl || '/song.mp3');
      audioRef.current.loop = false;
    } else {
      audioRef.current.src = data.audioUrl || '/song.mp3';
    }

    const audio = audioRef.current;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [data.audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleOpenEnvelope = () => {
    if (isOpen) return;

    // Start Audio at specified startTime (0s)
    if (audioRef.current) {
      audioRef.current.currentTime = data.startTime || 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }

    setIsOpen(true);
    setTimeout(() => {
      setIsExtracted(true);
      setTimeout(() => {
        setShowFullLetter(true);
        if (data.enableConfetti) {
          triggerConfetti();
        }
      }, 1000);
    }, 1000);
  };

  const triggerConfetti = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, [data.enableConfetti]);

  const resetExperience = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    setIsOpen(false);
    setIsExtracted(false);
    setShowFullLetter(false);
  };

  const shareGreeting = () => {
    const encodedData = btoa(JSON.stringify(data));
    const shareUrl = `${window.location.origin}${window.location.pathname}?d=${encodedData}`;
    const text = `معايدة عيد ميلاد خاصة لك: ${shareUrl}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'معايدة عيد ميلاد',
        text: text,
        url: shareUrl,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('تم نسخ رابط المعايدة بنجاح!');
    }
  };

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden relative flex flex-col items-center justify-center p-4 transition-all duration-1000"
      style={{ 
        backgroundColor: showFullLetter ? '#ffffff' : data.secondaryColor,
        backgroundImage: showFullLetter 
          ? `radial-gradient(circle at center, #ffffff 0%, ${data.secondaryColor} 100%)` 
          : 'none'
      }}
    >
      {/* Persistent Audio Controls */}
      {showFullLetter && (
        <AudioControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          onTogglePlay={togglePlay}
          onToggleMute={toggleMute}
          showFullControls={data.showAudioControls}
        />
      )}

      {/* Floating Elements Background */}
      {data.enableFloatingIcons && !showFullLetter && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: 800,
                rotate: 0,
                opacity: 0.1
              }}
              animate={{ 
                y: -100, 
                rotate: 360,
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: Math.random() * 20 + 10, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute"
              style={{ color: data.primaryColor, opacity: 0.2 }}
            >
              {i % 2 === 0 ? <Heart size={24} fill="currentColor" /> : <Star size={24} fill="currentColor" />}
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Experience Container */}
      <div className="z-10 w-full flex flex-col items-center justify-center min-h-[600px]">
        <div className="relative w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showFullLetter ? (
              <motion.div
                key="envelope-container"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full flex justify-center relative"
              >
                <Envelope 
                  isOpen={isOpen} 
                  isExtracted={isExtracted}
                  onClick={handleOpenEnvelope} 
                  message={data.envelopeMessage}
                  primaryColor={data.primaryColor}
                >
                  <motion.div
                    initial={{ y: 0 }}
                    animate={isExtracted ? { y: -350 } : (isOpen ? { y: -50 } : { y: 0 })}
                    transition={{ duration: 1.5, ease: "anticipate" }}
                    className="w-full h-[600px] bg-[#fffcf9] shadow-xl rounded-sm border-t-8"
                    style={{ borderTopColor: data.primaryColor }}
                  >
                    <div className="p-4 flex flex-col items-center gap-2 opacity-40">
                      <div className="w-12 h-1 bg-gray-200 rounded"></div>
                      <div className="w-20 h-1 bg-gray-200 rounded"></div>
                      <div className="w-16 h-1 bg-gray-200 rounded"></div>
                    </div>
                  </motion.div>
                </Envelope>
              </motion.div>
            ) : (
              <motion.div
                key="letter-full"
                initial={{ y: 200, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 80,
                  damping: 15
                }}
                className="w-full flex flex-col items-center max-w-4xl"
              >
                <Letter 
                  data={data}
                  currentTime={currentTime}
                  onExtraSurprise={() => {
                    if (data.enableConfetti) triggerConfetti();
                  }}
                />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="mt-8 mb-12 flex gap-4"
                >
                  <button
                    onClick={resetExperience}
                    className="bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 px-6 py-2 rounded-full hover:bg-white transition-colors flex items-center gap-2 font-bold shadow-sm"
                  >
                    إعادة فتح الظرف
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
        {!isSharedLink ? (
          <button
            onClick={() => setShowCustomizer(true)}
            className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-pink-600 transition-all hover:scale-110 border border-gray-100"
            title="تعديل المعايدة"
          >
            <Settings className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => {
              window.location.href = window.location.origin + window.location.pathname;
            }}
            className="bg-white/90 backdrop-blur shadow-lg rounded-full px-4 py-2 text-sm font-bold text-gray-700 hover:text-pink-600 transition-all border border-gray-100 flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>إنشاء معايدة خاصة بك</span>
          </button>
        )}
        <button
          onClick={shareGreeting}
          className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 transition-all hover:scale-110 border border-gray-100"
          title="مشاركة المعايدة"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Customizer Overlay */}
      <AnimatePresence>
        {showCustomizer && (
          <Customizer 
            data={data} 
            onChange={setData} 
            onClose={() => setShowCustomizer(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
