import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    Calendar,
    X
} from 'lucide-react';
import initialNotices from '../../data/notices.json';

const AdminNoticeList = () => {
    const [notices, setNotices] = useState(initialNotices);
    const [isAdding, setIsAdding] = useState(false);
    const [editingNotice, setEditingNotice] = useState<typeof initialNotices[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [newNotice, setNewNotice] = useState({
        title: '',
        content: '',
        author: '관리자',
        date: new Date().toISOString().split('T')[0],
        views: 0
    });

    const handleAdd = () => {
        if (!newNotice.title || !newNotice.content) return;
        const noticeToAdd = {
            ...newNotice,
            id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1
        };
        setNotices([noticeToAdd, ...notices]);
        setIsAdding(false);
        setNewNotice({
            title: '',
            content: '',
            author: '관리자',
            date: new Date().toISOString().split('T')[0],
            views: 0
        });
    };

    const handleEdit = (notice: typeof initialNotices[0]) => {
        setEditingNotice({ ...notice });
    };

    const handleEditSave = () => {
        if (!editingNotice) return;
        setNotices(notices.map(n => n.id === editingNotice.id ? editingNotice : n));
        setEditingNotice(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            setNotices(notices.filter(n => n.id !== id));
        }
    };

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">공지사항 관리</h1>
                    <p className="text-white/50">홈페이지 메인 및 공지사항 게시판에 노출될 소식을 관리합니다.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                    <Plus size={20} />
                    새 공지사항 등록
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="제목 또는 내용으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/5 rounded-xl pl-14 pr-6 text-sm outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="h-14 px-6 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all">전체</button>
                    <button className="h-14 px-6 text-white/40 hover:text-white text-sm font-bold transition-all">진행중</button>
                    <button className="h-14 px-6 text-white/40 hover:text-white text-sm font-bold transition-all">종료</button>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 uppercase text-[10px] font-black tracking-widest text-white/40">
                            <th className="px-8 py-5">ID</th>
                            <th className="px-8 py-5">제목</th>
                            <th className="px-8 py-5">작성일</th>
                            <th className="px-8 py-5 text-center">조회수</th>
                            <th className="px-8 py-5 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredNotices.map((notice) => (
                            <tr key={notice.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-6 text-white/40 font-mono text-sm">{notice.id}</td>
                                <td className="px-8 py-6">
                                    <div className="space-y-1">
                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{notice.title}</p>
                                        <p className="text-white/20 text-xs truncate max-w-md">{notice.content}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
                                        <Calendar size={14} />
                                        {notice.date}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-white/40 text-xs font-bold">
                                        <Eye size={12} />
                                        {notice.views}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleEdit(notice)}
                                            className="p-3 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(notice.id)}
                                            className="p-3 hover:bg-red-500/10 rounded-xl transition-colors text-white/40 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredNotices.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                            <Search size={32} />
                        </div>
                        <p className="text-white/40 font-bold">검색 결과가 없습니다.</p>
                    </div>
                )}
            </div>

            {/* Add Modal Overlay */}
            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Plus className="text-blue-500" size={24} />
                                    새 공지사항 등록
                                </h2>
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">공지사항 제목</label>
                                    <input
                                        type="text"
                                        placeholder="공지사항 제목을 입력하세요"
                                        value={newNotice.title}
                                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">공지사항 내용</label>
                                    <textarea
                                        placeholder="내용을 상세히 입력해 주세요"
                                        value={newNotice.content}
                                        onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                                        className="w-full h-64 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="flex-1 h-16 bg-white/5 text-white/40 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="flex-[2] h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                                >
                                    등록 완료
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {editingNotice && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Edit2 className="text-orange-500" size={24} />
                                    공지사항 수정
                                </h2>
                                <button
                                    onClick={() => setEditingNotice(null)}
                                    className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">공지사항 제목</label>
                                    <input
                                        type="text"
                                        value={editingNotice.title}
                                        onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">공지사항 내용</label>
                                    <textarea
                                        value={editingNotice.content}
                                        onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                                        className="w-full h-64 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-12">
                                <button
                                    onClick={() => setEditingNotice(null)}
                                    className="flex-1 h-16 bg-white/5 text-white/40 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleEditSave}
                                    className="flex-[2] h-16 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                                >
                                    수정 완료
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminNoticeList;
