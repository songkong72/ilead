import { motion } from 'framer-motion';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';

const About = () => {
    const { isAdmin, getImageUrl } = useImageOverrides();

    return (
        <div className="relative min-h-[100dvh] bg-gray-50 pb-20">
            {/* 상단 컬러드 배경 */}
            <div className="absolute top-0 left-0 right-0 h-[350px] md:h-[500px] z-0 bg-[#134e4a] overflow-hidden">
                <AdminImageManager isAdmin={isAdmin} uploadKey="about_header_bg">
                    <img
                        src={getImageUrl('/assets/images/headers/about-bg.jpg', 'about_header_bg')}
                        alt="About header background"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay fixed"
                    />
                </AdminImageManager>
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-20 md:py-32 min-h-screen">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white italic"
                    >
                        We are L.E.A.D
                    </motion.h2>
                    <div className="h-2 w-24 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mx-auto mb-10" />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium"
                    >
                        수많은 기업과 단체, 그리고 개인의 삶에 휴식과 경험,
                        <br className="hidden md:block" />
                        그리고 새로운 가치의 행동과 디자인을 제안해 온 글로벌 컨설팅 그룹입니다.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {[
                        {
                            title: "Leports",
                            desc: "대자연을 배경으로 도전과 모험을 즐기며 즐겁고 짜릿한 추억을 선사하는 고품격 레저 큐레이션 프로그램",
                            color: "bg-blue-100"
                        },
                        {
                            title: "Education",
                            desc: "무한한 잠재력과 소질을 개발하여 자아를 완성시켜 나가는 지속적이고 체계적인 전문 교육 프로그램",
                            color: "bg-purple-100"
                        },
                        {
                            title: "Activite",
                            desc: "오감을 만족시키는 체험 활동을 통해 감성과 인성을 계발하고 우리 문화의 소양과 창의성을 키우는 선도적 프로그램",
                            color: "bg-orange-100"
                        },
                        {
                            title: "Development",
                            desc: "단체의 성격에 맞춘 양방향 프로그램을 통해 조직력을 강화하고 공동 과제 해결로 갈등 해소와 내적 성장을 돕는 맞춤형 프로그램",
                            color: "bg-emerald-100"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-10 rounded-3xl backdrop-blur-sm border border-gray-200 ${item.color} flex flex-col justify-center items-center text-center h-64`}
                        >
                            <h3 className="text-3xl font-black mb-4 tracking-widest text-gray-900">{item.title}</h3>
                            <p className="text-gray-700">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
