
import partnersData from '../data/partners.json';

const Partners = () => {
    return (
        <div className="container mx-auto px-6 py-32 min-h-screen">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">Partnerships</h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    L.E.A.D가 함께하는 프리미엄 제휴 리조트를 소개합니다.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnersData.map((partner) => (
                    <div key={partner.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-2xl aspect-video mb-4">
                            <img
                                src={partner.imageUrl}
                                alt={partner.title}
                                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{partner.title}</h3>
                        <p className="text-white/70">{partner.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
