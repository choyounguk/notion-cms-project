import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const STACK_BADGES = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Zustand",
  "React Hook Form + Zod",
  "next-themes",
]

const EXAMPLE_LINKS = [
  {
    href: "/examples/counter",
    title: "상태관리 예제",
    description: "zustand로 만든 카운터 데모를 확인해보세요.",
  },
  {
    href: "/examples/contact-form",
    title: "폼 검증 예제",
    description: "react-hook-form과 zod로 검증되는 폼 데모를 확인해보세요.",
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          모던 웹 개발을 위한 Next.js 스타터킷
        </h1>
        <p className="text-muted-foreground">
          바로 개발을 시작할 수 있도록 상태관리, 폼 검증, 다크모드까지 미리
          구성해두었습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {STACK_BADGES.map((badge) => (
            <Badge key={badge} variant="secondary">
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {EXAMPLE_LINKS.map((example) => (
          <Link key={example.href} href={example.href}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-medium text-primary">
                예제 보러가기 &rarr;
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
