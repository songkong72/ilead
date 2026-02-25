import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2, User, Mail, Lock, Phone } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Terms, 2: Info, 3: Success

    const steps = [
        { id: 1, name: '약관 동의' },
        { id: 2, name: '정보 입력' },
        { id: 3, name: '가입 완료' }
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-40 px-6">
            <div className="container mx-auto max-w-xl">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
                    {steps.map((s) => (
                        <div key={s.id} className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white text-gray-400 border-2 border-gray-200'
                                }`}>
                                {step > s.id ? <CheckCircle2 size={20} /> : s.id}
                            </div>
                            <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-black tracking-tighter ${step >= s.id ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                {s.name}
                            </span>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-10">서비스 이용 약관에<br />동의해 주세요.</h2>

                            <div className="space-y-6 mb-12">
                                <label className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl cursor-pointer group">
                                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 mb-1">[필수] 이용약관 동의</p>
                                        <p className="text-sm text-gray-500">L.E.A.D 서비스 이용을 위한 기본 약관입니다.</p>
                                    </div>
                                    <ChevronRight className="text-gray-300" size={20} />
                                </label>
                                <label className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl cursor-pointer group">
                                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 mb-1">[필수] 개인정보 수집 및 이용 동의</p>
                                        <p className="text-sm text-gray-500">회원 식별 및 서비스 제공을 위해 필요한 정보입니다.</p>
                                    </div>
                                    <ChevronRight className="text-gray-300" size={20} />
                                </label>
                                <label className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl cursor-pointer group">
                                    <input type="checkbox" className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-900 mb-1">[선택] 마케팅 정보 수신 동의</p>
                                        <p className="text-sm text-gray-500">이벤트 및 신규 프로그램 정보를 보내드립니다.</p>
                                    </div>
                                    <ChevronRight className="text-gray-300" size={20} />
                                </label>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                            >
                                다음으로
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-10">가입에 필요한 정보를<br />입력해 주세요.</h2>

                            {/* SNS Signups */}
                            <div className="space-y-3 mb-10">
                                <button className="w-full h-14 bg-[#FEE500] text-[#000000] rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:opacity-90 transition-all">
                                    <span className="w-5 h-5 flex items-center justify-center bg-black/10 rounded-full text-[10px]">K</span>
                                    카카오로 가입하기
                                </button>
                                <button className="w-full h-14 bg-[#03C75A] text-white rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:opacity-90 transition-all">
                                    <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full text-[10px]">N</span>
                                    네이버로 가입하기
                                </button>
                                <button className="w-full h-14 bg-white text-gray-700 rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:bg-gray-50 border border-gray-200 transition-all shadow-sm">
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" width="18" height="18">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
                                        </svg>
                                    </div>
                                    구글로 가입하기
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative flex items-center mb-10">
                                <div className="flex-1 h-[1px] bg-gray-100"></div>
                                <span className="px-4 text-xs font-bold text-gray-300 tracking-widest">또는 이메일로 가입</span>
                                <div className="flex-1 h-[1px] bg-gray-100"></div>
                            </div>

                            <form className="space-y-6 mb-12" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <span className="text-sm font-black text-gray-400 tracking-widest px-1">이름</span>
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="text" placeholder="이름" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-black text-gray-400 tracking-widest px-1">이메일 주소</span>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="email" placeholder="example@email.com" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-black text-gray-400 tracking-widest px-1">비밀번호</span>
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="password" placeholder="비밀번호 (8자 이상)" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-black text-gray-400 tracking-widest px-1">전화번호</span>
                                    <div className="relative">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="tel" placeholder="010-0000-0000" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                </div>
                            </form>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 h-16 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all font-bold"
                                >
                                    이전으로
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    className="flex-[2] h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                                >
                                    가입 완료
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-14 rounded-[3rem] shadow-sm border border-gray-100 text-center"
                        >
                            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">회원가입이 완료되었습니다!</h2>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12">
                                L.E.A.D의 가족이 되신 것을 환영합니다.<br />
                                이제 최적의 커리큘럼을 경험해 보세요.
                            </p>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full h-16 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all"
                            >
                                로그인 하러 가기
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SignUp;
