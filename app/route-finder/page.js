// Home.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [formData, setFormData] = useState({
    prompt: "",
    choiceOfOperator: "",
    fidelityScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const locations = [
    { name: "Location 1", img: "/location1.png", locationID: "1" },
    { name: "Location 2", img: "/location2.png", locationID: "2" },
    { name: "Location 3", img: "/location3.png", locationID: "3" },
  ];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnDropFromLocation = (e) => {
    e.preventDefault();
    const location = JSON.parse(e.dataTransfer.getData("location"));
    setFromLocation(location);
  };

  const handleOnDropToLocation = (e) => {
    e.preventDefault();
    const location = JSON.parse(e.dataTransfer.getData("location"));
    setToLocation(location);
  };

  const handleDragOver = (e) => e.preventDefault();

  const getCircuit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const circuitResponse = await axios.post(
        "http://127.0.0.1:8080/circuitBot",
        formData
      );
      console.log(circuitResponse.data);
    } catch (error) {
      console.error("Error fetching circuit data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-24 pt-[120px] overflow-x-hidden bg-white w-screen pl-[250px] h-screen">
      <div className="flex justify-between">
        <p>Supplier ID:</p>
        <p>Customer ID:</p>
      </div>
      <div className="flex justify-between items-center gap-8">
        <div
          onDrop={handleOnDropFromLocation}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
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
        <Button
          className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600"
          disabled={loading}
          onClick={getCircuit}
        >
          {loading ? "Loading..." : <FaArrowRight size={20} />}
        </Button>
        <div
          onDrop={handleOnDropToLocation}
          onDragOver={handleDragOver}
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
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
  );
};

export default Home;
