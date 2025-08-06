import React from "react";

const Loading = () => {
  return (
    <div className="animate-fade-in">
      {/* Model Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-surface rounded-lg overflow-hidden animate-pulse">
            {/* Photo Skeleton */}
            <div className="aspect-[3/4] bg-secondary"></div>
            
            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              {/* Name */}
              <div className="h-6 bg-secondary rounded w-3/4"></div>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-full"></div>
                <div className="h-4 bg-secondary rounded w-2/3"></div>
              </div>
              
              {/* Status */}
              <div className="h-8 bg-secondary rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;