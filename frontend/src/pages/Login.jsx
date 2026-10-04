import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

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
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('name', data.user.name);
        
        if (data.user.role === 'farmer') navigate('/farmer');
        else navigate('/buyer');
      } else {
        setMessage('Registration successful! Please sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage('Unable to connect to the backend server.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
    >
      
      <div className="absolute inset-0 bg-emerald-950/40"></div>

      <div className="relative z-10 w-full max-w-md bg-emerald-100/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-emerald-300">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-emerald-900 tracking-tight">AgriLink</h1>
          <p className="text-sm text-emerald-800 mt-1">Farmer-to-Market Direct Trade Platform</p>
        </div>

        <div className="flex border-b border-emerald-300 mb-6">
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-semibold text-center border-b-2 transition ${
              isLogin ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-emerald-700 hover:text-emerald-900'
            }`}
            onClick={() => { setIsLogin(true); setMessage(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-semibold text-center border-b-2 transition ${
              !isLogin ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-emerald-700 hover:text-emerald-900'
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
                <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Kamal Perera"
                  className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Account Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
                >
                  <option value="farmer">Farmer (Seller)</option>
                  <option value="buyer">Buyer (Consumer / Wholesaler)</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@agrilink.com"
              className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-emerald-900 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 border border-emerald-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-700 hover:text-emerald-900 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-end -mt-2">
              <a href="#" className="text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:underline">
                Forgot your password?
              </a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg text-sm transition shadow-sm hover:shadow mt-2"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-xs font-medium text-center ${
            token ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-100 text-amber-900'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}