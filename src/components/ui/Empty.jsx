import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No results found", 
  description = "Try adjusting your search or filters to find what you're looking for.",
  actionLabel = "Add New Item",
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Search" className="w-10 h-10 text-gray-400" />
        </div>
        
        <h3 className="text-2xl font-display font-semibold text-primary mb-3">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8">
          {description}
        </p>
        
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-accent hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;