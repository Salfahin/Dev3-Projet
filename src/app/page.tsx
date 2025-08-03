// This is the home page on which the client will land when entering the URL to the website.

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
} from "react-icons/bs";

export default function Home() {
  return (
    <div>
      {/* Pre-builts section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsPcDisplay />
          Pre-builts
        </h1>
        <hr />
      </div>

      {/* Processors section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsCpu />
          Processors
        </h1>
        <hr />
      </div>

      {/* Coolers section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsSnow />
          Coolers
        </h1>
        <hr />
      </div>

      {/* Motherboards section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsMotherboard />
          Motherboards
        </h1>
        <hr />
      </div>

      {/* Memory section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsMemory />
          Memory
        </h1>
        <hr />
      </div>

      {/* Disks section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsHdd />
          Disks
        </h1>
        <hr />
      </div>

      {/* Video Cards section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsGpuCard />
          Video Cards
        </h1>
        <hr />
      </div>

      {/* Cases section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsPc />
          Cases
        </h1>
        <hr />
      </div>

      {/* Case Fans section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsFan />
          Case Fans
        </h1>
        <hr />
      </div>

      {/* Power Supplies section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsPower />
          Power Supplies
        </h1>
        <hr />
      </div>

      {/* Others section */}
      <div>
        <h1 className="flex items-center gap-2">
          others
        </h1>
        <hr />
      </div>
    </div>
  );
}
