import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 실제 사용될 고화질 이미지 URL 리스트
const heroImages = [
    "/images/original/banner01.jpg",
    "/images/original/banner02.jpg",
];

const HeroGallerySlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // 5초마다 슬라이드 전환
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* 어두운 오버레이 레이어 추가 */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <AnimatePresence initial={false}>
                <motion.img
                    key={currentIndex}
                    src={heroImages[currentIndex]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute w-full h-full object-cover z-0"
                    alt="L.E.A.D Hero Background"
                />
            </AnimatePresence>
        </div>
    );
};

export default HeroGallerySlider;
