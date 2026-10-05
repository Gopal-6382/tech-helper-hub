"use client";

import * as React from "react";

import { Controller } from "react-hook-form";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import { FormError } from "./form-error";
import { Input } from "@/components/ui/input";

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number" | "url" | "tel";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  type = "text",
  placeholder,
  disabled,
  className,
}: TextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field invalid={fieldState.invalid} className={className}>
          {label ? (
            <FieldLabel htmlFor={field.name} required={required}>
              {label}
            </FieldLabel>
          ) : null}

          <Input
            {...field}
            id={field.name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={fieldState.invalid}
          />

          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}

          <FormError error={fieldState.error} />
        </Field>
      )}
    />
  );
}
