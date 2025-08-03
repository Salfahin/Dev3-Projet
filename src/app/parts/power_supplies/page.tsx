// The page to buy power supplies.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/parts_pages/PartGrid";
import { Part } from "@/types/Parts";
import { BsPower } from "react-icons/bs";

export default function PowerSuppliesPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("3", ["Efficiency Rating", "Wattage"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsPower />
        Power Supplies
      </h1>
      {loading ? <p className="text-gray-500">Fetching power supplies…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
