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
  setIsExpanded(!isExpanded);
};

export const toggleshowArrow = (setshowArrow) => {
  setshowArrow(true); 
};

export const toggleNotShowArrow = (setshowArrow) => {
  setshowArrow(false); 
};

export function handleOnDragStart(e, selectedLocation) {
  e.dataTransfer.setData("location", JSON.stringify(selectedLocation)); 
}

export function handleOnDropfromLocation(e, setfromLocation) {
  const location = JSON.parse(e.dataTransfer.getData("location")); 
  setfromLocation(location); 
}

export function handleOnDroptoLocation(e, settoLocation) {
  const location = JSON.parse(e.dataTransfer.getData("location"));
  settoLocation(location); 
}

export function handleDragOver(e) {
  e.preventDefault(); 
}
