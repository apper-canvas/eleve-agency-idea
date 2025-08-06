import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ComingSoon = ({ 
  title, 
  description, 
  icon = "Clock",
  features = [],
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-center min-h-[60vh] p-8", className)}>
      <div className="text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <ApperIcon name={icon} className="w-12 h-12 text-accent" />
        </div>

        {/* Content */}
        <h2 className="font-display text-3xl font-bold text-primary mb-4">
          {title}
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          {description}
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-yellow-500 text-white px-6 py-3 rounded-full font-medium mb-8">
          <ApperIcon name="Clock" className="w-5 h-5" />
          <span>Coming Soon</span>
        </div>

        {/* Feature Preview */}
        {features.length > 0 && (
          <div className="bg-surface rounded-xl p-6 text-left">
            <h3 className="font-display text-xl font-semibold text-primary mb-4">
              Planned Features:
            </h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComingSoon;