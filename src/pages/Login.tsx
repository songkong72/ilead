import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {

    const snsLogins = [
        { name: '카카오 로그인', color: '#FEE500', textColor: '#000000', icon: 'K' },
        { name: '네이버 로그인', color: '#03C75A', textColor: '#FFFFFF', icon: 'N' },
        { name: '구글 로그인', color: '#FFFFFF', textColor: '#757575', icon: 'G', border: '1px solid #ddd' },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-40 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo & Welcome */}
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">반갑습니다!</h1>
                    <p className="text-gray-500 font-medium">L.E.A.D 서비스 이용을 위해 로그인해 주세요.</p>
                </div>

                {/* SNS Login Group */}
                <div className="flex flex-col gap-3 mb-10">
                    {snsLogins.map((sns, idx) => (
                        <button
                            key={idx}
                            className="w-full h-14 rounded-2xl flex items-center justify-center gap-4 font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
                            style={{ backgroundColor: sns.color, color: sns.textColor, border: sns.border }}
                        >
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-sm">
                                {sns.icon}
                            </span>
                            {sns.name}
                        </button>
                    ))}
                </div>

                <div className="relative mb-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-[#fafafa] text-gray-400 font-bold">또는 이메일 로그인</span>
                    </div>
                </div>

                {/* Email Login Form */}
                <form className="space-y-4 mb-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all font-medium"
                        />
                    </div>

                    <button className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                        로그인
                        <ArrowRight size={20} />
                    </button>
                </form>

                {/* Footer Links */}
                <div className="flex items-center justify-between px-2 text-sm font-bold">
                    <div className="flex items-center gap-4 text-gray-400">
                        <Link to="/find-account" className="hover:text-gray-900 transition-colors">아이디 찾기</Link>
                        <div className="w-[1px] h-3 bg-gray-200" />
                        <Link to="/find-account" className="hover:text-gray-900 transition-colors">비밀번호 찾기</Link>
                    </div>
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 transition-colors">회원가입</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
