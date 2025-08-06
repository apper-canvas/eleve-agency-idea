import React from "react";
import ModelCard from "@/components/molecules/ModelCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ModelGrid = ({ models, loading, error, onRetry, onAddModel }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!models || models.length === 0) {
    return (
      <Empty
        title="No models found"
        description="No models match your current search and filter criteria. Try adjusting your filters or add a new model to get started."
        actionLabel="Add New Model"
        onAction={onAddModel}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {models.map((model) => (
        <ModelCard
          key={model.Id}
          model={model}
          className="animate-scale-in"
        />
      ))}
    </div>
  );
};

export default ModelGrid;