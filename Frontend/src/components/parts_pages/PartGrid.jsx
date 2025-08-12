export default function PartGrid({ parts }) {
  if (!parts || parts.length === 0) {
    return <p className="text-gray-500">Aucune pièce trouvée.</p>;
  }

  // Fonction pour ajouter un élément au panier
  const ajouterAuPanier = (part) => {
    // Lire panier existant ou tableau vide afin de ne pas écraser si déja existant
    let panier = JSON.parse(localStorage.getItem("panier")) || [];

    // Ajouter la nouvelle pièce
    panier.push(part);

    // Sauvegarder dans localStorage
    localStorage.setItem("panier", JSON.stringify(panier));

    alert(`${part.name} ajouté au panier !`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {parts.map((part) => (
        <div
          key={part.id || part.name}
          className="border rounded-xl p-4 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">{part.name}</h2>
          <p className="text-sm text-gray-500">{part.manufacturer}</p>
          <div className="mt-2 text-sm space-y-1">
            {part.specifications &&
              Object.entries(part.specifications).map(([key, value]) => (
                <p key={key}>
                  <strong>{key} :</strong> {String(value)}
                </p>
              ))}
            <p>
              <strong>Prix :</strong> {String(part.price)} €
            </p>
          </div>
          <button
            onClick={() => ajouterAuPanier(part)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
