import { useEffect, useState } from 'react';
import { API_URL } from '../../config';

interface LatestSectionProps {
  title: string;
  icon: React.ReactNode;
  section: string;
  seeMoreLink: string;
  uniqueIdentifier?: string; // Defaults to part_id if not provided
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

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          {icon}
          {title}
        </h1>
        <a
          href={seeMoreLink}
          className="text-blue-600 hover:underline text-sm font-medium whitespace-nowrap"
        >
          See more »
        </a>
      </div>
      <hr className="my-2" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <div
            key={item[uniqueIdentifier]}
            className="flex-none w-48 p-4 border rounded shadow-sm bg-white"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.part_name || item.config_name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            )}
            <h2 className="font-semibold">
              {item.part_name || item.config_name}
            </h2>
            {item.part_manufacturer && (
              <p className="text-sm text-gray-500">{item.part_manufacturer}</p>
            )}
            {item.config_author && (
              <p className="text-sm text-gray-500">By {item.config_author}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
