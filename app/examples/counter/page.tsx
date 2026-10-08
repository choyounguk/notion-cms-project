import { CounterDemo } from "@/components/examples/counter-demo"

export default function CounterExamplePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">상태관리 예제 (Zustand)</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          간단한 카운터로 zustand 스토어 사용법을 확인해보세요.
        </p>
      </div>
      <CounterDemo />
    </div>
  )
}
