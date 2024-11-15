import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Styles for the sidebar
export const sideBarStyles = {
  transitionTransform: {
    transition: "transform 0.3s ease-in-out",
  },
  expanded: {
    transform: "translateX(-50%)",
  },
  slideLeftAnimation: {
    position: "absolute",
    left: "140px",
    transition: "0.3s", 
  },
  slideLeftAnimationHover: {
    left: "-290px", 
  },
};

// Toggle expansion state
export const toggleExpansion = (setIsExpanded, isExpanded) => {
  setIsExpanded(prev => !prev); // Use functional update to ensure correct state handling
};

// Show arrow
export const toggleShowArrow = (setShowArrow) => {
  setShowArrow(true); 
};

// Hide arrow
export const toggleNotShowArrow = (setShowArrow) => {
  setShowArrow(false); 
};

// Handle drag start
export function handleOnDragStart(e, selectedLocation) {
  e.dataTransfer.setData("location", JSON.stringify(selectedLocation)); 
}

// Handle drop for "from" location
export function handleOnDropFromLocation(e, setFromLocation) {
  e.preventDefault(); // Prevent default behavior
  const data = e.dataTransfer?.getData("location"); // Use optional chaining to avoid errors
  if (data) {
    try {
      const location = JSON.parse(data);
      setFromLocation(location); 
    } catch (error) {
      console.error("Invalid location data:", error);
    }
  } else {
    console.error("No data found in dataTransfer.");
  }
}

// Handle drop for "to" location
export function handleOnDropToLocation(e, setToLocation) {
  e.preventDefault(); // Prevent default behavior
  const data = e.dataTransfer?.getData("location"); // Use optional chaining to avoid errors
  if (data) {
    try {
      const location = JSON.parse(data);
      setToLocation(location); 
    } catch (error) {
      console.error("Invalid location data:", error);
    }
  } else {
    console.error("No data found in dataTransfer.");
  }
}

// Allow dragging over the drop target
export function handleDragOver(e) {
  e.preventDefault(); // Prevent default to allow drop
}
