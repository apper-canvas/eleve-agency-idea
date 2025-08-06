import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModelFilters from "@/components/molecules/ModelFilters";
import ModelGrid from "@/components/organisms/ModelGrid";
import { modelService } from "@/services/api/modelService";

const ModelsPage = () => {
  const navigate = useNavigate();
  
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    availability: "All",
    category: "All",
    experience: "All"
  });

  const loadModels = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await modelService.getAll();
      setModels(data);
      setFilteredModels(data);
    } catch (err) {
      setError(err.message || "Failed to load models");
      toast.error("Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await modelService.search(searchQuery, filters);
        setFilteredModels(filtered);
      } catch (err) {
        console.error("Filter error:", err);
      }
    };

    applyFilters();
  }, [searchQuery, filters]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilters({
      availability: "All",
      category: "All",
      experience: "All"
    });
  };

  const handleAddModel = () => {
    navigate("/models/new");
  };

  const handleRetry = () => {
    loadModels();
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">
            Model Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your talent roster and model portfolios
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{filteredModels.length}</p>
          <p className="text-sm text-gray-600">
            {filteredModels.length === 1 ? "Model" : "Models"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <ModelFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onAddModel={handleAddModel}
      />

      {/* Models Grid */}
      <ModelGrid
        models={filteredModels}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        onAddModel={handleAddModel}
      />
    </div>
  );
};

export default ModelsPage;