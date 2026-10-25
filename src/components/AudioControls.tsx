import React from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  showFullControls?: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  showFullControls = true
}) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg border border-pink-100 text-gray-700">
      <button
        onClick={onTogglePlay}
        className="p-1.5 hover:bg-pink-50 text-pink-600 rounded-full transition-colors"
        title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {showFullControls && (
        <button
          onClick={onToggleMute}
          className="p-1.5 hover:bg-pink-50 text-gray-600 hover:text-pink-600 rounded-full transition-colors"
          title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};
export default AudioControls;
