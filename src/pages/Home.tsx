import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Waves,
    Leaf,
    MountainSnow,
    Compass,
    ChevronRight,
    ArrowRight,
    X
} from 'lucide-react';
import { programs } from '../data/programs';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';
import AdminTextManager from '../components/common/AdminTextManager';
import AdminToolbar from '../components/common/AdminToolbar';

const Home = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const { isAdmin, overrides, getImageUrl, logout } = useImageOverrides();

    const t = (defaultText: string, key: string) => {
        return overrides[key] || defaultText;
    };

    // Thematic Colors & Assets
    const heroSlides = [
        {
            tag: "Leisure",
            img: "/assets/images/programs/leisure.jpg",
            title: "자연의 에너지, 레포츠",
            subtitle: "역동적인 에너지가 넘치는 자연 속의 특별한 쉼표",
            id: 'leisure',
            color: '#FF6B00',
            glow: 'rgba(255, 107, 0, 0.4)',
            accent: 'from-orange-500 to-red-600'
        },
        {
            tag: "Education",
            img: "/assets/images/programs/skiing.jpg",
            title: "지속적이고 체계적인, 스키체험",
            subtitle: "국내 최고 수준의 강사진과 함께하는 전문적인 스키 및 보드 교육",
            id: 'education',
            color: '#00D1FF',
            glow: 'rgba(0, 209, 255, 0.4)',
            accent: 'from-cyan-400 to-blue-600'
        },
        {
            tag: "Activite",
            img: "/assets/images/programs/experience.jpg",
            title: "오감을 만족하는, 현장체험",
            subtitle: "감성과 인성을 키워주는 살아있는 오감 만족 현장 교육 프로그램",
            id: 'activite',
            color: '#22C55E',
            glow: 'rgba(34, 197, 94, 0.4)',
            accent: 'from-emerald-400 to-green-700'
        },
        {
            tag: "Development",
            img: "/assets/images/programs/action.jpg",
            title: "한계를 극복하는, 인성개발",
            subtitle: "짚라인과 챌린지 코스를 통해 조직의 잠재력과 한계를 돌파하는 연수",
            id: 'development',
            color: '#F59E0B',
            glow: 'rgba(245, 158, 11, 0.4)',
            accent: 'from-amber-500 to-orange-700'
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
            title: "레포츠 & 래프팅",
            icon: Waves,
            theme: "#FF6B00",
            description: "자연의 에너지를 체험하는 역동적인 레포츠 프로그램",
            coverImgUrl: "/assets/images/programs/leisure.jpg",
            delay: 0.1
        },
        {
            id: 'education',
            title: "전문 스키 캠프",
            icon: MountainSnow,
            theme: "#00D1FF",
            description: "지속적이고 체계적인 고품격 스키 교육 서비스",
            coverImgUrl: "/assets/images/programs/skiing.jpg",
            delay: 0.2
        },
        {
            id: 'activite',
            title: "현장 & 생태 체험",
            icon: Leaf,
            theme: "#22C55E",
            description: "오감을 깨우는 다양한 현장 학습 및 생태 체험",
            coverImgUrl: "/assets/images/programs/experience.jpg",
            delay: 0.3
        },
        {
            id: 'development',
            title: "챌린지 & 인성개발",
            icon: Compass,
            theme: "#F59E0B",
            description: "한계 극복을 통해 조직력을 강화하는 어드벤처 연수",
            coverImgUrl: "/assets/images/programs/action.jpg",
            delay: 0.4
        }
    ];

    const selectedProgram = leadData.find(item => item.id === selectedId);
    const detailedProgramContent = selectedId ? programs[selectedId] : null;

    return (
        <div className="w-full min-h-screen bg-white flex flex-col">
            {isAdmin && <AdminToolbar onLogout={logout} />}
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
                        style={{
                            backgroundImage: `url('${getImageUrl(heroSlides[currentImageIndex].img, `home_hero_${currentImageIndex}`)}')`,
                            backgroundColor: '#050505' // 이미지 로드 전/실패 시 배경색
                        }}
                    >
                        {isAdmin && (
                            <div className="absolute inset-0 z-30">
                                <AdminImageManager
                                    isAdmin={isAdmin}
                                    uploadKey={`home_hero_${currentImageIndex}`}
                                >
                                    <div className="w-full h-full">
                                        <div className="absolute top-32 right-8 z-50">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-md border border-white/20 transition-all font-bold text-sm pointer-events-auto">
                                                <Waves size={16} />
                                                배경 이미지 교체
                                            </button>
                                        </div>
                                    </div>
                                </AdminImageManager>
                            </div>
                        )}
                    </motion.div>
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
                                {heroSlides[currentImageIndex].tag}
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
            <section className="w-full py-40 bg-[#050505]">
                <div className="container mx-auto px-6 max-w-[1600px]">
                    <div className="mb-24 flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-gray-500 font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase text-sm mb-4 block"
                        >
                            전문적인 프로그램 라인업
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-sm">
                            L.E.A.D 주요 사업
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1400px] mx-auto min-h-[1400px]">
                        {leadData.map((item) => (
                            <motion.div
                                key={item.id}
                                layoutId={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: item.delay }}
                                onClick={() => setSelectedId(item.id)}
                                className="group relative flex flex-col bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden cursor-pointer h-[600px] md:h-[650px] transition-all duration-700 hover:-translate-y-2"
                                style={{ transformOrigin: 'center' }}
                            >
                                {/* Background Image & Gradient Masks */}
                                <div className="absolute inset-0 z-0 bg-[#050505]">
                                    <div className="absolute top-0 left-0 right-0 h-full overflow-hidden">
                                        <AdminImageManager
                                            isAdmin={isAdmin}
                                            uploadKey={`home_item_${item.id}`}
                                        >
                                            <motion.img
                                                layoutId={`img-${item.id}`}
                                                src={getImageUrl(item.coverImgUrl, `home_item_${item.id}`)}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 saturate-[1.2]"
                                            />
                                        </AdminImageManager>
                                        {/* Seamless fade to dark bottom */}
                                        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
                                        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
                                        {/* Extremely subtle top light gradient */}
                                        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-[#050505]/80 to-transparent pointer-events-none" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 p-10 md:p-14 flex flex-col h-full justify-between">
                                    {/* Top Area: Icon, P.0X, Title */}
                                    <div className="flex flex-col gap-6">
                                        <div className="flex justify-between items-start">
                                            {/* Frosted glass icon box matching reference */}
                                            <motion.div
                                                layoutId={`icon-${item.id}`}
                                                className="w-16 h-16 bg-white/10 backdrop-blur-[2px] rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/20 transition-transform duration-500 group-hover:scale-110"
                                            >
                                                <item.icon size={30} strokeWidth={1.5} />
                                            </motion.div>
                                            <span className="text-white/40 font-bold tracking-[0.2em] text-xs pt-2">P.0{leadData.indexOf(item) + 1}</span>
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <motion.h3
                                                layoutId={`title-${item.id}`}
                                                className="text-[2.2rem] md:text-[3rem] font-black tracking-tight leading-tight mb-5 drop-shadow-sm flex items-center flex-wrap gap-y-2 text-white"
                                            >
                                                {item.title.split(/(\/|&)/).map((part, i) => {
                                                    const trimmed = part.trim();
                                                    if (trimmed === '/' || trimmed === '&') {
                                                        return <span key={i} className="text-white/40 font-light mx-2">{trimmed}</span>;
                                                    }
                                                    return <span key={i} className="text-white">{trimmed}</span>;
                                                })}
                                            </motion.h3>
                                            <motion.div
                                                layoutId={`theme-${item.id}`}
                                                className="w-24 h-1.5 rounded-full transition-all duration-500 group-hover:w-32 mt-[-10px]"
                                                style={{ backgroundColor: item.theme }}
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom Area: Description & Action Link */}
                                    <div className="flex flex-col gap-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                        <p className="text-gray-300 font-medium text-base md:text-lg leading-relaxed max-w-lg group-hover:text-white transition-colors duration-500">
                                            {item.description}
                                        </p>
                                        <div
                                            className="flex items-center gap-3 text-sm font-bold tracking-[0.1em] uppercase transition-all duration-500 text-white"
                                        >
                                            <span>더 많은 정보 보기</span>
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
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
                                    <AdminImageManager isAdmin={isAdmin} uploadKey={`program_${selectedId}_hero`}>
                                        <motion.img
                                            layoutId={`img-${selectedId}`}
                                            src={getImageUrl(selectedProgram.coverImgUrl, `program_${selectedId}_hero`)}
                                            alt={selectedProgram.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </AdminImageManager>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent pointer-events-none" />
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
                                            <AdminTextManager
                                                isAdmin={isAdmin}
                                                contentKey={`program_${selectedId}_title`}
                                                text={t(selectedProgram.title, `program_${selectedId}_title`)}
                                            />
                                        </motion.h3>
                                        <motion.div
                                            layoutId={`theme-${selectedId}`}
                                            className="w-16 h-1.5 rounded-full"
                                            style={{ backgroundColor: selectedProgram.theme }}
                                        />
                                    </div>

                                    <div className="text-xl text-gray-500 font-medium leading-relaxed mb-12">
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`program_${selectedId}_intro`}
                                            text={t(detailedProgramContent.intro, `program_${selectedId}_intro`)}
                                            as="p"
                                            multiline={true}
                                        />
                                    </div>

                                    <div className="space-y-10">
                                        {detailedProgramContent.programCategories.map((cat, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
                                                    <AdminTextManager
                                                        isAdmin={isAdmin}
                                                        contentKey={`program_${selectedId}_cat_${idx}_name`}
                                                        text={t(cat.category, `program_${selectedId}_cat_${idx}_name`)}
                                                    />
                                                </h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {cat.activities.map((activity, j) => (
                                                        <span key={j} className="px-5 py-2 bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-100 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedProgram.theme }} />
                                                            <AdminTextManager
                                                                isAdmin={isAdmin}
                                                                contentKey={`program_${selectedId}_cat_${idx}_act_${j}_name`}
                                                                text={t(activity.name, `program_${selectedId}_cat_${idx}_act_${j}_name`)}
                                                            />
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
