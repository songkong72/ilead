# L.E.A.D 홈페이지 개발자 매뉴얼 (Developer Manual)

이 문서는 L.E.A.D 홈페이지 프로젝트의 구조, 기술 스택, 주요 기능 및 유지보수 방법을 설명합니다.

---

## 1. 기술 스택 (Tech Stack)

*   **Frontend**: React (v18), TypeScript, Vite
*   **Styling**: Tailwind CSS, Framer Motion (애니메이션)
*   **Backend/BaaS**: Firebase (Authentication, Firestore, Storage, Hosting)
*   **Icons**: Lucide React

---

## 2. 프로젝트 구조 (Project Structure)

```text
src/
├── assets/         # 정적 자산 (이미지, 로고 등)
├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── auth/       # 인증 관련 (로그인 모달 등)
│   ├── common/     # 공통 컴포넌트 (Navbar, Footer, AdminToolbar 등)
│   └── home/       # 홈 화면 전용 컴포넌트
├── context/        # React Context (AuthContext 등)
├── data/           # 로컬 JSON 데이터 (초기 데이터 및 백업)
├── firebase/       # Firebase 설정 및 초기화 (config.ts)
├── hooks/          # 커스텀 훅 (이미지 오버라이드, 옵저버 등)
├── layouts/        # 페이지 레이아웃 (Layout, AdminLayout)
├── pages/          # 개별 페이지 컴포넌트
│   └── admin/      # 관리자 전용 페이지
├── services/       # API 및 데이터 서비스 로직
└── styles/         # 전역 CSS 스타일 (index.css)
```

---

## 3. 주요 기능 및 아키텍처

### 3.1 실시간 콘텐츠 편집 시스템 (Admin Mode)
관리자로 로그인하면 페이지의 이미지와 텍스트를 실시간으로 변경할 수 있습니다.

*   **`AdminImageManager`**: 이미지를 클릭하여 Firebase Storage에 업로드하고 URL을 Firestore에 저장합니다.
*   **`AdminTextManager`**: 텍스트를 즉시 수정하고 변경사항을 Firestore에 반영합니다.
*   **`useImageOverrides`**: Firestore에 저장된 변경사항(Overrides)을 실시간으로 불러와 화면에 적용하는 커스텀 훅입니다.

### 3.2 페이지 구성 가이드라인
모든 메뉴 페이지(About, Programs, Partners, Notice)는 일관된 디자인 시스템을 따릅니다.

*   **Header**: `#134e4a` 배경색, `300px`(모바일) / `450px`(PC) 높이, Glassmorphism 효과 적용.
*   **Typography**: `font-black`, `italic`, `tracking-tighter` 속성을 사용하여 브랜딩 강조.
*   **Spacing**: 표준화된 컨테이너 패딩(`px-6 pt-28 pb-20 md:py-32`) 적용.

---

## 4. 환경 설정 (Environment Variables)

`.env` 파일에 다음 정보가 포함되어야 합니다:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 5. 배포 프로세스 (Deployment)

본 프로젝트는 GitHub Workflows를 통해 자동 배포되도록 구성되어 있습니다.

1.  **코드 수정**: 로컬에서 개발 및 테스트 (`npm run dev`)
2.  **커밋 및 푸시**: `main` 브랜치에 코드를 푸시
3.  **자동 배포**: GitHub Actions가 트리거되어 Firebase Hosting으로 자동 배포됨

*수동 배포 필요 시:* `npm run build` 후 `firebase deploy` 실행.

---

## 6. 유지보수 및 확장 (Maintenance)

*   **새 페이지 추가**: `src/pages`에 컴포넌트 생성 후 `App.tsx`에서 라우트 등록.
*   **스타일 수정**: `tailwind.config.js` 또는 `src/styles/index.css` 수정.
*   **데이터 스키마**: 새로운 콘텐츠 관리 항목 추가 시 `Firestore`의 `overrides` 컬렉션 구조를 참고하십시오.

---

**Last Updated**: 2026-03-01
**Contact**: L.E.A.D Dev Team
