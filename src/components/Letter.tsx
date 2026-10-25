import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayData } from '../types';
import SyncedLyrics from './SyncedLyrics';
import { Gift } from 'lucide-react';

interface LetterProps {
  data: BirthdayData;
  currentTime: number;
  onExtraSurprise?: () => void;
}

export const Letter: React.FC<LetterProps> = ({ data, currentTime, onExtraSurprise }) => {
  const [extraStage, setExtraStage] = React.useState(false);

  // Transition from lyrics to greeting exactly at lyricsEndTime (16s)
  const isLyricsPhase = currentTime < (data.lyricsEndTime ?? 16);

  return (
    <div
      className="w-full max-w-2xl bg-[#fffcf9] rounded-sm shadow-2xl p-8 md:p-12 min-h-[500px] relative flex flex-col items-center text-center overflow-hidden border border-gray-100"
      style={{
        borderTop: `12px solid ${data.primaryColor}`,
        backgroundImage: 'radial-gradient(#e5e7eb 0.5px, transparent 0.5px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <AnimatePresence mode="wait">
        {isLyricsPhase ? (
          <motion.div
            key="lyrics-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.8 }}
            className="w-full my-auto flex flex-col items-center justify-center"
          >
            <div className="mb-4 opacity-70">
              <span className="text-xs uppercase tracking-widest text-pink-500 font-bold bg-pink-50 px-3 py-1 rounded-full">
                🎵 أغنية المعايدة
              </span>
            </div>
            <SyncedLyrics lyrics={data.lyrics || []} currentTime={currentTime} />
          </motion.div>
        ) : !extraStage ? (
          <motion.div
            key="greeting-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center my-auto"
          >
            <div className="mb-6">
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
                {data.recipientName}
              </h1>
              {data.age && (
                <span className="text-pink-500 font-medium text-lg italic">
                  العمر: {data.age} سنة 🎉
                </span>
              )}
            </div>

            {data.imageUrl && (
              <div className="mb-8 relative w-48 h-48 mx-auto group">
                <div className="absolute inset-0 bg-pink-200 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform"></div>
                <img
                  src={data.imageUrl}
                  alt={data.recipientName}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-md border-4 border-white z-10"
                />
              </div>
            )}

            <div className="prose prose-pink mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-serif italic">
                {data.mainGreeting}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 italic text-gray-600 font-serif text-lg w-full">
              {data.signature}
            </div>

            {data.extraSurprise && (
              <div className="mt-8">
                <button
                  onClick={() => {
                    setExtraStage(true);
                    if (onExtraSurprise) onExtraSurprise();
                  }}
                  className="text-pink-600 font-semibold underline decoration-pink-300 underline-offset-4 hover:text-pink-800 transition-colors text-sm"
                >
                  اضغط هنا لرؤية المفاجأة الخاصة ✨
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="extra-phase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-10 my-auto"
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-500">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-8 leading-relaxed max-w-lg">
              {data.extraSurprise}
            </h3>
            <button
              onClick={() => setExtraStage(false)}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-bold"
            >
              العودة للرسالة
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Letter;
