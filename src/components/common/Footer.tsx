

const Footer = () => {
    return (
        <footer className="border-t border-white/10 py-12 bg-black">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left text-sm text-white/40">
                    <p className="mb-2 max-md:mb-4">
                        <strong className="text-white/70">L.E.A.D Consulting 고객센터</strong><br className="md:hidden" />
                        <span className="max-md:block mt-1">
                            <a href="tel:02-875-3056" className="inline-flex items-center text-brand-blue font-bold hover:text-white transition-colors duration-200">
                                📞 02-875-3056
                            </a>
                            <span className="mx-2 hidden md:inline">|</span>
                            <span className="max-md:block mt-1">팩스: 02-875-3057</span>
                        </span>
                    </p>
                    <p>&copy; {new Date().getFullYear()} L.E.A.D Consulting. All Rights Reserved.</p>
                </div>
                <div className="flex gap-6 text-sm text-white/40">
                    <a href="#" className="hover:text-white transition-colors">이용약관</a>
                    <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
                    <a href="#" className="hover:text-white transition-colors">제휴문의</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
