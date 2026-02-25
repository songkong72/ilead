import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Eye, ArrowLeft, Search, Bell, Loader2 } from 'lucide-react';
import { getNotices, Notice as NoticeType } from '../services/noticeService';

const Notice = () => {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState<NoticeType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

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
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">공지사항</h2>
                <p className="text-gray-600">
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
    );
};

export default Notice;
