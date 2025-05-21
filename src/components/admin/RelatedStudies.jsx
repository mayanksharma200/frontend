// RelatedStudies.jsx
import React from "react";

const RelatedStudies = ({ relatedStudies, setRelatedStudies }) => {
  const handleChange = (index, field, value) => {
    const newStudies = [...relatedStudies];
    newStudies[index] = { ...newStudies[index], [field]: value };
    setRelatedStudies(newStudies);
  };

  const handleAdd = () => {
    setRelatedStudies([...relatedStudies, { title: "", url: "" }]);
  };

  const handleRemove = (index) => {
    const newStudies = relatedStudies.filter((_, i) => i !== index);
    setRelatedStudies(newStudies);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Related Studies</h3>
      {relatedStudies.map((study, index) => (
        <div key={index} className="mb-2 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Title"
            value={study.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <input
            type="url"
            placeholder="URL"
            value={study.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
            className="border p-2 rounded flex-grow"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-600 font-bold px-2"
            aria-label={`Remove related study ${index + 1}`}
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Related Study
      </button>
    </div>
  );
};

export default RelatedStudies;
