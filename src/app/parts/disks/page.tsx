// The page to buy disks and storage.

'use client'
import { useEffect, useState } from "react";
import { fetchParts } from "@/lib/fetchParts";
import PartGrid from "@/components/PartGrid";
import { Part } from "@/types/Parts";
import { BsHdd } from "react-icons/bs";

export default function DisksPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParts("6", ["Capacity", "Form Factor", "Type"]).then(data => {
      setParts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsHdd />
        Disks
      </h1>
      {loading ? <p className="text-gray-500">Fetching disks…</p> : <PartGrid parts={parts} />}
    </div>
  );
}
