
import React from 'react';
import { useAppContext } from '../App';

const About: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="fade-in">
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('about.desc')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('about.typesTitle')}</h2>
              <div className="space-y-8">
                <div className="flex">
                  <div className="h-10 w-10 bg-yellow-100 text-yellow-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold mr-4">AAY</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{t('about.types.aay.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('about.types.aay.desc')}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="h-10 w-10 bg-red-100 text-red-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold mr-4">BPL</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{t('about.types.bpl.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('about.types.bpl.desc')}</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold mr-4">APL</div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">{t('about.types.apl.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('about.types.apl.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl p-2">
              <img src="https://www.thestatesman.com/wp-content/uploads/2019/10/QT-ration-cards.jpg" className="rounded-3xl shadow-xl w-full h-full object-cover" alt="Ration Distribution" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('about.eligibilityTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <i className="fas fa-user-check text-blue-600 text-3xl mb-6"></i>
              <h3 className="text-xl font-bold mb-4">{t('about.eligibility.citizenship.title')}</h3>
              <p className="text-gray-600 text-sm">{t('about.eligibility.citizenship.desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <i className="fas fa-users text-green-600 text-3xl mb-6"></i>
              <h3 className="text-xl font-bold mb-4">{t('about.eligibility.family.title')}</h3>
              <p className="text-gray-600 text-sm">{t('about.eligibility.family.desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <i className="fas fa-file-alt text-orange-600 text-3xl mb-6"></i>
              <h3 className="text-xl font-bold mb-4">{t('about.eligibility.income.title')}</h3>
              <p className="text-gray-600 text-sm">{t('about.eligibility.income.desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
