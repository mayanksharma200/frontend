// Hyperlinks.jsx
import React from "react";

const Hyperlinks = ({ hyperlinks = [], setHyperlinks }) => {
  // Normalize hyperlinks so each item has 'text' and 'url' keys
  // This helps if your data uses 'link' instead of 'url'
  const normalizedLinks = hyperlinks.map((link) => ({
    text: link.text || "",
    url: link.url || link.link || "",
  }));

  const handleChange = (index, field, value) => {
    const newLinks = [...normalizedLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setHyperlinks(newLinks);
  };

  const handleAdd = () => {
    setHyperlinks([...normalizedLinks, { text: "", url: "" }]);
  };

  const handleRemove = (index) => {
    const newLinks = normalizedLinks.filter((_, i) => i !== index);
    setHyperlinks(newLinks);
  };

  return (
    <div className="mb-3">
      <h5 className="font-semibold mb-1">Hyperlinks</h5>
      {normalizedLinks.map((link, index) => (
        <div key={index} className="mb-2 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Text"
            value={link.text}
            onChange={(e) => handleChange(index, "text", e.target.value)}
            className="border p-1 rounded flex-grow"
          />
          <input
            type="url"
            placeholder="URL"
            value={link.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
            className="border p-1 rounded flex-grow"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-600 font-bold px-2"
            aria-label={`Remove hyperlink ${index + 1}`}
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Add Hyperlink
      </button>
    </div>
  );
};

export default Hyperlinks;
