import { motion } from 'motion/react';
import { Button } from '../Button';
import { Card } from '../Card';
import { Package, Scan, ShoppingBag, Clock, MapPin, Zap } from 'lucide-react';

export const VendingMachineSection: React.FC = () => {
  const features = [
    {
      icon: Scan,
      title: 'AI Analysis',
      description: 'Scan your face at any DermaStation kiosk for instant skin analysis'
    },
    {
      icon: ShoppingBag,
      title: 'Smart Recommendations',
      description: 'Get personalized product suggestions based on your unique skin profile'
    },
    {
      icon: Package,
      title: 'Instant Dispensing',
      description: 'Products dispensed immediately after purchase - no waiting'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access skincare solutions anytime, anywhere with our smart vending stations'
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-secondary via-black-light to-secondary overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,157,0.1),transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Smart Vending, Smarter Skincare
          </h2>
          <p className="text-xl text-pink-light max-w-2xl mx-auto">
            Experience the future of skincare with our AI-powered vending stations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                <Card className="p-12 bg-gradient-to-br from-primary/20 to-pink-dark/10 border-primary/30 backdrop-blur-xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <Package className="w-32 h-32 text-primary" strokeWidth={1.5} />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                        className="absolute inset-0 bg-pink-glow rounded-full blur-3xl"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4">
                      DermaStation Kiosk
                    </h3>
                    <p className="text-pink-light mb-6">
                      Next-generation skincare vending with built-in AI analysis
                    </p>

                    <div className="grid grid-cols-3 gap-4 w-full">
                      {[
                        { label: 'Touch Screen', icon: Scan },
                        { label: 'AI Camera', icon: Zap },
                        { label: 'Smart Dispenser', icon: Package }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="bg-glass-bg backdrop-blur-sm rounded-xl p-3 border border-primary/20"
                        >
                          <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-xs text-white">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute -top-10 -right-10 w-40 h-40 border-4 border-primary/20 rounded-full blur-sm"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <Card className="p-6 bg-glass-bg backdrop-blur-xl border-primary/20 hover:border-primary/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary to-pink-dark rounded-xl">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 text-white">{feature.title}</h4>
                      <p className="text-sm text-pink-light">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-pink-dark rounded-3xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Find a DermaStation Near You</h3>
          <p className="text-lg mb-8 text-pink-light max-w-2xl mx-auto">
            Visit one of our locations to experience AI-powered skincare vending
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="gap-2">
              <MapPin className="w-5 h-5" />
              View Locations
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              Learn More
            </Button>
          </div>

          <div className="flex justify-center gap-12 mt-12">
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-pink-light">Locations</div>
            </div>
            <div className="w-px bg-white/30" />
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-pink-light">Available</div>
            </div>
            <div className="w-px bg-white/30" />
            <div>
              <div className="text-4xl font-bold">100+</div>
              <div className="text-pink-light">Products</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
