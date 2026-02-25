import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLoginModalOpen: boolean;
    openLogin: () => void;
    closeLogin: () => void;
    // Future auth state can be added here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openLogin = () => setIsLoginModalOpen(true);
    const closeLogin = () => setIsLoginModalOpen(false);

    return (
        <AuthContext.Provider value={{ isLoginModalOpen, openLogin, closeLogin }}>
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
