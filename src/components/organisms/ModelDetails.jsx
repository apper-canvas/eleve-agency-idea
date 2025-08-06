import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ModelDetails = ({ model, onEdit, onDelete, className }) => {
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

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  if (!model) return null;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Header Section */}
      <div className="bg-surface rounded-xl p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Photo */}
          <div className="lg:w-80 shrink-0">
            <div className="aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src={model.profilePhoto}
                alt={`${model.firstName} ${model.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary">
                  {model.firstName} {model.lastName}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{model.experience} Model</p>
                <div className="mt-3">
                  <Badge variant={getAvailabilityVariant(model.availability)} size="lg">
                    {model.availability}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  icon="Edit"
                  onClick={onEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  icon="Trash2"
                  onClick={onDelete}
                >
                  Delete
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <ApperIcon name="User" className="w-4 h-4" />
                  <span className="text-sm">Age</span>
                </div>
                <div className="font-semibold text-lg text-primary">
                  {calculateAge(model.dateOfBirth)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <ApperIcon name="Ruler" className="w-4 h-4" />
                  <span className="text-sm">Height</span>
                </div>
                <div className="font-semibold text-lg text-primary">
                  {model.height} cm
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <ApperIcon name="DollarSign" className="w-4 h-4" />
                  <span className="text-sm">Day Rate</span>
                </div>
                <div className="font-semibold text-lg text-primary">
                  {formatRate(model.rates.fullDay)}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span className="text-sm">Hourly</span>
                </div>
                <div className="font-semibold text-lg text-primary">
                  {formatRate(model.rates.hourly)}
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Specializes In</h3>
              <div className="flex flex-wrap gap-2">
                {model.categories.map((category) => (
                  <Badge key={category} variant="primary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Measurements */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-surface rounded-xl p-6">
          <h3 className="font-display text-xl font-semibold text-primary mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ApperIcon name="Mail" className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-primary">{model.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ApperIcon name="Phone" className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-primary">{model.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ApperIcon name="Calendar" className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-primary">
                  {new Date(model.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="bg-surface rounded-xl p-6">
          <h3 className="font-display text-xl font-semibold text-primary mb-6">
            Measurements
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(model.measurements).map(([key, value]) => (
              <div key={key} className="border-b border-gray-100 pb-2">
                <p className="text-sm text-gray-600 capitalize">
                  {key === "bust" || key === "chest" ? key : key}
                </p>
                <p className="font-medium text-primary">
                  {typeof value === "number" ? 
                    (key === "dress" || key === "suit" || key === "shoe" ? value : `${value} cm`) :
                    value
                  }
                </p>
              </div>
            ))}
            
            <div className="border-b border-gray-100 pb-2">
              <p className="text-sm text-gray-600">Hair Color</p>
              <p className="font-medium text-primary">{model.hairColor}</p>
            </div>
            
            <div className="border-b border-gray-100 pb-2">
              <p className="text-sm text-gray-600">Eye Color</p>
              <p className="font-medium text-primary">{model.eyeColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;