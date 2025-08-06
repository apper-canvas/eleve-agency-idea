import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import FilterDropdown from '@/components/molecules/FilterDropdown';

const ClientCreateForm = ({ isOpen, onClose, onClientCreated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    notes: '',
    budget: '',
    communicationPreference: 'Email',
    projectType: 'Fashion',
    priority: 'Medium'
  });

  const [errors, setErrors] = useState({});

  const industryOptions = [
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Luxury', value: 'Luxury' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Technology', value: 'Technology' }
  ];

  const budgetOptions = [
    { label: 'Under $50k', value: 'Under $50k' },
    { label: '$50k - $100k', value: '$50k - $100k' },
    { label: '$100k - $250k', value: '$100k - $250k' },
    { label: 'Over $250k', value: 'Over $250k' }
  ];

  const communicationOptions = [
    { label: 'Email', value: 'Email' },
    { label: 'Phone', value: 'Phone' },
    { label: 'Video Call', value: 'Video Call' },
    { label: 'In Person', value: 'In Person' }
  ];

  const projectTypeOptions = [
    { label: 'Fashion Campaign', value: 'Fashion' },
    { label: 'Beauty Campaign', value: 'Beauty' },
    { label: 'Lifestyle Shoot', value: 'Lifestyle' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Editorial', value: 'Editorial' }
  ];

  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      // Import clientService dynamically to avoid circular imports
      const { clientService } = await import('@/services/api/clientService');
      const newClient = await clientService.create(formData);
      
      toast.success('Client created successfully!');
      onClientCreated(newClient);
      onClose();
      
      // Reset form
      setFormData({
        companyName: '',
        industry: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        notes: '',
        budget: '',
        communicationPreference: 'Email',
        projectType: 'Fashion',
        priority: 'Medium'
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to create client:', error);
      toast.error('Failed to create client. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Add New Client</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={24} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Information Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Company Name</Label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Enter company name"
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <Label required>Industry</Label>
                <FilterDropdown
                  label=""
                  options={industryOptions}
                  value={formData.industry}
                  onChange={(value) => handleInputChange('industry', value)}
                  placeholder="Select industry"
                  className={errors.industry ? 'border-red-500' : ''}
                />
                {errors.industry && (
                  <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                )}
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://company.com"
                />
              </div>

              <div>
                <Label>Budget Range</Label>
                <FilterDropdown
                  label=""
                  options={budgetOptions}
                  value={formData.budget}
                  onChange={(value) => handleInputChange('budget', value)}
                  placeholder="Select budget range"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter company address"
              />
            </div>
          </div>

          {/* Contact Details Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required>Contact Person</Label>
                <Input
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Enter contact person name"
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                )}
              </div>

              <div>
                <Label required>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="contact@company.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label required>Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label>Communication Preference</Label>
                <FilterDropdown
                  label=""
                  options={communicationOptions}
                  value={formData.communicationPreference}
                  onChange={(value) => handleInputChange('communicationPreference', value)}
                />
              </div>
            </div>
          </div>

          {/* Preference Settings Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Preference Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Preferred Project Type</Label>
                <FilterDropdown
                  label=""
                  options={projectTypeOptions}
                  value={formData.projectType}
                  onChange={(value) => handleInputChange('projectType', value)}
                />
              </div>

              <div>
                <Label>Priority Level</Label>
                <FilterDropdown
                  label=""
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(value) => handleInputChange('priority', value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Notes</Label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any additional notes or requirements..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[120px]"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <ApperIcon name="Plus" size={16} className="mr-2" />
                  Create Client
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreateForm;