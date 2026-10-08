"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCounterStore } from "@/lib/stores/counter-store"

// zustand 스토어를 사용하는 카운터 데모 컴포넌트
export function CounterDemo() {
  const { count, increase, decrease, reset } = useCounterStore()

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Zustand 카운터</CardTitle>
        <CardDescription>
          전역 상태관리 라이브러리 zustand로 만든 카운터 예제입니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <p className="text-4xl font-semibold tabular-nums">{count}</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button variant="outline" onClick={decrease}>
            감소
          </Button>
          <Button variant="secondary" onClick={reset}>
            초기화
          </Button>
          <Button onClick={increase}>증가</Button>
        </div>
      </CardContent>
    </Card>
  )
}
