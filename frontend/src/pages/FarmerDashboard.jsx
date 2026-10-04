import { useNavigate } from 'react-router-dom';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-extrabold text-emerald-800">Farmer Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium transition">
            Sign Out
          </button>
        </div>
        <p className="text-gray-600 text-lg">Welcome back, <span className="font-bold text-emerald-700">{name}</span>!</p>
        <div className="mt-8 p-6 bg-emerald-100 border border-emerald-200 rounded-lg">
          <p className="text-emerald-800">Your agricultural marketplace tools (adding crops, managing inventory) will go here.</p>
        </div>
      </div>
    </div>
  );
}