import TechStack from "@/components/TechStack";
import React from "react";

const page = () => {
  return (
    <div className="overflow-x-hidden bg-white w-screen pl-[200px]">
      {/* Hero Section */}
      <div className="pl-10 lg:pl-24 pr-[220px] flex flex-col lg:flex-row justify-between gap-[20px] items-center h-[90vh]">
        <div className="flex flex-col w-full lg:w-[650px]">
          <p className="text-5xl font-bold leading-tight">Ripples</p>

          <p className="text-lg mt-5 mb-10 font-light text-gray-700 tracking-wide">
            A{" "}
            <span className="text-purple-600 font-semibold">platform</span> for
            designing, optimizing, and visualizing quantum circuits with advanced
            machine learning and cutting-edge algorithms.
          </p>

          <div className="text-lg font-semibold flex gap-8">
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Simulation
            </p>
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Optimization
            </p>
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Efficiency
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center relative w-fit mt-10 lg:mt-0">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="circles">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="mt-20 h-[90vh] px-10 lg:px-24">
        <p className="text-5xl font-bold text-center mb-20">Overview</p>
        <div className="flex justify-center gap-5">
          {/* Design Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Design</p>
            <p className="text-sm mt-2 text-gray-600">
              Ripples provides an intuitive, graphical interface for designing quantum circuits that model and optimize supply chain routes.
            </p>
          </div>

          {/* Optimization Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Optimization</p>
            <p className="text-sm mt-2 text-gray-600">
              Leverage quantum computing to solve combinatorial optimization problems and optimize supply chain routes, costs, and delivery schedules.
            </p>
          </div>

          {/* Insights Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Insights</p>
            <p className="text-sm mt-2 text-gray-600">
              Gain data-driven insights and visualizations to track performance and identify inefficiencies in your supply chain optimization.
            </p>
          </div>

          {/* Analysis Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Analysis</p>
            <p className="text-sm mt-2 text-gray-600">
              Simulate and analyze real-world supply chain scenarios using quantum circuits, and optimize logistics strategies for maximum efficiency.
            </p>
          </div>
        </div>
      </div>

       {/* Tech Stack Section */}
       <div className="mb-20">
        <p className="text-5xl font-bold text-center mb-10">Tech Stack</p>
        <TechStack />
      </div>


      {/* System Design Section */}
      <div className="my-20">
        <p className="text-5xl font-bold text-center mb-5">System Design</p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[80vw] sm:w-[60vw] text-gray-600">
            Design image
          </p>
        </div>

        <div className="flex flex-col justify-center items-center relative w-fit">
          <img
            src="/atom.png"
            alt="Quantum Atom"
            className="object-contain h-[400px] w-[400px] animate-pulse"
          />
        </div>
      </div>
      
      {/* Work Flow Section */}
      <div className="my-20">
        <p className="text-5xl font-bold text-center mb-5">System Design</p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[80vw] sm:w-[60vw] text-gray-600">
            Design image
          </p>
        </div>

        <div className="flex flex-col justify-center items-center relative w-fit">
          <img
            src="/atom.png"
            alt="Quantum Atom"
            className="object-contain h-[400px] w-[400px] animate-pulse"
          />
        </div>
      </div>

     
      {/* Optional Sponsors Section */}
      {/* <div>
        <Sponsers />
      </div> */}
    </div>
  );
};

export default page;
