import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Waves,
    MountainSnow,
    Leaf,
    Compass,
    ChevronRight,
    ArrowRight,
    X
} from 'lucide-react';
import { programs } from '../data/programs';

const Home = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Thematic Colors & Assets
    const heroSlides = [
        {
            img: "/assets/images/programs/leisure.jpg",
            title: "자연의 에너지, 레포츠",
            subtitle: "역동적인 에너지가 넘치는 자연 속의 특별한 쉼표",
            id: 'leisure',
            color: '#FF6B00',
            glow: 'rgba(255, 107, 0, 0.4)',
            accent: 'from-orange-500 to-red-600'
        },
        {
            img: "/assets/images/programs/experience.jpg",
            title: "성장의 가치, 스키캠프",
            subtitle: "전문적인 스키 캠프로 키워가는 도전과 성장의 가치",
            id: 'experience',
            color: '#00D1FF',
            glow: 'rgba(0, 209, 255, 0.4)',
            accent: 'from-cyan-400 to-blue-600'
        },
        {
            img: "/assets/images/programs/action.jpg",
            title: "생생한 현장, 생태체험",
            subtitle: "오감을 깨우는 생생한 체험과 전문적인 성장의 현장",
            id: 'action',
            color: '#22C55E',
            glow: 'rgba(34, 197, 94, 0.4)',
            accent: 'from-emerald-400 to-green-700'
        },
        {
            img: "/assets/images/programs/design.jpg",
            title: "미래를 여는, 인성개발",
            subtitle: "한계를 극복하며 협력의 미래를 설계하는 맞춤형 연수",
            id: 'design',
            color: '#8B5CF6',
            glow: 'rgba(139, 92, 246, 0.4)',
            accent: 'from-violet-500 to-purple-800'
        }
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const leadData = [
        {
            id: 'leisure',
            title: "레포츠/래프팅",
            icon: Waves,
            theme: "#FF6B00",
            description: "한탄강/동강 래프팅, 수상스키 및 전국 각지의 자연 활용 레포츠 프로그램",
            coverImgUrl: "/assets/images/programs/leisure.jpg",
            delay: 0.1
        },
        {
            id: 'experience',
            title: "스키 & 스노우보드",
            icon: MountainSnow,
            theme: "#00D1FF",
            description: "전문 스키 학교 및 청소년 캠프를 통한 체력 증진과 자신감 향상 교육",
            coverImgUrl: "/assets/images/programs/experience.jpg",
            delay: 0.2
        },
        {
            id: 'action',
            title: "생태/문화 체험",
            icon: Leaf,
            theme: "#22C55E",
            description: "전통 문화, 생태 탐사 및 도자기 공예 등 정서 성장을 돕는 참여형 교육",
            coverImgUrl: "/assets/images/programs/action.jpg",
            delay: 0.3
        },
        {
            id: 'design',
            title: "기획연수/인성개발",
            icon: Compass,
            theme: "#8B5CF6",
            description: "로프 챌린지, ATV 어드벤처 등 조직 한계 극복 및 협력 강화 연수",
            coverImgUrl: "/assets/images/programs/design.jpg",
            delay: 0.4
        }
    ];

    const selectedProgram = leadData.find(item => item.id === selectedId);
    const detailedProgramContent = selectedId ? programs[selectedId] : null;

    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {/* Hero Slider Section with Localized Assets */}
            <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat saturate-[1.1]"
                        style={{ backgroundImage: `url('${heroSlides[currentImageIndex].img}')` }}
                    />
                </AnimatePresence>

                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px]" />

                <div className="relative z-20 text-center flex flex-col items-center px-6 w-full max-w-7xl pt-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-white/60 font-black tracking-[0.5em] text-sm md:text-xl mb-8 uppercase">
                                L.E.A.D 프로그램
                            </span>
                            <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] font-bold tracking-tight text-white drop-shadow-2xl leading-[1.1] mb-12 uppercase px-4" style={{ textShadow: `0 0 30px ${heroSlides[currentImageIndex].glow}` }}>
                                {heroSlides[currentImageIndex].title.split(', ').map((part, i) => (
                                    <span key={i} style={{ color: i === 1 ? heroSlides[currentImageIndex].color : 'inherit' }}>
                                        {part}{i === 0 && heroSlides[currentImageIndex].title.includes(', ') ? ', ' : ''}
                                    </span>
                                ))}
                            </h1>
                            <div className="w-24 h-2 rounded-full mb-12 transition-all duration-700" style={{ backgroundColor: heroSlides[currentImageIndex].color, boxShadow: `0 0 20px ${heroSlides[currentImageIndex].glow}` }} />
                            <p className="text-xl md:text-3xl font-medium tracking-tight text-white/95 drop-shadow-lg mb-20 max-w-5xl leading-tight px-4">
                                {heroSlides[currentImageIndex].subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${heroSlides[currentImageIndex].glow}` }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/programs/${heroSlides[currentImageIndex].id}`)}
                        className={`group relative flex items-center gap-4 px-16 py-7 bg-gradient-to-r ${heroSlides[currentImageIndex].accent} text-white font-bold rounded-full transition-all shadow-2xl text-xl tracking-[0.2em] uppercase overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">더 알아보기</span>
                        <ArrowRight className="relative z-10 w-6 h-6 transition-transform group-hover:translate-x-2" strokeWidth={3} />
                    </motion.button>
                </div>

                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-6">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`h-1.5 transition-all duration-700 rounded-full ${index === currentImageIndex ? 'bg-white w-24' : 'bg-white/20 w-10 hover:bg-white/50'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Immersive Program Cards Section (Refined Typography & Icons) */}
            <section className="w-full py-40 bg-[#0a0a0a]">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="mb-24 flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-white/40 font-bold tracking-[0.5em] uppercase text-sm mb-6 block"
                        >
                            전문적인 프로그램 라인업
                        </motion.span>
                        <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tight mb-12">
                            L.E.A.D 주요 사업
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1400px] mx-auto min-h-[1400px]">
                        {leadData.map((item) => (
                            <motion.div
                                key={item.id}
                                layoutId={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: item.delay }}
                                onClick={() => setSelectedId(item.id)}
                                className="group relative flex flex-col bg-gray-900 rounded-[3rem] overflow-hidden cursor-pointer h-[650px] border border-white/5 transition-all duration-700 hover:border-white/20 shadow-2xl hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                                style={{ transformOrigin: 'center' }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <motion.img
                                        layoutId={`img-${item.id}`}
                                        src={item.coverImgUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 saturate-[1.2] brightness-[0.7] group-hover:brightness-50"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 p-12 flex flex-col h-full justify-between">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex justify-between items-center">
                                            <motion.div
                                                layoutId={`icon-${item.id}`}
                                                className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-white"
                                            >
                                                <item.icon size={28} strokeWidth={1.5} />
                                            </motion.div>
                                            <span className="text-white/30 font-bold tracking-widest text-xs whitespace-nowrap">P.0{leadData.indexOf(item) + 1}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <motion.h3
                                                layoutId={`title-${item.id}`}
                                                className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-2"
                                            >
                                                {item.title}
                                            </motion.h3>
                                            <motion.div
                                                layoutId={`theme-${item.id}`}
                                                className="w-12 h-1 rounded-full transition-all duration-500 group-hover:w-24"
                                                style={{ backgroundColor: item.theme }}
                                            />
                                        </div>
                                    </div>

                                    {/* Reveal Animation on Hover */}
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 opacity-60 group-hover:opacity-100">
                                        <p className="text-white/70 font-medium text-lg leading-relaxed mb-10 max-w-[320px]">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-3 text-white text-sm font-bold tracking-[0.2em] uppercase">
                                            <span>더 많은 정보 보기</span>
                                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expanded Modal View */}
            <AnimatePresence>
                {selectedId && selectedProgram && detailedProgramContent && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-zoom-out"
                        />
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 pointer-events-none">
                            <motion.div
                                layoutId={selectedId}
                                className="w-full max-w-5xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row pointer-events-auto"
                            >
                                <div className="relative w-full md:w-2/5 h-64 md:h-full">
                                    <motion.img
                                        layoutId={`img-${selectedId}`}
                                        src={selectedProgram.coverImgUrl}
                                        alt={selectedProgram.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
                                    <div className="absolute top-8 left-8">
                                        <motion.div
                                            layoutId={`icon-${selectedId}`}
                                            className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 text-white inline-block mb-4"
                                        >
                                            <selectedProgram.icon size={32} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="relative w-full md:w-3/5 p-10 md:p-16 overflow-y-auto scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                                    <style>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                    `}</style>
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                                    >
                                        <X size={28} />
                                    </button>

                                    <div className="mb-12">
                                        <motion.h3
                                            layoutId={`title-${selectedId}`}
                                            className="text-4xl font-bold text-gray-900 mb-4 tracking-tight"
                                        >
                                            {selectedProgram.title}
                                        </motion.h3>
                                        <motion.div
                                            layoutId={`theme-${selectedId}`}
                                            className="w-16 h-1.5 rounded-full"
                                            style={{ backgroundColor: selectedProgram.theme }}
                                        />
                                    </div>

                                    <p className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                                        {detailedProgramContent.intro}
                                    </p>

                                    <div className="space-y-10">
                                        {detailedProgramContent.programCategories.map((cat, i) => (
                                            <div key={i}>
                                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                                    {cat.category}
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {cat.activities.map((activity, j) => (
                                                        <span key={j} className="px-5 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-100 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProgram.theme }} />
                                                            {activity.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => navigate(`/programs/${selectedId}`)}
                                        className="mt-16 w-full py-6 bg-gray-900 text-white rounded-2xl font-bold text-xl hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-4 group"
                                    >
                                        상세 커리큘럼 보기
                                        <ChevronRight className="transition-transform group-hover:translate-x-2" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
