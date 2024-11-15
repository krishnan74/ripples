import React from "react";

const LocationCard = (props) => {
  const { location, onDragStart } = props;
  const { name, img, type, lng, lat } = location;

  return (
    <div
      className={`flex flex-col p-5 flex-shrink-0  bg-white border-2 justify-center items-center text-black rounded-md ${
        type === "highlight" ? "border-blue-500" : "border-gray-300"
      }`}
      draggable={true}
      onDragStart={(e) => onDragStart(e, location)}
      role="button"
      aria-label={`Drag location: ${name}`}
      style={{ cursor: "grab" }}
    >
      <p className="tracking-wide text-xl mb-2">{name}</p>
      <p>
        Latitude: <span>{lat}</span>
      </p>
      <p>
        Longititude: <span>{lng}</span>
      </p>
    </div>
  );
};

export default LocationCard;
