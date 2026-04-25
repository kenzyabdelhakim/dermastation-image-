import { motion } from 'motion/react';
import { Button } from '../Button';
import { Card } from '../Card';
import { ShoppingBag, Star, Heart } from 'lucide-react';

interface ProductsSectionProps {
  skinType?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  badge?: string;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ skinType }) => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Gentle Hydrating Cleanser',
      category: 'Cleanser',
      description: 'pH-balanced formula that cleanses without stripping natural oils',
      price: 24.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      badge: 'Bestseller'
    },
    {
      id: '2',
      name: 'Balancing Rose Toner',
      category: 'Toner',
      description: 'Alcohol-free toner with rose water and hyaluronic acid',
      price: 19.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Vitamin C Brightening Serum',
      category: 'Serum',
      description: '15% Vitamin C with ferulic acid for radiant skin',
      price: 34.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1620916297067-e046a2f1b5c5?w=400&h=400&fit=crop',
      badge: 'New'
    },
    {
      id: '4',
      name: 'Nourishing Day Moisturizer',
      category: 'Moisturizer',
      description: 'Lightweight hydration with SPF 30 protection',
      price: 28.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      name: 'Invisible Sunscreen SPF 50',
      category: 'Sunscreen',
      description: 'Broad spectrum protection with no white cast',
      price: 26.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop',
      badge: 'Recommended'
    },
    {
      id: '6',
      name: 'Overnight Repair Cream',
      category: 'Night Cream',
      description: 'Rich formula with peptides and retinol for overnight renewal',
      price: 32.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop'
    }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Skincare Products
          </h2>
          <p className="text-xl text-muted-foreground">
            {skinType
              ? `Curated recommendations for ${skinType} skin`
              : 'Professional-grade products for every skin type'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden h-full flex flex-col group">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white rounded-full text-sm font-medium shadow-lg">
                      {product.badge}
                    </div>
                  )}

                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Heart className="w-5 h-5 text-primary" />
                  </motion.button>

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="primary" size="sm" className="w-full gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Quick Add
                    </Button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary bg-pink-light px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="primary" size="lg">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
