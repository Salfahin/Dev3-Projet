import { useState } from "react";


export default function SubmissionForm() {
  const [activeTab, setActiveTab] = useState("part"); // 'part' or 'config'
  const [rows, setRows] = useState([{ specification: "", value: "" }]);

  // Part form state
  const [partType, setPartType] = useState("0");
  const [partName, setPartName] = useState("");
  const [partManufacturer, setPartManufacturer] = useState("");
  const [partPrice, setPartPrice] = useState("");

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { specification: "", value: "" }]);
  };

  const handleSubmit = () => {
    // Convert the rows array to an object of key/value pairs
    const specifications = {};
    rows.forEach(row => {
      if (row.specification) specifications[row.specification] = row.value;
    });

    const data = [
      {
        type: parseInt(partType), // numeric type
        name: partName,
        manufacturer: partManufacturer,
        price: parseFloat(partPrice),
        specifications: specifications
      }
    ];

    console.log(JSON.stringify(data, null, 2));
    alert("JSON data logged to console!");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submission Form</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("part")}
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${activeTab === "part"
            ? "bg-[#79c39e] text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Submit a Part
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${activeTab === "config"
            ? "bg-[#79c39e] text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Submit a Configuration
        </button>
      </div>

      {/* Part Tab */}
      {activeTab === "part" && (
        <div>
          <div>
            <label htmlFor="partType">Select the type of part:</label>
            <select
              id="partType"
              value={partType}
              onChange={(e) => setPartType(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="0">CPU / Processor</option>
              <option value="1">Cooler</option>
              <option value="2">GPU / Video Card</option>
              <option value="3">PSU / Power Supply</option>
              <option value="4">Motherboard</option>
              <option value="5">RAM / Memory</option>
              <option value="6">Disk / Storage</option>
              <option value="7">Case</option>
              <option value="8">Fan</option>
              <option value="9">Other</option>
            </select>
          </div>

          <div>
            <label>Name:</label>
            <input
              type="text"
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. AMD Ryzen 5 5600X"
            />
          </div>

          <div>
            <label>Manufacturer:</label>
            <input
              type="text"
              value={partManufacturer}
              onChange={(e) => setPartManufacturer(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. AMD"
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={partPrice}
              onChange={(e) => setPartPrice(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. 130"
            />
          </div>

          <div>
            <p className="mb-2">Specifications:</p>
            <table className="border border-black w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Specification</th>
                  <th className="border p-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.specification}
                        onChange={(e) => handleChange(index, "specification", e.target.value)}
                        placeholder="e.g. Socket"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) => handleChange(index, "value", e.target.value)}
                        placeholder="e.g. AM4"
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="border p-2 text-center cursor-pointer bg-gray-200 hover:bg-gray-300" onClick={addRow}>
                    + Add Row
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      )}

      {/* Config Tab */}
      {activeTab === "config" && (
        <div>
          <p>Configuration form will go here.</p>
        </div>
      )}
    </div>
  );
}
