import React from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const gallery = [
    { src: "/img1.webp", type: "square" },
    { src: "/img2.jpg", type: "square" },
    { src: "/img3.jpg", type: "landscape" },
    { src: "/img4.jpg", type: "landscape" },
    { src: "/img5.jpg", type: "portrait" },
    { src: "/img6.jpg", type: "portrait" },
    { src: "/img7.jpg", type: "landscape" },
    { src: "/img8.jpg", type: "portrait" },
  ];

  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const getImageHeight = (type) => {
    switch (type) {
      case "portrait":
        return "h-[400px] md:h-[500px]";
      case "landscape":
        return "h-[250px] md:h-[300px]";
      case "square":
        return "h-[300px] md:h-[350px]";
      default:
        return "h-[300px]";
    }
  };

  return (
    <section id="Gallery" className="gallery py-10 px-5 bg-black-100">
      <motion.h1
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="text-5xl font-bold text-center mb-12"
      >
        BETTER BEATS BEST
      </motion.h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {gallery.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <img
              src={item.src}
              alt="galleryImage"
              className={`w-full object-cover ${getImageHeight(
                item.type
              )} hover:scale-105 transition-transform duration-300`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
