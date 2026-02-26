import React from 'react';
import { LogOut, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminToolbarProps {
    onLogout: () => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onLogout }) => {
    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-fit">
            <div className="bg-emerald-600/90 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <ShieldCheck size={18} className="text-white" />
                    </div>
                    <span className="text-white font-black text-sm tracking-tight">관리자 편집 모드</span>
                </div>

                <div className="h-4 w-px bg-white/20" />

                <div className="flex items-center gap-3">
                    <Link
                        to="/admin"
                        className="flex items-center gap-1.5 text-white/90 hover:text-white font-bold text-xs transition-colors"
                    >
                        대시보드
                        <ExternalLink size={12} />
                    </Link>

                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1.5 bg-white text-emerald-700 px-4 py-1.5 rounded-full font-black text-xs hover:bg-emerald-50 active:scale-95 transition-all shadow-lg"
                    >
                        <LogOut size={14} />
                        로그아웃
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminToolbar;
