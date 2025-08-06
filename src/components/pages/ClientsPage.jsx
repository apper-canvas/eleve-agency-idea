import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClientFilters from "@/components/molecules/ClientFilters";
import ClientGrid from "@/components/organisms/ClientGrid";
import { clientService } from "@/services/api/clientService";
import SearchBar from "@/components/molecules/SearchBar";
import ClientCreateForm from "@/components/molecules/ClientCreateForm";

const ClientsPage = () => {
const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    industry: 'all',
    activityStatus: 'all',
    budgetRange: 'all'
  });

  // Load initial data
  const loadClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      setError(err);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  // Filter and search clients
  const filterClients = async () => {
    try {
      const filtered = await clientService.search(searchQuery, filters);
      setFilteredClients(filtered);
    } catch (err) {
      console.error("Failed to filter clients:", err);
      setFilteredClients([]);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadClients();
  }, []);

  // Apply filters and search when they change
  useEffect(() => {
    if (clients.length > 0) {
      filterClients();
    }
  }, [clients, searchQuery, filters]);

  const handleClientUpdate = (updatedClient) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.Id === updatedClient.Id ? updatedClient : client
      )
    );
  };

const handleAddClient = () => {
    setShowCreateForm(true);
  };

  const handleClientCreated = (newClient) => {
    setClients(prev => [newClient, ...prev]);
    loadClients(); // Refresh the list to ensure consistency
  };

  const handleRetry = () => {
    loadClients();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-semibold text-primary mb-2">
          Client Database
        </h1>
        <p className="text-gray-600">
          Manage your client relationships and track business opportunities
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <SearchBar
          placeholder="Search clients by company, industry, or contact person..."
          onSearch={handleSearch}
          className="max-w-md"
        />
        
        <ClientFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onAddClient={handleAddClient}
        />
      </div>

      {/* Stats Summary */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-primary">{clients.length}</div>
            <div className="text-sm text-gray-600">Total Clients</div>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {clients.filter(c => c.activityStatus === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Clients</div>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-accent">
              {clients.reduce((sum, c) => sum + c.projectsCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-gray-200">
            <div className="text-2xl font-bold text-accent">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
              }).format(clients.reduce((sum, c) => sum + c.totalRevenue, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>
      )}

      {/* Client Grid */}
      <ClientGrid
        clients={filteredClients}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        onClientUpdate={handleClientUpdate}
        searchQuery={searchQuery}
        filters={filters}
      />
<ClientCreateForm
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onClientCreated={handleClientCreated}
      />
    </div>
  );
};

export default ClientsPage;