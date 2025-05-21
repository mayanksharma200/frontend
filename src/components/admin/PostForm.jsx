// PostForm.jsx
import React, { useState, useEffect } from "react";
import SummaryItems from "./SummaryItems";
import BodyItems from "./BodyItems";
import RelatedStudies from "./RelatedStudies";
import CustomDatePicker from "./CustomDatePicker";
import ImageGenerationConfig from "./ImageGenerationConfig";

const positionOptions = [
  {
    label: "Index",
    options: [
      { label: "Top", value: "TopTwoArticles" },
      { label: "This Just In", value: "JustIn" },
      { label: "More Top Reads", value: "MoreTopReads" },
    ],
  },
  {
    label: "Nutrition",
    options: [
      { label: "Top", value: "NutritionTop" },
      { label: "Mid", value: "NutritionMid" },
    ],
  },
  {
    label: "Sleep",
    options: [
      { label: "Top", value: "SleepTop" },
      { label: "Mid", value: "SleepMid" },
    ],
  },
  {
    label: "Mental Health",
    options: [
      { label: "Top", value: "MentalHealthTop" },
      { label: "Mid", value: "MentalHealthMid" },
    ],
  },
  {
    label: "Fitness",
    options: [
      { label: "Top", value: "FitnessTop" },
      { label: "Mid", value: "FitnessMid" },
    ],
  },
  {
    label: "Product Reviews",
    options: [
      { label: "Top", value: "ProductReviewsTop" },
      { label: "Mid", value: "ProductReviewsMid" },
    ],
  },
  {
    label: "View All",
    options: [
      { label: "Top", value: "ViewAllTop" },
      { label: "Mid", value: "ViewAllMid" },
    ],
  },
];

const PostForm = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    position: "",
    link: "",
    content: { summary: [], body: [] },
    meta: { author: "", date: "", reviewer: "", readTime: "" },
    image: "",
    related_studies: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [sectionsCount, setSectionsCount] = useState(5);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        position: post.position || "",
        link: post.link || "",
        content: {
          summary: Array.isArray(post.content?.summary)
            ? post.content.summary
            : [],
          body: Array.isArray(post.content?.body)
            ? post.content.body.map((item) => ({
                ...item,
                heading: item.headline || "",
              }))
            : [],
        },
        meta: {
          author: post.meta?.author || "",
          date: post.meta?.date || "",
          reviewer: post.meta?.reviewer || "",
          readTime: post.meta?.readTime || "",
        },
        image: post.image || "",
        related_studies: Array.isArray(post.related_studies)
          ? post.related_studies
          : [],
      });
    } else {
      setFormData({
        title: "",
        position: "",
        link: "",
        content: { summary: [], body: [] },
        meta: { author: "", date: "", reviewer: "", readTime: "" },
        image: "",
        related_studies: [],
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const generateAIContent = async () => {
    if (!formData.title) {
      setAiError("Please enter a title first");
      return;
    }
    setIsGenerating(true);
    setAiError("");
    try {
      const res = await fetch(
        "https://fitness-backend-api-production.up.railway.app/api/posts/generate-content",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            position: formData.position,
            imageUrl: formData.image,
            sections: sectionsCount,
          }),
        }
      );
      const data = await res.json();
      if (data.success && data.content) {
        const apiContent = data.content;
        setFormData({
          title: apiContent.title || "",
          position: apiContent.position || "",
          link: apiContent.link || "",
          content: {
            summary: Array.isArray(apiContent.content?.summary)
              ? apiContent.content.summary
              : [],
            body: Array.isArray(apiContent.content?.body)
              ? apiContent.content.body.map((item) => ({
                  ...item,
                  heading: item.headline || "",
                }))
              : [],
          },
          meta: {
            author: apiContent.content?.meta?.author || "",
            date: apiContent.content?.meta?.date || "",
            reviewer: apiContent.content?.meta?.reviewer || "",
            readTime: apiContent.content?.meta?.readTime || "",
          },
          image: apiContent.content?.image || "",
          related_studies: Array.isArray(apiContent.content?.related_studies)
            ? apiContent.content.related_studies
            : [],
        });
      } else {
        setAiError("AI generation failed");
      }
    } catch (err) {
      setAiError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      onCancel();
    } catch (err) {
      setAiError("Failed to save post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="border p-2 rounded w-full"
          placeholder="Enter post title"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Position</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a position</option>
          {positionOptions.map((category) => (
            <optgroup key={category.label} label={category.label}>
              {category.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {category.label} - {option.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Link</label>
        <input
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
          placeholder="Enter link URL"
        />
      </div>

      <ImageGenerationConfig
        image={formData.image}
        setImage={(url) => setFormData((f) => ({ ...f, image: url }))}
        title={formData.title}
        sectionsCount={sectionsCount}
        setSectionsCount={setSectionsCount}
        generateAIContent={generateAIContent}
        isGenerating={isGenerating}
      />

      <SummaryItems
        summary={formData.content.summary}
        setSummary={(summary) =>
          setFormData((f) => ({
            ...f,
            content: { ...f.content, summary },
          }))
        }
      />

      <BodyItems
        body={formData.content.body}
        setBody={(body) =>
          setFormData((f) => ({
            ...f,
            content: { ...f.content, body },
          }))
        }
      />

      <RelatedStudies
        relatedStudies={formData.related_studies}
        setRelatedStudies={(related_studies) =>
          setFormData((f) => ({ ...f, related_studies }))
        }
      />

      <div>
        <label className="block font-semibold mb-1">Author</label>
        <input
          value={formData.meta.author}
          onChange={(e) => handleNestedChange("meta", "author", e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Author name"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Date</label>
        <CustomDatePicker
          value={formData.meta.date}
          onChange={(date) => handleNestedChange("meta", "date", date)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Reviewer</label>
        <input
          value={formData.meta.reviewer}
          onChange={(e) =>
            handleNestedChange("meta", "reviewer", e.target.value)
          }
          className="border p-2 rounded w-full"
          placeholder="Reviewer name"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Read Time</label>
        <input
          value={formData.meta.readTime}
          onChange={(e) =>
            handleNestedChange("meta", "readTime", e.target.value)
          }
          className="border p-2 rounded w-full"
          placeholder="Read time (e.g., 5 min)"
        />
      </div>

      {aiError && <p className="text-red-600">{aiError}</p>}

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
