import { useEffect, useState } from 'react';
import PartGrid from '../components/parts_pages/PartGrid';
import { API_URL } from "../config";

function Processors() {
  const [processors, setProcessors] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/parts/processors`)
      .then(res => res.json())
      .then(json => setProcessors(json));
  }, []);

  if (processors.length === 0) return <p className="text-gray-500">Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Liste des processeurs</h1>
      <PartGrid parts={processors} />
    </div>
  );
}

export default Processors;
