import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, Info, MapPin, Wrench, Mail, Package } from 'lucide-react';
import { Button } from '../Button';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About Us', icon: Info, href: '#about' },
    { name: 'Branches', icon: MapPin, href: '#branches' },
    { name: 'Services', icon: Wrench, href: '#services' },
    { name: 'Contact', icon: Mail, href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ backgroundColor: navBg }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-luxury shadow-lg shadow-primary/10' : 'backdrop-blur-sm'
      } border-b ${scrolled ? 'border-primary/30' : 'border-primary/10'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Package className="w-9 h-9 text-primary neon-glow" strokeWidth={2.5} />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 bg-pink-glow rounded-lg blur-lg"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-pink-medium to-pink-dark bg-clip-text text-transparent gradient-shift">
                DermaStation
              </h1>
              <p className="text-xs text-gray-400 tracking-wide">Smart Skincare Hub</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-300 hover:text-primary transition-all duration-300 group relative"
              >
                <item.icon className="w-4 h-4 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_rgba(255,27,141,0.8)] transition-all" />
                <span className="font-medium">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-dark group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="primary" size="sm" className="btn-luxury-glow">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
