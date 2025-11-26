// src/Pages/Admin/FAQManagement.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ question: "", answer: "" });

  const API_BASE = process.env.REACT_APP_ADMIN_BACKEND_URL || "http://localhost:4000";

  // fetch all faqs
  const fetchFAQs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/faqs`);
      if (res.data.status === "success") {
        setFaqs(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch FAQs");
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const openModal = (faq = null) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({ question: faq.question, answer: faq.answer });
    } else {
      setEditingFAQ(null);
      setFormData({ question: "", answer: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFAQ(null);
    setFormData({ question: "", answer: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingFAQ) {
        // update
        const res = await axios.put(`${API_BASE}/api/faqs/${editingFAQ.id}`, {
          question: formData.question,
          answer: formData.answer,
        });
        if (res.data.status === "success") {
          toast.success("FAQ updated");
        }
      } else {
        // create
        const res = await axios.post(`${API_BASE}/api/faqs`, {
          question: formData.question,
          answer: formData.answer,
        });
        if (res.data.status === "success") {
          toast.success("FAQ added");
        }
      }
      await fetchFAQs();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (faq) => {
    setSelectedFAQ(faq);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/faqs/${selectedFAQ.id}`);
      toast.success("FAQ deleted");
      setFaqs((p) => p.filter((f) => f.id !== selectedFAQ.id));
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setSelectedFAQ(null);
      setIsConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setSelectedFAQ(null);
    setIsConfirmOpen(false);
  };

  const toggleTopFAQ = async (faq) => {
    // Determine current top count and check client-side too (helps UX)
    const topCount = faqs.filter((f) => f.isTop === 1).length;
    if (!faq.isTop && topCount >= 5) {
      toast.error("You can have a maximum of 5 top FAQs");
      return;
    }
    try {
      await axios.put(`${API_BASE}/api/faqs/${faq.id}`, {
        isTop: faq.isTop ? 0 : 1,
      });
      toast.success(faq.isTop ? "Removed from top" : "Marked as top");
      await fetchFAQs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update top status");
    }
  };

  const topFAQs = faqs.filter((f) => f.isTop === 1);
  const otherFAQs = faqs.filter((f) => f.isTop !== 1);

  return (
    <div className="flex min-h-screen gap-10">
      <div><Sidebar /></div>

      <main className="flex-1 ml-64 p-16 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">FAQ Management</h2>
          <button
            onClick={() => openModal(null)}
            className="flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-md transition"
          >
            <FiPlusCircle /> Add FAQ
          </button>
        </div>

        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-deepblue">Top FAQs (Max 5)</h3>
          {topFAQs.length === 0 ? (
            <p className="text-gray-500 italic">No top FAQs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {topFAQs.map((faq) => (
                <motion.div key={faq.id} variants={fadeUp} initial="hidden" animate="visible"
                  className="border border-gray-200 bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] overflow-hidden hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300 p-6"
                >
                  <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                  <p className="text-gray-600 mb-4">{faq.answer}</p>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => toggleTopFAQ(faq)} className="px-4 py-2 bg-deepblue text-white rounded-full">Remove Top</button>
                    <button onClick={() => openModal(faq)} className="px-4 py-2 border border-deepblue rounded-full"><FiEdit className="inline-block mr-1" />Edit</button>
                    <button onClick={() => handleDelete(faq)} className="px-4 py-2 border border-deepblue rounded-full"><FiTrash2 className="inline-block mr-1" />Delete</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-deepblue">All FAQs</h3>
          {otherFAQs.length === 0 ? (
            <p className="text-gray-500 italic">No FAQs available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {otherFAQs.map((faq) => (
                <motion.div key={faq.id} variants={fadeUp} initial="hidden" animate="visible"
                  className="border border-gray-200 bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] overflow-hidden hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300 p-6"
                >
                  <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                  <p className="text-gray-600 mb-4">{faq.answer}</p>
                  <div className="flex justify-end gap-3">
                    <button onClick={() => toggleTopFAQ(faq)} className="px-4 py-2 bg-deepblue text-white rounded-full">Make Top</button>
                    <button onClick={() => openModal(faq)} className="px-4 py-2 border border-deepblue rounded-full"><FiEdit className="inline-block mr-1" />Edit</button>
                    <button onClick={() => handleDelete(faq)} className="px-4 py-2 border border-deepblue rounded-full"><FiTrash2 className="inline-block mr-1" />Delete</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={closeModal}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-500"><FiX /></button>
            <h3 className="text-xl font-semibold text-deepblue mb-4">{editingFAQ ? "Edit FAQ" : "Add FAQ"}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input value={formData.question} onChange={(e) => setFormData({ ...formData, question: e.target.value })} required placeholder="Question" className="w-full border rounded-xl p-3" />
              <textarea value={formData.answer} onChange={(e) => setFormData({ ...formData, answer: e.target.value })} required placeholder="Answer" className="w-full border rounded-xl p-3 h-32" />
              <div className="flex gap-3">
                <button disabled={loading} type="submit" className="flex-1 bg-deepblue text-white px-4 py-2 rounded-full">{loading ? "Saving..." : editingFAQ ? "Update FAQ" : "Add FAQ"}</button>
                <button type="button" onClick={closeModal} className="flex-1 border border-gray-300 rounded-full px-4 py-2">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete confirmation */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={cancelDelete}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <h4 className="text-lg font-semibold mb-4">Delete FAQ?</h4>
            <p className="text-gray-600 mb-6">“{selectedFAQ?.question}”</p>
            <div className="flex justify-center gap-3">
              <button onClick={confirmDelete} className="px-4 py-2 bg-deepblue text-white rounded-full">Yes, delete</button>
              <button onClick={cancelDelete} className="px-4 py-2 border rounded-full">Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
