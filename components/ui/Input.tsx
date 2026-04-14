"use client";

import {
  forwardRef,
  useState,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined | null)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── FormGroup ────────────────────────────────────────────────────────────────

interface FormGroupProps {
  children: ReactNode;
  className?: string;
}
export function FormGroup({ children, className }: FormGroupProps) {
  return (
    <div className={cls("form-group", className)}>
      {children}
    </div>
  );
}

// ─── FormLabel ────────────────────────────────────────────────────────────────

interface FormLabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
}
export function FormLabel({ htmlFor, children, required }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children}
      {required && (
        <span aria-hidden style={{ color: "var(--gold)", marginLeft: "0.3rem" }}>*</span>
      )}
    </label>
  );
}

// ─── FormError ────────────────────────────────────────────────────────────────

export function FormError({ children }: { children: ReactNode }) {
  return <p className="form-error" role="alert">{children}</p>;
}

// ─── FormHint ─────────────────────────────────────────────────────────────────

export function FormHint({ children }: { children: ReactNode }) {
  return <p className="form-hint">{children}</p>;
}

// ─── Input ────────────────────────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?:         string;
  hint?:          string;
  error?:         string;
  variant?:       "underline" | "box";
  wrapClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, variant = "underline", className, wrapClassName, id, required, ...rest },
  ref
) {
  const uid   = useId();
  const inputId = id ?? uid;

  return (
    <div className={cls("form-group", wrapClassName)}>
      {label && (
        <FormLabel htmlFor={inputId} required={required}>
          {label}
        </FormLabel>
      )}
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        className={cls(
          variant === "underline" ? "input-luxury" : "input-box",
          error ? "!border-[#C97A7A]" : "",
          className
        )}
        {...rest}
      />
      {error && <FormError><span id={`${inputId}-err`}>{error}</span></FormError>}
      {hint && !error && <FormHint><span id={`${inputId}-hint`}>{hint}</span></FormHint>}
    </div>
  );
});
Input.displayName = "Input";

// ─── PasswordInput ────────────────────────────────────────────────────────────

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, ...rest }, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <div style={{ position: "relative" }}>
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cls(className, "pr-10")}
          {...rest}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          style={{
            position:   "absolute",
            right:      "0",
            bottom:     "0.75rem",
            background: "none",
            border:     "none",
            cursor:     "pointer",
            color:      "var(--text-muted)",
            padding:    "0.25rem",
            display:    "flex",
            alignItems: "center",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          {visible ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// ─── Textarea ─────────────────────────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?:         string;
  hint?:          string;
  error?:         string;
  wrapClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, wrapClassName, id, required, ...rest },
  ref
) {
  const uid = useId();
  const textareaId = id ?? uid;

  return (
    <div className={cls("form-group", wrapClassName)}>
      {label && <FormLabel htmlFor={textareaId} required={required}>{label}</FormLabel>}
      <textarea
        ref={ref}
        id={textareaId}
        required={required}
        aria-invalid={!!error}
        className={cls("textarea-luxury", error ? "!border-[#C97A7A]" : "", className)}
        {...rest}
      />
      {error && <FormError>{error}</FormError>}
      {hint && !error && <FormHint>{hint}</FormHint>}
    </div>
  );
});
Textarea.displayName = "Textarea";

// ─── Select ───────────────────────────────────────────────────────────────────

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?:         string;
  hint?:          string;
  error?:         string;
  placeholder?:   string;
  wrapClassName?: string;
  options:        { value: string; label: string; disabled?: boolean }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, options, placeholder, className, wrapClassName, id, required, ...rest },
  ref
) {
  const uid = useId();
  const selectId = id ?? uid;

  return (
    <div className={cls("form-group", wrapClassName)}>
      {label && <FormLabel htmlFor={selectId} required={required}>{label}</FormLabel>}
      <select
        ref={ref}
        id={selectId}
        required={required}
        aria-invalid={!!error}
        className={cls("select-luxury", error ? "!border-[#C97A7A]" : "", className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <FormError>{error}</FormError>}
      {hint && !error && <FormHint>{hint}</FormHint>}
    </div>
  );
});
Select.displayName = "Select";

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label:      string;
  hint?:      string;
  error?:     string;
}

export function Checkbox({ label, hint, error, className, id, ...rest }: CheckboxProps) {
  const uid = useId();
  const checkId = id ?? uid;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label
        htmlFor={checkId}
        style={{
          display:    "flex",
          alignItems: "flex-start",
          gap:        "0.75rem",
          cursor:     "pointer",
        }}
      >
        <input
          type="checkbox"
          id={checkId}
          className={cls("checkbox-luxury", className)}
          style={{ marginTop: "1px" }}
          {...rest}
        />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "0.78rem",
            color:      "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      </label>
      {error && <FormError>{error}</FormError>}
      {hint && !error && <FormHint>{hint}</FormHint>}
    </div>
  );
}

// ─── NewsletterInput ──────────────────────────────────────────────────────────

export interface NewsletterInputProps {
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?:    (email: string) => Promise<void> | void;
  className?:   string;
}

export function NewsletterInput({
  placeholder = "Your email address",
  buttonLabel = "Subscribe →",
  onSubmit,
  className,
}: NewsletterInputProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    const fd    = new FormData(e.currentTarget);
    const email = fd.get("email") as string;
    setLoading(true);
    try {
      await onSubmit?.(email);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cls(className)}
      style={{ display: "flex", borderBottom: "1px solid var(--border-mid)", maxWidth: "400px" }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder={placeholder}
        className="input-luxury"
        style={{ flex: 1, borderBottom: "none" }}
        disabled={loading}
      />
      <button
        type="submit"
        className="btn btn-ghost btn-sm"
        disabled={loading}
        style={{ color: "var(--gold)", paddingLeft: "1rem", paddingRight: 0, flexShrink: 0 }}
      >
        {loading ? "…" : buttonLabel}
      </button>
    </form>
  );
}
