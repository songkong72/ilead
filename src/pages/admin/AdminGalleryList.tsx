import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Trash2,
    Eye,
    Calendar,
    X,
    Image as ImageIcon,
    Upload
} from 'lucide-react';
import initialData from '../../data/gallery.json';

interface GalleryPost {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    images: string[];
    author: string;
    date: string;
    views: number;
}

const AdminGalleryList = () => {
    const [posts, setPosts] = useState<GalleryPost[]>(initialData);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);

    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        thumbnailUrl: '',
        imageUrls: ''
    });

    const handleAdd = () => {
        if (!newPost.title) return;
        const urls = newPost.imageUrls.split(',').map(u => u.trim()).filter(u => u.length > 0);
        const postToAdd: GalleryPost = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title: newPost.title,
            content: newPost.content,
            thumbnail: newPost.thumbnailUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
            images: urls.length > 0 ? urls : [`https://picsum.photos/seed/${Date.now()}/600/400`],
            author: '관리자',
            date: new Date().toISOString().split('T')[0],
            views: 0
        };
        setPosts([postToAdd, ...posts]);
        setIsAdding(false);
        setNewPost({ title: '', content: '', thumbnailUrl: '', imageUrls: '' });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('이 갤러리 포스트를 삭제하시겠습니까?')) {
            setPosts(posts.filter(p => p.id !== id));
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
                    <p className="text-white/50">행사 사진 및 활동 기록을 관리합니다. 포스트별로 썸네일과 상세 이미지를 등록할 수 있습니다.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                >
                    <Plus size={20} />
                    새 갤러리 등록
                </button>
            </div>

            {/* 검색 */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem]">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                        type="text"
                        placeholder="갤러리 제목으로 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 bg-white/5 border border-white/5 rounded-xl pl-14 pr-6 text-sm outline-none focus:border-blue-500/50 transition-all"
                    />
                </div>
            </div>

            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all"
                    >
                        {/* 썸네일 */}
                        <div
                            className="relative cursor-pointer aspect-[4/3] overflow-hidden"
                            onClick={() => setSelectedPost(post)}
                        >
                            <img
                                src={post.thumbnail}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                {post.images.length}장
                            </div>
                        </div>

                        {/* 정보 */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                                <p className="text-white/30 text-xs line-clamp-2">{post.content}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-white/30 text-xs font-bold">
                                    <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                                    <span className="flex items-center gap-1"><Eye size={12} />{post.views}</span>
                                    <span className="flex items-center gap-1"><ImageIcon size={12} />{post.images.length}장</span>
                                </div>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-white/20 hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="py-20 text-center space-y-4 bg-white/5 border border-white/10 rounded-[2.5rem]">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
                        <ImageIcon size={32} />
                    </div>
                    <p className="text-white/40 font-bold">등록된 갤러리가 없습니다.</p>
                </div>
            )}

            {/* 상세 모달 */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPost(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-4xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-8 pb-0">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{selectedPost.title}</h2>
                                    <p className="text-white/40 text-sm mt-1">
                                        {selectedPost.author} · {selectedPost.date} · 조회 {selectedPost.views}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="p-3 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedPost.images.map((img, idx) => (
                                        <div key={idx} className="aspect-[3/2] rounded-xl overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`${selectedPost.title} ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-white/5 rounded-2xl p-6">
                                    <p className="text-white/70 whitespace-pre-line leading-relaxed">{selectedPost.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 등록 모달 */}
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
                                    <Upload className="text-blue-500" size={24} />
                                    새 갤러리 등록
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
                                    <label className="text-xs font-black text-white/20 tracking-widest px-1">갤러리 제목</label>
                                    <input
                                        type="text"
                                        placeholder="예: 13 세종초교 수상캠프"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 tracking-widest px-1">대표 썸네일 이미지 URL</label>
                                    <input
                                        type="text"
                                        placeholder="https://example.com/thumbnail.jpg"
                                        value={newPost.thumbnailUrl}
                                        onChange={(e) => setNewPost({ ...newPost, thumbnailUrl: e.target.value })}
                                        className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-medium text-sm"
                                    />
                                    <p className="text-white/20 text-xs px-1">💡 목록에서 보이는 대표 이미지입니다. 비우면 기본 이미지가 적용됩니다.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 tracking-widest px-1">상세 이미지 URL 목록 (쉼표로 구분)</label>
                                    <textarea
                                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                        value={newPost.imageUrls}
                                        onChange={(e) => setNewPost({ ...newPost, imageUrls: e.target.value })}
                                        className="w-full h-32 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-medium resize-none text-sm"
                                    />
                                    <p className="text-white/20 text-xs px-1">💡 상세 페이지에서 보이는 사진들입니다. 쉼표(,)로 구분해 여러 장 입력.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-white/20 tracking-widest px-1">내용</label>
                                    <textarea
                                        placeholder="갤러리 포스트 내용을 입력하세요"
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        className="w-full h-40 p-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-blue-500 outline-none transition-all font-medium resize-none"
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
        </div>
    );
};

export default AdminGalleryList;
