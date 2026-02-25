import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import galleryData from '../data/gallery.json';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ITEMS_PER_PAGE = 20;

const Gallery = () => {
    const [displayedItems, setDisplayedItems] = useState<typeof galleryData>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);
    const [loaderRef, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    // 초기 렌더링
    useEffect(() => {
        setDisplayedItems(galleryData.slice(0, ITEMS_PER_PAGE));
    }, []);

    // 이펙터 : 화면 끝 도달 판단시 추가 로드
    useEffect(() => {
        if (isIntersecting && hasMore) {
            const nextItems = galleryData.slice(
                page * ITEMS_PER_PAGE,
                (page + 1) * ITEMS_PER_PAGE
            );

            if (nextItems.length > 0) {
                setTimeout(() => { // 의도적인 지연 로딩 시뮬레이션
                    setDisplayedItems(prev => [...prev, ...nextItems]);
                    setPage(prev => prev + 1);
                }, 500);
            } else {
                setHasMore(false);
            }
        }
    }, [isIntersecting, page, hasMore]);

    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">Gallery</h2>
                <p className="text-white/60">
                    L.E.A.D와 함께했던 수많은 순간들입니다. ({galleryData.length}개의 기록)
                </p>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                <AnimatePresence>
                    {displayedItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: (index % ITEMS_PER_PAGE) * 0.05 }}
                            onClick={() => setSelectedImage(item)}
                            className="relative overflow-hidden rounded-xl bg-white/5 cursor-pointer group break-inside-avoid shadow-lg"
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                                <span className="text-brand-red font-bold text-xs mb-1">행사 갤러리</span>
                                <span className="font-bold text-sm md:text-base text-white">{item.title}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 무한 스크롤 로딩 인디케이터 */}
            {hasMore && (
                <div ref={loaderRef} className="py-20 flex justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-white/20 border-t-white animate-spin"></div>
                </div>
            )}

            {!hasMore && (
                <div className="py-20 text-center text-white/40">
                    모든 갤러리 이미지를 불러왔습니다.
                </div>
            )}
            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex py-10 px-4 items-center justify-center cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col cursor-default"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white pb-2 transition-colors text-lg"
                            >
                                ✕ 닫기
                            </button>
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain rounded-xl"
                            />
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                                <p className="text-white/60">리조트 프로그램 및 레저 활동 사진</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
