import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";

const AdminCus = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("title");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPosts(posts);
    } else if (Array.isArray(posts)) {
      const filtered = posts.filter((post) => {
        if (searchField === "id") return post._id.includes(searchTerm);
        return post[searchField]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]);
    }
  }, [searchTerm, searchField, posts]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://fitness-backend-api-production.up.railway.app/api/posts"
      );
      if (Array.isArray(res.data)) {
        setPosts(res.data);
        setFilteredPosts(res.data);
        setError("");
      } else {
        setError("Unexpected data format from API");
        setPosts([]);
        setFilteredPosts([]);
      }
    } catch (err) {
      setError("Failed to fetch posts");
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      if (selectedPost) {
        await axios.put(
          `https://fitness-backend-api-production.up.railway.app/api/posts/${selectedPost._id}`,
          data
        );
      } else {
        await axios.post(
          "https://fitness-backend-api-production.up.railway.app/api/posts",
          data
        );
      }
      await fetchPosts();
      setSelectedPost(null);
      setError("");
    } catch (err) {
      setError("Failed to save post");
      throw err; // so PostForm can catch and show error
    } finally {
      setIsLoading(false);
    }
  };

  // New: Delete post handler
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);
    try {
      await axios.delete(
        `https://fitness-backend-api-production.up.railway.app/api/posts/${postId}`
      );
      // If deleted post is currently selected, clear selection
      if (selectedPost?._id === postId) {
        setSelectedPost(null);
      }
      await fetchPosts();
      setError("");
    } catch (err) {
      setError("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Search Controls */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border rounded p-2"
        >
          <option value="title">Title</option>
          <option value="position">Position</option>
          <option value="id">ID</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-grow min-w-[200px]"
        />
      </div>

      {/* Posts List */}
      <div className="mb-6 max-h-96 overflow-y-auto border rounded p-2">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map((post) => (
              <li
                key={post._id}
                className={`flex justify-between items-center cursor-pointer p-2 rounded mb-1 ${
                  selectedPost?._id === post._id
                    ? "bg-blue-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div
                  onClick={() => handleSelectPost(post)}
                  className="flex-grow"
                >
                  <div className="font-semibold">{post.title}</div>
                  <div className="text-sm text-gray-600">
                    Position: {post.position} | ID: {post._id}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Delete post"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}
      </div>

      {/* Post Form */}
      <div>
        <PostForm
          key={selectedPost?._id || "new"}
          post={selectedPost}
          onSave={handleSave}
          onCancel={() => setSelectedPost(null)}
        />
      </div>
    </div>
  );
};

export default AdminCus;
