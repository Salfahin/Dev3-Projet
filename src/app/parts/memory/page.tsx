// The page to buy memory modules.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";

export default function MemoryPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("5", ["ECC / Registered", "Form Factor", "Speed"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Memory</h1>
      {loading ? <p className="text-gray-500">Fetching memory modules…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
