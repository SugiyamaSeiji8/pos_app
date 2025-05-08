'use client';

import { useState, useEffect } from 'react';
import { Product, getProducts, createOrder } from './api/client';
import { Header } from './components/Header';

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));
      
      await createOrder(orderItems);
      setCartItems([]);
      alert('注文が完了しました');
    } catch (err) {
      console.error('Error creating order:', err);
      alert('注文の処理中にエラーが発生しました');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-gray-600">¥{product.price.toLocaleString()}</p>
                  <button
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    カートに追加
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">カート</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center border rounded"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                {cartItems.length > 0 && (
                  <>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span>合計</span>
                        <span>¥{total.toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                      onClick={handleCheckout}
                    >
                      会計に進む
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
