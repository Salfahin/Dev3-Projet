// The form in SubmissionForm that exclusively submits a part (step1).
// This is not the form that will submit specifications!

export default function PartForm({
  partType,
  setPartType,
  partName,
  setPartName,
  partManufacturer,
  setPartManufacturer,
  partPrice,
  setPartPrice,
  onSubmit,
}) {
  return (
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
          onClick={onSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </>
  );
}
