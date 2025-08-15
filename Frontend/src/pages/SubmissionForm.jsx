import { useState } from "react";

export default function SubmissionForm() {
  const [activeTab, setActiveTab] = useState("part");
  const [rows, setRows] = useState([{ specification: "", value: "" }]);

  // Part form state
  const [partType, setPartType] = useState("0");
  const [partName, setPartName] = useState("");
  const [partManufacturer, setPartManufacturer] = useState("");
  const [partPrice, setPartPrice] = useState("");

  // Step control
  const [partId, setPartId] = useState(null); // ✅ Store inserted part_id
  const [isPartAdded, setIsPartAdded] = useState(false);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { specification: "", value: "" }]);
  };

  const handleSubmitPart = async () => { // Called to insert a part into the table "parts".
    const partData = {
      part_name: partName,
      part_manufacturer: partManufacturer,
      part_price: parseFloat(partPrice),
      part_type: parseInt(partType),
    };

    try {
      const response = await fetch("http://localhost:3001/api/add-part", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partData),
      });

      const result = await response.json();
      console.log("Inserted part:", result);

      if (result.part && result.part.part_id) {
        setPartId(result.part.part_id);  // ✅ Save ID
        setIsPartAdded(true);            // ✅ Unlock specifications step
      } else {
        console.error("No part_id returned from backend");
      }
    } catch (error) {
      console.error("Error submitting part:", error);
    }
  };

  const handleSubmitSpecifications = async () => { // Called to insert the specifications of a part into "parts_specifications".
    try {
      const payload = {
        part_id: partId,
        specifications: rows,
      };

      const response = await fetch("http://localhost:3001/api/add-specifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Specifications saved successfully!");
      } else {
        console.error("Failed to save specifications:", result.error);
      }
    } catch (error) {
      console.error("Error saving specifications:", error);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submission Form</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("part")}
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${activeTab === "part" ? "bg-[#79c39e] text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Submit a Part
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${activeTab === "config" ? "bg-[#79c39e] text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Submit a Configuration
        </button>
      </div>

      {/* Part Tab */}
      {activeTab === "part" && (
        <div>
          {/* Step 1 — Part form */}
          {!isPartAdded && (
            <>
              <div>
                <label htmlFor="partType">Select below the <strong>type</strong> of part.</label>
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
              <br />
              <div>
                <label>What is the <strong>name</strong> of the part?</label>
                <input
                  type="text"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="e.g. AMD Ryzen 5 5600X"
                />
              </div>
              <br />
              <div>
                <label>What/who is its <strong>manufacturer</strong>?</label>
                <input
                  type="text"
                  value={partManufacturer}
                  onChange={(e) => setPartManufacturer(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="e.g. AMD"
                />
              </div>
              <br />
              <div>
                <label>How much does the part <strong>cost</strong>?</label>
                <input
                  type="number"
                  value={partPrice}
                  onChange={(e) => setPartPrice(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="e.g. 130"
                />
              </div>
              <br />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSubmitPart}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 2 — Specifications form (only after part is added) */}
          {isPartAdded && (
            <div>
              <p className="mb-2">Great! Your part got submitted and received the id {partId}.<br />
              Now, please enter its <strong>specifications</strong> below:</p>
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
                  onClick={handleSubmitSpecifications}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Specifications
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Config Tab */}
      {activeTab === "config" && (
        <div>
          <div>
            <label>Enter below the <strong>name</strong> of the configuration:</label>
            <input
              type="text"
              value=""
              onChange={(e) => setPartName(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="e.g. My Personal Configuration"
            />
          </div>
        </div>
      )}
    </div>
  );
}
