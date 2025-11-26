import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiEdit, FiTrash2, FiX, FiUploadCloud } from "react-icons/fi";
import Sidebar from "../../Components/Sidebar";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { toast } from "react-toastify";

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
    content: "",
  });

  // ReactQuill toolbar config
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "clean"],
    ],
  };

  // 🌐 Fetch all blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/blogs`
      );
      if (res.data.status === "success") {
        setArticles(res.data.data);
      } else {
        toast.error("Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error fetching blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✨ Open Modal (for add/edit)
  const openModal = (article = null) => {
    if (article) {
      setSelectedArticle(article);
      setFormData({
        title: article.title,
        category: article.category,
        image: null,
        content: article.content,
      });
    } else {
      setSelectedArticle(null);
      setFormData({ title: "", category: "", image: null, content: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    setFormData({ title: "", category: "", image: null, content: "" });
  };

  // 📝 Add or Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      if (formData.image) data.append("image", formData.image);

      let response;
      if (selectedArticle) {
        // UPDATE BLOG
        response = await axios.put(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/blogs/${selectedArticle.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // CREATE BLOG
        response = await axios.post(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/blogs/create`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data.status === "success") {
        toast.success(
          selectedArticle ? "✅ Blog updated successfully" : "✅ Blog added successfully"
        );
        await fetchBlogs(); // Refresh list from DB
        closeModal();
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete Blog
  const handleDelete = (article) => {
    setSelectedArticle(article);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/blogs/${selectedArticle.id}`
      );
      if (res.data.status === "success") {
        toast.success("🗑️ Blog deleted successfully");
        await fetchBlogs(); // Refresh after delete
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error deleting blog");
    } finally {
      setIsConfirmOpen(false);
      setSelectedArticle(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="flex min-h-screen gap-10">
      <div>
        <Sidebar />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 ml-64 p-10 px-16 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Articles & News Management
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_5px_25px_rgba(21,0,158,0.4)] transition"
          >
            <FiPlusCircle /> Add Article
          </button>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <p className="text-gray-600 text-lg">No blogs found.</p>
          ) : (
            articles.map((article) => (
              <motion.div
                key={article.id}
                className="border border-gray-200 bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] overflow-hidden hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300 flex flex-col"
              >
                {/* 🖼️ Image */}
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover p-4 rounded-3xl"
                  />
                </div>

                {/* 📄 Content */}
                <div className="flex flex-col justify-between flex-grow p-6 pt-4">
                  <div>
                    {/* Category + Date */}
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span className="text-deepblue font-medium italic">
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2 min-h-[3rem]">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <div
                      className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[4rem]"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    ></div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-start gap-3 mt-6">
                    <button
                      onClick={() => openModal(article)}
                      className="flex items-center gap-2 bg-deepblue text-white py-2 px-5 rounded-full hover:bg-blue-900 transition"
                    >
                      <FiEdit className="text-sm" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article)}
                      className="flex items-center gap-2 border border-deepblue  py-2 px-5 rounded-full hover:bg-deepblue hover:text-white transition"
                    >
                      <FiTrash2 className="text-sm" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </main>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-6 text-deepblue">
              {selectedArticle ? "Edit Blog" : "Add New Blog"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Blog Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              /> */}

              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-deepblue transition">
                <label className="flex flex-col items-center cursor-pointer">
                  <FiUploadCloud className="text-deepblue text-3xl mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-xl mt-3"
                />
              )}

              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
                modules={quillModules}
                placeholder="Write your blog content..."
                className="bg-white border rounded-xl"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-gradient-to-r from-deepblue to-blue-900 text-white font-semibold py-3 rounded-full transition ${loading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-[0_5px_20px_rgba(21,0,158,0.4)]"
                  }`}
              >
                {loading
                  ? "Saving..."
                  : selectedArticle
                    ? "Update Blog"
                    : "Publish Blog"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete{" "}
              <span className="text-deepblue">{selectedArticle?.title}</span>?
            </h3>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={confirmDelete}
                className="bg-deepblue text-white px-6 py-2 rounded-full hover:opacity-90 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-200 px-6 py-2 rounded-full hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ArticlesManagement;
