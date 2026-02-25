
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white/20">
            <Navbar />
            <main className="flex-1 overflow-hidden relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
