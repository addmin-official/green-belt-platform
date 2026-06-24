import React from 'react';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs uppercase font-mono text-slate-400 tracking-wider">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 bg-[#0B1420] border ${
          error ? 'border-red-500' : 'border-[#1E293B]'
        } text-white placeholder-slate-500 rounded focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D] outline-none text-xs transition-all duration-150 ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] font-mono text-red-500">{error}</span>}
      {!error && helperText && <span className="text-[10px] font-mono text-slate-500">{helperText}</span>}
    </div>
  );
};

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string | number; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs uppercase font-mono text-slate-400 tracking-wider">
        {label}
      </label>
      <select
        id={id}
        className={`w-full px-3 py-2 bg-[#0B1420] border border-[#1E293B] text-white rounded focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D] outline-none text-xs transition-all duration-150 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0D1B2A]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
