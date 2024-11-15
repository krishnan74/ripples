import React from "react";

const LocationCard = (props) => {
  const { Location, onDragStart } = props;
  const { name, img, type } = Location;

  return (
    <div
      className="flex flex-col p-5 flex-shrink-0 border-2 justify-center items-center text-white  rounded-md"
      draggable
      onDragStart={(e) => onDragStart(e, Location)}
    >
      <p className="tracking-wide text-xl">{name}</p>
      <img height={150} width={150} src={img} alt={name} />
    </div>
  );
};

export default LocationCard;
