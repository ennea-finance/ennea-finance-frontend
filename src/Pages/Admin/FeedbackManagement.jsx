import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiEdit, FiTrash2, FiX, FiUploadCloud } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import { toast } from "react-toastify";
import axios from "axios";

const FeedbackManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    reviewer_name: "",
    designation: "",
    message: "",
    rating: "",
    image: null,
  });
  const [preview, setPreview] = useState("");

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // ✅ Fetch all reviews from DB
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/reviews`);
      if (res.data.status === "success") {
        setReviews(res.data.data);
      }
    } catch (error) {
      console.error("⚠️ Error fetching reviews:", error);
      toast.error("Failed to fetch reviews!");
    }
  };

  // ✅ Open modal (add/edit)
  const openModal = (rev = null) => {
    if (rev) {
      setEditingReview(rev);
      setFormData({
        reviewer_name: rev.reviewer_name,
        designation: rev.designation,
        message: rev.message,
        rating: rev.rating,
        image: null,
      });
      setPreview(rev.img || "");
    } else {
      setEditingReview(null);
      setFormData({
        reviewer_name: "",
        designation: "",
        message: "",
        rating: "",
        image: null,
      });
      setPreview("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setFormData({
      reviewer_name: "",
      designation: "",
      message: "",
      rating: "",
      image: null,
    });
    setPreview("");
  };

  // ✅ Handle image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Add or update review
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("reviewer_name", formData.reviewer_name);
      data.append("designation", formData.designation);
      data.append("message", formData.message);
      data.append("rating", formData.rating);
      data.append("isTopReview", formData.isTopReview || 0);
      if (formData.image) data.append("image", formData.image);

      if (editingReview) {
        await axios.put(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/reviews/${editingReview.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("✅ Review updated!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/reviews/create`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("✅ Review added!");
      }

      await fetchReviews();
      closeModal();
    } catch (error) {
      console.error("⚠️ Error saving review:", error);
      toast.error("Failed to save review!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Review
  const handleDelete = (rev) => {
    setSelectedReview(rev);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/reviews/${selectedReview.id}`);
      toast.success("🗑️ Review deleted!");
      setReviews((prev) => prev.filter((r) => r.id !== selectedReview.id));
    } catch (err) {
      toast.error("Failed to delete review!");
    } finally {
      setSelectedReview(null);
      setIsConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setSelectedReview(null);
    setIsConfirmOpen(false);
  };

  // ✅ Toggle Top Review (max 3)
  const toggleTopReview = async (rev) => {
    const topReviews = reviews.filter((r) => r.isTopReview);
    if (!rev.isTopReview && topReviews.length >= 3) {
      toast.warning("You can only have up to 3 top reviews.");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/reviews/${rev.id}`, {
        reviewer_name: rev.reviewer_name,
        designation: rev.designation,
        message: rev.message,
        rating: rev.rating,
        isTopReview: rev.isTopReview ? 0 : 1,
      });
      toast.success("⭐ Top review status updated!");
      await fetchReviews();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update top review!");
    }
  };

  const topReviews = reviews.filter((r) => r.isTopReview);
  const otherReviews = reviews.filter((r) => !r.isTopReview);

  return (
    <div className="flex min-h-screen gap-10">
      <div><Sidebar /></div>

      <main className="flex-1 ml-64 p-16 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Feedback Management
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_5px_25px_rgba(21,0,158,0.4)] transition"
          >
            <FiPlusCircle /> Add Review
          </button>
        </div>

        {/* 🏆 Top Reviews */}
        <section className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-deepblue">Top Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topReviews.map((rev) => (
              <motion.div
                key={rev.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="border border-gray-200 bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] overflow-hidden hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300 p-6 px-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={rev.img} alt={rev.reviewer_name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-base">{rev.reviewer_name}</p>
                    <p className="text-base italic text-deepblue">{rev.designation}</p>
                  </div>
                </div>
                <p className="italic text-gray-700 text-base mb-3">
                  "{rev.message}"
                </p>
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rev.rating ? "fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>

                <div className="flex justify-start gap-4 mt-6">
                  <button
                    onClick={() => toggleTopReview(rev)}
                    className="text-sm bg-deepblue text-white rounded-full py-1 px-5"
                  >
                    Remove Top
                  </button>
                  <button
                    onClick={() => openModal(rev)}
                    className="hover:text-deepblue transition"
                  >
                    <FiEdit className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev)}
                    className="hover:text-deepblue transition"
                  >
                    <FiTrash2 className="inline-block mr-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💬 Other Reviews */}
        <section>
          <h3 className="text-lg font-semibold mb-6 text-deepblue">All Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherReviews.map((rev) => (
              <motion.div
                key={rev.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="border border-gray-200 bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] overflow-hidden hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300 p-6 px-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={rev.img} alt={rev.reviewer_name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-base">{rev.reviewer_name}</p>
                    <p className="text-base italic text-deepblue">{rev.designation}</p>
                  </div>
                </div>
                <p className="italic text-gray-700 text-base mb-3">
                  "{rev.message}"
                </p>
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < rev.rating ? "fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>

                <div className="flex justify-start gap-4 mt-6">
                  <button
                    onClick={() => toggleTopReview(rev)}
                    className="text-sm bg-deepblue text-white rounded-full py-1 px-6"
                  >
                    Make Top
                  </button>
                  <button
                    onClick={() => openModal(rev)}
                    className="hover:text-deepblue transition"
                  >
                    <FiEdit className="inline-block mr-1" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev)}
                    className="hover:text-deepblue transition"
                  >
                    <FiTrash2 className="inline-block mr-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* 🧩 Add/Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-6 text-deepblue">
              {editingReview ? "Edit Review" : "Add New Review"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.reviewer_name}
                onChange={(e) => setFormData({ ...formData, reviewer_name: e.target.value })}
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />
              <input
                type="text"
                placeholder="Role / Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />
              <textarea
                placeholder="Feedback Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              {/* Upload */}
              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-deepblue transition">
                <label className="flex flex-col items-center cursor-pointer">
                  <FiUploadCloud className="text-deepblue text-3xl mb-2" />
                  <span className="text-sm text-gray-600">Upload Profile Photo</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {preview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-full border-2 border-deepblue/30"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-gradient-to-r from-deepblue to-blue-900 text-white font-semibold py-3 rounded-full transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
                  }`}
              >
                {loading ? "Saving..." : editingReview ? "Update Review" : "Add Review"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* 🗑️ Delete Confirmation */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete{" "}
              <span className="text-deepblue">{selectedReview?.reviewer_name}</span>?
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

export default FeedbackManagement;
