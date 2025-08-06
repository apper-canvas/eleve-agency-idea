import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const TabNavigation = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {tab.icon && <ApperIcon name={tab.icon} className="w-4 h-4" />}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "ml-2 py-0.5 px-2 rounded-full text-xs",
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-600"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;