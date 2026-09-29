import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'buyer'
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login process since backend is not ready
    console.log("Form Submitted:", formData);
    
    // Redirect to dashboard after successful login
    navigate('/dashboard'); 
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
    >
      {/* Dark overlay for the background image */}
      <div className="absolute inset-0 bg-emerald-950/40"></div>

      {/* Light Green Theme Box */}
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
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 text-sm font-semibold text-center border-b-2 transition ${
              !isLogin ? 'border-emerald-700 text-emerald-900' : 'border-transparent text-emerald-700 hover:text-emerald-900'
            }`}
            onClick={() => setIsLogin(false)}
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
              <a 
                href="#forgot-password" 
                onClick={(e) => { e.preventDefault(); alert("Password reset feature will be available soon!"); }}
                className="text-xs font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
              >
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
      </div>
    </div>
  );
}

export default Login;