'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// 仮の商品データ
const mockProducts: Product[] = [
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const handleCheckout = () => {
    console.log('会計処理', cartItems);
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-500 text-white py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer">POSアプリ</h1>
          <nav className="space-x-4">
            <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">
              注文履歴
            </button>
            <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">
              商品管理
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
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
