import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, User, Briefcase, Phone, Database, Palette, Check, Sun, Moon } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import EmployeeDB from './pages/EmployeeDB';
import ChatBot from './components/ChatBot';
import { motion, AnimatePresence } from 'framer-motion';

// --- Navbar Component ---
const Navbar = ({ currentTheme, setTheme }: { currentTheme: string, setTheme: (t: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/', icon: <Globe size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    { name: 'Services', path: '/services', icon: <Briefcase size={18} /> },
    { name: 'Employees', path: '/employees', icon: <Database size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  const themes = [
    { id: 'default', name: 'Cyber Blue (Dark)', color: '#3b82f6', icon: <Moon size={14}/> },
    { id: 'theme-light', name: 'Corporate Light', color: '#f8fafc', icon: <Sun size={14}/> },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-primary/95 backdrop-blur-md border-b border-ui-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
             {/* Logo Image */}
             <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-accent-hover p-0.5 shadow-[0_0_20px_var(--color-accent)] group-hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                   <span className="text-xl font-bold font-display text-white">AK</span>
                </div>
             </div>
             <div className="flex flex-col">
               <span className="font-display font-bold text-xl tracking-wider text-text-main">AK TECH HUB</span>
               <span className="text-xs text-accent">Innovate. Learn. Connect.</span>
             </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-baseline space-x-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                    location.pathname === link.path ? 'text-accent bg-ui-panel shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-ui-panel'
                  }`}
                >
                  {link.icon}
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-[0_0_10px_var(--color-accent)]"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Theme Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-full bg-ui-panel hover:bg-accent/10 text-text-muted hover:text-accent transition-colors relative border border-transparent hover:border-ui-border"
              >
                <Palette size={20} />
              </button>
              
              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-primary-light border border-ui-border rounded-xl shadow-xl overflow-hidden py-2"
                  >
                    {themes.map(t => (
                      <button 
                        key={t.id}
                        onClick={() => { setTheme(t.id); setShowThemeMenu(false); }}
                        className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-ui-panel transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-ui-border ${t.id === 'theme-light' ? 'bg-gray-100 text-yellow-600' : 'bg-gray-900 text-white'}`}>
                            {t.icon}
                          </div>
                          <span className="text-sm font-medium text-text-main">{t.name}</span>
                        </div>
                        {currentTheme === t.id && <Check size={14} className="text-accent" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-full bg-ui-panel text-text-muted hover:text-accent border border-ui-border"
              >
              <Palette size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-muted hover:text-text-main hover:bg-ui-panel focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-light border-b border-ui-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-4 rounded-md text-base font-medium ${
                    location.pathname === link.path ? 'text-accent bg-ui-panel' : 'text-text-muted hover:text-text-main hover:bg-ui-panel'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Theme Menu Overlay */}
      <AnimatePresence>
          {showThemeMenu && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center md:hidden backdrop-blur-sm"
               onClick={() => setShowThemeMenu(false)}
             >
                <div className="bg-primary-light p-6 rounded-2xl w-3/4 border border-ui-border shadow-2xl" onClick={e => e.stopPropagation()}>
                  <h3 className="text-xl font-bold font-display mb-4 text-center text-text-main">Select Theme</h3>
                  <div className="space-y-2">
                    {themes.map(t => (
                        <button 
                          key={t.id}
                          onClick={() => { setTheme(t.id); setShowThemeMenu(false); }}
                          className={`w-full text-left px-4 py-3 flex items-center justify-between rounded-lg border transition-all ${currentTheme === t.id ? 'bg-accent/10 border-accent' : 'bg-ui-panel border-transparent'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-ui-border ${t.id === 'theme-light' ? 'bg-gray-100 text-yellow-600' : 'bg-gray-900 text-white'}`}>
                              {t.icon}
                            </div>
                            <span className="text-sm font-medium text-text-main">{t.name}</span>
                          </div>
                          {currentTheme === t.id && <Check size={14} className="text-accent" />}
                        </button>
                    ))}
                  </div>
                </div>
             </motion.div>
          )}
      </AnimatePresence>
    </nav>
  );
};

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-primary-light border-t border-ui-border pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <span className="font-display font-bold text-xl tracking-wider text-text-main">AK TECH HUB</span>
          <p className="mt-4 text-text-muted text-sm">
            Bridging the gap between youth and cutting-edge technology.
          </p>
        </div>
        <div>
          <h3 className="text-text-main font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-text-muted text-sm">
            <li>Web Development</li>
            <li>Cloud Solutions</li>
            <li>IT Consulting</li>
            <li>Education</li>
          </ul>
        </div>
        <div>
          <h3 className="text-text-main font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-text-muted text-sm">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-text-main font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-text-muted text-sm">
            <li className="hover:text-accent cursor-pointer">Twitter</li>
            <li className="hover:text-accent cursor-pointer">LinkedIn</li>
            <li className="hover:text-accent cursor-pointer">Facebook</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 border-t border-ui-border pt-8 text-center text-text-muted text-sm">
        &copy; {new Date().getFullYear()} AK Tech Hub Pvt. Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

const App = () => {
  const [theme, setTheme] = useState('default');

  return (
    <HashRouter>
      <div className={`min-h-screen bg-primary text-text-main flex flex-col font-sans selection:bg-accent selection:text-white ${theme}`}>
        <Navbar currentTheme={theme} setTheme={setTheme} />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/employees" element={<EmployeeDB />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </HashRouter>
  );
};

export default App;