"use client";

import React, { startTransition, useRef } from "react";
import { Input, Button, Form } from "@/components";
import { useActionState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas";
import { registerAction } from "../actions";
import { z } from "zod";

type registrationFormType = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const [data, action, isPending] = useActionState(registerAction, undefined);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<registrationFormType>({
    resolver: zodResolver(registerSchema),
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(() => {
      startTransition(() => action(new FormData(formRef.current!)));
    })(e);
  };

  return (
    <Form ref={formRef} onSubmit={submit} action={action} error={data?.error}>
      <Input
        label="name"
        required
        placeholder="Enter your name"
        error={errors.name?.message}
        disabled={isPending}
        register={register}
      />
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
      <Input
        label="confirmPassword"
        labelText="Confirm Password"
        required
        placeholder="Enter your password again"
        type="password"
        error={errors.confirmPassword?.message}
        disabled={isPending}
        register={register}
      />
      <Button btnType="primary" disabled={isPending}>
        Create an account
      </Button>
    </Form>
  );
}
