// The page to buy motherboards.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";

export default function MotherboardPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("4", ["Form Factor", "Socket"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Motherboards</h1>
      {loading ? <p className="text-gray-500">Fetching motherboards…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
