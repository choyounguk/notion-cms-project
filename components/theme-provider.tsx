"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

// next-themes의 ThemeProvider는 클라이언트 훅을 사용하므로
// 별도 클라이언트 컴포넌트로 분리해서 서버 컴포넌트인 layout에서 사용한다
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
