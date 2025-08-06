import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ title, onMenuToggle, className }) => {
  return (
    <header className={cn(
      "bg-surface border-b border-gray-200 px-6 py-4 lg:px-8",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
            icon="Menu"
          />
          
          {/* Title */}
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
          >
            <ApperIcon name="Bell" className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Agency Admin</p>
              <p className="text-xs text-gray-500">admin@eleveagency.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;