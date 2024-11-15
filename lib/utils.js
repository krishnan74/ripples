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
  setshowArrow(false);
};

export const toggleNotShowArrow = (setshowArrow) => {
  setshowArrow(true);
};

export function handleOnDragStart(e, selectedLocation) {
  e.dataTransfer.setData("fromLocation", JSON.stringify(selectedLocation));
  e.dataTransfer.setData("toLocation", JSON.stringify(selectedLocation));
}

export function handleOnDropfromLocation(e, setfromLocation) {
  const fromLocation = JSON.parse(e.dataTransfer.getData("fromLocation"));

  setfromLocation(fromLocation);
}

export function handleOnDroptoLocation(e, settoLocation) {
  const toLocation = JSON.parse(e.dataTransfer.getData("toLocation"));

  settoLocation(toLocation);
}

export function handleDragOver(e) {
  e.preventDefault();
}
