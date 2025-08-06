import React from "react";
import { cn } from "@/utils/cn";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Button from "@/components/atoms/Button";

const ClientFilters = ({ 
  filters, 
  onFiltersChange, 
  className,
  onAddClient 
}) => {
  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Luxury', label: 'Luxury' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Technology', label: 'Technology' }
  ];

  const activityStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' }
];

  const budgetRangeOptions = [
    { label: 'All Budget Ranges', value: 'all' },
    { label: 'Under $50k', value: 'Under $50k' },
    { label: '$50k - $100k', value: '$50k - $100k' },
    { label: '$100k - $250k', value: '$100k - $250k' },
    { label: 'Over $250k', value: 'Over $250k' }
  ];
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

const handleClearFilters = () => {
    onFiltersChange({
      industry: 'all',
      activityStatus: 'all',
      budgetRange: 'all'
    });
  };

const hasActiveFilters = filters.industry !== 'all' || filters.activityStatus !== 'all' || filters.budgetRange !== 'all';

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <FilterDropdown
        label="Industry"
        options={industryOptions}
        value={filters.industry || 'all'}
        onChange={(value) => handleFilterChange('industry', value)}
      />

      <FilterDropdown
        label="Status"
        options={activityStatusOptions}
        value={filters.activityStatus || 'all'}
        onChange={(value) => handleFilterChange('activityStatus', value)}
      />
<FilterDropdown
          label="Budget Range"
          options={budgetRangeOptions}
          value={filters.budgetRange || 'all'}
          onChange={(value) => handleFilterChange('budgetRange', value)}
        />

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          icon="X"
        >
          Clear Filters
        </Button>
      )}

      <div className="ml-auto">
        <Button
          variant="primary"
          onClick={onAddClient}
          icon="Plus"
        >
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default ClientFilters;