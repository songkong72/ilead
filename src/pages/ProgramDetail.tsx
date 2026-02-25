import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import { programs } from '../data/programs';

const ProgramDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const content = id ? programs[id] : null;

    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-32">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">프로그램을 찾을 수 없습니다.</h2>
                    <button onClick={() => navigate("/")} className="text-blue-600 font-bold hover:underline">
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-40">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Navigation */}
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-16 font-bold tracking-tight text-base group"
                >
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    리스트로 돌아가기
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Header Section */}
                    <div className="flex flex-col mb-20">
                        <span className="font-black tracking-[0.3em] uppercase text-sm mb-6 block" style={{ color: content.themeColor }}>
                            L.E.A.D DISCOVERY
                        </span>
                        <h1 className="text-5xl md:text-8xl font-bold text-gray-900 mb-10 tracking-tight leading-[1.1]">
                            {content.title}
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-12">
                            <div className="w-24 h-2 rounded-full" style={{ backgroundColor: content.themeColor, boxShadow: `0 0 20px ${content.themeColor}44` }} />
                            <p className="text-2xl md:text-3xl font-medium text-gray-500 tracking-tight leading-snug max-w-3xl">
                                {content.intro}
                            </p>
                        </div>
                    </div>

                    {/* Hero Image Section */}
                    <div className="aspect-[21/9] w-full bg-gray-200 rounded-[3rem] overflow-hidden mb-24 shadow-3xl relative border border-black/5">
                        <img
                            src={content.bgImage}
                            alt={content.title}
                            className="w-full h-full object-cover saturate-[1.1] brightness-[0.9]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-12">
                            <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-2">Representative Image</p>
                            <h3 className="text-white text-3xl font-bold">{content.title}</h3>
                        </div>
                    </div>

                    {/* Goals Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {content.goals.map((goal, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-6"
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: content.themeColor }}>
                                    <goal.icon size={32} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-3">{goal.title}</h4>
                                    <p className="text-gray-500 font-medium leading-relaxed">{goal.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Description */}
                    <div className="mb-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 tracking-tight">
                                전문성을 지향하는 <span style={{ color: content.themeColor }}>최적의 커리큘럼</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                                {content.description}
                                <br /><br />
                                참가자들의 몰입도를 극대화하고 실질적인 변화를 이끌어내는,
                                현장 중심의 교육과 잊지 못할 경험을 선사합니다.
                            </p>
                        </div>
                    </div>

                    {/* Program Categories & Items */}
                    <div className="mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 whitespace-nowrap">주요 프로그램 구성</h3>
                            <div className="w-full h-[1px] bg-gray-200" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {content.programCategories.map((cat, idx) => (
                                <div key={idx} className="flex flex-col gap-8">
                                    <h4 className="text-xl font-black tracking-widest text-gray-400 uppercase">{cat.category}</h4>
                                    <ul className="flex flex-col gap-4">
                                        {cat.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-4 group">
                                                <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-150 group-hover:w-4" style={{ backgroundColor: content.themeColor }} />
                                                <span className="text-xl font-bold text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Timeline */}
                    <div className="mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 whitespace-nowrap">권장 일정표</h3>
                            <div className="w-full h-[1px] bg-gray-200" />
                            <div className="flex items-center gap-2 text-gray-400 font-bold whitespace-nowrap">
                                <Clock size={20} />
                                <span>Typical Schedule</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-[0_20px_80px_rgba(0,0,0,0.04)] border border-gray-50">
                            <div className="flex flex-col gap-16 relative">
                                <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-gray-100 hidden md:block" />

                                {content.schedule.map((slot, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-20 relative z-10">
                                        <div className="flex items-center gap-6 md:w-64">
                                            <div className="w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: content.themeColor }}>
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            </div>
                                            <span className="text-xl font-black text-gray-400 tracking-tighter tabular-nums whitespace-nowrap">
                                                {slot.time}
                                            </span>
                                        </div>
                                        <div>
                                            <h5 className="text-3xl font-bold text-gray-900 mb-3">{slot.activity}</h5>
                                            <p className="text-xl text-gray-500 font-medium">{slot.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inquire Footer */}
                    <div className="flex flex-col items-center">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="w-full bg-gray-900 rounded-[3rem] p-16 text-center text-white shadow-3xl overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent blur-[100px]" />
                            <h3 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">프로그램 참가를 희망하시나요?</h3>
                            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto relative z-10 font-medium">
                                단체 성격과 목적에 맞춘 최적의 프로그램을 제안해 드립니다.
                                지금 바로 전문가와 상담하세요.
                            </p>
                            <button className="px-12 py-6 bg-white text-gray-900 rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-4 mx-auto relative z-10 group">
                                <span>문의하기</span>
                                <ChevronRight className="transition-transform group-hover:translate-x-2" />
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProgramDetail;
