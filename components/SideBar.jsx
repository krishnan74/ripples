// AppSidebar.js
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    Route,
    Cpu,
  } from "lucide-react";
  import { Button } from "./ui/button";
  
import Link from "next/link";
  
  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "Route", url: "/route-finder", icon: Route },
    { title: "QASM to Circuit", url: "/generate-circuit", icon: Cpu },
  ];
  
  export function SideBar() {
    return (
      <div className="bg-white border-r flex flex-col fixed w-[200px] h-screen">
        
        <p className="text-center p-5 font-bold text-4xl font-['Quantum']">Ripples</p>
          {items.map((item) => (

            <Link href={item.url} key={item.title} className=" flex justify-start items-center gap-4 px-7 py-3 w-full border border-gray-100 hover:bg-gray-100">
                        <item.icon />
                        <p className="text-sm text-nowrap">{item.title}</p>
            </Link>
                     
                ))}
      </div>
              
          
    );
  }
  