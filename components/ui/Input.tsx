"use client";

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ─── TextInput ────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:    string;
  hint?:     string;
  error?:    string;
  variant?:  "underline" | "box";
  className?: string;
  wrapClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, variant = "underline", className, wrapClassName, ...rest }, ref) => {
    return (
      <div className={cn("form-group", wrapClassName)}>
        {label && <label className="form-label">{label}</label>}
        <input
          ref={ref}
          className={cn(
            variant === "underline" ? "input-luxury" : "input-box",
            error && "border-[#C97A7A]",
            className
          )}
          {...rest}
        />
        {error && <p className="form-error">{error}</p>}
        {hint && !error && <p className="form-hint">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:    string;
  hint?:     string;
  error?:    string;
  className?: string;
  wrapClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, wrapClassName, ...rest }, ref) => {
    return (
      <div className={cn("form-group", wrapClassName)}>
        {label && <label className="form-label">{label}</label>}
        <textarea
          ref={ref}
          className={cn("textarea-luxury", error && "border-[#C97A7A]", className)}
          {...rest}
        />
        {error && <p className="form-error">{error}</p>}
        {hint && !error && <p className="form-hint">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?:    string;
  hint?:     string;
  error?:    string;
  className?: string;
  wrapClassName?: string;
  options:   { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, options, placeholder, className, wrapClassName, ...rest }, ref) => {
    return (
      <div className={cn("form-group", wrapClassName)}>
        {label && <label className="form-label">{label}</label>}
        <select
          ref={ref}
          className={cn("select-luxury", error && "border-[#C97A7A]", className)}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="form-error">{error}</p>}
        {hint && !error && <p className="form-hint">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label:     string;
  hint?:     string;
  error?:    string;
  className?: string;
}

export function Checkbox({ label, hint, error, className, ...rest }: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className={cn("checkbox-luxury mt-[1px]", className)}
          {...rest}
        />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            transition: "color 0.2s ease",
          }}
          className="group-hover:text-[var(--text-secondary)]"
        >
          {label}
        </span>
      </label>
      {error && <p className="form-error ml-7">{error}</p>}
      {hint && !error && <p className="form-hint ml-7">{hint}</p>}
    </div>
  );
}

// ─── NewsletterInput ──────────────────────────────────────────────────────────
// Inline email input with CTA — common pattern across the site

interface NewsletterInputProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?:    (email: string) => void;
  className?:   string;
}

export function NewsletterInput({
  placeholder = "Your email address",
  buttonLabel = "Subscribe",
  onSubmit,
  className,
}: NewsletterInputProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    onSubmit?.(email);
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-0", className)}>
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="input-luxury flex-1"
        style={{ borderBottom: "1px solid var(--border-mid)" }}
      />
      <button
        type="submit"
        className="btn btn-ghost btn-sm"
        style={{ paddingLeft: "1.25rem", paddingRight: 0, color: "var(--gold)" }}
      >
        {buttonLabel}
      </button>
    </form>
  );
}
