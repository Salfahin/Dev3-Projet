// This is the home page on which the client will land when entering the URL to the website.
// It contains sections that grab the latest parts and products of their category then display them.

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
import {
  HomeProcessorsSection,
  HomeCoolersSection,
  HomeMotherboardsSection,
  HomeMemorySection,
  HomeDisksSection,
  HomeVideoCardsSection,
  HomeCasesSection,
  HomeCaseFansSection,
  HomePowerSuppliesSection,
  HomeOthersSection,
  HomeConfigsSection,
} from "@/components/home_page/HomeSections";

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
        <HomeConfigsSection />
      </div>

      {/* Processors section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsCpu />
          Processors
        </h1>
        <hr />
        <HomeProcessorsSection />
      </div>

      {/* Coolers section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsSnow />
          Coolers
        </h1>
        <hr />
        <HomeCoolersSection />
      </div>

      {/* Motherboards section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsMotherboard />
          Motherboards
        </h1>
        <hr />
        <HomeMotherboardsSection />
      </div>

      {/* Memory section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsMemory />
          Memory
        </h1>
        <hr />
        <HomeMemorySection />
      </div>

      {/* Disks section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsHdd />
          Disks
        </h1>
        <hr />
        <HomeDisksSection />
      </div>

      {/* Video Cards section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsGpuCard />
          Video Cards
        </h1>
        <hr />
        <HomeVideoCardsSection />
      </div>

      {/* Cases section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsPc />
          Cases
        </h1>
        <hr />
        <HomeCasesSection />
      </div>

      {/* Case Fans section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsFan />
          Case Fans
        </h1>
        <hr />
        <HomeCaseFansSection />
      </div>

      {/* Power Supplies section */}
      <div>
        <h1 className="flex items-center gap-2">
          <BsPower />
          Power Supplies
        </h1>
        <hr />
        <HomePowerSuppliesSection />
      </div>

      {/* Others section */}
      <div>
        <h1 className="flex items-center gap-2">
          others
        </h1>
        <hr />
        <HomeOthersSection />
      </div>
    </div>
  );
}
