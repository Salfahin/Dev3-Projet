// This component is used by the section "Pre-builts" on the home page.
// It displays the five latest configurations present in the database as a chain of blocks.
// This does not work for parts as they are of a different type (Part[] and not Configuration[]).
// Only the section "Pre-builts" uses this componenent.

import { Configuration } from "@/types/Configurations";

export default function LatestConfigurationsGrid({ configs }: { configs: Configuration[] }) {
  if (configs.length === 0) {
    return <p className="text-gray-500 text-sm">Aucune configuration trouvée.</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto">
      {configs.slice(0, 5).map((cfg) => (
        <div
          key={cfg.config_id}
          className="min-w-[220px] max-w-[240px] border rounded-lg p-3 shadow-sm hover:shadow-md transition bg-white text-sm"
        >
          <h2 className="font-semibold">{cfg.config_name}</h2>
          <p className="text-gray-500 text-xs">ID: {cfg.config_id}</p>
        </div>
      ))}
    </div>
  );
}
