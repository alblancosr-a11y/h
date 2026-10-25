
import React from 'react';
import { motion } from 'framer-motion';
import { BirthdayData } from '../types';
import { Settings, X } from 'lucide-react';

interface CustomizerProps {
  data: BirthdayData;
  onChange: (data: BirthdayData) => void;
  onClose: () => void;
}

const Customizer: React.FC<CustomizerProps> = ({ data, onChange, onClose }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    onChange({ ...data, [name]: val });
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto p-6 border-l border-gray-100"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">تخصيص المعايدة</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-6 text-right" dir="rtl">
        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المستلم</label>
          <input
            type="text"
            name="recipientName"
            value={data.recipientName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="مثال: سارة، أحمد..."
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">العمر (اختياري)</label>
          <input
            type="text"
            name="age"
            value={data.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="مثال: 25"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة على الظرف</label>
          <input
            type="text"
            name="envelopeMessage"
            value={data.envelopeMessage}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">الرسالة التمهيدية</label>
          <textarea
            name="introMessage"
            value={data.introMessage}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">نص المعايدة الأساسي</label>
          <textarea
            name="mainGreeting"
            value={data.mainGreeting}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الصورة (اختياري)</label>
          <input
            type="text"
            name="imageUrl"
            value={data.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="https://example.com/image.jpg"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">التوقيع</label>
          <input
            type="text"
            name="signature"
            value={data.signature}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
          />
        </section>

        <section>
          <label className="block text-sm font-semibold text-gray-700 mb-2">مفاجأة ختامية</label>
          <textarea
            name="extraSurprise"
            value={data.extraSurprise}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
            placeholder="رسالة تظهر عند الضغط على 'هناك شيء آخر'"
          />
        </section>

        <div className="grid grid-cols-2 gap-4">
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">اللون الأساسي</label>
            <div className="flex gap-2">
              <input
                type="color"
                name="primaryColor"
                value={data.primaryColor}
                onChange={handleChange}
                className="w-10 h-10 p-0 border-none rounded cursor-pointer"
              />
              <input
                type="text"
                value={data.primaryColor}
                onChange={handleChange}
                name="primaryColor"
                className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
              />
            </div>
          </section>
          <section>
            <label className="block text-sm font-semibold text-gray-700 mb-2">اللون الثانوي</label>
            <div className="flex gap-2">
              <input
                type="color"
                name="secondaryColor"
                value={data.secondaryColor}
                onChange={handleChange}
                className="w-10 h-10 p-0 border-none rounded cursor-pointer"
              />
              <input
                type="text"
                value={data.secondaryColor}
                onChange={handleChange}
                name="secondaryColor"
                className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded"
              />
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-3 py-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="enableConfetti"
              checked={data.enableConfetti}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">تفعيل القصاصات الاحتفالية</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="enableFloatingIcons"
              checked={data.enableFloatingIcons}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">تفعيل الرموز العائمة</span>
          </label>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
        <button 
          onClick={onClose}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
        >
          حفظ ومعاينة
        </button>
      </div>
    </motion.div>
  );
};

export default Customizer;
