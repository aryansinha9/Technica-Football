import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Loader2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    navigate('/admin/dashboard');
  };

  return (
    <section className="min-h-[80vh] bg-[#f3f4f6] flex items-center justify-center px-8 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0A1F44] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-[#0A1F44] tracking-wide">ADMIN LOGIN</h1>
          <p className="text-gray-500 text-sm mt-2">Technica Football Dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div>
            <label className="block font-barlow font-bold tracking-widest uppercase text-xs text-[#0A1F44] mb-2">Email</label>
            <input type="email" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f0722b]/50 focus:border-[#f0722b] transition-colors text-sm" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@technicafootball.com.au" />
          </div>
          <div>
            <label className="block font-barlow font-bold tracking-widest uppercase text-xs text-[#0A1F44] mb-2">Password</label>
            <input type="password" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0A1F44] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f0722b]/50 focus:border-[#f0722b] transition-colors text-sm" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  );
}
