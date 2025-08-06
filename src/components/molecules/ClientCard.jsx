import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { clientService } from "@/services/api/clientService";

const ClientCard = ({ client, className, onClientUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getActivityVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getIndustryIcon = (industry) => {
    switch (industry) {
      case 'Fashion':
        return 'Shirt';
      case 'Beauty':
        return 'Sparkles';
      case 'Lifestyle':
        return 'Coffee';
      case 'Luxury':
        return 'Crown';
      case 'Sports':
        return 'Zap';
      case 'Technology':
        return 'Smartphone';
      default:
        return 'Building2';
    }
  };

  const formatRevenue = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: amount >= 1000000 ? 'compact' : 'standard',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLastActivity = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      const updatedClient = await clientService.updateActivityStatus(client.Id, newStatus);
      onClientUpdate?.(updatedClient);
    } catch (error) {
      console.error('Failed to update client status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleContact = () => {
    window.open(`mailto:${client.email}`, '_blank');
  };

  const handleViewWebsite = () => {
    window.open(client.website, '_blank');
  };

  return (
    <div className={cn(
      "bg-surface rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group",
      className
    )}>
      {/* Header with Logo and Company Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
            <img
              src={client.logo}
              alt={`${client.companyName} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-accent/10 flex items-center justify-center" style={{ display: 'none' }}>
              <ApperIcon name={getIndustryIcon(client.industry)} className="w-8 h-8 text-accent" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-semibold text-primary truncate">
              {client.companyName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <ApperIcon name={getIndustryIcon(client.industry)} className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{client.industry}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge
                variant={getActivityVariant(client.activityStatus)}
                size="sm"
              >
                {client.activityStatus}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Contact Person:</span>
          <span className="font-medium text-primary">{client.contactPerson}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Projects:</span>
          <span className="font-medium text-primary">{client.projectsCount}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Revenue:</span>
          <span className="font-medium text-accent">{formatRevenue(client.totalRevenue)}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last Activity:</span>
          <span className="font-medium text-primary">{formatLastActivity(client.lastActivity)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-4 border-t border-gray-100 space-y-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
            icon="Mail"
            className="flex-1"
          >
            Contact
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewWebsite}
            icon="ExternalLink"
            className="flex-1"
          >
            Website
          </Button>
        </div>

        {/* Status Change Buttons */}
        {client.activityStatus !== 'Active' && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleStatusChange('Active')}
            loading={isUpdating}
            icon="Play"
            className="w-full"
          >
            Activate Client
          </Button>
        )}
        
        {client.activityStatus === 'Active' && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange('Inactive')}
            loading={isUpdating}
            icon="Pause"
            className="w-full"
          >
            Deactivate
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientCard;