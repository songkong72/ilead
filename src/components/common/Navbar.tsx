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
        { name: '회사소개', path: '/about', color: 'bg-sky-600/95' },
        { name: '사업영역', path: '/programs', color: 'bg-cyan-600/95' },
        { name: '제휴 리조트', path: '/partners', color: 'bg-teal-600/95' },
        { name: '공지사항', path: '/notice', color: 'bg-emerald-600/95' },
        { name: '갤러리', path: '/gallery', color: 'bg-indigo-600/95' },
    ];

    const activeLink = navLinks.find(link => link.path === location.pathname);
    const hoveredLink = navLinks.find(link => link.path === hoveredMenu);

    const currentBgColor = hoveredLink ? hoveredLink.color : (activeLink ? activeLink.color : 'bg-[#254672]/95');

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
                        <span className={`text-2xl font-black tracking-tighter transition-all duration-300 ${textColorClass}`}>
                            엘이에이디컨설팅(주)
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 text-white/80`}>
                            LEAD consulting
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onMouseEnter={() => setHoveredMenu(link.path)}
                            onMouseLeave={() => setHoveredMenu(null)}
                            className={`text-sm font-semibold tracking-widest uppercase transition-colors hover:text-white ${location.pathname === link.path || hoveredMenu === link.path
                                ? 'text-white drop-shadow-md'
                                : 'text-white/70'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* PC Login & Signup Buttons */}
                    <div className="ml-6 flex items-center gap-3">
                        <button
                            onClick={openLogin}
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${textColorClass} ${linkHoverClass}`}
                        >
                            로그인
                        </button>
                        <Link
                            to="/signup"
                            className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${isScrolledState
                                ? 'bg-white text-[#254672] hover:bg-gray-100 shadow-md'
                                : 'bg-white/20 text-white backdrop-blur-md hover:bg-white/40 border border-white/30'
                                }`}
                        >
                            회원가입
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={openLogin}
                            className={`px-3 py-1.5 font-bold text-xs transition-colors ${textColorClass} ${linkHoverClass}`}
                        >
                            로그인
                        </button>
                        <Link
                            to="/signup"
                            className={`px-4 py-1.5 rounded-full font-bold text-xs transition-all duration-300 ${isScrolledState
                                ? 'bg-white text-[#254672]'
                                : 'bg-white/20 text-white backdrop-blur-md border border-white/30'
                                }`}
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
                            className={`fixed top-0 right-0 w-64 h-screen ${currentBgColor.replace('/95', '')} shadow-2xl flex flex-col pt-24 px-8 gap-6 z-40`}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-lg font-bold tracking-widest uppercase hover:text-blue-400 transition-colors ${location.pathname === link.path ? 'text-blue-400' : 'text-white'
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
