import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, ChevronLeft, ChevronRight, Plus, Image, Trash2, Eye, EyeOff } from 'lucide-react';
import partnersData from '../data/partners.json';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';
import AdminTextManager from '../components/common/AdminTextManager';
import AdminToolbar from '../components/common/AdminToolbar';

const Partners = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedFullImage, setSelectedFullImage] = useState<string | null>(null);
    const { isAdmin, overrides, getImageUrl, logout, setOverrideValue } = useImageOverrides();
    const [sectionImageIndexes, setSectionImageIndexes] = useState<Record<string, number>>({});
    const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [showButtons, setShowButtons] = useState<Record<string, boolean>>({});

    const checkScrollable = () => {
        const newShowButtons: Record<string, boolean> = {};
        Object.keys(carouselRefs.current).forEach(key => {
            const el = carouselRefs.current[key];
            if (el) {
                newShowButtons[key] = el.scrollWidth > el.clientWidth;
            }
        });
        setShowButtons(newShowButtons);
    };

    useEffect(() => {
        // 데이터가 렌더링 된 후 시간을 두고 체크 (이미지 로드 등 고려)
        const timer = setTimeout(checkScrollable, 500);
        window.addEventListener('resize', checkScrollable);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScrollable);
        };
    }, [activeTab, overrides]);

    const scrollCarousel = (key: string, direction: 'left' | 'right') => {
        const container = carouselRefs.current[key];
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // 섹션별 이미지 인덱스 초기화/변경 헬퍼
    const getSectionIndex = (key: string) => sectionImageIndexes[key] || 0;
    const setSectionIndex = (key: string, idx: number, max: number) => {
        const nextIdx = (idx + max) % max;
        setSectionImageIndexes(prev => ({ ...prev, [key]: nextIdx }));
    };

    const activeResort = partnersData[activeTab];
    if (!activeResort) return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;

    // 텍스트 오버라이드 헬퍼
    const t = (defaultText: string, key: string) => {
        return overrides[key] || defaultText;
    };

    // 관리자가 추가한 사진들까지 포함한 전체 목록 계산
    const getFullImageList = () => {
        const defaultImages = activeResort.images || [];
        const baseKey = `partners_resort_${activeResort.id}_main`;

        // 1. 기본 이미지 + 교체된 이미지
        const list = defaultImages.map((img: string, idx: number) => getImageUrl(img, `${baseKey}_${idx}`));

        // 2. 새로 추가된 이미지 찾기 (index가 기본 개수보다 큰 경우)
        // 오버라이드 객체를 돌면서 해당 리조트의 추가 이미지 키가 있는지 확인
        let extraIdx = defaultImages.length;
        while (overrides[`${baseKey}_${extraIdx}`]) {
            list.push(overrides[`${baseKey}_${extraIdx}`]);
            extraIdx++;
        }

        return list;
    };

    const isFacHidden = overrides[`hide_fac_${activeResort.id}`] === 'true';
    const isProgHidden = overrides[`hide_prog_${activeResort.id}`] === 'true';
    const isSidebarTotallyHidden = isFacHidden && isProgHidden;
    const shouldShowSidebarArea = isAdmin || !isSidebarTotallyHidden;

    // 단일 이미지 체제이므로 항상 첫 번째 이미지만 사용
    const allImages = getFullImageList().slice(0, 1);

    const handleTabChange = (idx: number) => {
        setActiveTab(idx);
        setCurrentImageIndex(0);
    };

    return (
        <div className="relative min-h-[100dvh] bg-gray-50 pb-20">
            {isAdmin && <AdminToolbar onLogout={logout} />}
            {/* 상단 컬러드 배경 */}
            <div className="absolute top-0 left-0 right-0 h-[320px] md:h-[500px] z-0 bg-[#2eb5b9]">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-10 mix-blend-overlay"
                    style={{ backgroundImage: `url('/assets/images/headers/partners-bg.jpg')` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-16 md:py-32 min-h-screen">
                {/* 타이틀 */}
                <div className="mb-8 md:mb-12">
                    <AdminTextManager
                        isAdmin={isAdmin}
                        contentKey="partners_header_title"
                        text={t("제휴 리조트", "partners_header_title")}
                        as="h2"
                        className="text-3xl md:text-5xl font-black mb-2 md:mb-4 text-white uppercase italic tracking-tighter"
                    />
                    <p className="text-sm md:text-lg text-white/90 font-medium h-1.5 w-24 bg-white/30 rounded-full mb-2" />
                    <AdminTextManager
                        isAdmin={isAdmin}
                        contentKey="partners_header_desc"
                        text={t("L.E.A.D Consulting이 제휴한 프리미엄 시설을 소개합니다.", "partners_header_desc")}
                        as="p"
                        className="text-white font-bold opacity-80"
                    />
                </div>

                {/* 리조트 선택 탭 */}
                <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
                    {partnersData.map((resort: any, idx: number) => (
                        <button
                            key={resort.id}
                            onClick={() => handleTabChange(idx)}
                            className={`px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-xs md:text-sm transition-all shadow-sm ${activeTab === idx
                                ? 'bg-white text-[#2eb5b9] shadow-xl scale-105'
                                : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20 backdrop-blur-sm'
                                }`}
                        >
                            <AdminTextManager
                                isAdmin={isAdmin}
                                contentKey={`partners_resort_name_${resort.id}`}
                                text={t(resort.name, `partners_resort_name_${resort.id}`)}
                            />
                        </button>
                    ))}
                </div>

                {/* 상세 레이아웃 */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-10"
                    >
                        {/* 1. 메인 이미지 슬라이더 */}
                        <div className="relative group/slider">
                            <AdminImageManager
                                isAdmin={isAdmin}
                                uploadKey={`partners_resort_${activeResort.id}_main_${currentImageIndex}`}
                                isDefault={!overrides[`partners_resort_${activeResort.id}_main_${currentImageIndex}`]}
                            >
                                <div className="bg-white border border-gray-200 shadow-lg rounded-[2.5rem] overflow-hidden group/main relative aspect-[21/9]">
                                    <AnimatePresence mode="wait">
                                        {allImages.length > 0 ? (
                                            <motion.img
                                                key={`${activeTab}-${currentImageIndex}`}
                                                src={allImages[currentImageIndex]}
                                                alt={activeResort.name}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 gap-4">
                                                <Image size={48} className="text-gray-300" />
                                                <p className="text-gray-400 font-bold">이미지 준비 중 (드래그하여 업로드)</p>
                                            </div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            </AdminImageManager>

                            {/* 관리자: 이미지 추가 버튼 제거 (1개의 이미지만 권장하므로) */}
                        </div>

                        {/* 상세 정보 및 섹션들 */}
                        <div className={`grid grid-cols-1 ${shouldShowSidebarArea ? 'lg:grid-cols-3' : ''} gap-8`}>
                            <div className={`${shouldShowSidebarArea ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-12`}>
                                {activeResort.description && (
                                    <div className="bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`partners_resort_desc_${activeResort.id}`}
                                            text={t(activeResort.description, `partners_resort_desc_${activeResort.id}`)}
                                            as="p"
                                            className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed italic"
                                        />
                                    </div>
                                )}

                                {/* 섹션 반복 */}
                                {activeResort.sections && activeResort.sections.map((section: any, sIdx: number) => {
                                    const sectionBaseKey = `partners_resort_${activeResort.id}_section_${sIdx}`;

                                    // 섹션별 전체 이미지 목록 계산
                                    const getSectionImages = () => {
                                        const list = [];
                                        if (section.image) {
                                            list.push(getImageUrl(section.image, `${sectionBaseKey}_0`));
                                        }

                                        // 추가된 이미지들 찾기 (1번 인덱스부터)
                                        let extraIdx = 1;
                                        if (!section.image) extraIdx = 0; // 기본이 없으면 0번부터

                                        while (overrides[`${sectionBaseKey}_${extraIdx}`]) {
                                            list.push(overrides[`${sectionBaseKey}_${extraIdx}`]);
                                            extraIdx++;
                                        }
                                        return list;
                                    };

                                    const sectionImages = getSectionImages();

                                    return (
                                        <div key={sIdx} className="bg-white border border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden p-8 md:p-12 group/section">
                                            <div className="flex flex-col gap-12">
                                                {/* 상단 파트: 이미지 + 제목/설명 (1:1 분할) */}
                                                <div className="flex flex-col md:flex-row gap-12 items-center">
                                                    <div className="w-full md:w-1/2">
                                                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg bg-gray-50 group/section-img">
                                                            {/* 섹션 이미지 슬라이더 본체 */}
                                                            <div className="w-full h-full relative">
                                                                <AdminImageManager
                                                                    isAdmin={isAdmin}
                                                                    uploadKey={`${sectionBaseKey}_${getSectionIndex(sectionBaseKey)}`}
                                                                    isDefault={!overrides[`${sectionBaseKey}_${getSectionIndex(sectionBaseKey)}`]}
                                                                >
                                                                    <div className="w-full h-full relative">
                                                                        {sectionImages.length > 0 ? (
                                                                            <motion.img
                                                                                key={`${sectionBaseKey}_${getSectionIndex(sectionBaseKey)}`}
                                                                                src={sectionImages[getSectionIndex(sectionBaseKey)]}
                                                                                alt={section.title}
                                                                                initial={{ opacity: 0 }}
                                                                                animate={{ opacity: 1 }}
                                                                                className="absolute inset-0 w-full h-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50">
                                                                                <Image size={32} className="text-gray-300" />
                                                                                <span className="text-gray-400 text-xs font-bold">이미지 없음</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </AdminImageManager>

                                                                {/* 섹션 슬라이더 화살표 (2개 이상일 때만) */}
                                                                {sectionImages.length > 1 && (
                                                                    <>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); setSectionIndex(sectionBaseKey, getSectionIndex(sectionBaseKey) - 1, sectionImages.length); }}
                                                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover/section-img:opacity-100 z-10"
                                                                        >
                                                                            <ChevronLeft size={20} />
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); setSectionIndex(sectionBaseKey, getSectionIndex(sectionBaseKey) + 1, sectionImages.length); }}
                                                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover/section-img:opacity-100 z-10"
                                                                        >
                                                                            <ChevronRight size={20} />
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>

                                                            {/* 사진 개수 표시 (왼쪽 하단) */}
                                                            {sectionImages.length > 1 && (
                                                                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-white text-[9px] font-black z-10 border border-white/10">
                                                                    {getSectionIndex(sectionBaseKey) + 1} / {sectionImages.length}
                                                                </div>
                                                            )}

                                                            {/* 섹션 추가 이미지 버튼 (오른쪽 하단) */}
                                                            {isAdmin && (
                                                                <div className="absolute bottom-3 right-3 z-20">
                                                                    <AdminImageManager
                                                                        isAdmin={isAdmin}
                                                                        variant="add"
                                                                        uploadKey={`${sectionBaseKey}_${sectionImages.length}`}
                                                                    >
                                                                        <button
                                                                            className="p-1.5 bg-emerald-500/90 hover:bg-emerald-600 text-white rounded-lg shadow-lg transition-all hover:scale-110 active:scale-90 border border-emerald-400/50 flex items-center justify-center"
                                                                            title="사진 추가"
                                                                        >
                                                                            <Plus size={14} strokeWidth={3} />
                                                                        </button>
                                                                    </AdminImageManager>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* 추가 사진 미리보기 (썸네일 리스트) */}
                                                        {sectionImages.length > 1 && (
                                                            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                                                                {sectionImages.map((sImg: string, iIdx: number) => (
                                                                    <button
                                                                        key={iIdx}
                                                                        onClick={() => setSectionIndex(sectionBaseKey, iIdx, sectionImages.length)}
                                                                        className={`relative flex-shrink-0 transition-all ${getSectionIndex(sectionBaseKey) === iIdx ? 'ring-2 ring-emerald-500 scale-95' : 'opacity-60 hover:opacity-100'}`}
                                                                    >
                                                                        <img
                                                                            src={sImg || ''}
                                                                            className="w-20 h-14 object-cover rounded-lg border border-gray-100 shadow-sm"
                                                                            alt="preview"
                                                                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x56/eee/999?text=No+Image'; }}
                                                                        />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                                                        <AdminTextManager
                                                            isAdmin={isAdmin}
                                                            contentKey={`${sectionBaseKey}_title`}
                                                            text={t(section.title, `${sectionBaseKey}_title`)}
                                                            as="h3"
                                                            className="text-4xl font-black text-blue-700 tracking-tight"
                                                        />
                                                        <AdminTextManager
                                                            isAdmin={isAdmin}
                                                            contentKey={`${sectionBaseKey}_subtitle`}
                                                            text={t(section.subtitle, `${sectionBaseKey}_subtitle`)}
                                                            as="p"
                                                            className="text-xl text-black font-bold leading-relaxed"
                                                        />
                                                        <div className="pt-4 border-t border-gray-100 mt-4 space-y-4">
                                                            <AdminTextManager
                                                                isAdmin={isAdmin}
                                                                contentKey={`${sectionBaseKey}_desc`}
                                                                text={t(section.content || "", `${sectionBaseKey}_desc`)}
                                                                as="p"
                                                                multiline={true}
                                                                className="text-gray-600 leading-7 font-medium whitespace-pre-wrap"
                                                                placeholder="여기에 리조트에 대한 상세 설명을 입력하세요..."
                                                            />

                                                            {(section.linkedPrograms || isAdmin) && (
                                                                <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 mt-2">
                                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">연계 프로그램</div>
                                                                    <AdminTextManager
                                                                        isAdmin={isAdmin}
                                                                        contentKey={`${sectionBaseKey}_linked`}
                                                                        text={t(section.linkedPrograms || "", `${sectionBaseKey}_linked`)}
                                                                        className="text-gray-600 text-sm font-black italic block"
                                                                        placeholder="연계 프로그램을 입력하세요..."
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* 하단 파트: 세부 항목 (전체 너비 갤러리) */}
                                                {section.features && (
                                                    <div className="pt-10 border-t border-gray-100 space-y-12">
                                                        {section.features.map((feat: any, fIdx: number) => (
                                                            <div key={fIdx} className="space-y-6">
                                                                <div className="flex items-center gap-4">
                                                                    <AdminTextManager
                                                                        isAdmin={isAdmin}
                                                                        contentKey={`${sectionBaseKey}_feat_${fIdx}_cat`}
                                                                        text={t(feat.category, `${sectionBaseKey}_feat_${fIdx}_cat`)}
                                                                        as="h5"
                                                                        className="text-sm font-black text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap"
                                                                    />
                                                                    <div className="h-px w-full bg-emerald-100" />
                                                                </div>

                                                                <div className="relative group/slider">
                                                                    {/* 이전/다음 네비게이션 버튼 (스크롤이 필요할 때만 표시) */}
                                                                    {(() => {
                                                                        const countKey = `${sectionBaseKey}_feat_${fIdx}_count`;
                                                                        if (!showButtons[countKey]) return null;

                                                                        return (
                                                                            <div className="absolute top-[40%] -left-5 -right-5 flex justify-between pointer-events-none z-20">
                                                                                <button
                                                                                    onClick={() => scrollCarousel(countKey, 'left')}
                                                                                    className="w-12 h-12 bg-white/90 shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:scale-110 transition-all pointer-events-auto border border-gray-100 backdrop-blur-sm group-hover/slider:opacity-100 opacity-0 md:opacity-100"
                                                                                >
                                                                                    <ChevronLeft size={24} />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => scrollCarousel(countKey, 'right')}
                                                                                    className="w-12 h-12 bg-white/90 shadow-xl rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:scale-110 transition-all pointer-events-auto border border-gray-100 backdrop-blur-sm group-hover/slider:opacity-100 opacity-0 md:opacity-100"
                                                                                >
                                                                                    <ChevronRight size={24} />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    })()}

                                                                    <div
                                                                        ref={(el) => {
                                                                            const countKey = `${sectionBaseKey}_feat_${fIdx}_count`;
                                                                            carouselRefs.current[countKey] = el;
                                                                        }}
                                                                        className="flex overflow-x-hidden pb-8 px-2 gap-6 snap-x"
                                                                    >
                                                                        {(() => {
                                                                            const countKey = `${sectionBaseKey}_feat_${fIdx}_count`;
                                                                            const count = parseInt(overrides[countKey] || (feat.items?.length || 0).toString());
                                                                            const itemsArray = Array.from({ length: count });

                                                                            return (
                                                                                <>
                                                                                    {itemsArray.map((_, iIdx) => {
                                                                                        const item = feat.items?.[iIdx] || { name: "새 항목", image: "", desc: "" };
                                                                                        const itemKey = `${sectionBaseKey}_feat_${fIdx}_item_${iIdx}_img`;
                                                                                        const nameKey = `${sectionBaseKey}_feat_${fIdx}_item_${iIdx}`;
                                                                                        const descKey = `${sectionBaseKey}_feat_${fIdx}_item_${iIdx}_desc`;
                                                                                        const itemImg = overrides[itemKey] || item.image;

                                                                                        return (
                                                                                            <div key={iIdx} className="flex-shrink-0 w-[240px] md:w-[280px] snap-start relative group/card">
                                                                                                {isAdmin && (
                                                                                                    <button
                                                                                                        onClick={async (e) => {
                                                                                                            e.preventDefault();
                                                                                                            e.stopPropagation();
                                                                                                            if (window.confirm('이 항목을 삭제하시겠습니까?')) {
                                                                                                                const nextCount = Math.max(0, count - 1);
                                                                                                                await setOverrideValue(countKey, nextCount.toString());
                                                                                                            }
                                                                                                        }}
                                                                                                        className="absolute -top-3 -right-3 z-[1001] w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all hover:scale-110 active:scale-95 border-2 border-white"
                                                                                                        title="항목 삭제"
                                                                                                    >
                                                                                                        <Trash2 size={16} />
                                                                                                    </button>
                                                                                                )}
                                                                                                <AdminImageManager
                                                                                                    isAdmin={isAdmin}
                                                                                                    uploadKey={itemKey}
                                                                                                    showDelete={false}
                                                                                                >
                                                                                                    <div
                                                                                                        className={`group/item relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 overflow-hidden ${itemImg ? 'w-full' : 'flex-row items-center px-4 py-2 h-fit min-h-[100px]'}`}
                                                                                                    >
                                                                                                        {itemImg ? (
                                                                                                            <div
                                                                                                                className="w-full aspect-[4/3] overflow-hidden bg-gray-100 relative cursor-pointer"
                                                                                                                onClick={() => setSelectedFullImage(itemImg)}
                                                                                                            >
                                                                                                                <img
                                                                                                                    src={itemImg}
                                                                                                                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700"
                                                                                                                    alt={item.name}
                                                                                                                />
                                                                                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                                                                                                    <span className="text-[10px] text-white font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">🔍 확대보기</span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ) : (
                                                                                                            <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center">
                                                                                                                <span className="text-gray-300 text-xs italic">사진을 등록해주세요</span>
                                                                                                            </div>
                                                                                                        )}

                                                                                                        <div className="p-4 w-full text-center space-y-2">
                                                                                                            <AdminTextManager
                                                                                                                isAdmin={isAdmin}
                                                                                                                contentKey={nameKey}
                                                                                                                text={t(item.name, nameKey)}
                                                                                                                className="text-xs md:text-sm font-black text-gray-800 tracking-tight leading-tight block"
                                                                                                            />
                                                                                                            <AdminTextManager
                                                                                                                isAdmin={isAdmin}
                                                                                                                contentKey={descKey}
                                                                                                                text={t(item.desc || "", descKey)}
                                                                                                                multiline={true}
                                                                                                                className="text-[10px] md:text-xs text-gray-500 leading-tight block"
                                                                                                                placeholder="설명을 입력하세요..."
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </AdminImageManager>
                                                                                            </div>
                                                                                        );
                                                                                    })}
                                                                                    {isAdmin && (
                                                                                        <div className="flex-shrink-0 w-[240px] md:w-[280px] snap-start mb-8">
                                                                                            <button
                                                                                                onClick={async () => {
                                                                                                    const nextCount = count + 1;
                                                                                                    await setOverrideValue(countKey, nextCount.toString());
                                                                                                }}
                                                                                                className="w-full aspect-[4/3] bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-300 hover:text-emerald-500 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group/add shadow-sm hover:shadow-md"
                                                                                            >
                                                                                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover/add:bg-emerald-50 transition-colors border border-gray-100 group-hover/add:border-emerald-100 shadow-sm">
                                                                                                    <Plus size={32} strokeWidth={1.5} />
                                                                                                </div>
                                                                                                <div className="text-center">
                                                                                                    <span className="text-sm font-black tracking-tight block">새 항목 추가</span>
                                                                                                    <span className="text-[10px] font-medium opacity-60">클릭하여 추가</span>
                                                                                                </div>
                                                                                            </button>
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        })()}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 우측 사이드바 */}
                            <div className="space-y-6">
                                {/* 보유 시설 카드 */}
                                {(!isFacHidden || isAdmin) && (
                                    <div className={`bg-white border border-gray-200 p-8 rounded-[2.5rem] shadow-sm relative group/card transition-all ${isFacHidden ? 'opacity-40 grayscale' : ''}`}>
                                        {isAdmin && (
                                            <div className="absolute top-6 right-6 flex gap-2 z-10">
                                                <button
                                                    onClick={() => setOverrideValue(`hide_fac_${activeResort.id}`, isFacHidden ? '' : 'true')}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFacHidden ? 'bg-gray-400 text-white' : 'bg-emerald-50 text-emerald-400 hover:bg-emerald-500 hover:text-white opacity-0 group-hover/card:opacity-100'}`}
                                                    title={isFacHidden ? "보이기" : "숨기기"}
                                                >
                                                    {isFacHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        )}
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`fac_title_${activeResort.id}`}
                                            text={t("보유 시설", `fac_title_${activeResort.id}`)}
                                            as="h4"
                                            className="text-lg font-black text-gray-900 mb-6 block"
                                        />
                                        <div className="space-y-3">
                                            {(() => {
                                                const countKey = `fac_count_${activeResort.id}`;
                                                const count = parseInt(overrides[countKey] || (activeResort.facilities?.length || 0).toString());
                                                return (
                                                    <>
                                                        {Array.from({ length: count }).map((_, idx) => {
                                                            const itemKey = `fac_item_${activeResort.id}_${idx}`;
                                                            const itemText = t(activeResort.facilities?.[idx] || "새 시설", itemKey);
                                                            return (
                                                                <div key={idx} className="flex items-center gap-3 group/item">
                                                                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                                                                    <AdminTextManager
                                                                        isAdmin={isAdmin}
                                                                        contentKey={itemKey}
                                                                        text={itemText}
                                                                        className="text-gray-700 text-sm font-bold block flex-grow"
                                                                    />
                                                                    {isAdmin && (
                                                                        <button
                                                                            onClick={() => setOverrideValue(countKey, Math.max(0, count - 1).toString())}
                                                                            className="text-red-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                                        >
                                                                            <X size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                        {isAdmin && (
                                                            <button
                                                                onClick={() => setOverrideValue(countKey, (count + 1).toString())}
                                                                className="w-full py-2 border-2 border-dashed border-gray-100 rounded-xl text-gray-300 hover:text-emerald-500 hover:border-emerald-200 transition-all text-[10px] font-bold flex items-center justify-center gap-2 mt-2"
                                                            >
                                                                <Plus size={12} /> 시설 추가
                                                            </button>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}

                                {/* 진행 프로그램 카드 */}
                                {(!isProgHidden || isAdmin) && (
                                    <div className={`bg-white border border-gray-200 p-8 rounded-[2.5rem] shadow-sm relative group/card transition-all ${isProgHidden ? 'opacity-40 grayscale' : ''}`}>
                                        {isAdmin && (
                                            <div className="absolute top-6 right-6 flex gap-2 z-10">
                                                <button
                                                    onClick={() => setOverrideValue(`hide_prog_${activeResort.id}`, isProgHidden ? '' : 'true')}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isProgHidden ? 'bg-gray-400 text-white' : 'bg-blue-50 text-blue-400 hover:bg-blue-500 hover:text-white opacity-0 group-hover/card:opacity-100'}`}
                                                    title={isProgHidden ? "보이기" : "숨기기"}
                                                >
                                                    {isProgHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                                                </button>
                                            </div>
                                        )}
                                        <AdminTextManager
                                            isAdmin={isAdmin}
                                            contentKey={`prog_title_${activeResort.id}`}
                                            text={t("진행 프로그램", `prog_title_${activeResort.id}`)}
                                            as="h4"
                                            className="text-lg font-black text-gray-900 mb-6 block"
                                        />
                                        <div className="space-y-3">
                                            {(() => {
                                                const countKey = `prog_count_${activeResort.id}`;
                                                const count = parseInt(overrides[countKey] || (activeResort.programs?.length || 0).toString());
                                                return (
                                                    <>
                                                        {Array.from({ length: count }).map((_, idx) => {
                                                            const itemKey = `prog_item_${activeResort.id}_${idx}`;
                                                            const itemText = t(activeResort.programs?.[idx] || "새 프로그램", itemKey);
                                                            return (
                                                                <div key={idx} className="flex items-center gap-3 group/item">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                                    <AdminTextManager
                                                                        isAdmin={isAdmin}
                                                                        contentKey={itemKey}
                                                                        text={itemText}
                                                                        className="text-gray-700 text-sm font-bold block flex-grow"
                                                                    />
                                                                    {isAdmin && (
                                                                        <button
                                                                            onClick={() => setOverrideValue(countKey, Math.max(0, count - 1).toString())}
                                                                            className="text-red-300 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                                        >
                                                                            <X size={12} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                        {isAdmin && (
                                                            <button
                                                                onClick={() => setOverrideValue(countKey, (count + 1).toString())}
                                                                className="w-full py-2 border-2 border-dashed border-gray-100 rounded-xl text-gray-300 hover:text-blue-500 hover:border-blue-200 transition-all text-[10px] font-bold flex items-center justify-center gap-2 mt-2"
                                                            >
                                                                <Plus size={12} /> 프로그램 추가
                                                            </button>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Lightbox / 사진 확대 모달 */}
            <AnimatePresence>
                {selectedFullImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedFullImage(null)}
                        className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md"
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedFullImage}
                            alt="Full View"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Partners;
