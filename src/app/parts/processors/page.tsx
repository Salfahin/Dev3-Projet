// The page to buy processors.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";
import { BsCpu } from "react-icons/bs";

export default function ProcessorsPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("0", ["Core Count", "Thread Count", "Series", "Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsCpu />
        Processors
      </h1>
      {loading ? <p className="text-gray-500">Fetching processors…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
