import { motion } from 'framer-motion';
import {
    Bell,
    Image,
    Eye,
    TrendingUp,
    Plus,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import noticesData from '../../data/notices.json';
import galleryData from '../../data/gallery.json';

const AdminDashboard = () => {
    const totalNotices = noticesData.length;
    const totalGalleryImages = galleryData.reduce((sum, post) => sum + post.images.length, 0);
    const totalViews = [...noticesData, ...galleryData].reduce((sum, item) => sum + item.views, 0);

    const stats = [
        { name: '공지사항', value: `${totalNotices}건`, icon: <Bell className="text-blue-500" size={24} />, desc: '등록된 공지', color: 'blue' },
        { name: '갤러리 이미지', value: `${totalGalleryImages}장`, icon: <Image className="text-purple-500" size={24} />, desc: `${galleryData.length}개 포스트`, color: 'purple' },
        { name: '총 조회수', value: totalViews.toLocaleString(), icon: <Eye className="text-green-500" size={24} />, desc: '전체 콘텐츠', color: 'green' },
    ];

    // 최근 활동: 공지사항과 갤러리를 합쳐서 날짜순으로 정렬
    const recentActivities = [
        ...noticesData.map(n => ({
            type: '공지사항' as const,
            title: n.title,
            date: n.date,
            icon: <Bell size={20} />,
            iconBg: 'bg-blue-500/10 text-blue-500'
        })),
        ...galleryData.map(g => ({
            type: '갤러리' as const,
            title: g.title,
            date: g.date,
            icon: <Image size={20} />,
            iconBg: 'bg-purple-500/10 text-purple-500'
        }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    const now = new Date();
    const formattedDate = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">안녕하세요, 관리자님</h1>
                <p className="text-white/50 flex items-center gap-2">
                    <Clock size={14} />
                    {formattedDate} · 오늘의 사이트 현황을 확인하고 새로운 소식을 업로드하세요.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/admin/notices" className="group">
                    <div className="bg-blue-600 p-8 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-transform shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                        <div>
                            <h3 className="text-xl font-bold mb-1">공지사항 등록</h3>
                            <p className="text-white/70 text-sm">중요한 소식을 알리세요</p>
                        </div>
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Plus size={24} />
                        </div>
                    </div>
                </Link>
                <Link to="/admin/gallery" className="group">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex items-center justify-between hover:bg-white/10 transition-colors active:scale-[0.98]">
                        <div>
                            <h3 className="text-xl font-bold mb-1">갤러리 업데이트</h3>
                            <p className="text-white/40 text-sm">새로운 행사 사진 업로드</p>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                            <Image size={24} />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-6"
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full">
                                전체
                            </span>
                        </div>
                        <div>
                            <p className="text-white/40 text-sm font-bold mb-1 uppercase tracking-wider">{stat.name}</p>
                            <h4 className="text-4xl font-black">{stat.value}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                            <TrendingUp size={14} />
                            {stat.desc}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold">최근 등록된 콘텐츠</h3>
                    <Link to="/admin/notices" className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:underline">
                        전체 보기 <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="space-y-4">
                    {recentActivities.map((activity, i) => (
                        <div key={i} className="flex items-center gap-5 p-5 bg-white/5 rounded-2xl border border-transparent hover:border-white/10 transition-colors">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.iconBg}`}>
                                {activity.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm">{activity.title}</h4>
                                <p className="text-white/40 text-xs">{activity.type}</p>
                            </div>
                            <span className="text-[10px] text-white/20 font-bold tracking-widest">{activity.date}</span>
                        </div>
                    ))}
                </div>

                {recentActivities.length === 0 && (
                    <div className="py-12 text-center text-white/30 text-sm font-medium">
                        등록된 콘텐츠가 아직 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
