import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiUploadCloud,
} from "react-icons/fi";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    description: "",
    img: null,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // ✅ Fetch all team members
  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/team`
      );
      if (res.data.status === "success") {
        setTeam(res.data.data);
      }
    } catch (err) {
      console.error("⚠️ Error fetching team:", err);
      toast.error("Failed to fetch team members!");
    }
  };

  // ✅ Open Add/Edit Modal
  const openModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        firstName: member.firstName,
        lastName: member.lastName,
        role: member.role,
        description: member.description,
        img: null,
        isTopMember: member.isTopMember, // ✅ preserve top flag
      });
      setPreview(member.img);
    } else {
      setEditingMember(null);
      setFormData({
        firstName: "",
        lastName: "",
        role: "",
        description: "",
        img: null,
        isTopMember: 0,
      });
      setPreview("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
      description: "",
      img: null,
      isTopMember: 0,
    });
    setPreview("");
  };

  // ✅ Image Upload Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Add or Update Member
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("role", formData.role);
      data.append("description", formData.description);
      data.append("isTopMember", formData.isTopMember || 0); // ✅ keep top member flag
      if (formData.img instanceof File) data.append("image", formData.img);

      if (editingMember) {
        await axios.put(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/team/${editingMember.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("✅ Member updated!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/team/create`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("✅ Member added!");
      }

      await fetchTeam();
      closeModal();
    } catch (error) {
      console.error("⚠️ Error submitting member:", error);
      toast.error("Failed to save member!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Member
  const handleDelete = (member) => {
    setSelectedMember(member);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/team/${selectedMember.id}`
      );
      toast.success("🗑️ Member deleted!");
      setTeam(team.filter((m) => m.id !== selectedMember.id));
    } catch (err) {
      toast.error("Failed to delete member!");
    } finally {
      setSelectedMember(null);
      setIsConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setSelectedMember(null);
    setIsConfirmOpen(false);
  };

  // ✅ Toggle Top Member (max 4)
  const toggleTopMember = async (member) => {
    const topMembers = team.filter((m) => m.isTopMember);
    if (!member.isTopMember && topMembers.length >= 4) {
      toast.error("You can only have up to 4 top members.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/team/${member.id}`,
        {
          firstName: member.firstName,
          lastName: member.lastName,
          role: member.role,
          description: member.description,
          isTopMember: member.isTopMember ? 0 : 1,
        }
      );
      toast.success("⭐ Top member status updated!");
      await fetchTeam();
    } catch (error) {
      toast.error("Failed to update top member!");
      console.error(error);
    }
  };

  const topMembers = team.filter((m) => m.isTopMember);
  const otherMembers = team.filter((m) => !m.isTopMember);

  return (
    <div className="flex min-h-screen gap-10">
      <div>
        <Sidebar />

      </div>
      <main className="flex-1 ml-64 p-16 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Team Management
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-deepblue to-blue-900 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_5px_25px_rgba(21,0,158,0.4)] transition"
          >
            <FiUserPlus /> Add Member
          </button>
        </div>

        {/* Featured Team Members */}
        <section className="mb-12">
          <h3 className="text-lg font-semibold mb-6 text-deepblue">
            Featured Team Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="p-6 px-5 text-center bg-white rounded-3xl border border-gray-200 shadow-[0_10px_40px_rgba(21,0,158,0.08)] hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300"
              >
                <img
                  src={member.img}
                  alt={member.firstName}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-2 border-deepblue p-1"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-deepblue font-medium text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">
                  {member.description}
                </p>
                <div className="flex justify-center gap-3 mt-5 text-gray-600">
                  <button
                    onClick={() => toggleTopMember(member)}
                    className="text-white bg-deepblue rounded-full py-2 px-4 text-sm hover:bg-blue-900"
                  >
                    Remove Top
                  </button>
                  <button onClick={() => openModal(member)}>
                    <FiEdit className="text-deepblue" />
                  </button>
                  <button onClick={() => handleDelete(member)}>
                    <FiTrash2 className="text-deepblue" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* All Members */}
        <section>
          <h3 className="text-lg font-semibold mb-6 text-deepblue">
            All Members
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {otherMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="p-6 px-5 text-center bg-white rounded-3xl border border-gray-200 shadow-[0_10px_40px_rgba(21,0,158,0.08)] hover:shadow-[0_10px_60px_rgba(21,0,158,0.12)] transition-all duration-300"
              >
                <img
                  src={member.img}
                  alt={member.firstName}
                  className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-2 border-deepblue p-1"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-deepblue font-medium text-sm">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">
                  {member.description}
                </p>
                <div className="flex justify-center gap-3 mt-5 text-gray-600">
                  <button
                    onClick={() => toggleTopMember(member)}
                    className="text-white bg-deepblue rounded-full py-2 px-4 text-sm hover:bg-blue-900"
                  >
                    Make Top
                  </button>
                  <button onClick={() => openModal(member)}>
                    <FiEdit className="text-deepblue" />
                  </button>
                  <button onClick={() => handleDelete(member)}>
                    <FiTrash2 className="text-deepblue" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
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
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg relative"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-deepblue"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-6 text-deepblue">
              {editingMember ? "Edit Member" : "Add New Member"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              <input
                type="text"
                placeholder="Role / Position"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-deepblue/40 outline-none"
              />

              {/* File Upload */}
              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-deepblue transition">
                <label className="flex flex-col items-center cursor-pointer">
                  <FiUploadCloud className="text-deepblue text-3xl mb-2" />
                  <span className="text-sm text-gray-600">
                    Click to upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border-2 border-deepblue/30"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-gradient-to-r from-deepblue to-blue-900 text-white font-semibold py-3 rounded-full transition ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
                  }`}
              >
                {loading
                  ? "Saving..."
                  : editingMember
                    ? "Update Member"
                    : "Add Member"}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delete{" "}
              <span className="text-deepblue">
                {selectedMember?.firstName}
              </span>
              ?
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

export default TeamManagement;
