
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import ProgramDetail from './pages/ProgramDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="partners" element={<Partners />} />
                    <Route path="programs/:id" element={<ProgramDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
