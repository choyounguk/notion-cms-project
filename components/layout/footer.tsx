// 모든 페이지 하단에 노출되는 간단한 푸터
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Next Starter Kit</p>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Next.js 문서
        </a>
      </div>
    </footer>
  )
}
