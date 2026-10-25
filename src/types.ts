export interface LyricLine {
  id: string;
  time: number;
  text: string;
}

export interface BirthdayData {
  recipientName: string;
  age?: string;
  envelopeMessage: string;
  mainGreeting: string;
  introMessage: string;
  closingMessage: string;
  signature: string;
  primaryColor: string;
  secondaryColor: string;
  theme: 'romantic' | 'fun' | 'elegant' | 'minimal';
  enableConfetti: boolean;
  enableFloatingIcons: boolean;
  extraSurprise?: string;
  imageUrl?: string;
  audioUrl?: string;
  startTime?: number;
  lyricsEndTime?: number;
  showAudioControls?: boolean;
  lyrics?: LyricLine[];
}

export const defaultData: BirthdayData = {
  recipientName: 'سارة',
  age: '25',
  envelopeMessage: 'افتح الظرف لمفاجأة عيد الميلاد...',
  introMessage: 'كل عام وأنتِ بخير وأسعد الناس...',
  mainGreeting: 'أتمنى لكِ عاماً مليئاً بالحب والسعادة والنجاح. يوم ميلادك هو أجمل الأيام وأحلاها على الإطلاق!',
  closingMessage: 'مع كامل حبّي وإخلاصي،',
  signature: 'أحمد',
  primaryColor: '#ec4899',
  secondaryColor: '#fdf2f8',
  theme: 'elegant',
  enableConfetti: true,
  enableFloatingIcons: true,
  extraSurprise: 'أتمنى أن تكون كل أمنياتك محققة هذا العام! 🎉✨',
  imageUrl: '',
  audioUrl: '/song.mp3',
  startTime: 0,
  lyricsEndTime: 16,
  showAudioControls: true,
  lyrics: [
    { id: '1', time: 1, text: 'عِيد مِيلاد سَعِيد' },
    { id: '2', time: 5, text: 'عِيد مِيلاد جَدِيد' },
    { id: '3', time: 8, text: 'يَوْم مِيلادك.. يَوْم مِيلادك' },
    { id: '4', time: 12, text: 'يَوْم مِيلادك أَحْلَى عِيد' }
  ]
};
