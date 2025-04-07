import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/send/mail",
        { name, email, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section id="Contact" className="contact py-20 relative min-h-[600px]">
      {/* Background Image - Fixed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('/contact.jpg')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side Content */}
        <motion.div
          className="flex-1 text-center md:text-left text-white"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-300 max-w-md">
            Have questions or want to work with us? Drop your message here and
            we'll get back to you soon!
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={sendMail}
          className="flex-1 bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 60 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            CONTACT US
          </h1>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full flex justify-center items-center gap-3 transition"
          >
            {loading && <ClipLoader size={20} color="white" />}
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
