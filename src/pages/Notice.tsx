import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Eye, ArrowLeft, Search, Bell, Loader2 } from 'lucide-react';
import { getNotices, Notice as NoticeType } from '../services/noticeService';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';

const Notice = () => {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { isAdmin, getImageUrl } = useImageOverrides();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getNotices();
                setNotices(data);
            } catch (error) {
                console.error('공지사항 로드 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-[100dvh] bg-gray-50 pb-20">
            {/* 상단 컬러드 배경 */}
            <div className="absolute top-0 left-0 right-0 h-[300px] md:h-[450px] z-0 bg-[#134e4a] overflow-hidden">
                <AdminImageManager isAdmin={isAdmin} uploadKey="notice_header_bg">
                    <img
                        src={getImageUrl('/assets/images/headers/notice-bg.jpg', 'notice_header_bg')}
                        alt="Notice header background"
                        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay fixed"
                    />
                </AdminImageManager>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 pt-28 pb-20 md:py-32 min-h-screen">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-black mb-4 text-white italic tracking-tighter">공지사항</h2>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mb-6" />
                    <p className="text-white/90 text-lg md:text-xl font-medium">
                        L.E.A.D의 최신 소식과 중요 안내 사항입니다.
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {selectedNotice ? (
                        /* Detail View */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-4xl mx-auto"
                        >
                            <button
                                onClick={() => setSelectedNotice(null)}
                                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-bold text-sm transition-colors"
                            >
                                <ArrowLeft size={16} />
                                목록으로 돌아가기
                            </button>

                            <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                                {/* Header */}
                                <div className="p-10 border-b border-gray-100">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{selectedNotice.title}</h1>
                                    <div className="flex items-center gap-6 text-gray-500 text-sm font-bold">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {selectedNotice.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Eye size={14} />
                                            조회 {selectedNotice.views}
                                        </span>
                                        <span>{selectedNotice.author}</span>
                                    </div>
                                </div>
                                {/* Body */}
                                <div className="p-10">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                        {selectedNotice.content}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ) : loading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                            <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={32} />
                            <p className="text-gray-500 font-bold">공지사항을 불러오는 중...</p>
                        </motion.div>
                    ) : (
                        /* List View */
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="max-w-5xl mx-auto space-y-8"
                        >
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="공지사항 검색..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-16 bg-white border border-gray-200 rounded-2xl pl-16 pr-6 text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500/50 transition-all font-medium shadow-sm"
                                />
                            </div>

                            {/* Notice List */}
                            <div className="bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden divide-y divide-gray-100 shadow-sm">
                                {filteredNotices.map((notice, idx) => (
                                    <motion.div
                                        key={notice.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setSelectedNotice(notice)}
                                        className="px-10 py-8 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                            <Bell size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">{notice.title}</h3>
                                            <p className="text-gray-500 text-sm truncate">{notice.content}</p>
                                        </div>
                                        <div className="hidden md:flex items-center gap-6 text-gray-400 text-xs font-bold shrink-0">
                                            <span className="flex items-center gap-1.5"><Calendar size={12} />{notice.date}</span>
                                            <span className="flex items-center gap-1.5"><Eye size={12} />{notice.views}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {filteredNotices.length === 0 && (
                                <div className="py-20 text-center text-gray-500">
                                    검색 결과가 없습니다.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Notice;
