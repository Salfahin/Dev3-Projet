export default function PartGrid({ parts }) {
  if (!parts || parts.length === 0) {
    return <p className="text-gray-500">Aucune pièce trouvée.</p>;
  }

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
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Ajouter à une config
          </button>
        </div>
      ))}
    </div>
  );
}
