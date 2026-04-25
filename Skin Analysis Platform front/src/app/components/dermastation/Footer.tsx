import { motion } from 'motion/react';
import { Package, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press', 'Blog']
    },
    {
      title: 'Services',
      links: ['Skin Analysis', 'Products', 'Locations', 'Partnership']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact', 'Privacy Policy', 'Terms of Service']
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-b from-white to-pink-light/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <Package className="w-8 h-8 text-primary" strokeWidth={2.5} />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-pink-dark bg-clip-text text-transparent">
                  DermaStation
                </h3>
                <p className="text-xs text-muted-foreground">Smart Skincare Hub</p>
              </div>
            </motion.div>

            <p className="text-muted-foreground mb-6 max-w-sm">
              Revolutionizing skincare with AI-powered analysis and smart vending technology.
              Your perfect skin routine, delivered 24/7.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@dermastation.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span>1-800-DERMA-ST</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Available at 50+ locations nationwide</span>
              </div>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 DermaStation. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-pink-light border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
