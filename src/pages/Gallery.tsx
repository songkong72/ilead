import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Eye, User, ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getGalleryPosts, GalleryPost } from '../services/galleryService';

const ITEMS_PER_PAGE = 8;

const Gallery = () => {
    const [posts, setPosts] = useState<GalleryPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getGalleryPosts();
                setPosts(data);
            } catch (error) {
                console.error('갤러리 로드 실패:', error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // 상세 페이지에서 이전/다음 글
    const currentIndex = selectedPost ? posts.findIndex(p => p.id === selectedPost.id) : -1;
    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <AnimatePresence mode="wait">
                {selectedPost ? (
                    /* ========== 상세 페이지 ========== */
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* 뒤로가기 */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="flex items-center gap-2 text-white/40 hover:text-white mb-8 font-bold text-sm transition-colors"
                        >
                            <ArrowLeft size={16} />
                            목록으로 돌아가기
                        </button>

                        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
                            {/* 헤더 바 */}
                            <div className="bg-white/5 px-8 py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h1 className="text-xl md:text-2xl font-bold text-white">{selectedPost.title}</h1>
                                <div className="flex items-center gap-6 text-white/40 text-xs font-bold shrink-0">
                                    <span className="flex items-center gap-1.5"><User size={12} />{selectedPost.author}</span>
                                    <span className="flex items-center gap-1.5"><Eye size={12} />조회: {selectedPost.views.toLocaleString()}</span>
                                    <span className="flex items-center gap-1.5"><Calendar size={12} />{selectedPost.date}</span>
                                </div>
                            </div>

                            {/* 이미지 그리드 */}
                            <div className="p-6 md:p-10">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-10">
                                    {selectedPost.images.map((img, idx) => (
                                        <div key={idx} className="aspect-[3/2] rounded-xl overflow-hidden bg-white/5">
                                            <img
                                                src={img}
                                                alt={`${selectedPost.title} ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* 내용 */}
                                <div className="bg-white/5 rounded-2xl p-8 mb-10">
                                    <p className="text-white/70 whitespace-pre-line leading-relaxed">{selectedPost.content}</p>
                                </div>
                            </div>

                            {/* 이전글 / 다음글 / 목록 네비게이션 */}
                            <div className="border-t border-white/5 px-8 py-6 flex items-center justify-between">
                                <div className="flex gap-3">
                                    {prevPost && (
                                        <button
                                            onClick={() => setSelectedPost(prevPost)}
                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all"
                                        >
                                            이전글
                                        </button>
                                    )}
                                    {nextPost && (
                                        <button
                                            onClick={() => setSelectedPost(nextPost)}
                                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all"
                                        >
                                            다음글
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setSelectedPost(null)}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all"
                                >
                                    목록
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : loading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                        <Loader2 className="animate-spin mx-auto text-blue-500 mb-4" size={32} />
                        <p className="text-white/40 font-bold">갤러리를 불러오는 중...</p>
                    </motion.div>
                ) : (
                    /* ========== 목록 페이지 ========== */
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* 타이틀 */}
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-4">갤러리</h2>
                            <p className="text-white/60">
                                L.E.A.D와 함께했던 수많은 순간들입니다. 총 <span className="text-white font-bold">{posts.length}개</span>의 게시물이 있습니다.
                            </p>
                        </div>

                        {/* 검색 바 */}
                        <div className="flex flex-col md:flex-row gap-4 mb-10">
                            <div className="relative flex-1">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                                <input
                                    type="text"
                                    placeholder="제목으로 검색..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 text-white placeholder:text-white/20 outline-none focus:border-blue-500/50 transition-all font-medium"
                                />
                            </div>
                            <button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all">
                                검색
                            </button>
                        </div>

                        {/* 카드 그리드 (4열) */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {paginatedPosts.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setSelectedPost(post)}
                                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-white/20 hover:bg-white/10 transition-all"
                                >
                                    {/* 썸네일 */}
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* 정보 */}
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-sm text-white truncate group-hover:text-blue-400 transition-colors mb-1">{post.title}</h3>
                                        <p className="text-white/30 text-xs">{post.author}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${page === currentPage
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}

                        {filteredPosts.length === 0 && (
                            <div className="py-20 text-center text-white/40">
                                검색 결과가 없습니다.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
