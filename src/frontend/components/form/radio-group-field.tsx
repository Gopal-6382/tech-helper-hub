"use client";

import { Controller } from "react-hook-form";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Field } from "./field";
import { FieldDescription } from "./field-description";
import { FieldLabel } from "./field-label";
import { FormError } from "./form-error";
import { type SelectOption } from "./select-field";

type RadioGroupFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  options: SelectOption[];
  disabled?: boolean;
  className?: string;
};

export function RadioGroupField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  disabled,
  className,
}: RadioGroupFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field invalid={fieldState.invalid} className={className}>
          {label ? <FieldLabel>{label}</FieldLabel> : null}

          <RadioGroup
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
            className="gap-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-3">
                <RadioGroupItem
                  id={`${field.name}-${option.value}`}
                  value={option.value}
                />

                <FieldLabel
                  htmlFor={`${field.name}-${option.value}`}
                  className="font-normal"
                >
                  {option.label}
                </FieldLabel>
              </div>
            ))}
          </RadioGroup>

          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}

          <FormError error={fieldState.error} />
        </Field>
      )}
    />
  );
}
