import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Smartphone } from 'lucide-react';

const FindAccount = () => {
    const [activeTab, setActiveTab] = useState<'id' | 'password'>('id');

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-40 px-6 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">계정 정보를 잊으셨나요?</h1>
                    <p className="text-gray-500 font-medium">인증을 통해 아이디 찾기와 비밀번호 재설정이 가능합니다.</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white p-1.5 rounded-2xl border border-gray-100 flex mb-10 shadow-sm">
                    <button
                        onClick={() => setActiveTab('id')}
                        className={`flex-1 py-4 font-bold rounded-xl transition-all ${activeTab === 'id' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        아이디 찾기
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={`flex-1 py-4 font-bold rounded-xl transition-all ${activeTab === 'password' ? 'bg-gray-900 text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        비밀번호 찾기
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100">
                    {activeTab === 'id' ? (
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">가입 시 입력한 번호로 찾기</h2>
                                <p className="text-gray-500 font-medium mb-8">본인 명의의 휴대폰 번호를 입력해 주세요.</p>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="tel" placeholder="010-0000-0000" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                    <button className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all">
                                        아이디 찾기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">비밀번호 재설정</h2>
                                <p className="text-gray-500 font-medium mb-8">아이디(이메일)를 입력하시면 재설정 링크를 보내드립니다.</p>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input type="email" placeholder="example@email.com" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-medium" />
                                    </div>
                                    <button className="w-full h-16 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3">
                                        재설정 메일 발송
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 font-bold mb-4">문제가 해결되셨나요?</p>
                    <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                        홈으로 돌아가기
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default FindAccount;
