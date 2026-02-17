
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../App';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const { lang, setLang, user, setUser, t } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('drc_user');
    navigate('/login');
  };

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.apply'), path: '/apply' },
    { name: t('nav.status'), path: '/status' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <i className="fas fa-id-card text-blue-600 text-3xl mr-2"></i>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Digital Ration Card</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    lang === l.code ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm"
                >
                  <i className="fas fa-user-circle mr-1"></i> {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Language</p>
            <div className="flex space-x-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setIsMenuOpen(false); }}
                  className={`px-3 py-1 text-sm rounded-md ${
                    lang === l.code ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 space-y-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left font-medium text-gray-700"
                >
                  Dashboard ({user.username})
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 font-medium"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center text-gray-700 border border-gray-300 rounded-md font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full px-4 py-2 text-center bg-blue-600 text-white rounded-md font-medium"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
