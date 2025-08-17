export default function ConfigPartsForm({ configId, rows, handleChange, addRow, onSubmit }) {
  // Example part types (you can adjust these to match your DB values)
  const partTypes = [
    "Processor",
    "Motherboard",
    "Memory",
    "Disk",
    "Video Card",
    "Power Supply",
    "Case",
    "Case Fan",
    "Cooler",
    "Other",
  ];

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
              {/* Left column now uses <select> */}
              <td className="border p-2">
                <select
                  value={row.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="">-- Select a type --</option>
                  {partTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </td>

              {/* Right column remains an input */}
              <td className="border p-2">
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                  placeholder="e.g. Ryzen 7 5800X"
                  className="w-full border px-2 py-1 rounded"
                />
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
