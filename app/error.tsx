"use client"

import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// 세그먼트 렌더링 중 발생한 에러를 처리 (Next.js 16.3.5부터 reset 대신 retry 사용)
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-destructive">오류</p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        문제가 발생했습니다
      </h1>
      <p className="text-sm text-muted-foreground">
        페이지를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
      </p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => retry()}>
          다시 시도
        </Button>
        <Button nativeButton={false} render={<Link href="/" />}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
