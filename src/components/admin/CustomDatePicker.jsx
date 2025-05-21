// CustomDatePicker.jsx
import React from "react";

const CustomDatePicker = ({ value, onChange }) => {
  // value expected as ISO string or Date object
  const dateValue = value ? new Date(value).toISOString().slice(0, 10) : "";

  return (
    <input
      type="date"
      value={dateValue}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
};

export default CustomDatePicker;
