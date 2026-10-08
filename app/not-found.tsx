import Link from "next/link"

import { Button } from "@/components/ui/button"

// notFound() 호출 및 미매칭 라우트를 처리하는 전역 404 페이지
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="text-sm text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        홈으로 돌아가기
      </Button>
    </div>
  )
}
