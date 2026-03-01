import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, MountainSnow, Leaf, Compass, ArrowRight } from 'lucide-react';
import { programs } from '../data/programs';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';
import AdminTextManager from '../components/common/AdminTextManager';

const programCards = [
    {
        id: 'leisure',
        title: '레포츠/래프팅',
        icon: Waves,
        theme: '#FF6B00',
        accent: 'from-orange-500 to-red-600',
        coverImg: '/assets/images/programs/leisure.jpg',
    },
    {
        id: 'education',
        title: '스키 & 스노우보드',
        icon: MountainSnow,
        theme: '#00D1FF',
        accent: 'from-cyan-400 to-blue-600',
        coverImg: '/assets/images/programs/skiing.jpg',
    },
    {
        id: 'activite',
        title: '현장 & 생태 체험',
        icon: Leaf,
        theme: '#22C55E',
        accent: 'from-emerald-400 to-green-700',
        coverImg: '/assets/images/programs/experience.jpg',
    },
    {
        id: 'development',
        title: '챌린지 & 인성개발',
        icon: Compass,
        theme: '#8B5CF6',
        accent: 'from-violet-500 to-purple-800',
        coverImg: '/assets/images/programs/action.jpg',
    },
];

const Programs = () => {
    const navigate = useNavigate();
    const { isAdmin, getImageUrl, overrides } = useImageOverrides();

    return (
        <div className="relative min-h-[100dvh] bg-white pb-20">
            {/* Hero Header Background */}
            <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[450px] z-0 bg-[#134e4a] overflow-hidden">
                {/* 배경 효과 */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[120px] mix-blend-screen" />
                    <AdminImageManager isAdmin={isAdmin} uploadKey="programs_header_bg">
                        <img
                            src={getImageUrl('/assets/images/headers/programs-bg.jpg', 'programs_header_bg')}
                            alt="Programs background"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay fixed"
                        />
                    </AdminImageManager>
                </div>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20">
                <div className="mb-8 md:mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 italic"
                    >
                        사업영역
                    </motion.h1>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mb-6" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/90 text-lg md:text-xl font-medium"
                    >
                        <AdminTextManager
                            isAdmin={isAdmin}
                            contentKey="programs_main_description"
                            text={overrides.programs_main_description || "L.E.A.D는 전문적인 레저 교육과 맞춤형 단체 연수 프로그램을 통해, \n최상의 가치와 차별화된 성장을 제안하는 선도적인 교육 컨설팅 그룹입니다."}
                            as="p"
                            multiline={true}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-20">
                    {programCards.map((card, idx) => {
                        const programData = programs[card.id];
                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                onClick={() => navigate(`/programs/${card.id}`)}
                                className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer h-[380px] md:h-[420px] shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <AdminImageManager
                                        isAdmin={isAdmin}
                                        uploadKey={`program_card_${card.id}`}
                                    >
                                        <img
                                            src={getImageUrl(card.coverImg, `program_card_${card.id}`)}
                                            alt={card.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                        />
                                    </AdminImageManager>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="p-3 md:p-4 rounded-2xl border border-white/20 text-white backdrop-blur-md"
                                            style={{ backgroundColor: `${card.theme}33` }}
                                        >
                                            <card.icon size={24} className="md:w-7 md:h-7" strokeWidth={1.5} />
                                        </div>
                                        <span className="text-white/30 font-bold tracking-widest text-xs">
                                            P.0{idx + 1}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3 tracking-tight">
                                            {card.title}
                                        </h3>
                                        <div
                                            className="w-10 md:w-12 h-1 rounded-full mb-4 md:mb-5 transition-all duration-500 group-hover:w-24"
                                            style={{ backgroundColor: card.theme }}
                                        />
                                        <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed mb-4 md:mb-6 max-w-sm">
                                            {programData?.intro}
                                        </p>

                                        {/* Summary Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                                            {programData?.summary.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 md:px-3 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-bold rounded-full border border-white/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-white font-bold text-xs md:text-sm tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-2 duration-500">
                                            <span>상세 보기</span>
                                            <ArrowRight size={16} strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="py-12 md:py-16 bg-gradient-to-br from-[#134e4a] to-[#0f3a37] rounded-[2.5rem] md:rounded-[3rem] text-center px-6 relative overflow-hidden shadow-2xl border border-white/5 mx-auto max-w-5xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 blur-[100px]" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative z-10"
                    >
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 tracking-tight">
                            맞춤형 프로그램이 필요하신가요?
                        </h2>
                        <p className="text-white/70 text-base md:text-xl mb-8 md:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                            단체의 특성과 목적에 맞는 프로그램을 직접 설계해드립니다.<br />
                            지금 바로 상담을 시작하세요.
                        </p>
                        <a
                            href="tel:02-875-3056"
                            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white text-[#134e4a] font-black rounded-2xl text-base md:text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
                        >
                            📞 02-875-3056 상담 문의
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Programs;
