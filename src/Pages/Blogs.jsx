import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import blog1 from "../images/blog1.jpg"
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../Components/Footer"

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    const createSlug = (title) =>
        title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");


    // 🌐 Fetch all blogs from backend
    const fetchBlogs = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_ADMIN_BACKEND_URL}/api/blogs`
            );
            if (res.data.status === "success") {
                setBlogs(res.data.data);
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

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Header */}
            <div className="mx-auto pt-60 pb-12 px-40">
                <p className="text-gray-500 text-md mb-2">
                    Home <span className="text-gray-800">/ Knowledge Center</span>
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    News <span className="font-playfair italic text-deepblue">& Blogs</span>
                </h1>
                <p className="max-w-3xl text-lg">
                    Manage your investments using data-driven strategies with transparent
                    track records. Backtest & check with top-tier tools and make money smartly.
                </p>
            </div>

            {/* Blog Grid */}
            <section className="mx-auto px-40 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(21,0,158,0.08)] hover:shadow-[0_10px_50px_rgba(21,0,158,0.15)] transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-72 object-cover rounded-t-3xl"
                        />
                        <div className="p-7 flex flex-col flex-grow">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span className="text-deepblue font-medium italic">
                                    {blog.category}
                                </span>
                                <span>{blog.date}</span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug mt-2">
                                {blog.title}
                            </h3>
                            <p className="text-gray-600 text-base flex-grow">
                                {blog.description}
                            </p>

                            <Link
                                to={`/blogs/${createSlug(blog.title)}`}
                                state={blog}
                                className="mt-4 inline-flex items-center text-deepblue font-semibold hover:underline mb-4"
                            >
                                Read More <FiArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                ))}
            </section>

            <Footer/>
        </div>
    );
};

export default Blogs;
