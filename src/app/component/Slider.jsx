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

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div>
      {/* Image Slider */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={images[index]}
          alt="Slider"
          width={1600}
          height={500}
          className="w-full h-auto object-cover"
          sizes="100vw"
          priority
        />
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded"
        >
          ▶
        </button>
      </div>

      {/* Description Text */}
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
    </div>
  );
}

export default Slider;
