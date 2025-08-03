// The page to buy other stuff.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/parts_pages/PartGrid";
import { Part } from "@/types/Parts";

export default function OthersPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("9", []).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Other Stuff</h1>
      {loading ? <p className="text-gray-500">Fetching other stuff…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
