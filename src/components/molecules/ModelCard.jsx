import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ModelCard = ({ model, className }) => {
  const navigate = useNavigate();

  const getAvailabilityVariant = (availability) => {
    switch (availability) {
      case "Available": return "success";
      case "Booked": return "danger";
      case "Limited": return "warning";
      default: return "default";
    }
  };

  const formatRate = (rate) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    }).format(rate);
  };

  return (
    <div className={cn(
      "bg-surface rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group cursor-pointer",
      className
    )}>
      {/* Photo */}
      <div className="aspect-[3/4] overflow-hidden relative">
        <img
          src={model.profilePhoto}
          alt={`${model.firstName} ${model.lastName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/models/${model.Id}`);
              }}
              className="flex-1"
            >
              View Profile
            </Button>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant={getAvailabilityVariant(model.availability)} size="sm">
            {model.availability}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div 
        className="p-4 space-y-3"
        onClick={() => navigate(`/models/${model.Id}`)}
      >
        {/* Name */}
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">
            {model.firstName} {model.lastName}
          </h3>
          <p className="text-sm text-gray-600">{model.experience} Model</p>
        </div>

        {/* Stats */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Ruler" className="w-4 h-4" />
            <span>{model.height} cm</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="DollarSign" className="w-4 h-4" />
            <span>{formatRate(model.rates.fullDay)}/day</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {model.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="default" size="sm">
              {category}
            </Badge>
          ))}
          {model.categories.length > 2 && (
            <Badge variant="default" size="sm">
              +{model.categories.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelCard;