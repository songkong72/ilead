import { motion } from 'framer-motion';
import { useImageOverrides } from '../hooks/useImageOverrides';
import AdminImageManager from '../components/common/AdminImageManager';
import AdminTextManager from '../components/common/AdminTextManager';


const About = () => {
    const { isAdmin, getImageUrl, overrides } = useImageOverrides();

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

            <div className="relative z-10 container mx-auto px-6 pt-28 pb-20 md:py-32 min-h-screen">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-white italic"
                    >
                        We are L.E.A.D
                    </motion.h2>
                    <div className="h-2 w-24 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mx-auto mb-10" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium"
                    >
                        <AdminTextManager
                            isAdmin={isAdmin}
                            contentKey="about_main_description"
                            text={overrides.about_main_description || "수많은 기업과 단체, 그리고 교육 현장의 목소리에 귀를 기울이며, \n차별화된 콘텐츠와 열정으로 새로운 가치의 레저 문화와 인재 양성을 선도하는 전문 컨설팅 그룹입니다."}
                            as="p"
                            multiline={true}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Leports",
                            desc: "대자연을 배경으로 도전과 모험을 즐기며 즐겁고 짜릿한 추억을 선사하는 고품격 레저 큐레이션 프로그램",
                            color: "from-blue-500/10",
                            defaultImg: "/assets/images/programs/leisure.jpg",
                            key: "about_card_leports"
                        },
                        {
                            title: "Education",
                            desc: "무한한 잠재력과 소질을 개발하여 자아를 완성시켜 나가는 지속적이고 체계적인 전문 교육 프로그램",
                            color: "from-purple-500/10",
                            defaultImg: "/assets/images/programs/skiing.jpg",
                            key: "about_card_education"
                        },
                        {
                            title: "Activite",
                            desc: "오감을 만족시키는 체험 활동을 통해 감성과 인성을 계발하고 우리 문화의 소양과 창의성을 키우는 선도적 프로그램",
                            color: "from-orange-500/10",
                            defaultImg: "/assets/images/programs/experience.jpg",
                            key: "about_card_activite"
                        },
                        {
                            title: "Development",
                            desc: "단체의 성격에 맞춘 양방향 프로그램을 통해 조직력을 강화하고 공동 과제 해결로 갈등 해소와 내적 성장을 돕는 맞춤형 프로그램",
                            color: "from-emerald-500/10",
                            defaultImg: "/assets/images/programs/action.jpg",
                            key: "about_card_development"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Card Image Section */}
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <AdminImageManager isAdmin={isAdmin} uploadKey={item.key}>
                                    <img
                                        src={getImageUrl(item.defaultImg, item.key)}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </AdminImageManager>
                                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} to-transparent opacity-60`} />
                            </div>

                            {/* Card Content Section */}
                            <div className="p-10 flex flex-col items-center text-center">
                                <div className="inline-flex px-4 py-1.5 rounded-full bg-gray-900 text-white text-[10px] font-black tracking-widest uppercase mb-6">
                                    Core Value {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-4xl font-black mb-6 tracking-tight text-gray-900 leading-none">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
