'use client'
import { useEffect, useState } from "react";
import PartGrid from '../components/parts_pages/PartGrid';
import { BsPower } from "react-icons/bs";

export default function PowerSuppliesPage() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/parts/power_supplies')
      .then(res => res.json())
      .then(data => {
        setParts(data);
        setLoading(false);
      })
      .catch(() => {
        setParts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BsPower />
        Power Supplies
      </h1>
      {loading ? (
        <p className="text-gray-500">Fetching power supplies…</p>
      ) : (
        <PartGrid parts={parts} />
      )}
    </div>
  );
}
