// This it the whole form / tab that contains all forms to submit a part to the website.

import React, { useState } from "react";
import PartForm from "./PartForm";
import PartSpecificationsForm from "./PartSpecificationsForm";

export default function PartSubmissionForm() {
  const [rows, setRows] = useState([{ specification: "", value: "" }]);
  const [partType, setPartType] = useState("0");
  const [partName, setPartName] = useState("");
  const [partManufacturer, setPartManufacturer] = useState("");
  const [partPrice, setPartPrice] = useState("");
  const [partId, setPartId] = useState(null);
  const [isPartAdded, setIsPartAdded] = useState(false);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, { specification: "", value: "" }]);

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
      if (result.part?.part_id) {
        setPartId(result.part.part_id);
        setIsPartAdded(true);
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
      alert(":)\nGreat. Your part was added.\nThanks!");
    } catch (error) {
      console.error("Error saving specifications:", error);
    }
  };

  return (
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
        <PartSpecificationsForm
          partId={partId}
          rows={rows}
          handleChange={handleChange}
          addRow={addRow}
          onSubmit={handleSubmitSpecifications}
        />
      )}
    </div>
  );
}
