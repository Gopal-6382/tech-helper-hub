"use client";

import { Controller } from "react-hook-form";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import { FormError } from "./form-error";

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function CheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  className,
}: CheckboxFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field invalid={fieldState.invalid} className={className}>
          <div className="flex items-start gap-3">
            <Checkbox
              id={field.name}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
            />

            <div className="space-y-1">
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              {description ? (
                <FieldDescription>{description}</FieldDescription>
              ) : null}
            </div>
          </div>

          <FormError error={fieldState.error} />
        </Field>
      )}
    />
  );
}
