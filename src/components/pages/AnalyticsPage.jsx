import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const AnalyticsPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Agency Analytics"
        description="Comprehensive performance dashboards and business intelligence tools for data-driven agency management."
        icon="BarChart3"
        features={[
          "Revenue and booking performance analytics",
          "Model utilization and success metrics",
          "Client satisfaction and retention tracking",
          "Market trend analysis and insights",
          "Custom reports and data visualization"
        ]}
      />
    </div>
  );
};

export default AnalyticsPage;