import { motion } from 'motion/react';
import { Home, Info, MapPin, Wrench, Mail, Package } from 'lucide-react';
import { Button } from '../Button';

export const Navbar: React.FC = () => {
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
      className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-xl border-b border-glass-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Package className="w-8 h-8 text-primary" strokeWidth={2.5} />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-pink-glow rounded-lg blur-md"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-dark bg-clip-text text-transparent">
                DermaStation
              </h1>
              <p className="text-xs text-muted-foreground">Smart Skincare Hub</p>
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
                className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
