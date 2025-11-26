import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import blog1 from "../images/blog1.jpg";
import blog2 from "../images/blog2.jpg";
import blog3 from "../images/blog3.jpg";
import { Link } from "react-router-dom";
import blog_bg from "../images/blog-bg.png";

const blogs = [
  {
    category: "Market Analysis",
    title: "Q4 Market Outlook: Opportunities in Emerging Sectors",
    description:
      "Exploring investment opportunities in technology and renewable energy sectors for the upcoming quarter...",
    image: blog1,
  },
  {
    category: "Retirement Planning",
    title: "5 Essential Steps for Early Retirement Planning",
    description:
      "Strategic approaches to building a robust retirement portfolio that ensures financial independence...",
    image: blog2,
  },
  {
    category: "Tax Strategy",
    title: "Year-End Tax Planning: Maximize Your Savings",
    description:
      "Smart tax strategies to minimize liabilities and optimize your investment returns before year-end...",
    image: blog3,
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};



const BlogSection = () => {

  const createSlug = (title) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-12 px-6 md:px-16 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
      >
        <button className="border border-deepblue px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition">
          Our Blogs
        </button>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-5">
          Discover Inspiration
          <span className="font-playfair text-deepblue italic"> And Trends</span>
        </h2>

        <p className="text-gray-600 mt-4 text-sm md:text-base max-w-3xl mx-auto">
          We combine expertise, technology, and a personalized approach to guide
          clients toward financial stability and growth.
        </p>
      </motion.div>

      {/* 💙 Full Width Gradient */}
      <motion.div
        className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-cover bg-center bg-no-repeat rounded-tl-3xl rounded-tr-3xl py-20 px-6 md:px-12"
        style={{
          backgroundImage: `url(${blog_bg})`,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
      >
        <div className="absolute inset-0  opacity-10 pointer-events-none rounded-tl-3xl rounded-tr-3xl"></div>

        {/* Blog Grid */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
              variants={fadeUpVariant}
            >
              {/* Blog Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-col flex-grow p-8 px-10">
                <p className="text-deepblue italic font-semibold text-lg mb-1">
                  {blog.category}
                </p>
                <h3 className="font-semibold text-2xl leading-snug mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {blog.description}
                </p>

                {/* Align this at bottom */}
                {/* <button className="text-deepblue flex items-center gap-1 text-sm font-semibold hover:underline mt-auto">
                  Learn More <FiArrowRight className="text-deepblue mt-[2px]" />
                </button> */}

                <Link
                  to={`/blogs/${createSlug(blog.title)}`}
                  state={blog}
                  className="mt-4 inline-flex items-center text-deepblue font-semibold hover:underline mb-4"
                >
                  Read More <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BlogSection;
