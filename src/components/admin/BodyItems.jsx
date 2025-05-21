import React from "react";
import Subsections from "./Subsections";
import Hyperlinks from "./Hyperlinks";

const BodyItems = ({ body = [], setBody }) => {
  const handleChange = (index, field, value) => {
    const newBody = [...body];
    newBody[index] = { ...newBody[index], [field]: value };
    setBody(newBody);
  };

  const handleAdd = () => {
    setBody([
      ...body,
      { heading: "", content: "", subsections: [], hyperlinks: [] },
    ]);
  };

  const handleRemove = (index) => {
    const newBody = body.filter((_, i) => i !== index);
    setBody(newBody);
  };

  const setSubsections = (index, subsections) => {
    const newBody = [...body];
    newBody[index].subsections = subsections;
    setBody(newBody);
  };

  const setHyperlinks = (index, hyperlinks) => {
    const newBody = [...body];
    newBody[index].hyperlinks = hyperlinks;
    setBody(newBody);
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Body Items</h3>
      {body.map((item, index) => (
        <div key={index} className="border p-3 rounded mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Section #{index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 font-bold px-2"
              aria-label={`Remove body section ${index + 1}`}
            >
              &times;
            </button>
          </div>
          <input
            type="text"
            placeholder="Heading"
            value={item.heading}
            onChange={(e) => handleChange(index, "heading", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            placeholder="Content"
            value={item.content}
            onChange={(e) => handleChange(index, "content", e.target.value)}
            className="border p-2 rounded w-full mb-2"
            rows={4}
          />
          <Subsections
            subsections={item.subsections || []}
            setSubsections={(subs) => setSubsections(index, subs)}
          />
          <Hyperlinks
            hyperlinks={item.hyperlinks || []}
            setHyperlinks={(links) => setHyperlinks(index, links)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Add Body Section
      </button>
    </div>
  );
};

export default BodyItems;
