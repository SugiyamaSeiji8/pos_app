'use client';

import { useState, useEffect } from 'react';
import { Product, PurchaseItem, getProduct, createPurchase } from './api/client';
import { Header } from './components/Header';
import { useCartStore } from './store/cartStore';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items, addItem, updateQuantity, removeItem, clearCart } = useCartStore();

  // 商品コードのリスト（実際のアプリケーションではデータベースから取得）
  const productCodes = ['4901777300446', '4901111000003'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = productCodes.map(code => getProduct(code));
        const results = await Promise.all(productPromises);
        const validProducts = results
          .map(result => result.product)
          .filter((product): product is Product => product !== null);
        setProducts(validProducts);
      } catch (err) {
        setError('商品の取得に失敗しました');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckout = async () => {
    try {
      const purchaseItems: PurchaseItem[] = items.map(item => ({
        prd_id: item.prd_id,
        code: item.code,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const request = {
        emp_cd: '9999999999',
        store_cd: '30',
        pos_id: '90',
        items: purchaseItems
      };

      const response = await createPurchase(request);
      if (response.success) {
        clearCart();
        alert('購入が完了しました');
      }
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('購入処理に失敗しました');
    }
  };

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
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.prd_id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600">¥{product.price.toLocaleString()}</p>
                  <button
                    onClick={() => addItem(product)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    カートに追加
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">カート</h2>
            {items.length === 0 ? (
              <p className="text-gray-500">カートは空です</p>
            ) : (
              <>
                {items.map((item) => (
                  <div key={item.prd_id} className="mb-4">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span>¥{item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.prd_id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.prd_id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.prd_id)}
                        className="ml-2 text-red-500"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>合計</span>
                    <span>
                      ¥
                      {items
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                  >
                    購入する
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
