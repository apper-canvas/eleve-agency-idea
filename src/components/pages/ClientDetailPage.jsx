import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import TabNavigation from '@/components/molecules/TabNavigation';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { clientService } from '@/services/api/clientService';

const ClientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'User'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'Briefcase'
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: 'Users'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText'
    }
  ];

  // Load client data
  const loadClient = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getById(id);
      setClient(data);
    } catch (err) {
      setError(err);
      toast.error('Failed to load client details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  const handleEdit = () => {
    toast.info('Edit client functionality coming soon!');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientService.delete(id);
        navigate('/clients');
      } catch (err) {
        toast.error('Failed to delete client');
      }
    }
  };

  const handleRetry = () => {
    loadClient();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderOverviewTab = () => {
    if (!client) return null;

    return (
      <div className="space-y-8">
        {/* Company Information */}
        <div className="bg-surface rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-display font-semibold text-primary mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Company Name
              </label>
              <p className="text-lg font-semibold text-primary">
                {client.companyName}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Industry
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="Building" size={16} className="text-accent" />
                <span className="text-primary">{client.industry}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Website
              </label>
              <p className="text-primary">
                {client.website || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Activity Status
              </label>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                client.activityStatus === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : client.activityStatus === 'Inactive'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                <ApperIcon 
                  name={client.activityStatus === 'Active' ? 'CheckCircle' : 'Clock'} 
                  size={12} 
                />
                {client.activityStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="bg-surface rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-display font-semibold text-primary mb-4">
            Primary Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contact Person
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="User" size={16} className="text-accent" />
                <span className="text-lg font-semibold text-primary">
                  {client.contactPerson}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" size={16} className="text-accent" />
                <span className="text-primary">
                  {client.email}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="Phone" size={16} className="text-accent" />
                <span className="text-primary">
                  {client.phone}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Location
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" size={16} className="text-accent" />
                <span className="text-primary">
                  {client.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget & Business Information */}
        <div className="bg-surface rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-display font-semibold text-primary mb-4">
            Budget & Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Budget Range
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="DollarSign" size={16} className="text-accent" />
                <span className="text-lg font-semibold text-primary">
                  {client.budgetRange}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Total Projects
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="Briefcase" size={16} className="text-accent" />
                <span className="text-lg font-semibold text-primary">
                  {client.projectsCount}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Total Revenue
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="TrendingUp" size={16} className="text-accent" />
                <span className="text-lg font-semibold text-primary">
                  {formatCurrency(client.totalRevenue)}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Last Activity
              </label>
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" size={16} className="text-accent" />
                <span className="text-primary">
                  {formatDate(client.lastActivity)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {client.notes && (
          <div className="bg-surface rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-display font-semibold text-primary mb-4">
              Notes
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {client.notes}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'projects':
      case 'contacts':
      case 'documents':
        return (
          <div className="bg-surface rounded-lg p-12 border border-gray-200 text-center">
            <ApperIcon name="Clock" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-gray-600 mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-500">
              The {activeTab} section is currently under development.
            </p>
          </div>
        );
      default:
        return renderOverviewTab();
    }
  };

  if (loading) {
    return <Loading message="Loading client details..." />;
  }

  if (error) {
    return (
      <Error
        message="Failed to load client details"
        onRetry={handleRetry}
      />
    );
  }

  if (!client) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Client not found</p>
        <Button onClick={() => navigate('/clients')} className="mt-4">
          Back to Clients
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/clients')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-display font-semibold text-primary">
              {client.companyName}
            </h1>
            <p className="text-gray-600 mt-1">
              {client.industry} • {client.location}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleEdit} variant="outline" size="sm">
            <ApperIcon name="Edit" size={16} />
            Edit
          </Button>
          <Button 
            onClick={handleDelete} 
            variant="outline" 
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ClientDetailPage;