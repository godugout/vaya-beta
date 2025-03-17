
import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Home, Image } from 'lucide-react';

export const SpaceMediaGallery: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Sample media items (in a real app, these would come from an API/database)
  const mediaItems = [
    { id: 1, title: "Family Reunion 2023", type: "image", src: "/lovable-uploads/beb4747e-e0e7-41c9-bd32-228eb811e675.png" },
    { id: 2, title: "Wedding Anniversary", type: "image", src: "/lovable-uploads/79a7f098-5d08-4543-8610-cab0055c5960.png" },
    { id: 3, title: "Diwali Celebration", type: "image", src: "/lovable-uploads/80003303-7e78-4dad-8af2-47b20a1928ba.png" },
    { id: 4, title: "Birthday Party", type: "image", src: "/lovable-uploads/601683fb-5c58-4468-946b-7bd998a42791.png" },
    { id: 5, title: "Graduation Ceremony", type: "image", src: "/lovable-uploads/33c609d9-9189-49d2-b9c1-106d8257557c.png" },
    { id: 6, title: "New Year Celebration", type: "image", src: "/lovable-uploads/409da586-864c-4df0-9e54-61c03fa7bfdd.png" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 anjaneya-bg">
      {/* Custom breadcrumb navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* Fix: Replace BreadcrumbLink with as={Link} prop with direct Link component */}
            <Link to="/" className="flex items-center transition-colors hover:text-foreground">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-space-ui-accent font-medium">
              <Image className="h-4 w-4 mr-1" /> Media Vault
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      {/* Page header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gradient-cosmic">
          Anjaneya Media Vault
        </h1>
      </div>
      
      {/* Media gallery grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {mediaItems.map((item) => (
          <motion.div 
            key={item.id}
            className="anjaneya-card hover:anjaneya-glow"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <img 
                src={item.src} 
                alt={item.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-medium text-space-text-primary mb-1">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
