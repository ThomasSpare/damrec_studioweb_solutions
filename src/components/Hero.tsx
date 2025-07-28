// components/Hero.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Hero() {
  // Array of images to cycle through
  const images = [
    '/images/studio-1.jpg',
    '/images/studio-2.jpg', 
    '/images/code-1.jpg',
    '/images/music-production.jpg',
    '/images/recording-session.jpg',
    '/images/me.jpg'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) // 2 seconds display + 1 second for fade transition

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="min-h-screen hero-gradient flex items-center justify-center text-center text-white relative overflow-hidden">
      {/* Background Images with Fade Effect */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0} // Prioritize first image
              onError={() => console.log(`Failed to load image: ${image}`)}
            />
          </div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-80 z-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-brand-deep/60 via-brand-primary/50 to-brand-accent/40 z-20"></div>
      
      <div className="relative z-30 max-w-4xl px-8">
       {/* logo */}
        <div className="mb-8">
          <Image  src={"/images/logo.png"}
                        width={96}
                        height={96} 
                        alt="Studio Web Solutions Logo" 
                        className="w-40 h-40 mx-auto" />
        </div>
        <h1 className='text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent animate-fade-in-up'>DAMREC</h1>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-brand-light to-white bg-clip-text text-transparent animate-fade-in-up drop-shadow-lg">
          Studio & Web Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>
          SaaS Platform Developer • Professional Recording Studio • Music Technology Innovator
        </p>
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link href="#services" className="btn btn-primary shadow-2xl">
            View SaaS Development
          </Link>
          <Link href="#contact" className="btn btn-secondary shadow-xl">
            Book Studio Session
          </Link>
        </div>
        
        {/* Image indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-brand-light w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}