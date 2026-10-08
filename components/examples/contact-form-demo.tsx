"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-form"

// react-hook-form + zod 검증을 사용하는 연락처 폼 데모
export function ContactFormDemo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = (values: ContactFormValues) => {
    toast.add({
      title: "메시지가 제출되었습니다",
      description: `${values.name}님, 문의해주셔서 감사합니다.`,
      type: "success",
    })
    reset()
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>연락처 폼</CardTitle>
        <CardDescription>
          react-hook-form과 zod로 검증되는 폼 예제입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">이름</FieldLabel>
              <Input id="name" placeholder="홍길동" {...register("name")} />
              <FieldError errors={errors.name ? [errors.name] : undefined} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">이메일</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register("email")}
              />
              <FieldError errors={errors.email ? [errors.email] : undefined} />
            </Field>
            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="message">메시지</FieldLabel>
              <Textarea
                id="message"
                placeholder="문의 내용을 입력해주세요."
                {...register("message")}
              />
              <FieldError
                errors={errors.message ? [errors.message] : undefined}
              />
            </Field>
            <Button type="submit" disabled={isSubmitting}>
              보내기
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
