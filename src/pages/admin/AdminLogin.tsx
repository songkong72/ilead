import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (id === import.meta.env.VITE_ADMIN_ID && password === import.meta.env.VITE_ADMIN_PW) {
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo & Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="grid grid-cols-2 gap-0.5 w-8 h-8">
                            <div className="bg-[#E74C3C]" />
                            <div className="bg-[#2ECC71]" />
                            <div className="bg-[#3498DB]" />
                            <div className="bg-[#F1C40F]" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900">LEAD</span>
                    </div>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                        <ShieldCheck size={28} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">관리자 로그인</h1>
                    <p className="text-gray-500 font-medium">L.E.A.D 관리 시스템에 접근하려면 로그인하세요.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4 mb-10">
                    <div className="relative">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="관리자 아이디"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-gray-900"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium text-gray-900"
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs font-bold px-1"
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-4"
                    >
                        로그인
                        <ArrowRight size={20} />
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-400 text-xs font-medium">
                        권한이 있는 관리자만 접근할 수 있습니다.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
