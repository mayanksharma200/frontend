import React, { useState, useRef } from "react";
import axios from "axios";

const AdminVideoUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a video file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await axios.post(
        "https://fitness-backend-api-production.up.railway.app/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(
        `Upload successful: ${
          response.data.filename || response.data.file.filename
        }`
      );
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null; // reset input
    } catch (error) {
      setMessage(
        "Upload failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Video Upload</h2>

      {/* Hidden file input */}
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {/* Label styled as button */}
      <label
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        className="inline-block cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {file ? file.name : "Select Video"}
      </label>

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 block"
      >
        {uploading ? "Uploading..." : "Upload Video"}
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
};

export default AdminVideoUpload;
