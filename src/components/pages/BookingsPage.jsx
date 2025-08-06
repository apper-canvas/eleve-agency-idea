import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const BookingsPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Booking Management"
        description="Schedule management and conflict detection system for optimized talent allocation and time management."
        icon="Calendar"
        features={[
          "Advanced booking scheduler with drag-and-drop interface",
          "Real-time conflict detection and resolution",
          "Model availability tracking and updates",
          "Automated booking confirmations and reminders",
          "Integration with external calendar systems"
        ]}
      />
    </div>
  );
};

export default BookingsPage;