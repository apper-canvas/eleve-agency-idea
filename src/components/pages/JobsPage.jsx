import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const JobsPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Job Management"
        description="Job postings and casting organization system for efficient talent matching and project management."
        icon="Briefcase"
        features={[
          "Job posting creation and management",
          "Casting call organization and tracking",
          "Model matching and recommendation engine",
          "Application and audition management",
          "Project timeline and milestone tracking"
        ]}
      />
    </div>
  );
};

export default JobsPage;