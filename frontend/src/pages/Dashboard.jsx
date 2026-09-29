import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Leaf, ShoppingCart } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();

  // Mock data to simulate backend database response
  const mockProducts = [
    { id: 1, name: 'Fresh Carrots', price: '250', farmer: 'Kamal Perera', category: 'Vegetable' },
    { id: 2, name: 'Organic Tomatoes', price: '180', farmer: 'Nimal Silva', category: 'Vegetable' },
    { id: 3, name: 'Sweet Mangoes', price: '400', farmer: 'Sunil Shantha', category: 'Fruit' },
    { id: 4, name: 'Green Beans', price: '220', farmer: 'Saman Kumara', category: 'Vegetable' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Navigation Bar */}
      <header className="bg-emerald-700 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-xl font-bold tracking-wider">AgriLink</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 mt-6">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-emerald-900">Marketplace Overview</h2>
          <p className="text-emerald-700 mt-2">Discover fresh produce directly from local farmers.</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-emerald-100 overflow-hidden">
              <div className="h-40 bg-emerald-100 flex items-center justify-center">
                {/* Placeholder for product image */}
                <Leaf className="h-12 w-12 text-emerald-300" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Farmer: {product.farmer}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-emerald-50">
                  <span className="text-emerald-700 font-bold text-lg">Rs. {product.price}/kg</span>
                  <button className="bg-emerald-100 p-2 rounded-full text-emerald-700 hover:bg-emerald-200 transition">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;