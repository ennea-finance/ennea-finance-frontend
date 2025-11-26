import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlusCircle, FiEdit, FiTrash2, FiX } from "react-icons/fi";
import Sidebar from "../../Components/Sidebar";

const ServicesManagement = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Wealth Advisory",
      desc: "Comprehensive investment strategies tailored to your goals.",
    },
    {
      id: 2,
      title: "Tax Planning",
      desc: "Optimize your tax savings through expert, compliant planning.",
    },
    {
      id: 3,
      title: "Portfolio Management",
      desc: "Get personalized financial advice for better wealth growth.",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({ title: "", desc: "" });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const openModal = (srv = null) => {
    if (srv) {
      setEditingService(srv);
      setFormData({ title: srv.title, desc: srv.desc });
    } else {
      setEditingService(null);
      setFormData({ title: "", desc: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({ title: "", desc: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id ? { ...formData, id: s.id } : s
        )
      );
    } else {
      const newService = {
        id: Date.now(),
        title: formData.title,
        desc: formData.desc,
      };
      setServices([...services, newService]);
    }

    closeModal();
  };

  const handleDelete = (srv) => {
    setSelectedService(srv);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    setServices(services.filter((s) => s.id !== selectedService.id));
    setSelectedService(null);
    setIsConfirmOpen(false);
  };

  const cancelDelete = () => {
    setSelectedService(null);
    setIsConfirmOpen(false);
  };

  return (
    <div className="flex min-h-screen gap-12">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* Main Section */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Services Management
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_5px_25px_rgba(21,0,158,0.4)] transition"
          >
            <FiPlusCircle /> Add Service
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((srv) => (
            <motion.div
              key={srv.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl border border-deepblue p-6"
            >
              <h3 className="text-xl font-bold text-deepblue">
                {srv.title}
              </h3>
              <p className="text-gray-600 text-base mt-2">{srv.desc}</p>

              <div className="flex gap-2 mt-6 text-gray-600 justify-end">
                <button
                  onClick={() => openModal(srv)}
                  className="flex gap-1 bg-deepblue text-white py-2 px-10 rounded-full hover:bg-blue-800 transition"
                  title="Edit"
                >
                  <FiEdit size={18} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(srv)}
                  className="flex gap-1 border border-deepblue py-2 px-10 rounded-full hover:text-deepblue transition"
                  title="Delete"
                >
                  <FiTrash2 size={18} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Add/Edit Modal */}
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
              {editingService ? "Edit Service" : "Add New Service"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Service Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />
              <textarea
                placeholder="Service Description"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-deepblue to-blue-900 text-white font-semibold py-3 rounded-full hover:shadow-[0_5px_20px_rgba(21,0,158,0.4)] transition"
              >
                {editingService ? "Update Service" : "Add Service"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete{" "}
              <span className="text-deepblue">{selectedService?.title}</span>?
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

export default ServicesManagement;
