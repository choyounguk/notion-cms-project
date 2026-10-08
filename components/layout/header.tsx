"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/examples/counter", label: "카운터 예제" },
  { href: "/examples/contact-form", label: "폼 예제" },
  { href: "/examples/project-grid", label: "프로젝트 그리드 예제" },
]

// 모든 페이지에서 공통으로 사용하는 헤더 — 로고, 네비게이션, 다크모드 토글
export function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-sm font-semibold">
          Next Starter Kit
        </Link>

        {/* 데스크탑 네비게이션 — sm 이상에서만 표시 */}
        <nav className="hidden flex-1 flex-wrap items-center justify-end gap-3 text-sm text-muted-foreground sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* 모바일 햄버거 메뉴 — sm 미만에서만 표시 */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="sm:hidden"
                  aria-label="메뉴 열기"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-4">
                {NAV_ITEMS.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
