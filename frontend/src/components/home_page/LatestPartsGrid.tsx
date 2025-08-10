export default function LatestPartsGrid({ parts }) {
  if (!parts || parts.length === 0) {
    return <p className="text-gray-500">Aucune pièce trouvée.</p>;
  }

  const displayedParts = parts.slice(0, 5); // Limite à 5 pièces

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2">
        {displayedParts.map((part) => (
          <div
            key={part.id || part.name}
            className="min-w-[220px] max-w-[240px] border rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white text-xs"
          >
            <h2 className="text-sm font-semibold mb-1">{part.name}</h2>
            <p className="text-gray-500 mb-1">{part.manufacturer}</p>
            <div className="space-y-[2px]">
              {part.specifications &&
                Object.entries(part.specifications).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium">{key}:</span>{" "}
                    {String(value)}
                  </p>
                ))}
              <p>
                <span className="font-medium">Prix:</span> {String(part.price)} €
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
