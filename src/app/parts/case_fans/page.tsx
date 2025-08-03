// The page to buy case fans.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";
import { BsFan } from "react-icons/bs";

export default function CaseFansPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("8", ["Size"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsFan />
        Case Fans
      </h1>
      {loading ? <p className="text-gray-500">Fetching case fans…</p> : <PartGrid parts={parts} />}
    </div>
  );
}