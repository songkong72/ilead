import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthContextType {
    user: User | null;
    isLoginModalOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const openLogin = () => setIsLoginModalOpen(true);
    const closeLogin = () => setIsLoginModalOpen(false);

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('is_lead_admin');
            window.location.href = '/'; // 로그아웃 시 홈으로 이동하며 상태 초기화
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoginModalOpen, openLogin, closeLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
