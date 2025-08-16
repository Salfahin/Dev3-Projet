// The main container of the two forms "parts" and "configurations".

import { useState } from "react";
import PartForm from "./PartForm";
import SpecificationsForm from "./SpecificationsForm";

export default function SubmissionForm() {
  const [activeTab, setActiveTab] = useState("part");
  const [rows, setRows] = useState([{ specification: "", value: "" }]);

  // Part form state
  const [partType, setPartType] = useState("0");
  const [partName, setPartName] = useState("");
  const [partManufacturer, setPartManufacturer] = useState("");
  const [partPrice, setPartPrice] = useState("");

  // Step control
  const [partId, setPartId] = useState(null);
  const [isPartAdded, setIsPartAdded] = useState(false);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { specification: "", value: "" }]);
  };

  const handleSubmitPart = async () => {
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
        setPartId(result.part.part_id);
        setIsPartAdded(true);
      } else {
        console.error("No part_id returned from backend");
      }
    } catch (error) {
      console.error("Error submitting part:", error);
    }
  };

  const handleSubmitSpecifications = async () => {
    try {
      const payload = { part_id: partId, specifications: rows };

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
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            activeTab === "part"
              ? "bg-[#79c39e] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Submit a Part
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`flex-1 py-3 text-lg font-semibold transition-colors ${
            activeTab === "config"
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
          {!isPartAdded ? (
            <PartForm
              partType={partType}
              setPartType={setPartType}
              partName={partName}
              setPartName={setPartName}
              partManufacturer={partManufacturer}
              setPartManufacturer={setPartManufacturer}
              partPrice={partPrice}
              setPartPrice={setPartPrice}
              onSubmit={handleSubmitPart}
            />
          ) : (
            <SpecificationsForm
              partId={partId}
              rows={rows}
              handleChange={handleChange}
              addRow={addRow}
              onSubmit={handleSubmitSpecifications}
            />
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
