import React, { useState } from 'react';
import { LogOut, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminToolbarProps {
    onLogout: () => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onLogout }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        onLogout();
    };

    return (
        <>
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[95%] sm:w-fit">
                <div className="bg-emerald-600/90 backdrop-blur-md border border-white/20 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl flex items-center justify-between sm:justify-start gap-2 sm:gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <ShieldCheck size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <span className="text-white font-black text-[10px] sm:text-sm tracking-tight whitespace-nowrap">관리자 모드</span>
                    </div>

                    <div className="h-4 w-px bg-white/20 hidden xs:block" />

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/admin"
                            className="flex items-center gap-1.5 text-white/90 hover:text-white font-bold text-[10px] sm:text-xs transition-colors whitespace-nowrap"
                        >
                            <span className="hidden xs:inline">대시보드</span>
                            <ExternalLink size={10} className="sm:w-3 sm:h-3" />
                        </Link>

                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-1.5 bg-white text-emerald-700 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black text-[10px] sm:text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-lg whitespace-nowrap"
                        >
                            <LogOut size={12} className="sm:w-[14px] sm:h-[14px]" />
                            로그아웃
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl"
                        >
                            <h3 className="text-xl font-black text-gray-900 mb-2">로그아웃</h3>
                            <p className="text-gray-600 mb-6 font-medium">로그아웃 되었습니다.</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleConfirmLogout}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold transition-colors"
                                >
                                    확인
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AdminToolbar;
