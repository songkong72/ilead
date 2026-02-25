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

export interface ProgramItem {
    category: string;
    items: string[];
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
        goals: [
            { title: "도전 정신", description: "자연과 하나되는 도전과 모험 정신 함양", icon: Wind },
            { title: "활력 충전", description: "대자연 속에서 즐거움과 활력을 찾는 프로그램", icon: Sun },
            { title: "팀워크", description: "공동체 의식과 동료애를 기르는 협동 활동", icon: Users }
        ],
        programCategories: [
            { category: "래프팅", items: ["한탄강 래프팅", "동강 래프팅(남한강)", "내린천 래프팅"] },
            { category: "수상 레포츠", items: ["수상스키/웨이크보드", "바나나보트/플라이피쉬", "보트드라이브", "도강래프팅"] },
            { category: "지상 레포츠", items: ["카트레이싱", "서바이벌 게임", "수륙양용차(아르고)", "4륜 오토바이(ATV)", "유로번지"] }
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
        intro: "지속적이고 체계적인 전문 교육 프로그램",
        description: "매년 업그레이드되는 LEAD만의 프로그램은 전문성을 지향합니다. 자아를 발견하고 완성시켜 나아가는 청소년들에게 무한한 잠재력과 자신만의 소질을 개발할 수 있는 기회를 만들어 주세요.",
        themeColor: "#00D1FF",
        bgImage: "/assets/images/programs/experience.jpg",
        goals: [
            { title: "전문 강습", description: "수준별(입문~고급) 체계적인 스킬 습득", icon: Target },
            { title: "잠재력 개발", description: "무한한 잠재력과 자신만의 소질 개발 지원", icon: Lightbulb },
            { title: "안전 최우선", description: "신속한 의료 시스템과 안전 장비 전원 착용", icon: ShieldCheck }
        ],
        programCategories: [
            { category: "스키/보드 강습", items: ["프리미엄 레슨", "소수정예 24시간 담임제", "수준별 맞춤형 코칭"] },
            { category: "숙박 및 편의", items: ["스키장 내 콘도 숙박", "최신 장비/의류 렌탈", "균형 잡힌 식단 제공"] },
            { category: "안전 지원", items: ["안전헬멧 필수 착용", "전담 의료팀 대기", "삼성의료원 제휴 지원"] }
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
        intro: "오감을 만족시키는 살아있는 교육 프로그램",
        description: "다양한 체험 프로그램은 감성과 인성적인 부분의 개발을 돕습니다. LEAD는 문화지킴이로서의 선도적인 역할을 충실히 담당하겠습니다.",
        themeColor: "#22C55E",
        bgImage: "/assets/images/programs/action.jpg",
        goals: [
            { title: "감성 발달", description: "감성과 인성의 조화로운 개발 지원", icon: Zap },
            { title: "문화 소양", description: "우리 문화에 대한 소양 교육 및 창의적 발전", icon: Flag },
            { title: "살아있는 교육", description: "대자연 속 산 지식을 통한 현장 교육", icon: Leaf }
        ],
        programCategories: [
            { category: "전통/역사 체험", items: ["대동놀이/기싸움", "DMZ 안보체험", "선사/삼국시대 유적체험"] },
            { category: "자연 생태체험", items: ["농촌/목장체험", "갯벌/숲 체험", "천문 별자리 관측"] },
            { category: "창의 공예체험", items: ["도자기 제작(시계, 화병)", "천연 염색(치자, 쪽, 황토)"] }
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
        title: "리더십/팀빌딩",
        intro: "도전과 미래를 여는 단체 맞춤형 연수",
        description: "단체의 성격에 맞게 제공되는 양방향 프로그램. 정형화된 프로그램에서 벗어나 각 단체의 특성과 목적에 맞는 프로그램을 제안합니다.",
        themeColor: "#8B5CF6",
        bgImage: "/assets/images/programs/design.jpg",
        goals: [
            { title: "팀워크 강화", description: "팀워크 및 리더십의 실질적 강화", icon: Users },
            { title: "한계 극복", description: "도전과 모험을 통한 조직적 한계 극복", icon: Flag },
            { title: "맞춤형 기획", description: "단체의 요구와 특성에 맞춘 커스터마이즈", icon: Target }
        ],
        programCategories: [
            { category: "챌린지 코스", items: ["하이코스 레벨", "로우코스 (인간관계 훈련)", "목표달성 훈련"] },
            { category: "어드벤처 캠프", items: ["ATV 어드벤처", "서바이벌 슈팅", "천문 리더십 캠프"] },
            { category: "단체 전문 연수", items: ["수학여행/현장학습", "조직 활성화 연수", "팀빌딩 워크숍"] }
        ],
        schedule: [
            { time: "1일차 오후", activity: "아이스브레이킹", description: "오리엔테이션 및 관계 형성 게임" },
            { time: "1일차 밤", activity: "비전 공유의 시간", description: "조직 핵심 가치 및 목표 설정" },
            { time: "2일차 오전", activity: "본격 팀 챌린지", description: "하이/로우 코스 도전 활동" },
            { time: "2일차 오후", activity: "분석 및 성찰", description: "팀별 결과 리뷰 및 수료식" }
        ]
    }
};
