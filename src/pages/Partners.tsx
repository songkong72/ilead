import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, CheckCircle, Image as ImageIcon } from 'lucide-react';
import partnersData from '../data/partners.json';

const Partners = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeResort = partnersData[activeTab];

    return (
        <div className="relative min-h-[100dvh] bg-gray-50 pb-20">
            {/* 상단 컬러드 배경: 메뉴 가시성과 Hero 섹션 강조 */}
            <div className="absolute top-0 left-0 right-0 h-[450px] md:h-[500px] z-0 bg-[#2eb5b9]">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-10 mix-blend-overlay"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1543325608-ca3a910bf23c?auto=format&fit=crop&w=2000&q=80')` }}
                />
                {/* 글씨 가독성을 위한 다크 그라데이션 오버레이 */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-32 min-h-screen">
                {/* 타이틀 */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">제휴 리조트</h2>
                    <p className="text-white/90">
                        L.E.A.D Consulting이 제휴한 프리미엄 시설을 소개합니다. 도전, 모험, 꿈 그리고 미래가 있는 곳!
                    </p>
                </div>

                {/* 탭 메뉴 */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {partnersData.map((resort, idx) => (
                        <button
                            key={resort.id}
                            onClick={() => setActiveTab(idx)}
                            className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-sm ${activeTab === idx
                                ? 'bg-white text-[#00a896] shadow-xl scale-105'
                                : 'bg-white/10 text-white/90 hover:bg-white/20 hover:text-white border border-white/20 backdrop-blur-sm'
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
                        <div className="bg-white border border-gray-200 shadow-lg rounded-[2.5rem] overflow-hidden">
                            <div className="aspect-[21/9] flex items-center justify-center bg-gray-50">
                                {activeResort.images.length > 0 ? (
                                    <img
                                        src={activeResort.images[0]}
                                        alt={activeResort.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                                            <ImageIcon size={36} className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 font-bold">대표 이미지 준비 중</p>
                                        <p className="text-gray-400 text-xs">이미지가 추가되면 여기에 표시됩니다</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 리조트 정보 */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* 좌측: 소개 */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeResort.name}</h3>
                                    <p className="text-[#00a896] font-bold text-sm mb-6">{activeResort.subtitle}</p>
                                    <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">{activeResort.description}</p>
                                </div>

                                {/* 상세 섹션 (있는 경우) */}
                                {'sections' in activeResort && (activeResort.sections as any[]).map((section: any, sIdx: number) => (
                                    <div key={sIdx} className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-8 md:p-10 space-y-6">
                                        <div>
                                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h4>
                                            {section.subtitle && <p className="text-[#00a896] font-bold text-sm mb-4">{section.subtitle}</p>}
                                            {section.content && <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>}
                                        </div>

                                        {section.features && section.features.map((feature: any, fIdx: number) => (
                                            <div key={fIdx} className="mt-8">
                                                <h5 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#00a896] pl-3">{feature.category}</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {feature.items.map((item: any, iIdx: number) => (
                                                        <div key={iIdx} className="relative bg-white/5 rounded-2xl overflow-hidden group aspect-[4/3] border border-white/10 shadow-lg">
                                                            {/* 배경 카드 기본 아이콘 (사진 로딩 실패 혹은 없을 때 노출) */}
                                                            <div className="absolute inset-0 flex items-center justify-center bg-white/5 opacity-50 z-0">
                                                                <ImageIcon size={32} className="text-white/20" />
                                                            </div>
                                                            {/* 사진 영역 */}
                                                            {item.image && (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-10"
                                                                    onError={(e) => {
                                                                        // 이미지 로드 실패 시 투명하게 처리하여 밑의 아이콘 노출
                                                                        (e.target as HTMLImageElement).style.opacity = '0';
                                                                    }}
                                                                />
                                                            )}

                                                            {/* 텍스트 가독성을 위한 하단 그라데이션 */}
                                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none z-20" />

                                                            {/* 텍스트 내용 */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-500 z-30">
                                                                <h6 className="text-white font-bold mb-2 text-lg drop-shadow-md">{item.name}</h6>
                                                                <p className="text-white/70 text-sm leading-relaxed drop-shadow-sm line-clamp-2 md:line-clamp-none">
                                                                    {item.desc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {section.linkedPrograms && (
                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400 text-sm font-bold">연계프로그램:</span>
                                                    <span className="text-gray-700 text-sm font-bold">{section.linkedPrograms}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* 시설 이미지 그리드 (placeholder) */}
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-10">
                                    <h4 className="text-lg font-bold text-gray-900 mb-6">시설 사진</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {activeResort.images.length > 0 ? (
                                            activeResort.images.map((img, idx) => (
                                                <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                                                    <img src={img} alt={`${activeResort.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))
                                        ) : (
                                            Array.from({ length: 6 }).map((_, idx) => (
                                                <div key={idx} className="aspect-[4/3] rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                                    <div className="text-center space-y-2">
                                                        <ImageIcon size={24} className="text-gray-300 mx-auto" />
                                                        <p className="text-gray-400 text-[10px] font-bold">사진 {idx + 1}</p>
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
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-8 space-y-6">
                                    <h4 className="text-lg font-bold text-gray-900">기본 정보</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                                                <MapPin size={18} className="text-[#00a896]" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs font-bold mb-1">위치</p>
                                                <p className="text-gray-800 font-medium text-sm">{activeResort.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                                                <Phone size={18} className="text-[#00a896]" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-xs font-bold mb-1">연락처</p>
                                                <p className="text-gray-800 font-medium text-sm">{activeResort.tel}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 보유 시설 */}
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-8 space-y-6">
                                    <h4 className="text-lg font-bold text-gray-900">보유 시설</h4>
                                    <div className="space-y-3">
                                        {activeResort.facilities.map((facility, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircle size={16} className="text-[#00a896] shrink-0" />
                                                <span className="text-gray-700 text-sm font-medium">{facility}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 운영 프로그램 */}
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-8 space-y-6">
                                    <h4 className="text-lg font-bold text-gray-900">운영 프로그램</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {activeResort.programs.map((program, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-emerald-50 text-[#00a896] rounded-full text-xs font-bold border border-emerald-100"
                                            >
                                                {program}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* 지도 공간 */}
                                <div className="bg-white border border-gray-200 shadow-sm rounded-[2rem] p-8 space-y-4">
                                    <h4 className="text-lg font-bold text-gray-900">오시는 길</h4>
                                    <div className="aspect-[4/3] rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                        <div className="text-center space-y-2">
                                            <MapPin size={32} className="text-gray-300 mx-auto" />
                                            <p className="text-gray-400 text-xs font-bold">지도 준비 중</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Partners;
