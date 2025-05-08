import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
  total_amount: number;
  created_at: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const createOrder = async (items: { product_id: number; quantity: number }[]): Promise<Order> => {
  const response = await apiClient.post('/orders', { items });
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get('/orders');
  return response.data;
}; 