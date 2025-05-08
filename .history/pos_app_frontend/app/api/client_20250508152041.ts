import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  prd_id: number;
  code: string;
  name: string;
  price: number;
}

export interface PurchaseItem {
  prd_id: number;
  code: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PurchaseRequest {
  emp_cd: string;
  store_cd: string;
  pos_id: string;
  items: PurchaseItem[];
}

export interface PurchaseResponse {
  success: boolean;
  total_amount: number;
}

export interface Order {
  id: number;
  emp_cd: string;
  store_cd: string;
  pos_id: string;
  total_amount: number;
  created_at: string;
  items: PurchaseItem[];
}

export const getProduct = async (code: string): Promise<{ product: Product | null }> => {
  const response = await apiClient.get(`/api/product/${code}`);
  return response.data;
};

export const createPurchase = async (request: PurchaseRequest): Promise<PurchaseResponse> => {
  const response = await apiClient.post('/api/purchase', request);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get('/api/orders');
  return response.data;
}; 