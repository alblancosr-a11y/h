
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  isOpen: boolean;
  isExtracted: boolean;
  onClick: () => void;
  message: string;
  primaryColor: string;
  children?: React.ReactNode;
}

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, isExtracted, onClick, message, primaryColor, children }) => {
  return (
    <motion.div 
      whileHover={!isOpen ? { scale: 1.02, rotateY: 5 } : {}}
      animate={!isOpen ? { y: [0, -10, 0] } : { 
        y: isExtracted ? 200 : 0, 
        opacity: isExtracted ? 0 : 1,
        scale: isExtracted ? 0.8 : 1
      }}
      transition={!isOpen ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.8 }}
      className="relative perspective-1000 w-full max-w-md aspect-[3/2] cursor-pointer group" 
      onClick={onClick}
    >
      {/* The Letter inside the envelope */}
      <div className="absolute inset-x-4 bottom-4 top-4 z-5 overflow-hidden">
        {children}
      </div>

      {/* Flap (Top) */}
      <motion.div
        animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ 
          transformOrigin: 'top',
          backgroundColor: primaryColor,
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
          clipPath: 'polygon(0 0, 50% 50%, 100% 0)' 
        }}
        className="absolute inset-0 z-20 shadow-lg border-t border-white/30"
      />
      
      {/* Front Side - Left */}
      <div 
        style={{ 
          backgroundColor: primaryColor,
          clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
          filter: 'brightness(98%)'
        }}
        className="absolute inset-0 z-10"
      />

      {/* Front Side - Right */}
      <div 
        style={{ 
          backgroundColor: primaryColor,
          clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
          filter: 'brightness(98%)'
        }}
        className="absolute inset-0 z-10"
      />

      {/* Front Side - Bottom */}
      <div 
        style={{ 
          backgroundColor: primaryColor,
          clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
          filter: 'brightness(92%)'
        }}
        className="absolute inset-0 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]"
      />

      {/* Back/Body */}
      <div 
        style={{ 
          backgroundColor: primaryColor, 
          filter: 'brightness(85%)',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)'
        }}
        className="absolute inset-0 -z-10 rounded-sm shadow-2xl"
      />

      {/* Message on Envelope */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
          >
            <div className="bg-white px-6 py-2 rounded-full shadow-2xl text-sm font-bold text-gray-800 mb-6 border-b-4 border-pink-100">
              {message}
            </div>
            <div className="relative group-hover:scale-110 transition-transform duration-500">
              <div className="absolute inset-0 bg-pink-400 blur-xl rounded-full opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(236,72,153,0.5)] border-4 border-white">
                  <Heart className="text-white fill-white w-10 h-10 drop-shadow-lg" />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center gap-2">
               <p className="text-white font-bold text-sm tracking-widest uppercase">
                انقر لفتح المفاجأة
              </p>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
};

export default Envelope;
