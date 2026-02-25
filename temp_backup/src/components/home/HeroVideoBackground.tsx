

// 임시 플레이스홀더 비디오 URL (실제 에셋으로 교체 필요)
const TEMP_VIDEO_URL = "https://cdn.pixabay.com/video/2020/07/28/45889-444743202_large.mp4";

const HeroVideoBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* 어두운 오버레이 레이어 추가 */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover z-0"
            >
                <source src={TEMP_VIDEO_URL} type="video/mp4" />
            </video>
        </div>
    );
};

export default HeroVideoBackground;
