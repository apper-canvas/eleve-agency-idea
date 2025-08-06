import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const MessagesPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Communication Hub"
        description="Internal communication system for seamless collaboration between agency staff, models, and clients."
        icon="MessageSquare"
        features={[
          "Real-time messaging with models and clients",
          "Group conversations for project collaboration",
          "File and document sharing capabilities",
          "Message templates for common communications",
          "Integration with email and SMS notifications"
        ]}
      />
    </div>
  );
};

export default MessagesPage;