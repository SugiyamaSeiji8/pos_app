'use client';

import { Grid, Box, Text, Button, Image } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({ products, onAddToCart }: ProductListProps) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6} p={4}>
      {products.map((product) => (
        <Box
          key={product.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          _hover={{ shadow: 'md' }}
        >
          <Image
            src={product.image}
            alt={product.name}
            height="150px"
            objectFit="cover"
            width="100%"
          />
          <Text mt={2} fontWeight="bold">
            {product.name}
          </Text>
          <Text color="gray.600">¥{product.price.toLocaleString()}</Text>
          <Button
            colorScheme="blue"
            size="sm"
            mt={2}
            width="100%"
            onClick={() => onAddToCart(product)}
          >
            カートに追加
          </Button>
        </Box>
      ))}
    </Grid>
  );
}; 