import React from 'react';

interface RadioGroupProps {
  label: string;
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, required }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-700 mb-2">{label}</legend>
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center">
          <input
            id={`${name}-${option.replace(/\s/g, '')}`}
            name={name}
            type="radio"
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="h-4 w-4 text-brand-green border-gray-300 focus:ring-brand-green"
          />
          <label htmlFor={`${name}-${option.replace(/\s/g, '')}`} className="ml-2 block text-sm text-gray-900">
            {option}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default RadioGroup;
