'use client';
import { useEffect, useState } from 'react';
import { BsPcDisplay } from "react-icons/bs";
import { API_URL } from "../config";

export default function ConfigurationsPage() {
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/configurations`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const normalized = (Array.isArray(data) ? data : []).map(cfg => ({
          config_id: cfg.config_id ?? cfg.id,
          config_name: cfg.config_name ?? cfg.name,
          author: cfg.author ?? "Anonyme",
          price: cfg.price ?? null,
          parts: cfg.parts ?? {},
        }));
        setConfigurations(normalized);
      })
      .catch(err => {
        console.error('Erreur fetch configurations:', err);
        setConfigurations([]);
      });
  }, []);

  useEffect(() => {
    if (!selectedConfig) {
      setParts([]);
      setSelectedPart(null);
      setSpecs([]);
      return;
    }

    const partsArray = Object.entries(selectedConfig.parts || {}).map(([category, value]) => ({
      part_id: category,
      part_name: value,
      part_category: category
    }));

    setParts(partsArray);
    setSelectedPart(null);
    setSpecs([]);
  }, [selectedConfig]);

  //Parts
  useEffect(() => {
    if (!selectedPart) {
      setSpecs([]);
      return;
    }

    const fetchSpecs = async () => {
      try {
        const encodedPartName = encodeURIComponent(selectedPart.part_name);
        const res = await fetch(`${API_URL}/api/specs/${encodedPartName}`);
        if (!res.ok) {
          if (res.status === 404) {
            setSpecs([]);
            return;
          }
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        const specsArray = Object.entries(data.specifications || {}).map(([key, value]) => ({
          part_specification: key,
          part_specification_value: value
        }));

        setSpecs(specsArray);
      } catch (err) {
        console.error('Erreur fetch specifications:', err);
        setSpecs([]);
      }
    };

    fetchSpecs();
  }, [selectedPart]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BsPcDisplay />
        Pre-built PCs
      </h1>
      <div className="flex gap-4">
        <div className="w-1/3 border p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Configurations</h2>
          {configurations.length === 0 && (
            <p className="text-gray-500">Aucune configuration trouvée.</p>
          )}
          {configurations.map((config, index) => (
            <div
              key={`${config.config_id || 'nocid'}-${index}`}
              onClick={() => {
                setSelectedConfig(config);
                setSelectedPart(null);
                setSpecs([]);
              }}
              className={`cursor-pointer p-2 rounded ${
                selectedConfig?.config_id === config.config_id
                  ? 'bg-purple-200 text-purple-900 font-semibold'
                  : 'hover:bg-purple-100 hover:text-purple-900'
              }`}
            >
              {config.config_name}
            </div>
          ))}
        </div>
        {/* Parts */}
        {selectedConfig && (
          <div className="w-1/3 border p-4 rounded-lg transition-opacity duration-200">
            <h2 className="font-semibold mb-2">Composants</h2>
            {parts.length > 0 ? (
              parts.map((part, index) => (
                <div
                  key={`${part.part_id}-${index}`}
                  onClick={() => setSelectedPart(part)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedPart?.part_id === part.part_id
                      ? 'bg-purple-200 text-purple-900 font-semibold'
                      : 'hover:bg-purple-100 hover:text-purple-900'
                  }`}
                >
                  {part.part_category} – {part.part_name}
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun composant.</p>
            )}
          </div>
        )}
        {/* Specs */}
        {selectedPart && (
          <div className="w-1/3 border p-4 rounded-lg transition-opacity duration-200">
            <h2 className="font-semibold mb-2">Spécifications</h2>
            {specs.length > 0 ? (
              <ul className="text-sm">
                {specs.map((spec, index) => (
                  <li
                    key={`${spec.part_specification || 'nospec'}-${spec.part_specification_value || 'noval'}-${index}`}
                    className="py-1 border-b last:border-none"
                  >
                    <strong>{spec.part_specification}:</strong> {spec.part_specification_value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucune spécification trouvée.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
