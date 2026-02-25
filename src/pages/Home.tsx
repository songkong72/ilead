import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Waves,
    MountainSnow,
    Leaf,
    Compass,
    ChevronRight,
    ArrowRight
} from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

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
            title: "미래를 여는, 리더십연수",
            subtitle: "한계를 극복하며 협력의 미래를 설계하는 고도화 연수",
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
            title: "리더십/팀빌딩",
            icon: Compass,
            theme: "#8B5CF6",
            description: "로프 챌린지, ATV 어드벤처 등 조직 한계 극복 및 협력 강화 연수",
            coverImgUrl: "/assets/images/programs/design.jpg",
            delay: 0.4
        }
    ];

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[700px]">
                        {leadData.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: item.delay }}
                                onClick={() => navigate(`/programs/${item.id}`)}
                                className="group relative flex flex-col bg-gray-900 rounded-[3rem] overflow-hidden cursor-pointer h-[750px] border border-white/5 transition-all duration-700 hover:border-white/20 shadow-2xl hover:shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
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
                                            <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-white">
                                                <item.icon size={28} strokeWidth={1.5} />
                                            </div>
                                            <span className="text-white/30 font-bold tracking-widest text-xs">P.0{leadData.indexOf(item) + 1}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2">
                                                {item.title}
                                            </h3>
                                            <div className="w-12 h-1 rounded-full transition-all duration-500 group-hover:w-24" style={{ backgroundColor: item.theme }} />
                                        </div>
                                    </div>

                                    {/* Reveal Animation on Hover */}
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 opacity-60 group-hover:opacity-100">
                                        <p className="text-white/70 font-medium text-lg leading-relaxed mb-10 max-w-[280px]">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-3 text-white text-sm font-bold tracking-[0.2em] uppercase">
                                            <span>자세히 보기</span>
                                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
