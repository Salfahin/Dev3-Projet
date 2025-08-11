// The home page

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  BsCpu,
  BsFan,
  BsGpuCard,
  BsHdd,
  BsPc,
  BsPcDisplay,
  BsMemory,
  BsMotherboard,
  BsPower,
  BsSnow,
} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [data, setData] = useState(null);

  /*
  useEffect(() => {
    fetch('') // Ton API Express
      .then(res => res.json())
      .then(json => setData(json));
  }, []);
  */

  return (
    <div className="space-y-10 p-6">
      {/* Pre-builts section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPcDisplay />
            Pre-builts
          </h1>
          <Link to="/config" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        {/* <HomeConfigsSection /> */}
      </div>

      {/* Processors section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsCpu />
            Processors
          </h1>
          <Link to="/processors" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Coolers section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsSnow />
            Coolers
          </h1>
          <Link to="/coolers" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Motherboards section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsMotherboard />
            Motherboards
          </h1>
          <Link to="/motherboards" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Memory section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsMemory />
            Memory
          </h1>
          <Link to="/memory" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Disks section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsHdd />
            Disks
          </h1>
          <Link to="/disks" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Video Cards section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsGpuCard />
            Video Cards
          </h1>
          <Link to="/video-cards" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Cases section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPc />
            Cases
          </h1>
          <Link to="/cases" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Case Fans section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsFan />
            Case Fans
          </h1>
          <Link to="/case-fans" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Power Supplies section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPower />
            Power Supplies
          </h1>
          <Link to="/power-supplies" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>

      {/* Others section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            Others
          </h1>
          <Link to="/others" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
      </div>
    </div>
  );
}

export default HomePage;
