import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const InquiryButton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed bottom-8 right-8 z-[150]"
        >
            <a
                href="https://pf.kakao.com/_xxxxxx" // 카카오톡 채널 링크 (실제 링크로 교체 필요)
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-16 h-16 bg-[#FEE500] text-[#3c1e1e] rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-[#FEE500] blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />

                {/* Icon */}
                <MessageCircle size={32} fill="currentColor" strokeWidth={1} className="relative z-10" />

                {/* Tooltip */}
                <div className="absolute right-full mr-4 px-4 py-2 bg-white text-[#3c1e1e] text-sm font-bold rounded-xl shadow-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
                    심층 상담 및 문의하기
                </div>
            </a>
        </motion.div>
    );
};

export default InquiryButton;
