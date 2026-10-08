# PRD: 개인 개발 블로그 (Notion CMS)

| 항목 | 내용 |
| --- | --- |
| 문서 버전 | v0.1 (초안) |
| 작성일 | 2026-10-08 |
| 프로젝트명 | 개인 개발 블로그 |
| 상태 | MVP 기획 |

---

## 1. 개요

### 1.1 목적
Notion을 CMS로 활용하는 개인 기술 블로그를 구축한다. Notion에서 글을 작성하고 발행 상태로 바꾸면 별도의 배포 작업이나 별도 관리자 페이지 없이 블로그에 자동 반영된다.

### 1.2 배경 및 CMS 선택 이유
- 이미 익숙한 Notion 에디터로 글을 쓰고 관리할 수 있다 (별도 CMS 학습 비용 없음).
- Notion에서 글을 작성하면 블로그에 자동 반영되므로 "쓰기 → 발행" 흐름이 단순하다.
- 관리자 페이지, DB, 인증 시스템을 직접 만들 필요가 없다.

### 1.3 목표
- 글 작성부터 공개까지 코드 수정·수동 배포 없이 완료한다.
- 모바일/태블릿/데스크톱 어디서나 읽기 편한 UI를 제공한다.
- 초기 로딩이 빠르고 검색 엔진에 노출되기 좋은 구조(SSG/ISR)를 갖춘다.

### 1.4 비목표 (MVP 제외)
- 댓글, 좋아요, 구독 등 독자 참여 기능
- 다중 작성자 / 권한 관리
- 자체 관리자(Admin) 페이지
- 다국어 지원

---

## 2. 대상 사용자

| 구분 | 설명 | 핵심 니즈 |
| --- | --- | --- |
| 작성자 (블로그 운영자) | 블로그 소유자 본인 | Notion에서 쓰기만 하면 자동 게시 |
| 독자 | 개발자, 채용 담당자, 동료 | 원하는 글을 빠르게 찾고 읽기 편한 화면 |

---

## 3. 기술 스택

| 영역 | 기술 |
| --- | --- |
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| 상태관리 / 폼 | Zustand, React Hook Form + Zod (필요 시) |
| Deployment | Vercel |

> **참고:** 현재 저장소의 `CLAUDE.md`에는 Next.js 16으로 기재되어 있다. 구현 시작 전 `package.json`의 실제 버전을 확인하고 `node_modules/next/dist/docs/`의 가이드를 따른다.

---

## 4. Notion 데이터베이스 구조

| 속성명 | 표시명 | Notion 타입 | 설명 |
| --- | --- | --- | --- |
| Title | 제목 | `title` | 글 제목 |
| Category | 카테고리 | `select` | 단일 카테고리 (필터링 기준) |
| Tags | 태그 | `multi_select` | 복수 태그 |
| Published | 발행일 | `date` | 정렬 기준 (최신순) |
| Status | 상태 | `select` | `초안` / `발행됨` |
| Content | 본문 | page content | 페이지 본문 블록 |

### 4.1 데이터 규칙
- `Status = 발행됨`인 글만 블로그에 노출한다. `초안`은 절대 노출하지 않는다.
- 목록은 `Published` 내림차순(최신순)으로 정렬한다.
- 글 식별자(URL slug)는 Notion 페이지 ID를 사용한다 (MVP). 추후 별도 `Slug` 속성 추가를 검토한다.

### 4.2 타입 정의 (예시)

```ts
export interface Post {
  id: string;
  title: string;
  category: string | null;
  tags: string[];
  publishedAt: string; // ISO 날짜
  status: "초안" | "발행됨";
}
```

---

## 5. 기능 요구사항

### 5.1 기능 목록 및 우선순위

| ID | 기능 | 우선순위 | MVP |
| --- | --- | --- | --- |
| F1 | Notion 데이터베이스에서 글 목록 가져오기 | P0 | O |
| F2 | 개별 글 상세 페이지 표시 | P0 | O |
| F3 | 카테고리별 필터링 | P1 | O (카테고리 페이지) |
| F4 | 검색 기능 | P2 | X (MVP 이후) |
| F5 | 반응형 디자인 | P0 | O |

### 5.2 F1. 글 목록 조회
- Notion API로 `Status = 발행됨` 글을 조회하고 `Published` 내림차순으로 정렬한다.
- 카드에 제목, 카테고리, 태그, 발행일을 표시한다.
- 100건 초과 시 `next_cursor` 기반 페이지네이션을 처리한다 (Notion API는 1회 최대 100건).
- 서버 컴포넌트에서 호출하며 API 키는 클라이언트에 노출하지 않는다.

**수용 기준**
- [ ] 발행된 글만 최신순으로 표시된다.
- [ ] 초안 글은 어떤 경로로도 노출되지 않는다.
- [ ] 글이 없을 때 빈 상태(Empty State) 메시지가 표시된다.

### 5.3 F2. 글 상세 페이지
- 경로: `/posts/[id]`
- 제목, 카테고리, 태그, 발행일과 본문 블록을 렌더링한다.
- 지원 블록: 문단, 제목(h1~h3), 목록(불릿/번호), 코드 블록(언어별 하이라이트), 인용, 구분선, 이미지, 링크, 굵게/기울임/인라인 코드.
- 존재하지 않거나 초안인 글은 404를 반환한다.
- 목록으로 돌아가는 링크를 제공한다.

**수용 기준**
- [ ] 코드 블록이 읽기 쉽게 표시된다.
- [ ] Notion 이미지 URL은 만료되므로 빌드/재검증 시점에 최신 URL로 가져온다 (또는 이미지 최적화 처리).
- [ ] 초안/없는 ID 접근 시 404 페이지가 표시된다.

### 5.4 F3. 카테고리별 필터링
- 경로: `/categories/[category]`
- 해당 카테고리의 발행된 글만 최신순으로 표시한다.
- 상단에 전체 카테고리 목록(내비게이션/칩)을 표시해 이동할 수 있게 한다.
- 카테고리 목록은 Notion DB 속성의 `select` 옵션 또는 글 데이터에서 추출한다.

**수용 기준**
- [ ] 선택한 카테고리의 글만 표시된다.
- [ ] 현재 카테고리가 시각적으로 구분된다.
- [ ] 존재하지 않는 카테고리는 빈 상태 또는 404로 처리한다.

### 5.5 F4. 검색 (MVP 이후)
- 제목/태그 기준 검색을 제공한다.
- 초기 구현안: 서버에서 가져온 목록을 클라이언트에서 필터링 (소규모 글 수 기준).
- 글이 많아지면 Notion API `filter`(title contains) 또는 외부 검색 도구로 전환을 검토한다.

### 5.6 F5. 반응형 디자인
- Tailwind 브레이크포인트 기준 모바일 우선(mobile-first)으로 설계한다.
- 글 목록 그리드: 모바일 1열 → 태블릿 2열 → 데스크톱 3열.
- 본문은 가독성을 위해 최대 너비를 제한한다 (`max-w-prose` 수준).
- 다크모드를 지원한다 (`next-themes`, 기존 스타터킷 설정 활용).

---

## 6. 화면 구성

| 화면 | 경로 | 주요 구성 |
| --- | --- | --- |
| 홈 | `/` | 헤더, 최근 글 목록(카드 그리드), 푸터 |
| 글 상세 | `/posts/[id]` | 제목/메타 정보, 본문, 목록으로 돌아가기 |
| 카테고리 | `/categories/[category]` | 카테고리 내비게이션, 해당 카테고리 글 목록 |
| 404 | - | 안내 메시지, 홈 이동 링크 |

### 6.1 공통 컴포넌트 (재사용 단위)
- `PostCard` / `PostList` — 글 카드 및 목록
- `CategoryNav` — 카테고리 필터 내비게이션
- `NotionRenderer` — Notion 블록 → React 렌더링
- `Header` / `Footer` — 기존 레이아웃 활용

---

## 7. 아키텍처

### 7.1 데이터 흐름
```
Notion DB ──(Notion API)──> Next.js 서버(RSC / ISR) ──> 정적 HTML 캐시 ──> 독자
```

### 7.2 렌더링 전략
- **ISR(Incremental Static Regeneration)**: 정적 생성 + 주기적 재검증 (`revalidate`, 예: 60~300초).
- 글 상세는 `generateStaticParams`로 사전 생성하고, 새 글은 요청 시 생성한다.
- 선택 확장: Notion 변경 시 즉시 반영이 필요하면 Webhook/수동 `revalidateTag` 엔드포인트를 추가한다.

### 7.3 디렉터리 구조 (제안)
```
app/
  page.tsx                      # 홈
  posts/[id]/page.tsx           # 글 상세
  categories/[category]/page.tsx
components/
  blog/                         # PostCard, PostList, CategoryNav, NotionRenderer
lib/
  notion/                       # client.ts, posts.ts, mappers.ts
  types/                        # Post 등 타입 정의
docs/
  PRD.md
```

### 7.4 환경 변수

| 변수 | 설명 |
| --- | --- |
| `NOTION_API_KEY` | Notion Integration 토큰 (서버 전용) |
| `NOTION_DATABASE_ID` | 블로그 데이터베이스 ID |

- `.env.local`에만 저장하고 저장소에 커밋하지 않는다. `NEXT_PUBLIC_` 접두사를 사용하지 않는다.
- Vercel 프로젝트 환경 변수에도 동일하게 등록한다.

---

## 8. 비기능 요구사항

| 항목 | 기준 |
| --- | --- |
| 성능 | Lighthouse Performance 90+ (모바일), LCP 2.5초 이내 |
| SEO | 페이지별 `metadata`(title/description/OG), `sitemap.xml`, `robots.txt` |
| 접근성 | 시맷틱 마크업, 키보드 탐색, 이미지 `alt`, 충분한 색 대비 (WCAG AA) |
| 보안 | API 키 서버 전용, 초안 노출 방지, 외부 링크 `rel="noopener noreferrer"` |
| 안정성 | Notion API 오류·속도 제한(평균 3 req/s) 시 캐시 활용 및 에러 UI 제공 |
| 코드 품질 | `any` 금지, TypeScript strict, ESLint 통과, 컴포넌트 분리 |

---

## 9. MVP 범위

### 포함
- Notion API 연동 (목록/상세 조회)
- 글 목록 및 상세 페이지
- 카테고리별 목록 페이지
- 기본 스타일링 (Tailwind + shadcn/ui, 다크모드)
- 반응형 디자인

### 제외 (후속 단계)
- 검색 기능
- 태그별 필터링 페이지
- RSS 피드, 조회수, 댓글
- Webhook 기반 즉시 갱신

---

## 10. 구현 단계

| 단계 | 작업 | 산출물 / 완료 기준 |
| --- | --- | --- |
| 1 | Notion API 패키지 설치 및 환경 설정 | `@notionhq/client` 설치, `.env.local` 구성, `lib/notion/client.ts` |
| 2 | Notion 데이터베이스 생성 및 API 키 설정 | 4장 구조의 DB 생성, Integration 생성 및 DB 연결(공유), 샘플 글 3건 이상 |
| 3 | 글 목록 페이지 구현 | 홈 목록, `PostCard`, 카테고리 페이지, 빈 상태 처리 |
| 4 | 글 상세 페이지 구현 | `NotionRenderer`, 404 처리, 메타데이터 |
| 5 | 스타일링 및 최적화 | 반응형 점검, 다크모드, ISR 설정, Lighthouse/SEO 점검, Vercel 배포 |

### 10.1 단계 2 상세 (Notion 설정)
1. Notion에서 데이터베이스를 생성하고 4장의 속성을 추가한다.
2. [Notion Integrations](https://www.notion.so/profile/integrations)에서 내부 통합(Internal Integration)을 만들고 토큰을 발급한다.
3. 데이터베이스 페이지에서 `연결 추가`로 해당 Integration을 연결한다.
4. 데이터베이스 URL에서 ID를 추출해 `NOTION_DATABASE_ID`로 설정한다.

---

## 11. 위험 및 고려사항

| 위험 | 영향 | 대응 |
| --- | --- | --- |
| Notion API 속도 제한 / 지연 | 빌드·렌더 지연 | ISR 캐시, 요청 최소화 |
| Notion 이미지 URL 만료 (약 1시간) | 이미지 깨짐 | 재검증 주기 단축 또는 이미지 자체 호스팅/프록시 |
| 지원하지 않는 블록 타입 | 본문 누락 | 미지원 블록은 무시 또는 안내 표시, 점진적 지원 확대 |
| 초안 노출 | 미완성 글 공개 | 모든 쿼리에 `Status = 발행됨` 필터 강제, 상세에서도 재검증 |
| 글 증가에 따른 성능 | 빌드 시간 증가 | `generateStaticParams` 범위 제한, 온디맨드 ISR |
| Next.js 버전 불일치 (15 vs 16) | API/규칙 차이 | 착수 전 버전 확인 및 공식 문서 참조 |

---

## 12. 성공 지표

- Notion에서 `발행됨`으로 변경 후 재검증 주기 내에 블로그에 반영된다.
- 모바일/데스크톱 모두 레이아웃 깨짐이 없다.
- Lighthouse 모바일 Performance/SEO/Accessibility 90+.
- MVP 기능(F1, F2, F3, F5)이 수용 기준을 모두 만족한다.

---

## 13. 오픈 이슈

- [ ] URL slug를 페이지 ID로 둘지, 별도 `Slug` 속성을 추가할지
- [ ] 본문 렌더링을 직접 구현할지(`NotionRenderer`), 라이브러리(`react-notion-x` 등)를 쓸지
- [ ] 이미지 처리 방식 (Notion URL 직접 사용 vs 자체 호스팅)
- [ ] 변경 즉시 반영(Webhook)이 필요한지, 주기적 재검증으로 충분한지
