import { ProjectGridDemo } from "@/components/examples/project-grid-demo"

export default function ProjectGridExamplePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">프로젝트 카드/그리드 예제</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          포트폴리오에 바로 재사용할 수 있는 ProjectCard/ProjectGrid
          컴포넌트입니다.
          <br />
          components/sections/project-grid.tsx를 참고해 홈페이지나
          포트폴리오 페이지에 재사용하세요.
        </p>
      </div>
      <ProjectGridDemo />
    </div>
  )
}
