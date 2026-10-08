import { create } from "zustand"

type CounterState = {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
}

// 카운트 상태와 증가/감소/리셋 액션을 갖는 간단한 zustand 스토어 예제
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))
