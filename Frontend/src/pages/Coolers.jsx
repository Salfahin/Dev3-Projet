'use client'
import { useEffect, useState } from "react";
import PartGrid from '../components/parts_pages/PartGrid';
import { BsSnow } from "react-icons/bs";
import { API_URL } from "../config";

export default function CoolersPage() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/parts/cpu_coolers`)
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
        <BsSnow />
        Coolers
      </h1>
      {loading ? (
        <p className="text-gray-500">Fetching coolers…</p>
      ) : (
        <PartGrid parts={parts} />
      )}
    </div>
  );
}
