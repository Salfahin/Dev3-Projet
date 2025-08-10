'use client'
import { useEffect, useState } from "react";
import PartGrid from '../components/parts_pages/PartGrid';
import { BsGpuCard } from "react-icons/bs";

export default function VideoCardsPage() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/parts/video_cards')
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
        <BsGpuCard />
        Video cards
      </h1>
      {loading ? (
        <p className="text-gray-500">Fetching video cards…</p>
      ) : (
        <PartGrid parts={parts} />
      )}
    </div>
  );
}
