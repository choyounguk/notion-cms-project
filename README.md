# 개인 개발 블로그 (Notion CMS)

Notion을 CMS로 사용하는 개인 기술 블로그입니다. Notion 데이터베이스에서 글을 작성하고 `발행됨` 상태로 바꾸면 별도 배포 작업 없이 블로그에 자동 반영됩니다.

> 자세한 기획은 [docs/PRD.md](docs/PRD.md)를 참고하세요.

## 주요 기능

- Notion 데이터베이스에서 발행된 글 목록 조회
- 개별 글 상세 페이지
- 카테고리별 글 목록
- 반응형 디자인 + 다크모드
- (예정) 검색

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Notion API](https://developers.notion.com) (`@notionhq/client`) — CMS
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (`base-nova` 스타일, [Base UI](https://base-ui.com) 기반)
- [Lucide React](https://lucide.dev) — 아이콘
- [Zustand](https://zustand.docs.pmnd.rs) — 상태관리
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) — 폼/검증
- [next-themes](https://github.com/pacocoursey/next-themes) — 다크모드
- 배포: [Vercel](https://vercel.com)

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 설정합니다. (Notion 연동 구현 후 사용)

```bash
NOTION_API_KEY=         # Notion Integration 토큰
NOTION_DATABASE_ID=     # 블로그 데이터베이스 ID
```

### Notion 데이터베이스 구조

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| Title | title | 제목 |
| Category | select | 카테고리 |
| Tags | multi_select | 태그 |
| Published | date | 발행일 |
| Status | select | 초안 / 발행됨 |

본문은 페이지 콘텐츠를 사용합니다. `Status`가 `발행됨`인 글만 노출됩니다.

## 스크립트

```bash
npm run dev     # 개발 서버
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint
```

## 디렉토리 구조

```
app/                    # App Router 라우트
  examples/               # 스타터킷 예제 페이지 (counter, contact-form, project-grid)
  not-found.tsx           # 커스텀 404 페이지
  error.tsx               # 커스텀 에러 페이지
components/
  ui/                    # shadcn/ui 컴포넌트
  layout/                # Header, Footer 등 공통 레이아웃
  sections/              # 페이지 조립용 섹션 컴포넌트
  examples/              # 예제 데모 컴포넌트
lib/
  stores/                # zustand 스토어
  validations/           # zod 스키마
docs/
  PRD.md                 # 제품 요구사항 문서
```

## shadcn/ui 컴포넌트 추가하기

```bash
npx shadcn@latest add <component>
```

이 프로젝트는 `base-nova` 스타일(Base UI 기반)을 사용하므로, 새 컴포넌트를 추가한 뒤 `components/ui/button.tsx`와 동일하게 `@base-ui/react`와 `cn` 유틸을 사용하는지 확인하세요.
