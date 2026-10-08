import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type Project = {
  title: string
  description: string
  href: string
  imageUrl?: string
  imageAlt?: string
  tags?: string[]
  external?: boolean
}

// 포트폴리오/프로토타입에서 재사용 가능한 프로젝트 카드
export function ProjectCard({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const { title, description, href, imageUrl, imageAlt, tags, external } =
    project

  const content = (
    <Card className={className}>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={imageAlt ?? title} className="aspect-video w-full object-cover" />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {tags && tags.length > 0 && (
        <CardContent className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </CardContent>
      )}
    </Card>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  )
}

// 프로젝트 카드를 반응형 그리드로 배치
export function ProjectGrid({
  projects,
  className,
}: {
  projects: Project[]
  className?: string
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.href}
          project={project}
          className="h-full transition-colors hover:bg-muted/50"
        />
      ))}
    </div>
  )
}
