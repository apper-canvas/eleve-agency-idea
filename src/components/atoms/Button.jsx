import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent hover:bg-yellow-600 text-white focus:ring-accent/50",
    secondary: "bg-secondary hover:bg-gray-300 text-primary focus:ring-gray-300",
    outline: "border border-gray-300 hover:border-accent hover:text-accent bg-white text-gray-700 focus:ring-accent/50",
    ghost: "hover:bg-secondary text-gray-700 focus:ring-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/50"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md gap-1.5",
    md: "px-4 py-2.5 text-sm rounded-lg gap-2",
    lg: "px-6 py-3 text-base rounded-lg gap-2.5",
    xl: "px-8 py-4 text-lg rounded-xl gap-3"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
    xl: "w-6 h-6"
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          className={cn(iconSizes[size], "animate-spin")} 
        />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} className={iconSizes[size]} />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} className={iconSizes[size]} />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;