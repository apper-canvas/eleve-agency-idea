import React from "react";
import { useNavigate } from "react-router-dom";
import ClientCard from "@/components/molecules/ClientCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ClientGrid = ({ 
  clients, 
  loading, 
  error, 
  onRetry, 
  onClientUpdate,
  searchQuery = "",
  filters = {}
}) => {
  const navigate = useNavigate();
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error 
        message={error.message || "Failed to load clients"} 
        onRetry={onRetry} 
      />
    );
  }

  if (!clients || clients.length === 0) {
    let emptyTitle = "No clients found";
    let emptyDescription = "Get started by adding your first client to the database.";
    
    if (searchQuery) {
      emptyTitle = "No clients match your search";
      emptyDescription = `No results found for "${searchQuery}". Try adjusting your search terms.`;
    } else if (filters.industry && filters.industry !== 'all') {
      emptyTitle = "No clients in this industry";
      emptyDescription = `No clients found in the ${filters.industry} industry. Try selecting a different industry.`;
    } else if (filters.activityStatus && filters.activityStatus !== 'all') {
      emptyTitle = `No ${filters.activityStatus.toLowerCase()} clients`;
      emptyDescription = `No clients with ${filters.activityStatus.toLowerCase()} status found.`;
    }

    return (
      <Empty
        title={emptyTitle}
        description={emptyDescription}
        actionLabel="Add New Client"
        onAction={() => {
          // This would open an add client modal in a real implementation
          console.log("Add new client clicked");
        }}
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{clients.map((client) => (
          <ClientCard
            key={client.Id}
            client={client}
            onClientUpdate={onClientUpdate}
            className="animate-scale-in cursor-pointer"
            onClick={() => navigate(`/clients/${client.Id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientGrid;