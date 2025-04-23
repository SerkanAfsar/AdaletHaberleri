import { CustomOptionType } from "@/Types";
import { cn } from "@/Utils";
import React from "react";

export type CustomSelectProps = {
  title?: string;
  error?: string;
  optionList: CustomOptionType[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

const CustomSelect = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  ({ className, title, error, onBlur, onChange, optionList, ...rest }, ref) => {
    return (
      <div className="relative block">
        {title && <b className="mb-2 block w-full">{title}</b>}
        <div className="relative block w-full">
          <select
            ref={ref}
            className={cn(
              "dark:focus:border-brand-800 flex w-full rounded border border-gray-400 px-3 py-2 text-sm text-black outline-none placeholder:text-gray-400 disabled:bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30",
              className,
              error && "border-red-500",
            )}
            onBlur={onBlur}
            onChange={onChange}
            {...rest}
          >
            <option value="">{title} Seçiniz</option>
            {optionList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <span className="mt-1 block w-full text-xs text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);
CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
