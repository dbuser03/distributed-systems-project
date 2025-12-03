import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export function FormField({ id, label, children }: FormFieldProps) {
  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      {children}
    </div>
  );
}

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
}: TextInputProps) {
  return (
    <FormField id={id} label={label}>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered w-full"
        placeholder={placeholder}
        required={required}
      />
    </FormField>
  );
}

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  required,
}: TextAreaProps) {
  return (
    <FormField id={id} label={label}>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="textarea textarea-bordered w-full"
        rows={rows}
        placeholder={placeholder}
        required={required}
      />
    </FormField>
  );
}
