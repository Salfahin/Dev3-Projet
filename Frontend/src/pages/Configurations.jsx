'use client';
import { useEffect, useState } from 'react';
import { BsPcDisplay } from "react-icons/bs";

export default function ConfigurationsPage() {
  const [configurations, setConfigurations] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);

  const [specs, setSpecs] = useState([]);

  // Fetch configurations au montage
  useEffect(() => {
    fetch('http://localhost:3001/api/configurations')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Configurations reçues (brutes):", data);

        // Normalisation : on renomme pour correspondre au reste du code
        const normalized = (Array.isArray(data) ? data : []).map(cfg => ({
          config_id: cfg.config_id ?? cfg.id,
          config_name: cfg.config_name ?? cfg.name,
          ...cfg
        }));

        console.log("Configurations normalisées:", normalized);
        setConfigurations(normalized);
      })
      .catch(err => {
        console.error('Erreur fetch configurations:', err);
        setConfigurations([]);
      });
  }, []);

  // Au clic sur une config, récupère les parts associées
  useEffect(() => {
    if (!selectedConfig) {
      setParts([]);
      setSelectedPart(null);
      setSpecs([]);
      return;
    }

    if (!selectedConfig.config_id) {
      console.error("⚠ selectedConfig n’a pas de config_id:", selectedConfig);
      return;
    }

    fetch(`http://localhost:3001/api/configurations/${selectedConfig.config_id}/parts`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(`Parts reçues pour config ${selectedConfig.config_id}:`, data);
        setParts(Array.isArray(data) ? data : []);
        setSelectedPart(null);
        setSpecs([]);
      })
      .catch(err => {
        console.error('Erreur fetch parts:', err);
        setParts([]);
        setSelectedPart(null);
        setSpecs([]);
      });
  }, [selectedConfig]);

  // Au clic sur un part, récupère ses specs
  useEffect(() => {
    if (!selectedPart) {
      setSpecs([]);
      return;
    }

    if (!selectedPart.part_id) {
      console.error("⚠ selectedPart n’a pas de part_id:", selectedPart);
      return;
    }

    fetch(`http://localhost:3001/api/parts/${selectedPart.part_id}/specifications`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(`Specs reçues pour part ${selectedPart.part_id}:`, data);
        setSpecs(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Erreur fetch specifications:', err);
        setSpecs([]);
      });
  }, [selectedPart]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BsPcDisplay />
        Pre-built PCs
      </h1>

      <div className="flex gap-4">
        {/* Configurations */}
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
                  key={`${part.part_id || 'nopid'}-${index}`}
                  onClick={() => setSelectedPart(part)}
                  className={`cursor-pointer p-2 rounded ${
                    selectedPart?.part_id === part.part_id
                      ? 'bg-purple-200 text-purple-900 font-semibold'
                      : 'hover:bg-purple-100 hover:text-purple-900'
                  }`}
                >
                  {part.part_name} – {part.part_manufacturer} ({part.part_price} €)
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
