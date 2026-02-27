import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Loader2, AlertCircle, X } from 'lucide-react';

const LoginModal = () => {
    const { isLoginModalOpen, closeLogin } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            closeLogin();
            navigate('/');
        } catch (err: any) {
            console.error('Google Login Error:', err);
            setError('구글 로그인 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            closeLogin();
            navigate('/');
        } catch (err: any) {
            console.error('Email Login Error:', err);
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNotImplemented = (provider: string) => {
        alert(`${provider} 로그인 기능은 현재 준비 중입니다. 구글이나 이메일 로그인을 이용해 주세요.`);
    };

    const handleLinkClick = (path: string) => {
        closeLogin();
        navigate(path);
    };

    return (
        <AnimatePresence>
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLogin}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[420px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[95vh] z-10 p-6 sm:p-8 md:p-12 scrollbar-hide"
                    >
                        <button
                            onClick={closeLogin}
                            className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-300 hover:text-gray-900 transition-colors z-20"
                        >
                            <X size={24} className="md:w-7 md:h-7" />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-6 md:mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">로그인</h2>
                        </div>

                        {/* SNS Logins */}
                        <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                            <button
                                onClick={() => handleNotImplemented('카카오')}
                                className="w-full h-12 md:h-14 bg-[#FEE500] text-[#000000] rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:opacity-90 transition-all"
                            >
                                <span className="w-5 h-5 flex items-center justify-center bg-black/10 rounded-full text-[10px]">K</span>
                                카카오로 시작하기
                            </button>
                            <button
                                onClick={() => handleNotImplemented('네이버')}
                                className="w-full h-12 md:h-14 bg-[#03C75A] text-white rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:opacity-90 transition-all"
                            >
                                <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-[10px]">N</span>
                                네이버로 시작하기
                            </button>
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full h-12 md:h-14 bg-white text-gray-700 rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:bg-gray-50 border border-gray-200 transition-all shadow-sm disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin text-gray-400" size={20} />
                                ) : (
                                    <>
                                        <div className="w-5 h-5 flex items-center justify-center">
                                            <svg viewBox="0 0 24 24" width="18" height="18">
                                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                                            </svg>
                                        </div>
                                        구글로 시작하기
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-6 md:mb-8 text-center px-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <span className="relative z-10 bg-white px-2 text-[11px] font-bold text-gray-300 uppercase tracking-widest whitespace-nowrap">또는</span>
                        </div>

                        {/* Form */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 text-[11px] md:text-sm font-bold"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleEmailLogin}>
                            <div className="space-y-2 mb-4 md:mb-6">
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="이메일"
                                        className="w-full h-13 md:h-16 px-6 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium text-sm md:text-base"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="비밀번호"
                                        className="w-full h-13 md:h-16 px-6 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 font-medium text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            {/* Checkbox */}
                            <div className="flex items-center gap-2 mb-6 md:mb-8 px-1">
                                <input type="checkbox" id="keep" className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-200 text-blue-600 focus:ring-blue-500" />
                                <label htmlFor="keep" className="text-xs md:text-sm font-bold text-gray-900 cursor-pointer">로그인 상태 유지</label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 md:h-16 bg-black text-white rounded-xl font-bold text-base md:text-lg hover:bg-gray-800 transition-all mb-6 md:mb-8 shadow-lg shadow-black/10 flex items-center justify-center disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : '로그인'}
                            </button>
                        </form>

                        {/* Links */}
                        <div className="flex items-center justify-center gap-4 md:gap-6 text-[11px] md:text-sm font-bold text-gray-400">
                            <button onClick={() => handleLinkClick('/signup')} className="hover:text-gray-900 transition-colors">회원가입</button>
                            <div className="w-[1px] h-3 bg-gray-200" />
                            <button onClick={() => handleLinkClick('/find-account')} className="hover:text-gray-900 transition-colors text-center">아이디 · 비밀번호 찾기</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
