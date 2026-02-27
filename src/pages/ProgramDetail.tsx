import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Plus, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { programs } from '../data/programs';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';
import AdminTextManager from '../components/common/AdminTextManager';
import AdminToolbar from '../components/common/AdminToolbar';

const ProgramDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin, overrides, getImageUrl, logout } = useImageOverrides();

    const t = (defaultText: string, key: string) => {
        return overrides[key] || defaultText;
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 120; // 헤더 높이 등을 고려한 오프셋
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

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
            {isAdmin && <AdminToolbar onLogout={logout} />}
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Floating Navigation */}
                <div className="sticky top-[100px] z-50 pointer-events-none mb-10">
                    <button
                        onClick={() => navigate("/")}
                        className="pointer-events-auto flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-all p-3 md:px-6 md:py-3 rounded-full bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 group font-bold tracking-tight text-base active:scale-95"
                    >
                        <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                        <span className="hidden md:block">리스트로 돌아가기</span>
                    </button>
                </div>

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
                            <AdminTextManager
                                isAdmin={isAdmin}
                                contentKey={`program_${id}_title`}
                                text={t(content.title, `program_${id}_title`)}
                            />
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-12">
                            <div className="w-24 h-2 rounded-full" style={{ backgroundColor: content.themeColor, boxShadow: `0 0 20px ${content.themeColor}44` }} />
                            <div className="text-2xl md:text-3xl font-medium text-gray-500 tracking-tight leading-snug max-w-3xl">
                                <AdminTextManager
                                    isAdmin={isAdmin}
                                    contentKey={`program_${id}_intro`}
                                    text={t(content.intro, `program_${id}_intro`)}
                                    as="p"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Section */}
                    <div className="aspect-[21/9] w-full bg-gray-200 rounded-[3rem] overflow-hidden mb-12 shadow-3xl relative border border-black/5">
                        <AdminImageManager isAdmin={isAdmin} uploadKey={`program_${id}_hero`}>
                            <img
                                src={getImageUrl(content.bgImage, `program_${id}_hero`)}
                                alt={content.title}
                                className="w-full h-full object-cover saturate-[1.1] brightness-[0.9]"
                            />
                        </AdminImageManager>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute bottom-12 left-12">
                            <p className="text-white/80 font-bold tracking-widest text-sm uppercase mb-2">Representative Image</p>
                            <h3 className="text-white text-3xl font-bold">
                                <AdminTextManager
                                    isAdmin={isAdmin}
                                    contentKey={`program_${id}_title`}
                                    text={t(content.title, `program_${id}_title`)}
                                />
                            </h3>
                        </div>
                    </div>

                    {/* Quick Summary Section */}
                    <div className="flex flex-wrap gap-4 mb-24 justify-center">
                        {content.summary.map((item, i) => (
                            <motion.button
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => scrollToSection(`category-${i}`)}
                                className="px-8 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 group hover:shadow-md transition-all cursor-pointer active:scale-95"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: content.themeColor }} />
                                <div className="text-xl font-bold text-gray-800 tracking-tight">
                                    <AdminTextManager
                                        isAdmin={isAdmin}
                                        contentKey={`program_${id}_summary_${i}`}
                                        text={t(item, `program_${id}_summary_${i}`)}
                                    />
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:translate-x-1 transition-transform" size={18} />
                            </motion.button>
                        ))}
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
                                    <h4 className="text-2xl font-bold text-gray-900 mb-3">
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`program_${id}_goal_${idx}_title`}
                                            text={t(goal.title, `program_${id}_goal_${idx}_title`)}
                                        />
                                    </h4>
                                    <div className="text-gray-500 font-medium leading-relaxed">
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`program_${id}_goal_${idx}_desc`}
                                            text={t(goal.description, `program_${id}_goal_${idx}_desc`)}
                                            as="p"
                                            multiline={true}
                                        />
                                    </div>
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
                            <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                                <AdminTextManager
                                    isAdmin={isAdmin}
                                    contentKey={`program_${id}_description`}
                                    text={t(content.description, `program_${id}_description`)}
                                    as="p"
                                    multiline={true}
                                />
                                <br />
                                참가자들의 몰입도를 극대화하고 실질적인 변화를 이끌어내는,
                                현장 중심의 교육과 잊지 못할 경험을 선사합니다.
                            </div>
                        </div>
                    </div>

                    {/* Program Categories & Activities (Refactored to Cards) */}
                    <div className="mb-32">
                        <div className="flex items-center gap-6 mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 whitespace-nowrap">프로그램 상세 안내</h3>
                            <div className="w-full h-[1px] bg-gray-200" />
                        </div>

                        <div className="flex flex-col gap-24">
                            {content.programCategories.map((cat, idx) => (
                                <div key={idx} id={`category-${idx}`} className="flex flex-col gap-10 scroll-mt-32">
                                    <h4 className="text-2xl font-black tracking-widest text-gray-400 uppercase border-l-4 pl-6" style={{ borderColor: content.themeColor }}>
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`program_${id}_cat_${idx}_name`}
                                            text={t(cat.category, `program_${id}_cat_${idx}_name`)}
                                        />
                                    </h4>
                                    <div className="flex flex-col gap-16">
                                        {cat.activities.map((activity, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_10px_60px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col gap-12"
                                            >
                                                {/* Header & Description */}
                                                <div className="flex flex-col md:flex-row gap-10 items-start">
                                                    <div className="flex flex-col gap-4 min-w-[280px]">
                                                        <div className="inline-flex px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-white self-start" style={{ backgroundColor: content.themeColor }}>
                                                            <AdminTextManager
                                                                isAdmin={isAdmin}
                                                                contentKey={`program_${id}_cat_${idx}_badge`}
                                                                text={t(t(cat.category, `program_${id}_cat_${idx}_name`).split('(')[0].trim(), `program_${id}_cat_${idx}_badge`)}
                                                            />
                                                        </div>
                                                        <h5 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                                            <AdminTextManager
                                                                isAdmin={isAdmin}
                                                                contentKey={`program_${id}_cat_${idx}_act_${i}_name`}
                                                                text={t(activity.name, `program_${id}_cat_${idx}_act_${i}_name`)}
                                                            />
                                                        </h5>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xl text-gray-500 font-medium leading-relaxed">
                                                            <AdminTextManager
                                                                isAdmin={isAdmin}
                                                                contentKey={`program_${id}_cat_${idx}_act_${i}_desc`}
                                                                text={t(activity.description, `program_${id}_cat_${idx}_act_${i}_desc`)}
                                                                as="p"
                                                                multiline={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Gallery Grid */}
                                                <div className="w-full">
                                                    <ActivityGallery
                                                        id={id || ""}
                                                        idx={idx}
                                                        i={i}
                                                        activity={activity}
                                                        isAdmin={isAdmin}
                                                        overrides={overrides}
                                                        themeColor={content.themeColor}
                                                    />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
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
                                            <div className="text-xl font-black text-gray-400 tracking-tighter tabular-nums whitespace-nowrap">
                                                <AdminTextManager
                                                    isAdmin={isAdmin}
                                                    contentKey={`program_${id}_sched_${idx}_time`}
                                                    text={t(slot.time, `program_${id}_sched_${idx}_time`)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="text-3xl font-bold text-gray-900 mb-3">
                                                <AdminTextManager
                                                    isAdmin={isAdmin}
                                                    contentKey={`program_${id}_sched_${idx}_act`}
                                                    text={t(slot.activity, `program_${id}_sched_${idx}_act`)}
                                                />
                                            </h5>
                                            <div className="text-xl text-gray-500 font-medium">
                                                <AdminTextManager
                                                    isAdmin={isAdmin}
                                                    contentKey={`program_${id}_sched_${idx}_desc`}
                                                    text={t(slot.description || "", `program_${id}_sched_${idx}_desc`)}
                                                    as="p"
                                                    multiline={true}
                                                />
                                            </div>
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

const ActivityGallery = ({ id, idx, i, activity, isAdmin, overrides, themeColor }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const baseKey = `program_${id}_act_${idx}_${i}_gallery`;

    const defaultImages = activity.galleryImages || [];
    const list = defaultImages.map((img: any, imgIdx: number) => {
        const key = `${baseKey}_${imgIdx}`;
        const over = overrides[key];
        if (over) return over;
        if (img && (img.startsWith('/') || img.startsWith('http'))) return img;
        return "";
    }).filter((url: string) => url !== "");

    let extraIdx = defaultImages.length;
    while (overrides[`${baseKey}_${extraIdx}`]) {
        list.push(overrides[`${baseKey}_${extraIdx}`]);
        extraIdx++;
    }

    const totalSlides = list.length + (isAdmin ? 1 : 0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    if (totalSlides === 0 && !isAdmin) {
        return (
            <div className="aspect-[21/9] bg-gray-50 rounded-3xl overflow-hidden relative border border-gray-100/50">
                <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-white/10" style={{ backgroundColor: `${themeColor}11` }}>
                        <Clock size={32} />
                    </div>
                    <span className="text-gray-300 font-bold tracking-tighter uppercase mb-2">現場 갤러리 준비 중</span>
                    <p className="text-gray-400 text-sm font-medium">관리자 모드에서 실제 활동 사진을 업로드해 주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group/gallery w-full">
            <div className="overflow-hidden rounded-3xl bg-gray-50 border border-gray-100/50 shadow-sm aspect-video md:aspect-[21/9] relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="w-full h-full"
                    >
                        {currentIndex < list.length ? (
                            <AdminImageManager isAdmin={isAdmin} uploadKey={`${baseKey}_${currentIndex}`}>
                                <img
                                    src={list[currentIndex]}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    alt="Activity"
                                />
                            </AdminImageManager>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white">
                                <AdminImageManager isAdmin={isAdmin} uploadKey={`${baseKey}_${list.length}`} showDelete={false}>
                                    <div className="flex flex-col items-center justify-center text-gray-300 hover:text-emerald-500 transition-all cursor-pointer p-12 text-center group/add w-full h-full bg-white/50 border-2 border-dashed border-gray-100 rounded-3xl gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover/add:bg-emerald-50 transition-colors border border-gray-100 group-hover/add:border-emerald-100">
                                            <Plus size={32} strokeWidth={1.5} />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-black text-gray-900 tracking-tight">Add Detail Photo</h4>
                                            <p className="text-sm font-medium text-gray-400">활동의 생생한 순간을 추가 기록하세요.</p>
                                        </div>
                                    </div>
                                </AdminImageManager>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white/40 z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white/40 z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Progress Indicators */}
                {totalSlides > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {Array.from({ length: totalSlides }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Slide Information Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase z-10">
                {currentIndex + 1} / {totalSlides}
            </div>
        </div>
    );
};

export default ProgramDetail;
