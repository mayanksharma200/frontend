import React from "react";

const SummaryItems = ({ summary = [], setSummary }) => {
  const handleChange = (index, field, value) => {
    const newSummary = [...summary];
    newSummary[index] = { ...newSummary[index], [field]: value };
    setSummary(newSummary);
  };

  const handleAdd = () => {
    setSummary([...summary, { title: "", text: "" }]);
  };

  const handleRemove = (index) => {
    const newSummary = summary.filter((_, i) => i !== index);
    setSummary(newSummary);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Summary Items</h3>
      {summary.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 mb-4 border p-3 rounded"
        >
          <input
            type="text"
            value={item.title || ""}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="border p-2 rounded w-full"
            placeholder={`Summary title #${index + 1}`}
          />
          <textarea
            value={item.text || ""}
            onChange={(e) => handleChange(index, "text", e.target.value)}
            className="border p-2 rounded w-full"
            placeholder={`Summary text #${index + 1}`}
            rows={3}
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="self-start text-red-600 font-bold px-2"
            aria-label={`Remove summary item ${index + 1}`}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Summary Item
      </button>
    </div>
  );
};

export default SummaryItems;
