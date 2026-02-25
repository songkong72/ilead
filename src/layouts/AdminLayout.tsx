import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Bell,
    Image,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Search
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/admin/login');
            } else {
                setIsCheckingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    // 페이지 이동 시 모바일 사이드바 닫기
    useEffect(() => {
        setIsMobileSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
        { name: '대시보드', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: '공지사항 관리', path: '/admin/notices', icon: <Bell size={20} /> },
        { name: '갤러리 관리', path: '/admin/gallery', icon: <Image size={20} /> },
    ];

    const currentPath = location.pathname;

    const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
        <>
            <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'} space-y-2 mt-4`}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-4 rounded-2xl transition-all group ${currentPath === item.path
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <span className={`${currentPath === item.path ? 'text-white' : 'text-white/40 group-hover:text-blue-400'}`}>
                            {item.icon}
                        </span>
                        {!isCollapsed && (
                            <span className="font-bold text-sm tracking-wide">{item.name}</span>
                        )}
                        {!isCollapsed && currentPath === item.path && (
                            <ChevronRight className="ml-auto" size={16} />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-4 ${isCollapsed ? 'justify-center' : ''} px-4 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-colors group`}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="font-bold text-sm">로그아웃</span>}
                </button>
            </div>
        </>
    );

    if (isCheckingAuth) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50 text-sm font-bold">인증 정보 확인 중...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="hidden lg:flex flex-col bg-white/5 border-r border-white/10 backdrop-blur-xl z-50 sticky top-0 h-screen"
            >
                <div className="p-8 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                                    <div className="bg-[#E74C3C]" />
                                    <div className="bg-[#2ECC71]" />
                                    <div className="bg-[#3498DB]" />
                                    <div className="bg-[#F1C40F]" />
                                </div>
                                <span className="text-xl font-black tracking-tighter">LEAD 관리자</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <SidebarContent isCollapsed={!isSidebarOpen} />
            </motion.aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 w-[280px] h-screen bg-[#0a0a0a] border-r border-white/10 z-[70] flex flex-col lg:hidden"
                        >
                            <div className="p-8 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                                        <div className="bg-[#E74C3C]" />
                                        <div className="bg-[#2ECC71]" />
                                        <div className="bg-[#3498DB]" />
                                        <div className="bg-[#F1C40F]" />
                                    </div>
                                    <span className="text-xl font-black tracking-tighter">LEAD 관리자</span>
                                </div>
                                <button
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-6 md:px-8 bg-white/5 border-b border-white/10 backdrop-blur-md sticky top-0 z-40">
                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors mr-4"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="relative w-96 hidden md:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input
                            type="text"
                            placeholder="관리 메뉴 검색..."
                            className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm outline-none focus:border-blue-500/50 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-bold">관리자</span>
                            <span className="text-[10px] text-white/40 font-black tracking-widest">시스템 매니저</span>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-xs border border-white/20">
                            관리
                        </div>
                    </div>
                </header>

                {/* Sub-page Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
