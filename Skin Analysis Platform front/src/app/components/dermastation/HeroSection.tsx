import { motion } from 'motion/react';
import { Button } from '../Button';
import { Sparkles, Droplets, Sun, Shield } from 'lucide-react';

interface HeroSectionProps {
  onStartAnalysis: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartAnalysis }) => {
  const floatingIcons = [
    { Icon: Sparkles, delay: 0, position: 'top-20 left-[10%]' },
    { Icon: Droplets, delay: 0.5, position: 'top-40 right-[15%]' },
    { Icon: Sun, delay: 1, position: 'bottom-40 left-[20%]' },
    { Icon: Shield, delay: 1.5, position: 'bottom-20 right-[10%]' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pink-light via-white to-nude pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,107,157,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,230,211,0.2),transparent_50%)]" />

      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          }}
          transition={{
            delay,
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="relative">
            <Icon className="w-12 h-12 text-primary" />
            <div className="absolute inset-0 bg-pink-glow blur-xl" />
          </div>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-pink-light rounded-full mb-6 border border-primary/20"
          >
            <span className="text-primary font-medium">AI-Powered Skincare Analysis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl mb-6 font-bold leading-tight"
          >
            Smart Skincare
            <br />
            <span className="bg-gradient-to-r from-primary via-pink-dark to-secondary bg-clip-text text-transparent">
              Starts Here
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-lg"
          >
            Get instant AI skin analysis and personalized product recommendations delivered through our smart vending stations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onStartAnalysis}
              className="group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Analyze Your Skin
            </Button>
            <Button variant="ghost" size="lg">
              Find a Station
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-8 mt-12"
          >
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=1000&fit=crop"
                alt="Skincare model"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-3xl" />

              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
                className="absolute inset-0 bg-pink-glow rounded-3xl blur-3xl -z-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-6 left-6 right-6 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-pink-dark flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium">Instant Analysis</div>
                  <div className="text-sm text-muted-foreground">Results in 30 seconds</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-pink-dark rounded-full blur-2xl opacity-60"
          />
          <motion.div
            animate={{
              y: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-nude to-accent rounded-full blur-2xl opacity-40"
          />
        </motion.div>
      </div>
    </section>
  );
};
