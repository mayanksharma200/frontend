import React from "react";

const Subsections = ({ subsections = [], setSubsections }) => {
  const handleChange = (index, field, value) => {
    const newSubs = [...subsections];
    newSubs[index] = { ...newSubs[index], [field]: value };
    setSubsections(newSubs);
  };

  const handleAdd = () => {
    setSubsections([...subsections, { subheading: "", content: "" }]);
  };

  const handleRemove = (index) => {
    const newSubs = subsections.filter((_, i) => i !== index);
    setSubsections(newSubs);
  };

  return (
    <div className="mb-3">
      <h5 className="font-semibold mb-1">Subsections</h5>
      {subsections.map((sub, index) => (
        <div key={index} className="mb-2 border p-2 rounded">
          <div className="flex justify-between items-center mb-1">
            <span>Subsection #{index + 1}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 font-bold px-2"
              aria-label={`Remove subsection ${index + 1}`}
            >
              &times;
            </button>
          </div>
          <input
            type="text"
            placeholder="Subheading"
            value={sub.subheading || ""}
            onChange={(e) => handleChange(index, "subheading", e.target.value)}
            className="border p-1 rounded w-full mb-1"
          />
          <textarea
            placeholder="Content"
            value={sub.content || ""}
            onChange={(e) => handleChange(index, "content", e.target.value)}
            className="border p-1 rounded w-full"
            rows={3}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Add Subsection
      </button>
    </div>
  );
};

export default Subsections;
