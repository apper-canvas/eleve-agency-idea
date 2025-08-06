import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import TabNavigation from "@/components/molecules/TabNavigation";
import ModelDetails from "@/components/organisms/ModelDetails";
import PhotoGallery from "@/components/organisms/PhotoGallery";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ComingSoon from "@/components/organisms/ComingSoon";
import { modelService } from "@/services/api/modelService";

const ModelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("portfolio");

  const tabs = [
    { id: "portfolio", label: "Portfolio", icon: "Image", count: model?.portfolio?.length || 0 },
    { id: "details", label: "Details", icon: "User" },
    { id: "availability", label: "Availability", icon: "Calendar" },
    { id: "history", label: "History", icon: "Clock" }
  ];

  const loadModel = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError("");
      const data = await modelService.getById(id);
      setModel(data);
    } catch (err) {
      setError(err.message || "Failed to load model");
      toast.error("Failed to load model details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModel();
  }, [id]);

  const handleEdit = () => {
    navigate(`/models/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this model? This action cannot be undone.")) {
      return;
    }

    try {
      await modelService.delete(parseInt(id));
      toast.success("Model deleted successfully");
      navigate("/models");
    } catch (err) {
      toast.error("Failed to delete model");
    }
  };

  const handlePhotoUpload = () => {
    toast.info("Photo upload functionality coming soon!");
  };

  const handleRetry = () => {
    loadModel();
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (!model) {
    return (
      <div className="p-6">
        <Error
          message="Model not found"
          onRetry={() => navigate("/models")}
        />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "portfolio":
        return (
          <PhotoGallery
            model={model}
            onPhotoUpload={handlePhotoUpload}
          />
        );
      
      case "details":
        return (
          <ModelDetails
            model={model}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      
      case "availability":
        return (
          <ComingSoon
            title="Availability Management"
            description="Manage model availability, schedule conflicts, and booking calendar integration."
            icon="Calendar"
            features={[
              "Calendar integration with booking system",
              "Availability status management",
              "Conflict detection and resolution",
              "Automatic schedule updates"
            ]}
          />
        );
      
      case "history":
        return (
          <ComingSoon
            title="Booking History"
            description="Track model's booking history, performance metrics, and career milestones."
            icon="BarChart3"
            features={[
              "Complete booking and job history",
              "Performance analytics and metrics",
              "Career milestone tracking",
              "Client feedback and ratings"
            ]}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <div>
        <Button
          variant="ghost"
          icon="ArrowLeft"
          onClick={() => navigate("/models")}
          className="mb-4"
        >
          Back to Models
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface rounded-xl p-6">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ModelDetailPage;