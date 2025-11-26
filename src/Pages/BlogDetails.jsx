import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { FiArrowLeft } from "react-icons/fi";
import Footer from "../Components/Footer"

const BlogDetails = () => {
  const { state: blog } = useLocation();
  const navigate = useNavigate();

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Blog not found.
        </h2>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-deepblue text-white px-6 py-2 rounded-full"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F7FF] via-white to-[#F8F7FF]">
      <Navbar />

      <div className="max-w-7xl mx-auto pt-56 pb-20 px-6 md:px-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/blogs")}
          className="flex items-center gap-2 text-deepblue font-medium mb-6 hover:underline text-lg"
        >
          <FiArrowLeft /> Back to Blogs
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Category + Date */}
        <div className="flex items-center justify-between py-3 text-lg text-gray-600 mb-6">
          <span className="text-deepblue italic font-medium text-xl">
            {blog.category}
          </span>
          <span> {blog.date}</span>
        </div>

        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[450px] object-cover rounded-3xl mb-10 shadow-lg"
        />

        {/* Content */}
        <div
          className="text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>

      <Footer/>
    </div>
  );
};

export default BlogDetails;
