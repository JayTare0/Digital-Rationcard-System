
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { mockApi } from '../services/mockApi';

const Login: React.FC = () => {
  const { setUser, t } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await mockApi.login(formData.email, formData.password);
      if (user) {
        setUser(user);
        localStorage.setItem('drc_user', JSON.stringify(user));
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-10">
          <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-sign-in-alt text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-2">Login to manage your ration card application</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account? {' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link>
          </p>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 leading-relaxed italic">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
