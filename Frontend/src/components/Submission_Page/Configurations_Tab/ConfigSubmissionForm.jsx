// This it the whole form / tab that contains all forms to submit a configuration to the website.

import React, { useState } from "react";
import ConfigForm from "./ConfigForm";
import ConfigPartsForm from "./ConfigPartsForm";
import { API_URL } from "../../../config";

export default function ConfigSubmissionForm() {
  const [rows, setRows] = useState([{ type: "", part: "" }]);
  const [configName, setConfigName] = useState("");
  const [configAuthor, setConfigAuthor] = useState("");
  const [configId, setConfigId] = useState(null);
  const [isConfigAdded, setIsConfigAdded] = useState(false);

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => setRows([...rows, { type: "", part: "" }]);

  const handleSubmitConfig = async () => { // Gets called when ConfigForm is submitted.
    const configData = {
      config_name: configName,
      config_author: configAuthor,
    };

    try {
      const response = await fetch(`${API_URL}/api/add-config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configData),
      });

      const result = await response.json();
      if (result.config?.config_id) {
        setConfigId(result.config.config_id);
        setIsConfigAdded(true);
      }
    } catch (error) {
      console.error(":(\nError submitting config:", error);
    }
  };

  const handleSubmitConfigParts = async () => { // Gets called when ConfigPartsForm is submitted.
    try {
      const payload = { config_id: configId, parts: rows };
      const response = await fetch(`${API_URL}/api/add-configparts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert(":)\nYour configuration has been submitted. It is now waiting for review before being added to our webiste.\nThanks!");
      window.location.href = `/config`;
    } catch (error) {
      console.error(":(\nError saving the parts of the configuration:", error);
      alert(":(\nError saving the parts of the configurations.");
    }
  };

  return (
    <div>
      {!isConfigAdded ? (
        <ConfigForm
          configName={configName}
          setConfigName={setConfigName}
          configAuthor={configAuthor}
          setConfigAuthor={setConfigAuthor}
          onSubmit={handleSubmitConfig}
        />
      ) : (
        <ConfigPartsForm
          configId={configId}
          rows={rows}
          handleChange={handleChange}
          addRow={addRow}
          onSubmit={handleSubmitConfigParts}
        />
      )}
    </div>
  );
}
