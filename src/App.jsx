import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/pages/Layout";
import ModelsPage from "@/components/pages/ModelsPage";
import ModelDetailPage from "@/components/pages/ModelDetailPage";
import ClientsPage from "@/components/pages/ClientsPage";
import ClientDetailPage from "@/components/pages/ClientDetailPage";
import JobsPage from "@/components/pages/JobsPage";
import BookingsPage from "@/components/pages/BookingsPage";
import CalendarPage from "@/components/pages/CalendarPage";
import MessagesPage from "@/components/pages/MessagesPage";
import DocumentsPage from "@/components/pages/DocumentsPage";
import AnalyticsPage from "@/components/pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/models" replace />} />
            <Route path="models" element={<ModelsPage />} />
<Route path="models/:id" element={<ModelDetailPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="clients/:id" element={<ClientDetailPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;