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
    galleryImages?: string[];
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
    summary: string[];
    goals: ProgramGoal[];
    programCategories: ProgramItem[];
    schedule: ScheduleItem[];
}

export const programs: Record<string, ProgramContent> = {
    leisure: {
        id: 'leisure',
        title: "레포츠 & 래프팅",
        intro: "도전하고, 성취하는 레포츠 프로그램",
        description: "하늘이 되고, 바람이 되고, 빛이 되어 보세요. LEAD가 도와드리겠습니다. 대자연 속에서 도심의 다람쥐 생활을 던져버리고 즐거운 스릴과 활기찬 충전으로 인생의 멋진 휴가와 소중한 추억을 만들어 보시기 바랍니다.",
        themeColor: "#FF6B00",
        bgImage: "/assets/images/programs/leisure.jpg",
        summary: ["래프팅", "수상 레포츠", "카트 레이싱", "서바이벌 게임"],
        goals: [
            { title: "도전 정신", description: "자연과 하나되는 도전과 모험 정신 함양", icon: Wind },
            { title: "활력 충전", description: "대자연 속에서 즐거움과 활력을 찾는 프로그램", icon: Sun },
            { title: "팀워크", description: "공동체 의식과 동료애를 기르는 협동 활동", icon: Users }
        ],
        programCategories: [
            {
                category: "래프팅(RAFTING)",
                activities: [
                    {
                        name: "내린천 래프팅",
                        description: "급류 지점을 시작하는 설레임과 수량이 깊고 원시의 코스로 국내 최고의 청정함을 자랑합니다. 자연의 시원함과 산뜻한 여유의 조화로 최고의 감동을 선사합니다.\n• 코스: 피아시 ~ 밤골\n• 시간: 2~3시간"
                    },
                    {
                        name: "한탄강 래프팅",
                        description: "천혜의 비경인 주상절리 기암이 즐비한 계곡 코스로 한국의 그랜드 캐니언이라 불립니다. 기묘한 바위들 사이사이를 헤엄치듯 스릴과 운치가 넘치는 레프팅의 명소입니다.\n• 장소: 강원도 철원\n• 코스: 직탕 ~ 군탄"
                    },
                    {
                        name: "동강 래프팅(남한강)",
                        description: "풍경이 수려하고 물이 깊지 않아 남녀노소 누구나 즐기기 최고의 장소! 굽이굽이 흐르는 강줄기와 굴곡진 산세가 어우러져 그림 같은 정취를 만끽하며 편안함을 느낄 수 있습니다.\n• 장소: 강원도 영월\n• 코스: 문산 ~ 거운"
                    }
                ]
            },
            {
                category: "수상 레포츠(Water Sports)",
                activities: [
                    {
                        name: "성진호반",
                        description: "청평의 드넓은 호반에서 즐기는 전문적인 수상 레저! 전문 강사진의 안전한 지도 아래 스릴 넘치는 수상 기구를 즐기며 더위를 한순간에 날려줍니다.",
                        galleryImages: ["수상스키", "웨이크보드", "바나나보트", "플라이피쉬", "도넛보트", "모터가이드"]
                    }
                ]
            },
            {
                category: "카트 레이싱(KART)",
                activities: [
                    {
                        name: "강원도 삼척 고카트",
                        description: "진정한 스피드와 코너링을 즐길 수 있는 전문 서킷! 남녀노소 누구나 쉽게 운전하며 속도감을 만끽할 수 있는 최신 스포츠 모델 카트 체험을 제공합니다.\n• 코스: 고카트 전용 레이싱 링크"
                    }
                ]
            },
            {
                category: "서바이벌 게임(Survival Game)",
                activities: [
                    {
                        name: "인천광역시 서구 / 강원도 철원",
                        description: "실전 같은 전투 환경과 안전한 장비로 구성된 생동감 넘치는 모의 전투! 팀원과의 협동과 전략을 통해 조직의 결속력을 극대화하는 최첨단 페인트볼 서바이벌 시스템입니다.\n• 장소: 서구 서바이벌장 / 철원 서바이벌장"
                    }
                ]
            }
        ],
        schedule: [
            { time: "10:00 - 10:30", activity: "현장 도착 및 안전 교육", description: "장비 수령 및 안전 수칙 숙지" },
            { time: "10:30 - 13:00", activity: "메인 프로그램 진행", description: "래프팅 및 수상 활동 시작" },
            { time: "13:00 - 14:00", activity: "중식 및 휴식", description: "현지 특식 제공" },
            { time: "14:00 - 16:30", activity: "선택형 레포츠 체험", description: "카트 레이싱 및 서바이벌 팀빌딩" },
            { time: "16:30 - 17:00", activity: "정리 및 해산", description: "샤워 및 소감 나누기" }
        ]
    },
    education: {
        id: 'education',
        title: "스키 & 스노우보드",
        intro: "지속적이고 체계적인 스키체험",
        description: "매년 업그레이드되는 LEAD만의 스키 캠프는 전문성을 지향합니다. 자아를 발견하고 성장하는 청소년들에게 무한한 잠재력과 자신감을 개발할 수 있는 기회를 만들어 주세요.",
        themeColor: "#00D1FF",
        bgImage: "/assets/images/programs/skiing.jpg",
        summary: ["보광 휘닉스파크", "곤지암 리조트"],
        goals: [
            { title: "전문 강습", description: "수준별(입문~고급) 체계적인 스킬 습득", icon: Target },
            { title: "잠재력 개발", description: "도전을 통해 성취감과 자신감 함양", icon: Lightbulb },
            { title: "안전 최우선", description: "철저한 안전 관리와 전문 의료 시스템", icon: ShieldCheck }
        ],
        programCategories: [
            {
                category: "보광 휘닉스파크 스키학교",
                activities: [
                    {
                        name: "전문 스키 캠프",
                        description: "스키의 메카 휘닉스파크에서 진행되는 고품격 교육! 소수 정예 전담 강사제와 최신 장비 렌탈을 통해 단기간에 실력을 향상시킵니다.",
                        galleryImages: ["오리엔테이션", "기초 강습", "슬로프 실습", "야간 스키"]
                    }
                ]
            },
            {
                category: "곤지암 스키캠프",
                activities: [
                    {
                        name: "수도권 밀착 교육",
                        description: "서울에서 가장 가까운 프리미엄 스키장! 효율적인 이동 시간과 집중적인 코칭으로 참가자들의 만족도를 높입니다.",
                        galleryImages: ["도착 및 준비", "집중 코칭", "테스트 및 평가"]
                    }
                ]
            }
        ],
        schedule: [
            { time: "DAY 1 AM", activity: "장비 렌탈 및 조 편성", description: "신체 사이즈에 맞는 장비 피팅" },
            { time: "DAY 1 PM", activity: "수준별 스키 강습 (1차)", description: "기초 동작 및 안전 정지법 교육" },
            { time: "DAY 1 EVE", activity: "야간 스키 및 캠프 파이어", description: "친밀감 형성 및 레크리에이션" },
            { time: "DAY 2 AM", activity: "집중 코칭 및 영상 분석", description: "자세 교정을 위한 전문가 코칭" }
        ]
    },
    activite: {
        id: 'activite',
        title: "현장 & 생태 체험",
        intro: "오감을 만족하는 현장체험",
        description: "다양한 체험 프로그램은 아이들의 감성과 인성 발달에 큰 도움을 줍니다. 자연 속에서 배우는 산 지식을 통해 창의적인 미래 인재로 거듭나게 합니다.",
        themeColor: "#22C55E",
        bgImage: "/assets/images/programs/experience.jpg",
        summary: ["전통 문화체험", "자연 생태체험", "역사 문화체험", "도예교실"],
        goals: [
            { title: "감성 발달", description: "오감 자극을 통한 풍부한 감수성 형성", icon: Zap },
            { title: "전통 계승", description: "우리 문화의 가치를 배우고 소중히 생각하는 마음", icon: Flag },
            { title: "생태 감수성", description: "대자연과의 교감을 통한 생명 존중 의식", icon: Leaf }
        ],
        programCategories: [
            {
                category: "전통 문화체험",
                activities: [
                    {
                        name: "민속 문화 한마당",
                        description: "민속놀이, 농악, 전통 기싸움 등 우리 조상들의 지혜를 몸소 체험하며 소중한 문화 유산을 이해합니다.",
                        galleryImages: ["농악 체험", "기싸움", "민속놀이"]
                    }
                ]
            },
            {
                category: "자연 생태체험",
                activities: [
                    {
                        name: "생생 자연 배움터",
                        description: "야외 농촌 체험, 갯벌 탐사, 별자리 관측 등 계절별로 변하는 자연의 숨결을 직접 느끼고 관찰합니다.",
                        galleryImages: ["갯벌체험", "농촌체험", "별자리관측"]
                    }
                ]
            },
            {
                category: "역사/문화체험",
                activities: [
                    {
                        name: "지혜의 역사 탐방",
                        description: "안보 체험(DMZ)부터 유적지 답사까지, 현장에서 직접 보고 듣는 실감 나는 역사 교육이 진행됩니다.",
                        galleryImages: ["DMZ 안보견학", "유적지 답사", "박물관 관람"]
                    }
                ]
            },
            {
                category: "도예 체험",
                activities: [
                    {
                        name: "흙 속의 예술, 도예교실",
                        description: "전문 도예 강사와 함께 직접 흙을 만지고 빚으며 창의력을 발휘합니다. 물레 체험부터 채색까지 나만의 소중한 작품을 완성하는 과정입니다.",
                        galleryImages: ["물레 체험", "핸드페인팅", "작품 완성"]
                    }
                ]
            },
            {
                category: "천연 염색 체험",
                activities: [
                    {
                        name: "자연의 색을 입히다",
                        description: "쪽, 황토, 양파껍질 등 자연에서 얻은 재료로 원단을 염색합니다. 화학 색소가 아닌 자연의 아름다움을 이해하고 예술적 감수성을 키우는 프로그램입니다.",
                        galleryImages: ["천연 염료 추출", "홀치기 염색", "원단 건조"]
                    }
                ]
            }
        ],
        schedule: [
            { time: "09:30 - 10:00", activity: "오리엔테이션", description: "테마별 활동 소개 및 안전 교육" },
            { time: "10:00 - 12:30", activity: "현장 탐방 및 관찰", description: "유적지 답사 또는 생태 관찰 활동" },
            { time: "12:30 - 13:30", activity: "중식 시간", description: "건강한 식단 제공" },
            { time: "13:30 - 15:30", activity: "창의 체험 실습", description: "도자기 제작 또는 전통 공예 실습" }
        ]
    },
    development: {
        id: 'development',
        title: "챌린지 & 인성개발",
        intro: "한계를 극복하는 인성개발",
        description: "정형화된 틀에서 벗어나 조직의 특성에 맞춘 최적화된 연수 프로그램을 제안합니다. 한계를 돌파하는 경험을 통해 결속력 있는 조직으로 성장합니다.",
        themeColor: "#8B5CF6",
        bgImage: "/assets/images/programs/action.jpg",
        summary: ["어드벤처 챌린지", "에듀 캠프", "리더십 교육", "청소년 캠프"],
        goals: [
            { title: "팀워크 강화", description: "협력과 소통을 통한 조직력 강화", icon: Users },
            { title: "한계 돌파", description: "도전을 통한 자아 발견과 한계 극복", icon: Flag },
            { title: "미래 지향", description: "변화에 능동적인 리더십 고취", icon: Target }
        ],
        programCategories: [
            {
                category: "어드벤처 챌린징 존",
                activities: [
                    {
                        name: "하이/로우 챌린지",
                        description: "단순 극기가 아닌 성취감 중심의 코스! 팀원 간의 조화로운 관계와 개인의 성취를 동시에 만족시키는 최고의 리더십 교육입니다.",
                        galleryImages: ["하이코스", "로우코스", "팀빌딩"]
                    }
                ]
            },
            {
                category: "에듀 캠프",
                activities: [
                    {
                        name: "보광 여름캠프",
                        description: "청소년들에게 배움의 즐거움을 알려주는 정서 캠프! 무한한 잠재력과 자신만의 소질을 발견할 수 있는 기회를 선사합니다.",
                        galleryImages: ["수어캠프", "환경캠프", "상상력캠프"]
                    }
                ]
            }
        ],
        schedule: [
            { time: "오전", activity: "팀 편성 및 오리엔테이션", description: "조직 내 소통의 기초 형성" },
            { time: "오후 1", activity: "챌린지 미션 수행", description: "팀워크 및 한계 극복 활동" },
            { time: "오후 2", activity: "에듀 프로그램 진행", description: "성찰 및 잠재력 발견 실습" },
            { time: "저녁", activity: "화합의 장", description: "캠프파이어 및 활동 정리" }
        ]
    }
};
