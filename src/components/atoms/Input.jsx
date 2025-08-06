import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition-colors duration-200",
        "placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-1",
        error 
          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
          : "border-gray-300 focus:border-accent focus:ring-accent/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;