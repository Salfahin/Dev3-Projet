import { useEffect, useState } from 'react';

function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/parts/processors') // Ton API Express
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div>
      <h1>Accueil</h1>
      {data ? <p>{data.message}</p> : <p>Chargement...</p>}
    </div>
  );
}

export default HomePage;
