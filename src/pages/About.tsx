
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-gray-900"
                >
                    We are L.E.A.D
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 leading-relaxed font-light"
                >
                    수많은 기업과 단체, 그리고 개인의 삶에 휴식과 경험,
                    그리고 새로운 가치의 행동과 디자인을 제안해 온 글로벌 컨설팅 그룹입니다.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {[
                    {
                        title: "Leisure",
                        desc: "단순한 휴식을 넘어선 프리미엄 레저 큐레이션",
                        color: "bg-blue-100"
                    },
                    {
                        title: "Experience",
                        desc: "일상을 벗어난 특별한 감각적 체험 통찰력 제공",
                        color: "bg-purple-100"
                    },
                    {
                        title: "Action",
                        desc: "현실적이고 즉각적인 맞춤형 솔루션 실행",
                        color: "bg-orange-100"
                    },
                    {
                        title: "Design",
                        desc: "더 나은 내일을 위한 라이프 매니지먼트 설계",
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
    );
};

export default About;
