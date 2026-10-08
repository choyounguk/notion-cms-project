import {
  ProjectGrid,
  type Project,
} from "@/components/sections/project-grid"

const DEMO_PROJECTS: Project[] = [
  {
    title: "쇼핑몰 프로토타입",
    description: "장바구니와 결제 플로우를 빠르게 검증하기 위한 프로토타입입니다.",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=600&h=400&fit=crop",
    imageAlt: "쇼핑몰 목업 이미지",
    tags: ["Next.js", "Tailwind"],
  },
  {
    title: "개인 블로그",
    description: "MDX 기반으로 글을 작성하고 배포하는 개인 블로그입니다.",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    imageAlt: "블로그 목업 이미지",
    tags: ["MDX", "shadcn/ui"],
  },
  {
    title: "회사 소개 페이지",
    description: "태그 없이 이미지와 설명만으로 구성한 카드 예시입니다.",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    imageAlt: "회사 소개 페이지 목업 이미지",
  },
  {
    title: "대시보드 UI 실험",
    description: "이미지 없이 태그만으로 구성한 카드 예시입니다.",
    href: "#",
    tags: ["Zustand", "Chart"],
  },
  {
    title: "GitHub 저장소",
    description: "외부 링크(external)로 연결되는 카드 예시입니다.",
    href: "https://github.com",
    external: true,
    tags: ["오픈소스"],
  },
]

// ProjectGrid 컴포넌트에 더미 데이터를 전달하는 데모 래퍼
export function ProjectGridDemo() {
  return <ProjectGrid projects={DEMO_PROJECTS} />
}
