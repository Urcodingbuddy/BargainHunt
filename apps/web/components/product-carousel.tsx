"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  {
    src: "./macbook-air.jpg",
    alt: "MacBook Air",
    title: "MacBook Air M2",
    description: "The new MacBook Air with M2 chip - Lightweight, powerful, and efficient.",
  },
  {
    src: "./TCL-tv.png",
    alt: "TCL Android TV",
    title: "TCL Android TV",
    description: "Smart TV with stunning 4K resolution and built-in streaming apps.",
  },
  {
    src: "./iphone-16.jpg",
    alt: "iPhone 16 Pro",
    title: "iPhone 16 Pro",
    description: "Built for Apple Intelligence - The most powerful iPhone yet.",
  },
  {
    src: "./boat-earbuds.png",
    alt: "boAt Earbuds",
    title: "boAt Airdopes",
    description: "Wireless earbuds with Dolby Audio for immersive sound experience.",
  },
  {
    src: "./hp-victus-laptop.png",
    alt: "HP Victus Gaming Laptop",
    title: "HP Victus Gaming Laptop",
    description: "Powerful gaming laptop with high-performance graphics and cooling.",
  },
]

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Carousel Images */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p className="text-sm text-gray-300">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gradient-to-r hover:from-gray-700 hover:to-black hover:border-neutral-800 text-white p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-gradient-to-r hover:from-black hover:to-gray-700 text-white p-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

