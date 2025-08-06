import React from "react";
import SearchBar from "@/components/molecules/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Button from "@/components/atoms/Button";

const ModelFilters = ({ 
  searchQuery, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters,
  onAddModel 
}) => {
  const availabilityOptions = [
    { label: "All Availability", value: "All" },
    { label: "Available", value: "Available" },
    { label: "Booked", value: "Booked" },
    { label: "Limited", value: "Limited" }
  ];

  const categoryOptions = [
    { label: "All Categories", value: "All" },
    { label: "Fashion", value: "Fashion" },
    { label: "Commercial", value: "Commercial" },
    { label: "Editorial", value: "Editorial" },
    { label: "Beauty", value: "Beauty" },
    { label: "Fitness", value: "Fitness" },
    { label: "Runway", value: "Runway" },
    { label: "Lifestyle", value: "Lifestyle" }
  ];

  const experienceOptions = [
    { label: "All Experience", value: "All" },
    { label: "Professional", value: "Professional" },
    { label: "Emerging", value: "Emerging" }
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== "All") || searchQuery;

  return (
    <div className="bg-surface rounded-lg p-6 space-y-4">
      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search models by name or category..."
            onSearch={onSearchChange}
            className="w-full"
          />
        </div>
        
        <Button
          onClick={onAddModel}
          icon="Plus"
          className="shrink-0"
        >
          Add Model
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <FilterDropdown
          label="Availability"
          options={availabilityOptions}
          value={filters.availability}
          onChange={(value) => onFilterChange("availability", value)}
        />
        
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => onFilterChange("category", value)}
        />
        
        <FilterDropdown
          label="Experience"
          options={experienceOptions}
          value={filters.experience}
          onChange={(value) => onFilterChange("experience", value)}
        />

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            icon="X"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModelFilters;