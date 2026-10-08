# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint (eslint-config-next core-web-vitals + typescript)
```

테스트 러너는 설정되어 있지 않다. 타입 검사는 `npx tsc --noEmit`으로 수행한다.

shadcn/ui 컴포넌트 추가: `npx shadcn@latest add <component>`

## 아키텍처

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 스타터킷이다. 경로 별칭은 `@/*` → 프로젝트 루트.

- `app/` — 라우트. `app/layout.tsx`가 `ThemeProvider`(next-themes) → `Toaster` → `Header`/`main`/`Footer` 순으로 전체를 감싼다. `RootLayout`은 전역 타입 `LayoutProps<"/">`를 사용한다.
- `app/examples/*` — 예제 페이지(counter, contact-form, project-grid). 페이지는 얇게 두고 실제 UI는 `components/examples/*-demo.tsx`에 둔다.
- `components/ui/` — shadcn/ui 컴포넌트. 스타일은 `base-nova`이며 Radix가 아니라 **Base UI(`@base-ui/react`)** 기반이다. Radix 기준의 shadcn 예제 코드를 그대로 쓰면 API가 다를 수 있다.
- `components/layout/`, `components/sections/` — 공통 레이아웃과 페이지 조립용 섹션(`ProjectCard`/`ProjectGrid`).
- `lib/stores/` — Zustand 스토어, `lib/validations/` — Zod 스키마. 폼은 React Hook Form + `zodResolver`로 스키마와 연결하고 타입은 `z.infer`로 뽑는다.
- `.claude/` — 프로젝트 전용 설정(`settings.json`의 Notification 훅), 보안 검사 서브에이전트(`agents/security-reviewer.md`), 커스텀 커맨드(`commands/review-my-uxui.md`).

### 알아둘 점

- `cn` 유틸은 `"cn"` npm 패키지에서 가져온다. `components/ui/*`는 모두 `import { cn } from "cn"`을 쓰며, `lib/utils.ts`는 이를 재export만 한다. shadcn CLI가 생성한 코드와 맞추려면 `cn` import 방식을 기존 파일과 일관되게 유지한다.
- 토스트는 `components/ui/toast.tsx`의 `toast` 매니저(Base UI Toast)를 사용하며, 루트 레이아웃의 `<Toaster>`가 뷰포트를 렌더링한다.
- 다크모드는 `.dark` 클래스 기반이다(`globals.css`의 `@custom-variant dark`). 색상은 `globals.css`의 CSS 변수 토큰으로 정의한다.
- Tailwind v4를 쓰므로 `tailwind.config` 파일이 없고, 설정은 `app/globals.css`에 있다.

## 프로젝트 규칙

- 언어: 응답·코드 주석·커밋 메시지·문서는 한국어, 변수명/함수명은 영어.
- 스타일: 들여쓰기 2칸, 변수·함수는 camelCase, 컴포넌트는 PascalCase.
- `any` 타입 금지, 컴포넌트는 분리해 재사용, 반응형 필수.
