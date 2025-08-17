import { useEffect, useState } from "react";

export default function ConfigPartsForm({ configId, rows, handleChange, addRow, onSubmit }) {
  const [partTypes, setPartTypes] = useState([]);
  const [partsByType, setPartsByType] = useState({}); // { [type]: parts array }

  // Fetch part types once
  useEffect(() => {
    const fetchPartTypes = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/part-types");
        const types = await res.json();
        setPartTypes(types);
      } catch (err) {
        console.error("Error fetching part types:", err);
      }
    };
    fetchPartTypes();
  }, []);

  // Fetch parts for a specific type if not already fetched
  const fetchPartsForType = async (type) => {
    if (!type || partsByType[type]) return; // already fetched

    try {
      const res = await fetch(`http://localhost:3001/api/parts-by-type/${type}`);
      const data = await res.json();
      setPartsByType((prev) => ({ ...prev, [type]: data.parts || [] }));
    } catch (err) {
      console.error(`Error fetching parts for type ${type}:`, err);
    }
  };

  return (
    <div>
      <p className="mb-2">
        Great! Your configuration got submitted and received the id {configId}.<br />
        Now, please enter its <strong>parts</strong> below:
      </p>

      <table className="border border-black w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Part Type</th>
            <th className="border p-2">Part</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* Part Type selector */}
              <td className="border p-2">
                <select
                  value={row.type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    handleChange(index, "type", newType);
                    fetchPartsForType(newType);
                  }}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">-- Select a type --</option>
                  {partTypes.map((type) => (
                    <option key={type.part_type} value={type.part_label}>
                      {type.part_label}
                    </option>
                  ))}
                </select>
              </td>

              {/* Part selector or custom input */}
              <td className="border p-2">
                {row.type && partsByType[row.type] ? (
                  <select
                    value={row.value}
                    onChange={(e) => handleChange(index, "value", e.target.value)}
                    className="w-full border px-2 py-1 rounded"
                  >
                    <option value="">-- Select a part --</option>
                    {partsByType[row.type].map((part) => (
                      <option key={part.part_id} value={part.part_id}>
                        {part.part_name}
                      </option>
                    ))}
                    <option value="custom">-- Other (custom) --</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={row.value}
                    onChange={(e) => handleChange(index, "value", e.target.value)}
                    placeholder="Enter custom part"
                    className="w-full border px-2 py-1 rounded"
                  />
                )}
              </td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={2}
              className="border p-2 text-center cursor-pointer bg-gray-200 hover:bg-gray-300"
              onClick={addRow}
            >
              + Add Row
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Configuration Parts
        </button>
      </div>
    </div>
  );
}
