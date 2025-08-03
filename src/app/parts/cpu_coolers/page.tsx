// The page to buy CPU coolers.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";
import { BsSnow } from "react-icons/bs";

export default function CoolersPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("1", ["CPU Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsSnow />
        Coolers
      </h1>
      {loading ? <p className="text-gray-500">Fetching coolers…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
