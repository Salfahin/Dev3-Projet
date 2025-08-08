import { useEffect, useState } from 'react';

function Processors() {
  const [processors, setProcessors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/parts/processors') // adapte l'URL à ton backend
      .then(res => res.json())
      .then(json => setProcessors(json));
  }, []);

  if (!processors.length) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des processeurs</h1>
      {processors.map((cpu) => (
        <div key={cpu.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
          <h2>{cpu.name}</h2>
          <p><strong>Fabricant :</strong> {cpu.manufacturer}</p>
          <p><strong>Prix :</strong> {cpu.price} €</p>

          <h3>Spécifications :</h3>
          <ul>
            {Object.entries(cpu.specifications).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Processors;