
import React, { useState } from 'react';
import { useAppContext } from '../App';

const Contact: React.FC = () => {
   const { t } = useAppContext();
   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
   const [submitted, setSubmitted] = useState(false);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      // Simulate API call
      setTimeout(() => {
         setSubmitted(false);
         setFormData({ name: '', email: '', subject: '', message: '' });
         alert(t('contact.form.success'));
      }, 1500);
   };

   return (
      <div className="fade-in max-w-7xl mx-auto px-4 py-20">
         <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{t('contact.title')}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('contact.desc')}</p>
         </div>

         <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                     <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('contact.form.name')}</label>
                        <input
                           type="text"
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder={t('contact.form.placeholders.name')}
                           value={formData.name}
                           onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                     </div>
                     <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('contact.form.email')}</label>
                        <input
                           type="email"
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder={t('contact.form.placeholders.email')}
                           value={formData.email}
                           onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('contact.form.subject')}</label>
                        <input
                           type="text"
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder={t('contact.form.placeholders.subject')}
                           value={formData.subject}
                           onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">{t('contact.form.message')}</label>
                        <textarea
                           rows={5}
                           required
                           className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                           placeholder={t('contact.form.placeholders.message')}
                           value={formData.message}
                           onChange={e => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                     </div>
                     <div className="col-span-2">
                        <button
                           type="submit"
                           disabled={submitted}
                           className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center"
                        >
                           {submitted && <i className="fas fa-spinner fa-spin mr-2"></i>}
                           {submitted ? t('contact.form.sending') : t('contact.form.submit')}
                        </button>
                     </div>
                  </form>
               </div>
            </div>

            <div className="space-y-8">
               <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6">{t('contact.office.title')}</h3>
                  <div className="space-y-4">
                     <div className="flex items-start">
                        <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-4"></i>
                        <p className="text-gray-600 text-sm">
                           {t('contact.office.address')}
                        </p>
                     </div>
                     <div className="flex items-start">
                        <i className="fas fa-phone-alt text-blue-600 mt-1 mr-4"></i>
                        <p className="text-gray-600 text-sm">
                           {t('contact.office.phone')}
                        </p>
                     </div>
                     <div className="flex items-start">
                        <i className="fas fa-clock text-blue-600 mt-1 mr-4"></i>
                        <p className="text-gray-600 text-sm">
                           {t('contact.office.hours')}
                        </p>
                     </div>
                  </div>
               </div>

               <div className="bg-blue-600 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">{t('contact.grievance.title')}</h3>
                  <p className="text-blue-100 text-sm mb-6">
                     {t('contact.grievance.desc')}
                  </p>
                  <a href="tel:1967" className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50">
                     {t('contact.grievance.call')}
                  </a>
               </div>
            </div>
         </div>

         <div className="mt-20 h-[400px] bg-gray-200 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
               [ Interactive Google Maps Embed - Placeholder ]
            </div>
            <img src="https://picsum.photos/seed/map/1200/400" className="w-full h-full object-cover opacity-50" alt="Map background" />
         </div>
      </div>
   );
};

export default Contact;
