import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

export const toggleExpansion = (setIsExpanded, isExpanded) => {
  setIsExpanded((prev) => !prev);
};

export const toggleShowArrow = (setShowArrow) => {
  setShowArrow(true);
};

export const toggleNotShowArrow = (setShowArrow) => {
  setShowArrow(false);
};

export function handleOnDragStart(e, selectedLocation) {
  e.dataTransfer.setData("location", JSON.stringify(selectedLocation));
}

export function handleOnDropFromLocation(e, setFromLocation) {
  e.preventDefault();
  const data = e.dataTransfer?.getData("location");
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

export function handleOnDropToLocation(e, setToLocation) {
  e.preventDefault();
  const data = e.dataTransfer?.getData("location");
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

export function handleDragOver(e) {
  e.preventDefault();
}
