import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, CheckCircle, Image as ImageIcon } from 'lucide-react';
import partnersData from '../data/partners.json';

const Partners = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeResort = partnersData[activeTab];

    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            {/* 타이틀 */}
            <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-black mb-4">제휴 리조트</h2>
                <p className="text-white/60">
                    L.E.A.D Consulting이 제휴한 프리미엄 시설을 소개합니다. 도전, 모험, 꿈 그리고 미래가 있는 곳!
                </p>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex flex-wrap gap-3 mb-12">
                {partnersData.map((resort, idx) => (
                    <button
                        key={resort.id}
                        onClick={() => setActiveTab(idx)}
                        className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === idx
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                    >
                        {resort.name}
                    </button>
                ))}
            </div>

            {/* 리조트 상세 */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10"
                >
                    {/* 메인 이미지 공간 */}
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                        <div className="aspect-[21/9] flex items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
                            {activeResort.images.length > 0 ? (
                                <img
                                    src={activeResort.images[0]}
                                    alt={activeResort.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                        <ImageIcon size={36} className="text-white/20" />
                                    </div>
                                    <p className="text-white/20 font-bold">대표 이미지 준비 중</p>
                                    <p className="text-white/10 text-xs">이미지가 추가되면 여기에 표시됩니다</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 리조트 정보 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* 좌측: 소개 */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10">
                                <h3 className="text-2xl font-bold text-white mb-2">{activeResort.name}</h3>
                                <p className="text-blue-400 font-bold text-sm mb-6">{activeResort.subtitle}</p>
                                <p className="text-white/60 leading-relaxed text-lg">{activeResort.description}</p>
                            </div>

                            {/* 시설 이미지 그리드 (placeholder) */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10">
                                <h4 className="text-lg font-bold text-white mb-6">시설 사진</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {activeResort.images.length > 0 ? (
                                        activeResort.images.map((img, idx) => (
                                            <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden">
                                                <img src={img} alt={`${activeResort.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))
                                    ) : (
                                        Array.from({ length: 6 }).map((_, idx) => (
                                            <div key={idx} className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                                                <div className="text-center space-y-2">
                                                    <ImageIcon size={24} className="text-white/10 mx-auto" />
                                                    <p className="text-white/10 text-[10px] font-bold">사진 {idx + 1}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 우측: 정보 카드들 */}
                        <div className="space-y-6">
                            {/* 위치 & 연락처 */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
                                <h4 className="text-lg font-bold text-white">기본 정보</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin size={18} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-white/30 text-xs font-bold mb-1">위치</p>
                                            <p className="text-white font-medium text-sm">{activeResort.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Phone size={18} className="text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-white/30 text-xs font-bold mb-1">연락처</p>
                                            <p className="text-white font-medium text-sm">{activeResort.tel}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 보유 시설 */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
                                <h4 className="text-lg font-bold text-white">보유 시설</h4>
                                <div className="space-y-3">
                                    {activeResort.facilities.map((facility, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                            <span className="text-white/60 text-sm font-medium">{facility}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 운영 프로그램 */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-6">
                                <h4 className="text-lg font-bold text-white">운영 프로그램</h4>
                                <div className="flex flex-wrap gap-2">
                                    {activeResort.programs.map((program, idx) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold"
                                        >
                                            {program}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 지도 공간 */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 space-y-4">
                                <h4 className="text-lg font-bold text-white">오시는 길</h4>
                                <div className="aspect-[4/3] rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                                    <div className="text-center space-y-2">
                                        <MapPin size={32} className="text-white/10 mx-auto" />
                                        <p className="text-white/10 text-xs font-bold">지도 준비 중</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Partners;
