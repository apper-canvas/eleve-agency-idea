import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose, className }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 1, label: "Models", icon: "Users", path: "/models", isAvailable: true },
    { id: 2, label: "Clients", icon: "Building2", path: "/clients", isAvailable: false },
    { id: 3, label: "Jobs", icon: "Briefcase", path: "/jobs", isAvailable: false },
    { id: 4, label: "Bookings", icon: "Calendar", path: "/bookings", isAvailable: false },
    { id: 5, label: "Calendar", icon: "CalendarDays", path: "/calendar", isAvailable: false },
    { id: 6, label: "Messages", icon: "MessageSquare", path: "/messages", isAvailable: false },
    { id: 7, label: "Documents", icon: "FileText", path: "/documents", isAvailable: false },
    { id: 8, label: "Analytics", icon: "BarChart3", path: "/analytics", isAvailable: false }
  ];

  const handleNavigation = (item) => {
    if (item.isAvailable) {
      navigate(item.path);
      onClose?.();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 lg:bg-primary lg:text-white lg:min-h-screen",
        className
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="font-display text-2xl font-bold text-gradient">
            Elevé Agency
          </h1>
          <p className="text-sm text-gray-400 mt-1">Model Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.path === "/models" && location.pathname.startsWith("/models"));
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                disabled={!item.isAvailable}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200",
                  isActive && item.isAvailable
                    ? "bg-accent text-white shadow-md border-l-4 border-yellow-300"
                    : item.isAvailable
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-500 cursor-not-allowed opacity-60"
                )}
              >
                <ApperIcon name={item.icon} className="w-5 h-5 shrink-0" />
                <span className="font-medium">{item.label}</span>
                {!item.isAvailable && (
                  <span className="ml-auto text-xs bg-gray-600 px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            © 2024 Elevé Agency
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div className={cn(
          "absolute left-0 top-0 bottom-0 w-64 bg-primary text-white transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="font-display text-2xl font-bold text-gradient">
              Elevé Agency
            </h1>
            <p className="text-sm text-gray-400 mt-1">Model Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.path === "/models" && location.pathname.startsWith("/models"));
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  disabled={!item.isAvailable}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200",
                    isActive && item.isAvailable
                      ? "bg-accent text-white shadow-md border-l-4 border-yellow-300"
                      : item.isAvailable
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-500 cursor-not-allowed opacity-60"
                  )}
                >
                  <ApperIcon name={item.icon} className="w-5 h-5 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  {!item.isAvailable && (
                    <span className="ml-auto text-xs bg-gray-600 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;