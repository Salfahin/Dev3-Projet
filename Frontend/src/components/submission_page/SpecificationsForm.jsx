// The form in SubmissionForm that submits the specifications of a part provided in step 1.

export default function SpecificationsForm({ partId, rows, handleChange, addRow, onSubmit }) {
  return (
    <div>
      <p className="mb-2">
        Great! Your part got submitted and received the id {partId}.<br />
        Now, please enter its <strong>specifications</strong> below:
      </p>

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
          onClick={onSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Specifications
        </button>
      </div>
    </div>
  );
}
