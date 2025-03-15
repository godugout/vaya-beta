
import { ReactNode } from "react";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Checkbox with Label
interface CheckboxFieldProps {
  id: string;
  label: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  description?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const CheckboxField = ({
  id,
  label,
  checked,
  onCheckedChange,
  description,
  disabled,
  required,
  className,
}: CheckboxFieldProps) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        required={required}
        className="h-5 w-5 rounded-md border-2 border-gray-300 data-[state=checked]:border-vaya-secondary data-[state=checked]:bg-vaya-secondary"
      />
      <div className="space-y-1 leading-none">
        <Label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

// Radio Group
interface RadioOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  disabled,
  required,
  className,
}: RadioGroupProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-start space-x-2 rounded-lg border p-3 cursor-pointer transition-colors",
            value === option.value
              ? "border-vaya-secondary bg-vaya-secondary/5"
              : "border-gray-200 hover:border-vaya-secondary/30",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            className="mt-1 h-4 w-4 text-vaya-secondary border-gray-300 focus:ring-vaya-secondary"
          />
          <div className="space-y-1 leading-none">
            <p className="text-sm font-medium">{option.label}</p>
            {option.description && (
              <p className="text-xs text-gray-500">{option.description}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

// Toggle Switch
interface ToggleSwitchProps {
  id: string;
  label: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  description?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ToggleSwitch = ({
  id,
  label,
  checked = false,
  onCheckedChange,
  description,
  disabled,
  className,
}: ToggleSwitchProps) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="space-y-1">
        <Label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer"
        >
          {label}
        </Label>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      
      <div>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onCheckedChange?.(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-vaya-secondary focus:ring-offset-2",
            checked ? "bg-vaya-secondary" : "bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          >
            {checked && (
              <span className="absolute inset-0 flex h-full w-full items-center justify-center text-vaya-secondary">
                <Check className="h-3 w-3" />
              </span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
