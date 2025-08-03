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
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10 p-6">
      {/* Pre-builts section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPcDisplay />
            Pre-builts
          </h1>
          <Link href="/configurations" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
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
          <Link href="/parts/processors" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeProcessorsSection />
      </div>

      {/* Coolers section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsSnow />
            Coolers
          </h1>
          <Link href="/parts/cpu_coolers" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeCoolersSection />
      </div>

      {/* Motherboards section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsMotherboard />
            Motherboards
          </h1>
          <Link href="/parts/motherboards" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeMotherboardsSection />
      </div>

      {/* Memory section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsMemory />
            Memory
          </h1>
          <Link href="/parts/memory" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeMemorySection />
      </div>

      {/* Disks section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsHdd />
            Disks
          </h1>
          <Link href="/parts/disks" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeDisksSection />
      </div>

      {/* Video Cards section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsGpuCard />
            Video Cards
          </h1>
          <Link href="/parts/video_cards" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeVideoCardsSection />
      </div>

      {/* Cases section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPc />
            Cases
          </h1>
          <Link href="/parts/cases" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeCasesSection />
      </div>

      {/* Case Fans section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsFan />
            Case Fans
          </h1>
          <Link href="/parts/case_fans" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeCaseFansSection />
      </div>

      {/* Power Supplies section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <BsPower />
            Power Supplies
          </h1>
          <Link href="/parts/power_supplies" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomePowerSuppliesSection />
      </div>

      {/* Others section */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            Others
          </h1>
          <Link href="/parts/others" className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </Link>
        </div>
        <hr className="my-2" />
        <HomeOthersSection />
      </div>
    </div>
  );
}