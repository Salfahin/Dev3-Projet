// The form that allows a user to submit a configuration.

export default function ConfigForm({
    configName,
    setConfigName,
    configAuthor,
    setConfigAuthor,
    onSubmit,
} ) {
    return (
        <div>
            <div>
                <label htmlFor="configName">Enter below the <strong>name</strong> of the configuration:</label>
                <input
                    id="configName"
                    type="text"
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="e.g. My Personal Configuration"
                />
            </div>
            <br />
            <div>
                <label htmlFor="configAuthor">Enter below the <strong>author</strong> of the configuration:</label>
                <input
                    id="configAuthor"
                    type="text"
                    value={configAuthor}
                    onChange={(e) => setConfigAuthor(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="e.g. Linus Torvals"
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
        </div>
    );
};
