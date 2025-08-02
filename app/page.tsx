"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const taglines = [
  "Organize your thoughts with ease.",
  "Summarize and understand smarter.",
  "Your personal AI-powered knowledge base.",
  "Smart Notes – Where ideas grow."
];

const images = [
  "https://www.pexels.com/photo/a-person-flipping-pages-on-a-book-while-sitting-on-a-floor-6933305/",
  "https://www.pexels.com/photo/person-holding-filled-cup-near-table-2539636/",
  "https://www.pexels.com/photo/a-man-sitting-at-the-table-6728525/",
];

export default function Home() {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentText((prev) => prev + taglines[textIndex][charIndex]);
      setCharIndex((prev) => prev + 1);
    }, 80);

    if (charIndex === taglines[textIndex]?.length) {
      clearTimeout(timeout);
      setTimeout(() => {
        setCharIndex(0);
        setCurrentText("");
        setTextIndex((prev) => (prev + 1) % taglines.length);
      }, 2500);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-primary">Smart Notes</span>
          </h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {currentText}
          </motion.p>
          <Button className="mt-6" size="lg">
            Get Started <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="w-full md:w-[500px] rounded-lg overflow-hidden shadow-xl">
          <Slider {...sliderSettings}>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`slide-${index}`}
                className="w-full h-[300px] object-cover"
              />
            ))}
          </Slider>
        </div>
      </section>
    </main>
  );
}
