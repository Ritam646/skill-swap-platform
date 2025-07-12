import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Zap, ArrowRight, Shield, Users, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const { state, dispatch } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Demo login - find user by email
      const user = state.users.find(u => u.email === formData.email);
      if (user && !user.isBanned) {
        dispatch({ type: 'SET_CURRENT_USER', payload: user });
      } else {
        alert('User not found or banned. Try: ritam@example.com, sarah@example.com, alex@example.com, or admin@skillswap.com');
      }
    } else {
      // Demo registration - create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        location: formData.location,
        isPublic: true,
        availability: ['Weekends'],
        rating: 0,
        totalSwaps: 0,
        isAdmin: false,
        isBanned: false,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      dispatch({ type: 'UPDATE_USER', payload: newUser });
      dispatch({ type: 'SET_CURRENT_USER', payload: newUser });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-xl shadow-purple-500/25">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SkillSwap</h1>
                <p className="text-purple-300 font-semibold">Next-Gen Skill Exchange</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Connect with skilled professionals, learn cutting-edge skills, and build the future together.
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Powered by intelligent matching algorithms and community-driven innovation
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="premium" className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Trust Network</h3>
              <p className="text-gray-400 text-sm">Verified professionals</p>
            </Card>
            <Card variant="premium" className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Assured</h3>
              <p className="text-gray-400 text-sm">Rated exchanges</p>
            </Card>
            <Card variant="premium" className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure Platform</h3>
              <p className="text-gray-400 text-sm">Protected interactions</p>
            </Card>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <Card variant="premium" className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white">
                  {isLogin ? 'Welcome Back' : 'Join the Evolution'}
                </h2>
                <p className="text-gray-400 text-lg">
                  {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
                </p>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    placeholder="City, Country"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-6 py-4 bg-gray-900/60 border border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" variant="premium" className="w-full" size="lg">
                {isLogin ? 'Begin Your Evolution' : 'Create Account'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-400 hover:text-purple-300 text-base font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>

              {isLogin && (
                <div className="text-center">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Demo accounts: ritam@example.com, sarah@example.com, alex@example.com, admin@skillswap.com
                  </p>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}