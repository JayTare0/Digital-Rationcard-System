
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Language, User } from './types';
import { translations } from './translations';
import Home from './pages/Home';
import About from './pages/About';
import Apply from './pages/Apply';
import Status from './pages/Status';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context for Language and Authentication
interface AppContextType {
  lang: Language;
  setLang: (l: Language) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  t: (key: string) => any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);

  // Initialize data from localStorage if available
  useEffect(() => {
    const savedUser = localStorage.getItem('drc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedLang = localStorage.getItem('drc_lang') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const changeLang = (l: Language) => {
    setLang(l);
    localStorage.setItem('drc_lang', l);
  };

  const t = (path: string) => {
    const parts = path.split('.');
    let current: any = translations[lang];
    for (const part of parts) {
      if (current[part] === undefined) return path;
      current = current[part];
    }
    return current;
  };

  return (
    <AppContext.Provider value={{ lang, setLang: changeLang, user, setUser, t }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/status" element={<Status />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={user ? <UserDashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/admin"
                element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
