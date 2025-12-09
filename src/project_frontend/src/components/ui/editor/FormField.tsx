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
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input w-full"
        placeholder={placeholder}
        required={required}
      />
      {!required && <div className="label">Optional</div>}
    </fieldset>
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
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`textarea w-full ${
          rows > 10 ? "h-64" : rows > 5 ? "h-32" : "h-24"
        }`}
        placeholder={placeholder}
        required={required}
      />
      {!required && <div className="label">Optional</div>}
    </fieldset>
  );
}
