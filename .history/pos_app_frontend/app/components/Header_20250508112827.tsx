'use client';

import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();

  return (
    <Box as="header" bg="blue.500" color="white" py={4} px={8}>
      <Flex justify="space-between" align="center">
        <Heading size="lg" cursor="pointer" onClick={() => router.push('/')}>
          POSアプリ
        </Heading>
        <Flex gap={4}>
          <Button colorScheme="whiteAlpha" onClick={() => router.push('/orders')}>
            注文履歴
          </Button>
          <Button colorScheme="whiteAlpha" onClick={() => router.push('/products')}>
            商品管理
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}; 