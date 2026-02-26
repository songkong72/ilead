import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const trimmedId = id.trim();
        const trimmedPassword = password.trim();

        if (!trimmedId || !trimmedPassword) {
            setError('아이디와 비밀번호를 모두 입력해주세요.');
            setIsLoading(false);
            return;
        }

        const adminEnvId = import.meta.env.VITE_ADMIN_ID;
        const adminEnvPw = import.meta.env.VITE_ADMIN_PW;

        // 아이디가 이메일 형식이 아니면 기본 도메인 추가
        const email = trimmedId.includes('@') ? trimmedId : `${trimmedId}@ilead.com`;

        try {
            // 1. Firebase Auth 로그인 시도
            await signInWithEmailAndPassword(auth, email, trimmedPassword);
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Login Error:', err.code);

            // 2. 로그인 실패 시, 환경변수와 일치하면 계정 자동 생성 시도 (최초 1회)
            if (trimmedId === adminEnvId && trimmedPassword === adminEnvPw) {
                try {
                    await createUserWithEmailAndPassword(auth, email, trimmedPassword);
                    navigate('/admin/dashboard');
                    return;
                } catch (createErr: any) {
                    console.error('Create Account Error:', createErr.code);
                    if (createErr.code === 'auth/email-already-in-use') {
                        setError('이미 존재하는 계정입니다. 비밀번호를 다시 확인해주세요.');
                    } else if (createErr.code === 'auth/weak-password') {
                        setError('비밀번호가 보안 정책에 맞지 않습니다 (6자 이상).');
                    } else {
                        setError(`계정 생성 실패: ${createErr.message}`);
                    }
                    setIsLoading(false);
                    return;
                }
            }

            // 3. 일반적인 실패 메시지
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('아이디 또는 비밀번호가 올바르지 않습니다.');
            } else {
                setError(`로그인 오류: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
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
                            placeholder="관리자 아이디 (기본: admin)"
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
                        disabled={isLoading}
                        className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-4 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : '로그인'}
                        {!isLoading && <ArrowRight size={20} />}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-400 text-xs font-medium">
                        최초 로그인 시 제공된 기본 비밀번호로 연동이 설정됩니다.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
