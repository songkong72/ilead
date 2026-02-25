
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import SignUp from './pages/SignUp';
import FindAccount from './pages/FindAccount';
import Notice from './pages/Notice';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNoticeList from './pages/admin/AdminNoticeList';
import AdminGalleryList from './pages/admin/AdminGalleryList';

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="notice" element={<Notice />} />
                    <Route path="partners" element={<Partners />} />
                    <Route path="programs" element={<Programs />} />
                    <Route path="programs/:id" element={<ProgramDetail />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="find-account" element={<FindAccount />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="notices" element={<AdminNoticeList />} />
                    <Route path="gallery" element={<AdminGalleryList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
