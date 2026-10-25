import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LyricLine } from '../types';

interface SyncedLyricsProps {
  lyrics: LyricLine[];
  currentTime: number;
}

export const SyncedLyrics: React.FC<SyncedLyricsProps> = ({ lyrics, currentTime }) => {
  // Find current line index based on current audio position
  const activeIndex = lyrics.reduce((acc, line, idx) => {
    if (currentTime >= line.time) return idx;
    return acc;
  }, -1);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[220px] py-6 text-center">
      <AnimatePresence mode="wait">
        {activeIndex >= 0 ? (
          <motion.div
            key={lyrics[activeIndex].id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1.05 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-4"
          >
            <p className="text-2xl md:text-4xl font-serif font-bold text-pink-700 tracking-wide drop-shadow-sm leading-relaxed">
              {lyrics[activeIndex].text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="intro-music"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-gray-400 font-serif italic text-lg"
          >
            🎵 ...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SyncedLyrics;
