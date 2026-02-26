import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { openLogin } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: '회사소개', path: '/about', color: 'bg-sky-600/95', mobileBg: 'bg-sky-700' },
        { name: '사업영역', path: '/programs', color: 'bg-cyan-600/95', mobileBg: 'bg-cyan-700' },
        { name: '제휴 리조트', path: '/partners', color: 'bg-teal-600/95', mobileBg: 'bg-teal-700' },
        { name: '공지사항', path: '/notice', color: 'bg-emerald-600/95', mobileBg: 'bg-emerald-700' },
        { name: '갤러리', path: '/gallery', color: 'bg-indigo-600/95', mobileBg: 'bg-indigo-700' },
    ];

    const activeLink = navLinks.find(link => link.path === location.pathname);
    const hoveredLink = navLinks.find(link => link.path === hoveredMenu);

    const currentBgColor = hoveredLink ? hoveredLink.color : (activeLink ? activeLink.color : 'bg-[#254672]/95');
    const mobileMenuBg = activeLink ? activeLink.mobileBg : 'bg-[#254672]';

    const isScrolledState = isScrolled || location.pathname !== '/' || hoveredMenu !== null;

    const headerBgClass = isScrolledState
        ? `${currentBgColor} backdrop-blur-md shadow-md text-white border-b border-white/10`
        : 'bg-transparent text-white';

    const linkHoverClass = 'hover:text-white';
    const textColorClass = 'text-white';

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
                {/* Logo Section */}
                <Link to="/" className="z-50 flex items-center gap-4 group">
                    {/* Official Square Grid Logo Mark */}
                    <div className="w-12 h-12 flex flex-col items-center justify-center p-1 group-hover:rotate-[360deg] transition-transform duration-1000">
                        <div className="grid grid-cols-2 gap-1 w-6 h-6">
                            <div className="bg-[#E74C3C] shadow-sm transform group-hover:scale-110 transition-transform" />
                            <div className="bg-[#2ECC71] shadow-sm transform group-hover:scale-110 transition-transform delay-75" />
                            <div className="bg-[#3498DB] shadow-sm transform group-hover:scale-110 transition-transform delay-150" />
                            <div className="bg-[#F1C40F] shadow-sm transform group-hover:scale-110 transition-transform delay-225" />
                        </div>
                    </div>
                    {/* Text Logo with Premium Typography */}
                    <div className="flex flex-col">
                        <span className={`text-2xl font-bold tracking-tighter transition-all duration-300 ${textColorClass}`}>
                            엘이에이디컨설팅(주)
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 text-white/80`}>
                            LEAD consulting
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onMouseEnter={() => setHoveredMenu(link.path)}
                            onMouseLeave={() => setHoveredMenu(null)}
                            className={`text-[1.05rem] font-bold tracking-widest uppercase transition-colors hover:text-white ${location.pathname === link.path || hoveredMenu === link.path
                                ? 'text-white drop-shadow-md'
                                : 'text-white/70'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* PC Login & Signup Buttons */}
                    <div className="ml-4 flex items-center gap-2">
                        {/* 관리자 상태 확인은 useAuth나 직접 firebase check 가능하지만 여기선 간단히 로그인 여부로 판단 */}
                        <button
                            onClick={openLogin}
                            className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 ${textColorClass} ${linkHoverClass}`}
                        >
                            로그인
                        </button>
                        <Link
                            to="/admin" // 보낸 스크린샷의 대시보드 주소
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-black text-xs text-white transition-all backdrop-blur-sm shadow-xl"
                        >
                            관리자 페이지
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 lg:hidden">
                    <div className="hidden sm:flex items-center gap-1">
                        <button
                            onClick={openLogin}
                            className={`px-3 py-1.5 font-bold text-xs transition-colors ${textColorClass} ${linkHoverClass}`}
                        >
                            로그인
                        </button>
                        <Link
                            to="/signup"
                            className={`px-4 py-1.5 font-bold text-xs transition-colors ${textColorClass} ${linkHoverClass}`}
                        >
                            회원가입
                        </Link>
                    </div>
                    <button
                        className={`z-50 p-2 transition-colors duration-300 text-white hover:text-blue-200`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className={`fixed top-0 right-0 w-64 h-screen ${mobileMenuBg} shadow-2xl flex flex-col pt-24 px-8 gap-6 z-40`}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-lg font-bold tracking-widest uppercase transition-colors ${location.pathname === link.path ? 'text-white border-l-4 border-white pl-4' : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
