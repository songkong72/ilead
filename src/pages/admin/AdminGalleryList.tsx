import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Trash2,
    Eye,
    Calendar,
    X,
    Image as ImageIcon,
    Upload,
    Loader2
} from 'lucide-react';
import {
    getGalleryPosts,
    addGalleryPost,
    deleteGalleryPost,
    GalleryPost
} from '../../services/galleryService';

const AdminGalleryList = () => {
    const [posts, setPosts] = useState<GalleryPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        thumbnailUrl: '',
        imageUrls: ''
    });

    const loadPosts = async () => {
        try {
            setLoading(true);
            const data = await getGalleryPosts();
            setPosts(data);
        } catch (error) {
            console.error('갤러리 로드 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleAdd = async () => {
        if (!newPost.title) return;
        const urls = newPost.imageUrls.split(',').map(u => u.trim()).filter(u => u.length > 0);
        try {
            setSaving(true);
            await addGalleryPost({
                title: newPost.title,
                content: newPost.content,
                thumbnail: newPost.thumbnailUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
                images: urls.length > 0 ? urls : [`https://picsum.photos/seed/${Date.now()}/600/400`],
                author: '관리자',
                date: new Date().toISOString().split('T')[0],
                views: 0
            });
            await loadPosts();
            setIsAdding(false);
            setNewPost({ title: '', content: '', thumbnailUrl: '', imageUrls: '' });
        } catch (error) {
            console.error('갤러리 등록 실패:', error);
            alert('등록에 실패했습니다.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteGalleryPost(id);
            await loadPosts();
        } catch (error) {
            console.error('갤러리 삭제 실패:', error);
            alert('삭제에 실패했습니다.');
        }
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">갤러리 관리</h1>
                    <p className="text-white/50">활동 사진 및 행사 이미지를 관리합니다.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="h-14 px-8 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98]"
                >
                    <Upload size={20} />
                    새 포스트 등록
                </button>
            </div>

            {/* Search */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem]">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="갤러리 제목으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/5 rounded-xl pl-14 pr-6 text-sm outline-none focus:border-purple-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Loading */}
            {loading ? (
                <div className="py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-purple-500 mb-4" size={32} />
                    <p className="text-white/40 font-bold">갤러리를 불러오는 중...</p>
                </div>
            ) : (
                /* Gallery Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all"
                        >
                            <div
                                className="relative h-48 cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                                    <span className="flex items-center gap-1 text-white/60 text-xs font-bold bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <ImageIcon size={12} />
                                        {post.images.length}장
                                    </span>
                                    <span className="flex items-center gap-1 text-white/60 text-xs font-bold bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                                        <Eye size={12} />
                                        {post.views}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-white mb-2 truncate">{post.title}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-white/30 text-xs font-bold">
                                        <Calendar size={12} />
                                        {post.date}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(post.id!)}
                                        className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-white/30 hover:text-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && filteredPosts.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                        <ImageIcon size={32} />
                    </div>
                    <p className="text-white/40 font-bold">
                        {searchTerm ? '검색 결과가 없습니다.' : '등록된 갤러리가 없습니다. 새 포스트를 등록해보세요!'}
                    </p>
                </div>
            )}

            {/* Add Modal */}
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
                            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Plus className="text-purple-500" size={24} />
                                    새 갤러리 포스트
                                </h2>
                                <button onClick={() => setIsAdding(false)} className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">포스트 제목</label>
                                    <input
                                        type="text"
                                        placeholder="갤러리 제목을 입력하세요"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">내용</label>
                                    <textarea
                                        placeholder="행사 내용을 설명해 주세요"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        className="w-full h-40 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all font-medium resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">대표 이미지 URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/thumbnail.jpg"
                                        value={newPost.thumbnailUrl}
                                        onChange={(e) => setNewPost({ ...newPost, thumbnailUrl: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 uppercase tracking-widest px-1">추가 이미지 URL (쉼표로 구분)</label>
                                    <textarea
                                        placeholder="https://img1.jpg, https://img2.jpg, ..."
                                        value={newPost.imageUrls}
                                        onChange={(e) => setNewPost({ ...newPost, imageUrls: e.target.value })}
                                        className="w-full h-24 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-12">
                                <button onClick={() => setIsAdding(false)} className="flex-1 h-16 bg-white/5 text-white/40 rounded-2xl font-bold hover:bg-white/10 hover:text-white transition-all">
                                    취소
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={saving}
                                    className="flex-[2] h-16 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving ? <><Loader2 className="animate-spin" size={20} />저장 중...</> : '등록 완료'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* View Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-white/10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedPost.title}</h2>
                                    <p className="text-white/40 text-sm mt-1">{selectedPost.date} · {selectedPost.images.length}장</p>
                                </div>
                                <button onClick={() => setSelectedPost(null)} className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
                                <p className="text-white/60 mb-8 leading-relaxed">{selectedPost.content}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedPost.images.map((img, i) => (
                                        <img key={i} src={img} alt={`${selectedPost.title} - ${i + 1}`} className="w-full rounded-2xl object-cover" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminGalleryList;
