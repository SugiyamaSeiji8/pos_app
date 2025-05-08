'use client';

import { Box, Flex, Container } from '@chakra-ui/react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { useCartStore } from './store/cartStore';

// 仮の商品データ
const mockProducts = [
  {
    id: 1,
    name: 'コーヒー',
    price: 350,
    image: '/coffee.jpg',
  },
  {
    id: 2,
    name: '紅茶',
    price: 300,
    image: '/tea.jpg',
  },
  {
    id: 3,
    name: 'サンドイッチ',
    price: 450,
    image: '/sandwich.jpg',
  },
];

export default function Home() {
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();

  const handleCheckout = () => {
    // TODO: 会計処理の実装
    console.log('会計処理', items);
    clearCart();
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="container.xl" py={8}>
        <Flex gap={8}>
          <Box flex="1">
            <ProductList products={mockProducts} onAddToCart={addItem} />
          </Box>
          <Box w="350px">
            <Cart
              items={items}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onCheckout={handleCheckout}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
