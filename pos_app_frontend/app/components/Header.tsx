'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-blue-500 text-white py-4 px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold cursor-pointer">
          POSアプリ
        </Link>
        <nav className="space-x-4">
          <Link
            href="/orders"
            className={`px-4 py-2 rounded hover:bg-white/20 ${
              pathname === '/orders' ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            注文履歴
          </Link>
          <Link
            href="/products"
            className={`px-4 py-2 rounded hover:bg-white/20 ${
              pathname === '/products' ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            商品管理
          </Link>
        </nav>
      </div>
    </header>
  );
}; 