# 📋 엘이에이디 홈페이지 - 작업 목록

> 마지막 업데이트: 2026-02-25 23:29

---

## ✅ 완료된 작업

### 프론트엔드 구조
- [x] 프로젝트 초기 세팅 (Vite + React + TypeScript + TailwindCSS v4)
- [x] 라우팅 구조 설정 (react-router-dom)
- [x] 공통 레이아웃 (Navbar, Footer, LoginModal, InquiryButton)
- [x] AuthContext (로그인 모달 상태 관리)

### 퍼블릭 페이지
- [x] **홈 페이지** (`Home.tsx`) - 히어로 슬라이더 + 프로그램 카드 그리드 + 모달 확장
- [x] **회사소개** (`About.tsx`) - L.E.A.D 의미 소개 카드
- [x] **사업영역 목록** (`Programs.tsx`) - 4개 프로그램 카드 그리드 + CTA 섹션
- [x] **프로그램 상세** (`ProgramDetail.tsx`) - 개별 프로그램 상세 페이지
- [x] **갤러리** (`Gallery.tsx`) - 사진 갤러리 + 페이지네이션
- [x] **공지사항** (`Notice.tsx`) - 공지 목록/상세 뷰
- [x] **제휴 리조트** (`Partners.tsx`) - 파트너 리조트 목록
- [x] **회원가입** (`SignUp.tsx`) - 3단계 회원가입 UI
- [x] **아이디/비밀번호 찾기** (`FindAccount.tsx`) - 탭 기반 계정 찾기

### 관리자 시스템
- [x] **관리자 로그인** (`AdminLogin.tsx`) - .env 기반 인증
- [x] **관리자 레이아웃** (`AdminLayout.tsx`) - 사이드바 + 헤더
- [x] **대시보드** (`AdminDashboard.tsx`) - 통계 + 빠른 액션 + 최근 활동
- [x] **공지사항 관리** (`AdminNoticeList.tsx`) - CRUD (등록/수정/삭제/검색)
- [x] **갤러리 관리** (`AdminGalleryList.tsx`) - 등록/삭제/미리보기

### 버그 수정 & 개선 (2026-02-25)
- [x] `/programs` 라우트 404 → `Programs.tsx` 신규 생성 + 라우트 추가
- [x] AdminNoticeList 영어 라벨 → 한글화 (`Notice Title` → `공지사항 제목`)
- [x] 공지사항 수정(Edit) 기능 구현 (수정 모달)
- [x] AdminLayout 존재하지 않는 '설정' 메뉴 제거
- [x] AdminLayout 모바일 사이드바 구현 (햄버거 메뉴 + 슬라이드인)
- [x] FindAccount `/login` 링크 → `/` (홈) 으로 수정
- [x] SignUp 완료 후 `/login` → `/` 으로 수정
- [x] AdminDashboard 하드코딩 통계 → 실제 데이터(notices/gallery.json) 기반
- [x] AdminDashboard 최근 활동 더미 → 실제 콘텐츠 날짜순 표시
- [x] `index.html` SEO 메타태그 추가 (title, description, OG, keywords)
- [x] Google Fonts (Noto Sans KR) fallback 폰트 추가
- [x] 미사용 import 전체 정리 (FindAccount, SignUp, Login, AuthContext 등)

---

## 🔲 남은 작업

### 🔴 높은 우선순위 (백엔드 연동)
- [ ] **Firebase 프로젝트 세팅** - Firebase 프로젝트 생성 및 SDK 연동
- [ ] **Firebase Auth 연동** - 로그인/회원가입 실제 인증 구현 (이메일, 카카오, 네이버, 구글)
- [ ] **AuthContext 확장** - 실제 사용자 상태(user, isLoggedIn, logout 등) 추가
- [ ] **Firestore 연동 (공지사항)** - 공지사항 CRUD를 Firestore에 저장/조회
- [ ] **Firestore 연동 (갤러리)** - 갤러리 CRUD를 Firestore에 저장/조회
- [ ] **Firebase Storage 연동** - 갤러리 이미지 직접 업로드 기능

### 🟡 중간 우선순위 (콘텐츠 & 기능)
- [ ] **카카오톡 채널 실제 링크** - `InquiryButton.tsx`의 `_xxxxxx` → 실제 채널 URL
- [ ] **제휴 리조트 이미지 추가** - `partners.json`의 `images: []` → 실제 이미지 URL
- [ ] **제휴 리조트 지도 연동** - `partners.json`의 `mapUrl: ""` → 네이버/카카오 지도
- [ ] **프로그램 활동 이미지** - `programs.ts`의 빈 `galleryImages` → 실제 활동 사진
- [ ] **공지사항 페이지네이션** - 공지사항 목록이 많아질 때 페이지 분할
- [ ] **관리자 권한 보호 강화** - SessionStorage → Firebase Auth 기반 Admin claim 검증

### 🟢 낮은 우선순위 (폴리싱)
- [ ] **Footer 약관 페이지** - 이용약관, 개인정보처리방침 실제 페이지 작성
- [ ] **PWA 아이콘** - `public/pwa-icons/` 에 실제 아이콘 파일 추가
- [ ] **로딩 스피너/스켈레톤** - 데이터 로딩 시 로딩 UI 추가
- [ ] **에러 바운더리** - 페이지 로딩 실패 시 에러 페이지
- [ ] **접근성(a11y)** - aria 속성, 키보드 네비게이션 보완
- [ ] **다크/라이트 모드 토글** - About 등 서브페이지의 테마 통일
- [ ] **배포** - Firebase Hosting 또는 Vercel/Netlify 배포 설정

---

## 📁 프로젝트 구조

```
src/
├── App.tsx                    # 라우팅 설정
├── main.tsx                   # 앱 엔트리포인트
├── components/
│   ├── auth/
│   │   └── LoginModal.tsx     # 로그인 모달
│   └── common/
│       ├── Navbar.tsx         # 상단 네비바
│       ├── Footer.tsx         # 하단 푸터
│       └── InquiryButton.tsx  # 카카오톡 문의 버튼
├── context/
│   └── AuthContext.tsx        # 인증 상태 Context
├── data/
│   ├── programs.ts            # 프로그램 데이터
│   ├── notices.json           # 공지사항 데이터
│   ├── gallery.json           # 갤러리 데이터
│   └── partners.json          # 제휴 파트너 데이터
├── layouts/
│   ├── Layout.tsx             # 퍼블릭 레이아웃
│   └── AdminLayout.tsx        # 관리자 레이아웃
├── pages/
│   ├── Home.tsx               # 메인 홈
│   ├── About.tsx              # 회사소개
│   ├── Programs.tsx           # 사업영역 목록
│   ├── ProgramDetail.tsx      # 프로그램 상세
│   ├── Gallery.tsx            # 갤러리
│   ├── Notice.tsx             # 공지사항
│   ├── Partners.tsx           # 제휴 리조트
│   ├── SignUp.tsx             # 회원가입
│   ├── Login.tsx              # 로그인 (미사용, 모달로 전환됨)
│   ├── FindAccount.tsx        # 아이디/비밀번호 찾기
│   └── admin/
│       ├── AdminLogin.tsx     # 관리자 로그인
│       ├── AdminDashboard.tsx # 관리자 대시보드
│       ├── AdminNoticeList.tsx# 공지사항 관리
│       └── AdminGalleryList.tsx# 갤러리 관리
└── styles/
    └── index.css              # 글로벌 스타일
```

---

## 🔑 환경 변수 (.env)

| 변수 | 설명 |
|------|------|
| `VITE_ADMIN_ID` | 관리자 로그인 ID |
| `VITE_ADMIN_PW` | 관리자 로그인 비밀번호 |

> ⚠️ Firebase 연동 시 `VITE_FIREBASE_*` 관련 환경변수 추가 필요

---

## 🚀 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 프리뷰
```
