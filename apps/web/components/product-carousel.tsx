"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const carouselImages = [
  {
    src: "./macbookAir.jpg",
    alt: "Macbook Air",
  },
  {
    src: "./hp-victus-laptop.png",
    alt: "HP Victus Laptop",
  },
  {
    src: "./tcl-tv.png",
    alt: "TCL TV",
  },
  {
    src: "./iphone16pro.jpg",
    alt: "iPhone 16 Pro",
  },
  {
    src: "./boatearBuds.png",
    alt: "Boat Ear Buds",
  }
]

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 1500) // Change slide every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentIndex, isAutoPlaying])

  // Pause auto-play when user interacts with carousel
  const handleInteraction = () => {
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main image */}
      <div className="relative w-full h-full overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              
              className="object-cover"
              
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-gray-700 hover:bg-black/70 rounded-full h-10 w-10"
        onClick={() => {
          prevSlide()
          handleInteraction()
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-gray-700 hover:bg-black/70 rounded-full h-10 w-10"
        onClick={() => {
          nextSlide()
          handleInteraction()
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => {
              goToSlide(index)
              handleInteraction()
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

