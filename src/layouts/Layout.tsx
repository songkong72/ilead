
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import { AuthProvider } from '../context/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import InquiryButton from '../components/common/InquiryButton';

const Layout = () => {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white/20">
                <Navbar />
                <main className="flex-1 relative">
                    <Outlet />
                </main>
                <Footer />
                <LoginModal />
                <InquiryButton />
            </div>
        </AuthProvider>
    );
};

export default Layout;
