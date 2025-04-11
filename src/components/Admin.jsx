import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
const [formData, setFormData] = useState({
  title: "",
  position: "",
  content: {
    summary: [],
    body: [],
  },
  meta: {},
  image: "",
  related_studies: [],
});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        if (searchField === "id") {
          return post._id.includes(searchTerm);
        } else {
          return post[searchField]
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      });
      setFilteredPosts(filtered);
    }
  }, [searchTerm, searchField, posts]);

const fetchPosts = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get("https://fitness-backend-api.vercel.app/api/posts");
    // Normalize the data to ensure content structure exists
    const normalizedPosts = response.data.map((post) => ({
      ...post,
      content: {
        summary: post.content?.summary || [],
        body: post.content?.body || [],
        ...post.content,
      },
    }));
    setPosts(normalizedPosts);
    setFilteredPosts(normalizedPosts);
    setError("");
  } catch (err) {
    setError("Failed to fetch posts");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

  const fetchTopArticles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://fitness-backend-api.vercel.app/api/posts/top-articles"
      );
      setFilteredPosts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch top articles");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

const handleSelectPost = (post) => {
  setSelectedPost(post);
  setFormData({
    title: post.title,
    position: post.position,
    content: {
      summary: post.content?.summary || [],
      body: post.content?.body || [],
    },
    meta: post.meta || {},
    image: post.image || "",
    related_studies: post.related_studies || [],
  });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (parentField, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value,
      },
    }));
  };

  // Update the array item handlers to work with nested content
  const handleArrayItemChange = (arrayName, index, field, value) => {
    setFormData((prev) => {
      const newContent = { ...prev.content };
      newContent[arrayName] = [...newContent[arrayName]];
      newContent[arrayName][index] = {
        ...newContent[arrayName][index],
        [field]: value,
      };
      return {
        ...prev,
        content: newContent,
      };
    });
  };

const handleAddArrayItem = (arrayName, template) => {
  setFormData((prev) => {
    const newContent = { ...prev.content };
    newContent[arrayName] = [...newContent[arrayName], template]; // Fixed the comma issue
    return {
      ...prev,
      content: newContent,
    };
  });
};
const handleRemoveArrayItem = (arrayName, index) => {
  setFormData((prev) => {
    const newContent = { ...prev.content };
    newContent[arrayName] = newContent[arrayName].filter((_, i) => i !== index);
    return {
      ...prev,
      content: newContent,
    };
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (selectedPost) {
        await axios.put(
          `https://fitness-backend-api.vercel.app/api/posts/${selectedPost._id}`,
          formData
        );
      } else {
        await axios.post("https://fitness-backend-api.vercel.app/api/posts", formData);
      }
      fetchPosts();
      setSelectedPost(null);
      setFormData({
        title: "",
        position: "",
        content: {},
        summary: [],
        body: [],
        meta: {},
        image: "",
        related_studies: [],
      });
      setError("");
    } catch (err) {
      setError("Failed to save post");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);
    try {
      await axios.delete(`https://fitness-backend-api.vercel.app/api/posts/${id}`);
      fetchPosts();
      if (selectedPost && selectedPost._id === id) {
        setSelectedPost(null);
        setFormData({
          title: "",
          position: "",
          content: {},
          summary: [],
          body: [],
          meta: {},
          image: "",
          related_studies: [],
        });
      }
      setError("");
    } catch (err) {
      setError("Failed to delete post");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

const handleResetForm = () => {
  setSelectedPost(null);
  setFormData({
    title: "",
    position: "",
    content: {
      summary: [],
      body: [],
    },
    meta: {},
    image: "",
    related_studies: [],
  });
};

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post Management</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="title">Search by Title</option>
          <option value="position">Search by Position</option>
          <option value="id">Search by ID</option>
        </select>

        <input
          type="text"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={`Search by ${searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={fetchPosts}
        >
          Show All
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={fetchTopArticles}
        >
          Show Top Articles
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-4 overflow-y-auto max-h-screen">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Posts</h2>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {filteredPosts.map((post) => (
                <li
                  key={post._id}
                  className={`p-3 rounded-md cursor-pointer ${
                    selectedPost?._id === post._id
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectPost(post)}
                >
                  <h3 className="font-medium text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    Position: {post.position}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    ID: {post._id}
                  </p>
                  <button
                    className="mt-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post._id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {selectedPost ? "Edit Post" : "Create New Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500   text-gray-900"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., TopTwoArticles"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-3">
                Meta Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    value={formData.meta.author || ""}
                    onChange={(e) =>
                      handleNestedInputChange("meta", "author", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    value={formData.meta.date || ""}
                    onChange={(e) =>
                      handleNestedInputChange("meta", "date", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reviewer
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    value={formData.meta.reviewer || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "meta",
                        "reviewer",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    value={formData.meta.readTime || ""}
                    onChange={(e) =>
                      handleNestedInputChange(
                        "meta",
                        "readTime",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Summary Items
                </h3>
                <button
                  type="button"
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  onClick={() =>
                    handleAddArrayItem("summary", { title: "", text: "" })
                  }
                >
                  Add Summary Item
                </button>
              </div>

              {formData.content?.summary?.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        value={item.title || ""}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "summary",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                        onClick={() => handleRemoveArrayItem("summary", index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      rows="3"
                      value={item.text || ""}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "summary",
                          index,
                          "text",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Body Content
                </h3>
                <button
                  type="button"
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  onClick={() =>
                    handleAddArrayItem("body", { headline: "", content: "" })
                  }
                >
                  Add Body Item
                </button>
              </div>

              {formData.content?.body?.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Headline
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        value={item.headline || ""}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "body",
                            index,
                            "headline",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                        onClick={() => handleRemoveArrayItem("body", index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      rows="3"
                      value={item.content || ""}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "body",
                          index,
                          "content",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Related Studies
                </h3>
                <button
                  type="button"
                  className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                  onClick={() =>
                    handleAddArrayItem("related_studies", {
                      title: "",
                      link: "",
                    })
                  }
                >
                  Add Related Study
                </button>
              </div>

              {formData.related_studies.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Study Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        value={item.title || ""}
                        onChange={(e) =>
                          handleArrayItemChange(
                            "related_studies",
                            index,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex items-end justify-end">
                      <button
                        type="button"
                        className="px-2 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                        onClick={() =>
                          handleRemoveArrayItem("related_studies", index)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      value={item.link || ""}
                      onChange={(e) =>
                        handleArrayItemChange(
                          "related_studies",
                          index,
                          "link",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleResetForm}
                disabled={isLoading}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : selectedPost
                  ? "Update Post"
                  : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
