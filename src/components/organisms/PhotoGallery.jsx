import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import TabNavigation from "@/components/molecules/TabNavigation";

const PhotoGallery = ({ model, onPhotoUpload, className }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ["All", "Headshots", "Full Body", "Commercial", "Fashion", "Editorial", "Beauty", "Fitness"];
  
  const getPhotosForCategory = (category) => {
    if (category === "All") return model?.portfolio || [];
    return model?.portfolio?.filter(photo => photo.category === category) || [];
  };

  const photos = getPhotosForCategory(activeCategory);

  const tabs = categories.map(category => ({
    id: category,
    label: category,
    count: getPhotosForCategory(category).length
  }));

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Category Tabs */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      {/* Upload Section */}
      <div className="bg-surface rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-accent transition-colors">
        <div className="text-center">
          <ApperIcon name="Upload" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload New Photos
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop photos here, or click to browse
          </p>
          <Button
            variant="primary"
            icon="Plus"
            onClick={onPhotoUpload}
          >
            Add Photos
          </Button>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ApperIcon name="Eye" className="w-8 h-8 text-white" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ApperIcon name="Image" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No photos in {activeCategory === "All" ? "portfolio" : activeCategory}
          </h3>
          <p className="text-gray-600 mb-6">
            {activeCategory === "All" 
              ? "Upload some photos to get started with this model's portfolio."
              : `No photos found for ${activeCategory}. Try uploading some or check another category.`
            }
          </p>
          <Button
            variant="primary"
            icon="Plus"
            onClick={onPhotoUpload}
          >
            Upload Photos
          </Button>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>

            {selectedPhoto.caption && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
                <p className="text-center">{selectedPhoto.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;