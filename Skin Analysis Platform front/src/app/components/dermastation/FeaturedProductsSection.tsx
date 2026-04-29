import { motion } from 'motion/react';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  howToUse: string;
}

export const FeaturedProductsSection: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Shaan Soothing Gel 200 gm',
      image: '/images/shaan-gel.png',
      price: 'LE 220.00',
      description: 'Suitable for oily and combination skin. Triple efficacy when used on damp skin. Face and body moisturizer, also works as a makeup base emollient.',
      howToUse: 'Apply daily.'
    },
    {
      id: '2',
      name: 'Bobai Sunscreen Extra Lightening Gel SPF 50',
      image: '/images/bobai-sunscreen.png',
      price: 'LE 350.00',
      description: 'Suitable for all skin types. Protects against sun exposure. Helps reduce dark spots and evens skin tone.',
      howToUse: 'Apply 20 minutes before sun exposure and reapply every 2 hours.'
    },
    {
      id: '3',
      name: 'GLAMY LAB Whitening Cream SPF 30 50 gm',
      image: '/images/glamy-lab.png',
      price: 'LE 460.00',
      description: 'Suitable for all skin types. Contains Alpha Arbutin & Lumiskin to reduce dark spots and improve skin tone. Includes SPF 30 for UV protection.',
      howToUse: 'Apply twice daily and massage until absorbed.'
    },
    {
      id: '4',
      name: 'Clary Cleanser 300 ml',
      image: '/images/clary-cleanser.png',
      price: 'LE 280.50',
      description: 'Suitable for all skin types. Deep cleansing and brightening effect. Moisturizes and soothes skin.',
      howToUse: 'Apply on damp skin, lather, rinse. Use twice daily.'
    }
  ];

  return (
    <section className="section-spacer section-dark-gray relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,168,201,0.03),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 glass-editorial rounded-full mb-8 border-baby-pink"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm tracking-luxury-wide uppercase">Featured Collection</span>
          </motion.div>
          <h2 className="editorial-heading mb-6">
            Featured Products
          </h2>
          <p className="editorial-body max-w-2xl mx-auto">
            Discover our curated selection of premium skincare essentials
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="product-card-luxury group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-editorial mb-6 bg-black/20">
                <div className="aspect-square flex items-center justify-center p-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop';
                    }}
                  />
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Product Info */}
              <div className="px-6 pb-6 space-y-4">
                {/* Product Name */}
                <h3 className="text-lg font-light text-soft-white leading-snug tracking-luxury min-h-[3.5rem]">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-light gradient-baby-pink">
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-3">
                  {product.description}
                </p>

                {/* How to Use */}
                <div className="pt-2 border-t border-primary/10">
                  <p className="text-xs text-primary/70 font-light">
                    <span className="text-primary font-medium">How to use:</span> {product.howToUse}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button className="w-full product-button-primary group/btn">
                    <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="editorial-button baby-pink-glow">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};
