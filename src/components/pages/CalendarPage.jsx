import React from "react";
import ComingSoon from "@/components/organisms/ComingSoon";

const CalendarPage = () => {
  return (
    <div className="p-6">
      <ComingSoon
        title="Integrated Calendar"
        description="Unified calendar view of all bookings, appointments, and agency events with advanced scheduling capabilities."
        icon="CalendarDays"
        features={[
          "Unified calendar view with multiple display modes",
          "Color-coded events by model, client, and job type",
          "Drag-and-drop scheduling and rescheduling",
          "Calendar synchronization with external platforms",
          "Event notifications and automated reminders"
        ]}
      />
    </div>
  );
};

export default CalendarPage;