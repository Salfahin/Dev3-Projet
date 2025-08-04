// This component is used by the sections on the home page.
// It displays the five latest parts/elements present in the database as a chain of blocks.
// The types of the said elements is specified by the parent code who calls this componenent.
// This does not work for configurations as they are of a different type (Configuration[] and not Part[]).

import { Part } from "@/types/Parts";

export default function LatestPartsGrid({ parts }: { parts: Part[] }) {
  if (parts.length === 0) {
    return <p className="text-gray-500">Aucune pièce trouvée.</p>;
  }

  const displayedParts = parts.slice(0, 5); // Limit to 5 parts

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2">
        {displayedParts.map((part) => (
          <div
            key={part.name}
            className="min-w-[220px] max-w-[240px] border rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white text-xs"
          >
            <h2 className="text-sm font-semibold mb-1">{part.name}</h2>
            <p className="text-gray-500 mb-1">{part.manufacturer}</p>
            <div className="space-y-[2px]">
              {Object.entries(part.specs).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
              <p>
                <span className="font-medium">Prix:</span> {part.price} €
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
