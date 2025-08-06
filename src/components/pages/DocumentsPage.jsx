import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const DocumentsPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Document Management"
        description="Contract templates and legal paperwork management system for streamlined document workflows."
        icon="FileText"
        features={[
          "Digital contract creation and management",
          "Template library for common agreements",
          "Electronic signature integration",
          "Document version control and audit trails",
          "Secure storage with access permissions"
        ]}
      />
    </div>
  );
};

export default DocumentsPage;