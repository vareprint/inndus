'use client';

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
      <nav className="space-y-4">
        <button
          onClick={() => setActivePage('product')}
          className={`w-full text-left px-4 py-2 rounded ${
            activePage === 'product' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          Product
        </button>
        <button
          onClick={() => setActivePage('subproduct')}
          className={`w-full text-left px-4 py-2 rounded ${
            activePage === 'subproduct' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          Sub Product
        </button>
      </nav>
    </aside>
  );
}
