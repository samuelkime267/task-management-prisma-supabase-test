"use client";

import React, { startTransition, useRef } from "react";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas";
import { loginAction } from "../actions";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

type loginFormType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [data, action, isPending] = useActionState(loginAction, undefined);
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : null;

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(() => {
      startTransition(() => action(new FormData(formRef.current!)));
    })(e);
  };

  return (
    <Form
      ref={formRef}
      onSubmit={submit}
      action={action}
      error={data?.error || urlError}
    >
      <Input
        label="email"
        required
        placeholder="example@mail.com"
        type="email"
        error={errors.email?.message}
        disabled={isPending}
        register={register}
      />
      <Input
        label="password"
        required
        placeholder="Enter your password"
        type="password"
        error={errors.password?.message}
        disabled={isPending}
        register={register}
      />
      <Button btnType="primary" disabled={isPending}>
        Log in
      </Button>
    </Form>
  );
}
