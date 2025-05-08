'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="white"
      shadow="sm"
      minW="300px"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        カート
      </Text>
      <VStack spacing={4} align="stretch">
        {items.map((item) => (
          <Box key={item.id}>
            <HStack justify="space-between">
              <Text>{item.name}</Text>
              <IconButton
                aria-label="Remove item"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => onRemoveItem(item.id)}
              />
            </HStack>
            <HStack mt={2} justify="space-between">
              <HStack>
                <IconButton
                  aria-label="Decrease quantity"
                  icon={<MinusIcon />}
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                />
                <Text>{item.quantity}</Text>
                <IconButton
                  aria-label="Increase quantity"
                  icon={<AddIcon />}
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                />
              </HStack>
              <Text>¥{(item.price * item.quantity).toLocaleString()}</Text>
            </HStack>
          </Box>
        ))}
        <Box borderTop="1px" borderColor="gray.200" pt={4} />
        <HStack justify="space-between">
          <Text fontWeight="bold">合計</Text>
          <Text fontWeight="bold">¥{total.toLocaleString()}</Text>
        </HStack>
        <Button
          colorScheme="blue"
          isDisabled={items.length === 0}
          onClick={onCheckout}
        >
          会計に進む
        </Button>
      </VStack>
    </Box>
  );
}; 