// frontend/components/form/category-select-field.tsx

"use client";

import { Controller } from "react-hook-form";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { CategorySelect } from "@/frontend/components/common/category-select";

import { Field } from "./field";
import { FieldLabel } from "./field-label";
import { FormError } from "./form-error";

type CategorySelectFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

export function CategorySelectField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "Category",
  placeholder = "Choose a category",
  required,
  disabled,
  className,
}: CategorySelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field invalid={fieldState.invalid} className={className}>
          <FieldLabel required={required}>{label}</FieldLabel>

          <CategorySelect
            value={field.value ?? null}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
          />

          <FormError error={fieldState.error} />
        </Field>
      )}
    />
  );
}
