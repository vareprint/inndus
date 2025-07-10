"use client";
import React, { useState } from "react";
import Image from "next/image";

function Slider() {
  const images = [
    "/image/slider/B1.webp",
    "/image/slider/B2.webp",
    "/image/slider/B3.webp",
    "/image/slider/B4.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* 🔄 Slider Container */}
      <div className="relative w-full aspect-[16/5] overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          fill
          className="object-contain transition-opacity duration-500"
          sizes="100vw"
          priority
        />

        {/* ◀ Controls ▶ */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>

      {/* 📝 Text Section */}
      <div className="container px-5 py-6 text-center text-sm sm:text-base md:text-lg leading-relaxed max-w-5xl mx-auto">
        <p className="mb-4">
          At Inndus, we’re dedicated to delivering high-quality printing solutions tailored to meet the needs of businesses and individuals (www.vareprint.com) alike. Whether you’re looking for sleek business cards, eye-catching brochures, or large-scale banners, we bring your vision to life with precision, creativity, and attention to detail.
        </p>
        <p className="mb-4">
          From small projects to bulk orders, we provide a seamless process from design to delivery, ensuring your brand stands out. Let us handle your printing needs while you focus on growing your business. We’re here to help you make a lasting impression!
        </p>
        <p>
          Explore our services today and discover why businesses trust Inndus for all their printing needs. Let’s create something extraordinary together.
        </p>
      </div>
    </>
  );
}

export default Slider;
