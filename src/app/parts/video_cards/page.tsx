// The page to buy video cards.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/parts_pages/PartGrid";
import { Part } from "@/types/Parts";
import { BsGpuCard } from "react-icons/bs";

export default function ProcessorsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("2", ["Chipset", "Memory"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsGpuCard />
        Video cards
      </h1>
      {loading ? <p className="text-gray-500">Fetching video cards…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
