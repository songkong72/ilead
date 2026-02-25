import {
    Leaf,
    Target,
    Zap,
    Users,
    ShieldCheck,
    Lightbulb,
    Flag,
    Wind,
    Sun
} from 'lucide-react';

export interface ProgramGoal {
    title: string;
    description: string;
    icon: any;
}

export interface Activity {
    name: string;
    description: string;
    imageUrl?: string;
    galleryImages?: string[]; // Multiple images/placeholders
}

export interface ProgramItem {
    category: string;
    subtitle?: string;
    activities: Activity[];
}

export interface ScheduleItem {
    time: string;
    activity: string;
    description?: string;
}

export interface ProgramContent {
    id: string;
    title: string;
    intro: string;
    description: string;
    themeColor: string;
    bgImage: string;
    summary: string[]; // List of main categories for the summary section
    goals: ProgramGoal[];
    programCategories: ProgramItem[];
    schedule: ScheduleItem[];
}

export const programs: Record<string, ProgramContent> = {
    leisure: {
        id: 'leisure',
        title: "레포츠/래프팅",
        intro: "도전하고 모험하는 레포츠 프로그램",
        description: "아름다운 대자연을 배경으로 하늘이 되고, 바람이 되고, 빛이 되어 보세요. LEAD가 도와드리겠습니다.",
        themeColor: "#FF6B00",
        bgImage: "/assets/images/programs/leisure.jpg",
        summary: ["래프팅", "수상 레포츠", "지상 레포츠"],
        goals: [
            { title: "도전 정신", description: "자연과 하나되는 도전과 모험 정신 함양", icon: Wind },
            { title: "활력 충전", description: "대자연 속에서 즐거움과 활력을 찾는 프로그램", icon: Sun },
            { title: "팀워크", description: "공동체 의식과 동료애를 기르는 협동 활동", icon: Users }
        ],
        programCategories: [
            {
                category: "래프팅(RAFTING)",
                activities: [
                    { name: "내린천 래프팅", description: "급류지점을 시작하는 설레임과 수량이 깊고 있는 원시의 코스로 국내 최고의 청정함을 자랑합니다. 자연이 시원함과 산뜻한 여유의 조화로 최고의 감동과 사계절 시원한 코스를 선사하고 있습니다." },
                    { name: "한탄강 래프팅", description: "천혜의 비경인 주상절리 기암이 즐비 즐비한 계곡 코스로 한국의 그랜드 캐니언이라 부릅니다. 기묘한 바위들 사이사이를 헤엄치듯 스릴과 운치있는 명소가 매력적인 장소로 각광받습니다." },
                    { name: "동강 래프팅(남한강)", description: "풍경이 이쁘고 물이 깊지 않고 남자가 하는 최고의 장소! 넓고 넓어 눈앞이 정겹게 펼쳐지고 굴곡진 산과 산으로 에워싸여 그림을 그린 듯한 정취의 코스로써 누구하나 편안함을 느낄 수 있습니다." }
                ]
            },
            {
                category: "수상 레포츠(Water Sports)",
                activities: [
                    { name: "종목 안내", description: "수상스키, 웨이크보드, 바나나보트, 플라이피쉬, 보트드라이브, 도강래프팅 등 다양한 종목을 운영합니다. 한껏 가슴을 펴고 시원하고 파란 강물위를 쏜살같이 달리며 한여름의 더위를 한순간에 날려줍니다.", galleryImages: ["", "", "", ""] }
                ]
            },
            {
                category: "카트 레이싱(KART)",
                activities: [
                    { name: "강원도 철원", description: "최신 스포츠 모델 카트로 스피드와 코너링을 즐길 수 있는 전문 서킷입니다. 남녀노소 누구나 쉽게 운전할 수 있으며 속도감을 만끽할 수 있습니다. (코스: 1인승, 2인승 등 선택 가능)" }
                ]
            },
            {
                category: "서바이벌 게임(Survival Game)",
                activities: [
                    { name: "인천광역시 서구/강원도 철원", description: "현실감 넘치는 전투환경을 갖추고 있으며 안전한 장비들을 사용합니다. 팀원과의 긴밀한 협동과 전략이 필요한 생생한 전투체험이 가능합니다. 최첨단 페인트볼 서바이벌 시스템을 도입하였습니다." }
                ]
            }
        ],
        schedule: [
            { time: "10:00 - 10:30", activity: "현장 도착 및 안전 교육", description: "장비 수령 및 안전 수칙 숙지" },
            { time: "10:30 - 13:00", activity: "메인 프로그램 진행", description: "래프팅 및 수상 활동 시작" },
            { time: "13:00 - 14:00", activity: "중식 및 휴식", description: "현지 특식 제공" },
            { time: "14:00 - 16:30", activity: "선택형 레포츠 체험", description: "ATV, 서바이벌 등 추가 활동" },
            { time: "16:30 - 17:00", activity: "정리 및 해산", description: "샤워 및 소감 나누기" }
        ]
    },
    experience: {
        id: 'experience',
        title: "스키 & 스노우보드",
        intro: "지속적이고 체계적인 교육 프로그램",
        description: "매년 업그레이드되는 LEAD만의 프로그램은 전문성을 지향합니다. 자아를 발견하고 완성시켜 나아가는 청소년들에게 무한한 잠재력과 자신만의 소질을 개발할 수 있는 기회를 만들어 주세요.",
        themeColor: "#00D1FF",
        bgImage: "/assets/images/programs/experience.jpg",
        summary: ["보광 휘닉스파크 스키학교", "곤지암 스키캠프"],
        goals: [
            { title: "전문 강습", description: "수준별(입문~고급) 체계적인 스킬 습득", icon: Target },
            { title: "잠재력 개발", description: "무한한 잠재력과 자신만의 소질 개발 지원", icon: Lightbulb },
            { title: "안전 최우선", description: "신속한 의료 시스템과 안전 장비 전원 착용", icon: ShieldCheck }
        ],
        programCategories: [
            {
                category: "보광 휘닉스파크 스키학교",
                activities: [
                    { name: "학교 소개", description: "스키계의 메카라 할 수 있는 보광 휘닉스파크 리조트에서 운영합니다. 캡/렌탈 의류 100% 보광 휘닉스파크 정품을 사용합니다. 캠프의 전문화, 소수정예 전담강사제, 숙소와 가까운 슬로프에서의 신속한 강의로 만족도를 높입니다.", galleryImages: ["", "", "", "", "", ""] }
                ]
            },
            {
                category: "곤지암 스키캠프",
                activities: [
                    { name: "캠프 특장점", description: "서울에서 가까운 접근성으로 효율적인 교육이 가능한 수도권 최대 규모의 스키장입니다. 전문 강사진의 밀착 케어로 믿고 맡길 수 있으며, 고품질 장비 렌탈 및 체계적인 안전 시스템을 갖추고 있습니다.", galleryImages: ["", "", "", "", "", ""] }
                ]
            }
        ],
        schedule: [
            { time: "DAY 1 AM", activity: "장비 렌탈 및 조 편성", description: "신체 사이즈에 맞는 장비 피팅" },
            { time: "DAY 1 PM", activity: "수준별 스키 강습 (1차)", description: "기초 동작 및 안전 정지법 교육" },
            { time: "DAY 1 EVE", activity: "야간 스키 및 캠프 파이어", description: "친밀감 형성 및 레크리에이션" },
            { time: "DAY 2 AM", activity: "집중 코칭 및 영상 분석", description: "자세 교정을 위한 전문가 코칭" },
            { time: "DAY 2 PM", activity: "종합 실습 및 테스트", description: "단계별 급수 실습 평가" }
        ]
    },
    action: {
        id: 'action',
        title: "생태/문화 체험",
        intro: "오감을 만족시키는 다양한 체험 프로그램",
        description: "다양한 체험 프로그램은 감성과 인성적인 부분의 개발을 돕습니다. LEAD는 문화지킴이로서의 선도적인 역할을 충실히 담당하겠습니다.",
        themeColor: "#22C55E",
        bgImage: "/assets/images/programs/action.jpg",
        summary: ["전통 문화체험", "자연 생태체험", "역사 문화체험", "도예교실"],
        goals: [
            { title: "감성 발달", description: "감성과 인성의 조화로운 개발 지원", icon: Zap },
            { title: "문화 소양", description: "우리 문화에 대한 소양 교육 및 창의적 발전", icon: Flag },
            { title: "살아있는 교육", description: "대자연 속 산 지식을 통한 현장 교육", icon: Leaf }
        ],
        programCategories: [
            {
                category: "전통 문화체험",
                activities: [
                    { name: "민속 문화체험", description: "전통놀이 위주로 준비된 코스에서 조상들의 생활을 체험하며 우리 문화의 소중함을 이해하는 시간입니다. 농악 체험, 기싸움 등 활동적인 프로그램이 포함됩니다.", galleryImages: ["", "", ""] }
                ]
            },
            {
                category: "자연 생태체험",
                activities: [
                    { name: "자유로운 생태관찰", description: "자연 그대로의 흙, 벌레, 나무 등의 대자연과 함께 속삭이는 배움의 장입니다. 계절에 따른 야외 농촌체험, 갯벌체험, 별자리 관측 등을 운영합니다.", galleryImages: ["", "", "", ""] }
                ]
            },
            {
                category: "역사 문화체험",
                activities: [
                    { name: "DMZ 안보체험 외", description: "DMZ 철원 안보체험부터 선사/삼국시대 유적지 탐방, 실감나는 역사 투어까지 현장에서 직접 보고 느끼는 역사 교육이 진행됩니다.", galleryImages: ["", "", "", ""] }
                ]
            },
            {
                category: "도예교실",
                activities: [
                    { name: "도자기 제작", description: "흙의 질감을 느끼며 창의력을 기르는 자기 조립 및 장식 수업입니다. 스스로 창착물을 만들어내며 예술적 감수성을 키울 수 있습니다.", galleryImages: ["", "", ""] }
                ]
            }
        ],
        schedule: [
            { time: "09:30 - 10:00", activity: "오리엔테이션", description: "활동 주제 및 안전 수칙 설명" },
            { time: "10:00 - 12:30", activity: "테마 체험 활동 (1)", description: "역사/문화 유적 현장 탐방" },
            { time: "12:30 - 13:30", activity: "현지 건강식 체험", description: "제철 나물 및 건강 식단" },
            { time: "13:30 - 15:30", activity: "창의 공예 활동 (2)", description: "도자기 또는 염색 실습" },
            { time: "15:30 - 16:30", activity: "활동 일지 작성 및 소감", description: "배운 점 공유 및 마무리" }
        ]
    },
    design: {
        id: 'design',
        title: "기획연수/인성개발",
        intro: "도전과 미래를 여는 단체 맞춤형 연수",
        description: "단체의 성격에 맞게 제공되는 양방향 프로그램. 정형화된 프로그램에서 벗어나 각 단체의 특성과 목적에 맞는 프로그램을 제안합니다.",
        themeColor: "#8B5CF6",
        bgImage: "/assets/images/programs/design.jpg",
        summary: ["어드벤처 챌린징 존", "에듀 캠프", "리더십 교육", "청소년 캠프"],
        goals: [
            { title: "팀워크 강화", description: "팀워크 및 리더십의 실질적 강화", icon: Users },
            { title: "한계 극복", description: "도전과 모험을 통한 조직적 한계 극복", icon: Flag },
            { title: "맞춤형 기획", description: "단체의 요구와 특성에 맞춘 커스터마이즈", icon: Target }
        ],
        programCategories: [
            {
                category: "어드벤처 챌린징 존",
                activities: [
                    {
                        name: "챌린지 프로그램",
                        description: "챌린지 코스는 단순한 극기훈련이나 체력단련 형태가 아닌 참가자들이 성취감을 느끼며 즐기기에 알맞은 성과 위주의 코스로써, 개인 정서적인 성취와 조화로운 관계를 기를 수 있습니다. 팀워크 증진과 유익한 경험에 재미를 결합한 리더십 최고의 교육을 제공하는 에듀 코스입니다. (하이코스, 로우코스 포함)",
                        galleryImages: ["", "", "", "", "", "", "", "", ""]
                    }
                ]
            },
            {
                category: "에듀 캠프",
                activities: [
                    {
                        name: "보광 여름캠프(초중고 단체)",
                        description: "자연의 품에 안긴 사랑으로 대하는 체험학습은 청소년들에게 배움의 참을 알려주고 정서와 메마른 영혼에 활력을 주었으며 무한한 잠재력과 자신만의 소질을 발견하고 개발할 수 있는 기회를 만들어 드립니다. (수어캠프, 캠프형 체험학습, 환경캠프, 상상력 캠프 등)",
                        galleryImages: ["", "", "", "", "", "", "", "", "", "", "", ""]
                    }
                ]
            }
        ],
        schedule: [
            { time: "AM", activity: "현장 도착 및 오리엔테이션", description: "팀 편성 및 안전 수칙 교육" },
            { time: "PM 1", activity: "어드벤처 챌린징 활동", description: "하이/로우 코스 및 팀빌딩 훈련" },
            { time: "PM 2", activity: "테마별 캠프 활동", description: "에듀 캠프 프로그램 체험" },
            { time: "EVE", activity: "캠프파이어 및 소감 나누기", description: "화합의 시간 및 정리" }
        ]
    }
};
