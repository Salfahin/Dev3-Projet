'use client'
import { useEffect, useState } from "react";
import PartGrid from '../components/parts_pages/PartGrid';

export default function OthersPage() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/parts/others')
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
      <h1 className="text-2xl font-bold mb-4">Other Stuff</h1>
      {loading ? (
        <p className="text-gray-500">Fetching other stuff…</p>
      ) : (
        <PartGrid parts={parts} />
      )}
    </div>
  );
}
