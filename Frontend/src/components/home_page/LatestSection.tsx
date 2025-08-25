/* This is a section present on HomePage.tsx.
It displays the five latest products of a category. */

import { useEffect, useState } from 'react';
import { API_URL } from '../../config';

// The props of this componenent.
interface LatestSectionProps {
  title: string;
  icon: React.ReactNode;
  section: string;
  seeMoreLink: string;
  uniqueIdentifier?: string; // Defauls to part_id if not provided (see line 21).
}

export default function LatestSection({
  title,
  icon,
  section,
  seeMoreLink,
  uniqueIdentifier = 'part_id',
}: LatestSectionProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/latest/${section}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(`Error fetching ${section}:`, err));
  }, [section]);

  if (uniqueIdentifier === 'config_id') {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            {icon}
            {title}
          </h1>
          <a href={seeMoreLink} className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </a>
        </div>
        <hr className="my-2" />
        <div className="flex gap-4">
          {items.map((item) => (
            <div
              key={item[uniqueIdentifier]}
              className="flex-1 p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="font-semibold">{item.config_name}</h2>
              {item.config_author && (
                <p className="text-sm text-gray-500">By {item.config_author}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            {icon}
            {title}
          </h1>
          <a href={seeMoreLink} className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap">
            See more »
          </a>
        </div>
        <hr className="my-2" />
        <div className="flex gap-4">
          {items.map((item) => (
            <div
              key={item[uniqueIdentifier]}
              className="flex-1 p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="font-semibold">{item.part_name}</h2>
              {item.part_manufacturer && (
                <p className="text-sm text-gray-500">{item.part_manufacturer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
};
