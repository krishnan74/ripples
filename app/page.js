import TechStack from "@/components/TechStack";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="overflow-x-hidden bg-white w-screen pl-[200px]">
      {/* Hero Section */}
      <div className="pl-10 lg:pl-24 pr-[220px] flex flex-col lg:flex-row justify-between gap-[20px] items-center h-[90vh]">
        <div className="flex flex-col w-full lg:w-[650px]">
          <p className="text-5xl font-bold leading-tight">Ripples</p>

          <p className="text-lg mt-5 mb-10 font-light text-gray-700 tracking-wide">
            An innovative{" "}
            <span className="text-purple-600 font-semibold">
              quantum computing solution{" "}
            </span>
            designed to transform supply chain logistics by optimizing delivery
            routes. By harnessing the power of quantum algorithms, Ripples
            enables businesses to identify the shortest and most efficient paths
            for their deliveries, significantly enhancing operational
            efficiency.
          </p>

          <div className="text-lg font-semibold flex gap-8">
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Quantum Computing
            </p>
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Supply Chain Optimization
            </p>
            <p>
              <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500"></span>
              Max-H
            </p>
          </div>

          <div className="flex ">
            <Link
              href={"/route-finder"}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-10 hover:bg-purple-600"
            >
              Try Now
            </Link>

            <Link
              href={"/generate-circuit"}
              className="bg-white border-purple-500 border text-purple-500 px-6 py-3 rounded-lg mt-10 ml-5 hover:bg-purple-100"
            >
              Convert QASM to Circuit
            </Link>
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
      <div className="mt-20 h-[75vh] px-10 lg:px-24">
        <p className="text-5xl font-bold text-center mb-5">Overview</p>

        <p className="text-center mb-10">
          Ripples is a quantum computing-based solution that helps businesses
          optimize supply chain routes by finding the shortest and most
          efficient paths for deliveries. By leveraging quantum algorithms,
          Ripples provides a powerful tool for solving complex logistics
          problems, enabling businesses to reduce costs and improve operational
          efficiency through optimized route planning.
        </p>
        <div className="flex justify-center gap-5">
          {/* Design Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Quantum Optimization</p>
            <p className="text-sm mt-2 text-gray-600">
              Utilizes QAOA to solve the Traveling Salesman Problem for
              efficient route planning.
            </p>
          </div>

          {/* Optimization Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Cost Efficiency</p>
            <p className="text-sm mt-2 text-gray-600">
              Minimizes delivery costs, leading to significant savings for
              businesses.
            </p>
          </div>

          {/* Insights Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Robust Decision-Making</p>
            <p className="text-sm mt-2 text-gray-600">
              Enhances route planning speed and accuracy for improved service
              delivery
            </p>
          </div>

          {/* Analysis Card */}
          <div className="h-[350px] w-[280px] border-purple-500 bg-purple-100 border rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <p className="text-xl font-semibold">Scalability</p>
            <p className="text-sm mt-2 text-gray-600">
              Adapts to complex logistics scenarios across various industries.
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
        <p className="text-5xl font-bold text-center mb-5">Work Flow</p>

        <div className="flex flex-col justify-center items-center relative w-full">
          <img
            src="/images/workflow.png"
            alt="WorkFlow"
            className="object-contain "
          />
        </div>
      </div>

      {/* Work Flow Section */}
      <div className="my-20">
        <p className="text-5xl font-bold text-center mb-5">System Design</p>

        <div className="flex flex-col justify-center items-center relative w-full">
          <img
            src="/images/system-design.png"
            alt="SystemDesign"
            className="object-contain "
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
