import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        { name: '회사소개', path: '/about' },
        { name: '사업영역', path: '/programs' },
        { name: '커뮤니티', path: '/gallery' },
        { name: '고객센터', path: '/contact' },
    ];

    const headerBgClass = isScrolled || location.pathname !== '/'
        ? 'bg-white shadow-md text-gray-900 border-b border-gray-200'
        : 'bg-transparent text-white';

    const linkHoverClass = isScrolled || location.pathname !== '/' ? 'hover:text-blue-600' : 'hover:text-blue-300';

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
            <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-7xl">
                {/* Logo Section */}
                <Link to="/" className="z-50 flex items-center gap-4 group">
                    {/* OSK-style Circle Logo Mark */}
                    <div className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center p-1 shadow-2xl border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                            <div className="bg-[#FF3B30] rounded-sm" />
                            <div className="bg-[#4CD964] rounded-sm" />
                            <div className="bg-[#007AFF] rounded-sm" />
                            <div className="bg-[#FF9500] rounded-sm" />
                        </div>
                        <span className="text-[6px] font-black text-gray-400 mt-1 tracking-tighter uppercase whitespace-nowrap">LEAD Consulting</span>
                    </div>
                    {/* Text Logo with Premium Typography */}
                    <div className="flex flex-col">
                        <span className={`text-2xl font-black tracking-tighter transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'text-gray-900' : 'text-white'}`}>
                            엘이에이디컨설팅
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'text-gray-400' : 'text-white/60'}`}>
                            Growth & Solution
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-10 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold tracking-widest uppercase transition-colors ${linkHoverClass} ${location.pathname === link.path
                                ? (isScrolled || location.pathname !== '/' ? 'text-blue-600' : 'text-blue-300')
                                : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 w-64 h-screen bg-white shadow-2xl flex flex-col pt-24 px-8 gap-6 z-40"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-lg font-bold tracking-widest uppercase text-gray-800 hover:text-blue-600 transition-colors ${location.pathname === link.path ? 'text-blue-600' : ''
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
