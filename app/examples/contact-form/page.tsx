import { ContactFormDemo } from "@/components/examples/contact-form-demo"

export default function ContactFormExamplePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">폼 검증 예제 (RHF + Zod)</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          react-hook-form과 zod로 검증되는 연락처 폼을 확인해보세요.
        </p>
      </div>
      <ContactFormDemo />
    </div>
  )
}
