// This is the main container of the page to submit components.

import React, { useState } from "react";
import PartSubmissionForm from "./Parts_Tab/PartSubmissionForm";
import ConfigSubmissionForm from "./Configurations_Tab/ConfigSubmissionForm";

export default function SubmissionForm() {
  const [activeTab, setActiveTab] = useState("part");

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

      {/* Render form depending on tab */}
      {activeTab === "part" && <PartSubmissionForm />}
      {activeTab === "config" && <ConfigSubmissionForm />}
    </div>
  );
}
