import React from "react";

const page = () => {
  return (
    <div className="px-24 pt-[120px] overflow-x-hidden">
      <div className="h-[65vh]">
        <div className="flex justify-center gap-[20px]  mt-[0px]  items-center">
          <div className="flex flex-col ">
            <p className="text-[50px] font-bold w-[650px] ">
              Ripples
            </p>

            <p className="text-[16px] mt-5 mb-10 font-light  w-[600px] tracking-wide">
              A <span className="text-purple-600 font-semibold">platform</span>{" "}
              for designing, optimizing, and visualizing quantum circuits with advanced 
              machine learning and cutting-edge algorithms
              
            </p>
            <div className="text-lg font-semibold flex gap-10">
              <p>
                <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500 border-purple-500"></span>
                Simulation
              </p>
              <p>
                <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500 border-purple-500"></span>
                Optimization
              </p>
              <p>
                <span className="w-[10px] h-[10px] inline-block border-2 border-solid rounded-full mr-3 bg-purple-500 border-purple-500"></span>
                Efficiency
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center relative w-fit">
            <img
              src="/stick1.png"
              alt=""
              className="object-contain h-[400px] w-[400px] joystick"
            />

            <div class="circles ">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col  mt-[0px] mb-32 h-[80vh] pt-[12vh]">
      <p className="text-[50px] font-bold text-center mb-5">
          Overview 
        </p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[60vw]">
            1. design
            2. optimization
            3. Insights
            4. analysis 
          </p>
        </div>
       
        <p className="text-[50px] font-bold text-center mb-5">
        System Design 
        </p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[60vw]">
            Design image
            <div className="flex flex-col justify-center items-center relative w-fit">
            <img
              src="/stick1.png"
              alt=""
              className="object-contain h-[400px] w-[400px] joystick"
            /></div> 
          </p>
        </div>
        
        <p className="text-[50px] font-bold text-center mb-5">
          Tech stack 
        </p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[60vw]">
            Next js 
            python
            criq 
          </p>
          {/* 
      <div>
        <Sponsers />
      </div> */}
        </div>
       
        <p className="text-[50px] font-bold text-center mb-5">
          Workflow 
        </p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[60vw]">
            image
            <div className="flex flex-col justify-center items-center relative w-fit">
            <img
              src="/stick1.png"
              alt=""
              className="object-contain h-[400px] w-[400px] joystick"
            /></div> 
          </p>
        </div>
        <p className="text-[50px] font-bold text-center mb-5">
          Use cases 
        </p>
        <div className="flex justify-center">
          <p className="text-xl text-center font-light mb-[80px] w-[60vw]">
            Through 
          </p>
        </div>

        {/* 
      <div>
        <Sponsers />
      </div> */}
        
        


        {/* <div className="grid grid-cols-4 gap-x-10 px-5">
          <ServiceCard
            title="Global Insights"
            desc="Get a worldwide perspective on decentralized gaming developments."
          />
          <ServiceCard
            title="Deep Dive Articles"
            desc="In-depth articles covering every aspect of web3 gaming."
          />

          <ServiceCard
            title="Exclusive Interviews"
            desc="Hear from industry leaders and innovators shaping the future of gaming."
          />
          <ServiceCard
            title="Community Hub"
            desc="Connect with like-minded enthusiasts in our vibrant community."
          />
        </div> */}
      </div>
    </div>
  );
};

export default page;