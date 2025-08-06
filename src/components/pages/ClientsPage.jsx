import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const ClientsPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Client Management"
        description="Client database and company management system for streamlined relationship management and project coordination."
        icon="Building2"
        features={[
          "Complete client database with company profiles",
          "Contact management and communication history",
          "Project and contract tracking",
          "Invoice and payment management",
          "Client relationship analytics"
        ]}
      />
    </div>
  );
};

export default ClientsPage;