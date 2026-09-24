import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || 'Something went wrong');
        return;
      }

      if (isLogin) {
        setToken(data.token);
        setMessage(`Welcome back, ${data.user.name} (${data.user.role})!`);
      } else {
        setMessage('Registration successful! Please sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage('Unable to connect to the backend server.');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-emerald-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-emerald-800 tracking-tight">AgriLink</h1>
          <p className="text-sm text-gray-500 mt-1">Farmer-to-Market Direct Trade Platform</p>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-semibold text-center border-b-2 transition ${
              isLogin ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => { setIsLogin(true); setMessage(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-semibold text-center border-b-2 transition ${
              !isLogin ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => { setIsLogin(false); setMessage(''); }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Kamal Perera"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Account Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="farmer">Farmer (Seller)</option>
                  <option value="buyer">Buyer (Consumer / Wholesaler)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@agrilink.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm transition shadow-sm hover:shadow"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-xs font-medium text-center ${
            token ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;