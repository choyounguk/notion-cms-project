"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 라이트/다크/시스템 3단 테마 전환 토글
export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon" aria-label="테마 전환">
            <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          라이트 모드
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          다크 모드
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor />
          시스템 설정
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
