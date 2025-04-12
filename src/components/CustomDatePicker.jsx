import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ value, onChange }) => {
  const formatDate = (date) => {
    return date
      ? date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";
  };

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <DatePicker
      selected={parseDate(value)}
      onChange={(date) => onChange(formatDate(date))}
      dateFormat="MMMM d, yyyy"
      placeholderText="April 2, 2025"
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
    />
  );
};

export default CustomDatePicker;