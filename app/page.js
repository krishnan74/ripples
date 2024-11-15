"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import LocationCard from "@/components/LocationCard";
import { FaArrowRight } from "react-icons/fa";
import {
  handleOnDragStart,
  handleOnDropfromLocation,
  handleOnDroptoLocation,
  handleDragOver,
  sideBarStyles,
  toggleExpansion,
  toggleNotShowArrow,
  toggleshowArrow,
} from "@/lib/utils";
import "./test.css";

const Home = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    choiceOfOperator: "",
    fidelityScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [fromLocation, setfromLocation] = useState(null);
  const [toLocation, settoLocation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArrow, setshowArrow] = useState(true);

  const locations = [
    { name: "Location 1", img: "/location1.png", locationID: "1" },
    { name: "Location 2", img: "/location2.png", locationID: "2" },
    { name: "Location 3", img: "/location3.png", locationID: "3" },
  ];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getCircuit = async (e) => {
    e.preventDefault();
    const circuitResponse = await axios.post(
      "http://127.0.0.1:8080/circuitBot",
      formData
    );
    console.log(circuitResponse.data);
  };

  return (
    <div className=" font-sans flex gap-8 bg-gray-50 h-screen">
      <div
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out slide-right-animation h-screen"
        onMouseEnter={() => toggleshowArrow(setshowArrow)}
        onMouseLeave={() => toggleNotShowArrow(setshowArrow)}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Available Locations
        </h2>
        <div className="grid grid-cols-2 gap-4 overflow-auto">
          {locations.map((location, index) => (
            <LocationCard
              key={location.locationID}
              Location={location}
              onDragStart={(e) => handleOnDragStart(e, location)}
              className="hover:scale-105 transition-transform duration-300 ease-in-out transform"
            />
          ))}
        </div>
      </div>

      <div className="absolute right-0 w-[70%] flex flex-col  justify-center h-screen px-8">
        <div className="flex justify-between ">
          <p>Supplier ID: </p>
          <p>Customer ID:</p>
        </div>
        <div className=" flex justify-between items-center gap-8 ">
          <div
            onDrop={(e) => handleOnDropfromLocation(e, setfromLocation)}
            onDragOver={handleDragOver}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              From Location
            </h3>
            {fromLocation ? (
              <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
                <p className="font-semibold text-lg text-gray-900">
                  {fromLocation.name}
                </p>
                <img
                  className="rounded mt-4"
                  height={150}
                  width={150}
                  src={fromLocation.img}
                  alt={fromLocation.name}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border p-4 rounded-lg h-64 w-56 text-gray-500">
                <p>Drop From Location here</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <Button
            className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-all duration-300"
            aria-label="Transfer to location"
          >
            <FaArrowRight size={20} />
          </Button>

          <div
            onDrop={(e) => handleOnDroptoLocation(e, settoLocation)}
            onDragOver={handleDragOver}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg  transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              To Location
            </h3>
            {toLocation ? (
              <div className="flex flex-col items-center border p-4 rounded-lg h-64 w-56 shadow-md">
                <p className="font-semibold text-lg text-gray-900">
                  {toLocation.name}
                </p>
                <img
                  className="rounded mt-4"
                  height={150}
                  width={150}
                  src={toLocation.img}
                  alt={toLocation.name}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border p-4 rounded-lg h-64 w-56 text-gray-500">
                <p>Drop To Location here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
