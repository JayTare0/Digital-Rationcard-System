
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Home: React.FC = () => {
  const { t } = useAppContext();
  const [counts, setCounts] = useState({ issued: 0, active: 0, villages: 0 });

  useEffect(() => {
    // Simple counter animation
    const interval = setInterval(() => {
      setCounts(prev => ({
        issued: Math.min(prev.issued + 1250, 4500000),
        active: Math.min(prev.active + 850, 1200000),
        villages: Math.min(prev.villages + 25, 12450)
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    { icon: 'fa-laptop-code', color: 'bg-blue-100 text-blue-600' },
    { icon: 'fa-search', color: 'bg-green-100 text-green-600' },
    { icon: 'fa-language', color: 'bg-orange-100 text-orange-600' },
    { icon: 'fa-shield-alt', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative bg-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <polygon points="0,100 100,0 100,100" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 sm:py-32 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-lg">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/apply" className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-colors text-center">
                {t('home.ctaApply')}
              </Link>
              <Link to="/status" className="px-8 py-3 bg-blue-800 text-white border border-blue-600 font-bold rounded-lg hover:bg-blue-900 transition-colors text-center">
                {t('home.ctaStatus')}
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-blue-600 font-bold text-lg">Govt. of India</div>
                  <i className="fas fa-id-card text-blue-600 text-3xl"></i>
                </div>
                <div className="h-24 w-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <i className="fas fa-user text-gray-400 text-4xl"></i>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-100 rounded"></div>
                  <div className="h-3 w-40 bg-gray-100 rounded"></div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Antyodaya Anna Yojana</div>
                  <i className="fas fa-qrcode text-gray-800 text-xl"></i>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-12 w-12 bg-orange-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{(counts.issued / 1000000).toFixed(1)}M+</p>
              <p className="text-gray-500 text-sm mt-1">{t('home.stats.issued')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{(counts.active / 1000000).toFixed(1)}M+</p>
              <p className="text-gray-500 text-sm mt-1">{t('home.stats.active')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{(counts.villages / 1000).toFixed(1)}K+</p>
              <p className="text-gray-500 text-sm mt-1">{t('home.stats.villages')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">5.4L+</p>
              <p className="text-gray-500 text-sm mt-1">{t('home.stats.centers')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.benefitsTitle')}</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t('home.benefits').map((benefit: any, idx: number) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow group border border-gray-100">
                <div className={`h-14 w-14 ${benefits[idx].color} rounded-lg flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${benefits[idx].icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Government Schemes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Pradhan Mantri Garib Kalyan Anna Yojana",
                date: "Scheme • Ongoing",
                desc: "Providing 5kg free food grains to 80 crore poor people, ensuring no one goes to sleep hungry.",

              },
              {
                title: "One Nation One Ration Card",
                date: "Initiative • Active",
                desc: "Enabling migrant workers to lift their entitled food grains from any Fair Price Shop across the country.",

              },
              {
                title: "Antyodaya Anna Yojana",
                date: "Scheme • Active",
                desc: "Dedicated to the poorest of the poor families, providing 35kg of food grains per family per month.",

              }
            ].map((scheme, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 group bg-white shadow-sm hover:shadow-md transition-all duration-300">

                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{scheme.date}</div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{scheme.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{scheme.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
