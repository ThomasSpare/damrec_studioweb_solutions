// components/Contact.tsx
'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    service: '',
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Thank you for your message! I\'ll get back to you within 24 hours.')
        setFormData({ service: '', name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-24 px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-brand-accent/30 to-brand-primary/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand-light/10 to-brand-accent/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full animate-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(234,231,175,0.3)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-light via-white to-brand-light bg-clip-text text-transparent">
          Let's Create Something Amazing
        </h2>
        <p className="text-xl text-brand-light/80 mb-16 max-w-2xl mx-auto">
          Ready to bring your vision to life? Let's discuss your project and explore how we can build something extraordinary together.
        </p>
        
        {/* Form Container with Animated Border */}
        <div className="relative max-w-2xl mx-auto">
          {/* Animated Border Gradient */}
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-accent rounded-3xl blur opacity-75 group-hover:opacity-100 animate-pulse"></div>
          
          {/* Form Background */}
          <div className="relative bg-brand-deep/80 backdrop-blur-xl p-12 rounded-3xl border border-brand-light/20 shadow-2xl">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-light/5 via-transparent to-brand-accent/5 rounded-3xl pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="text-left group">
                <label htmlFor="service" className="block text-brand-light font-semibold mb-3 transition-colors group-focus-within:text-brand-accent">
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-brand-primary/40 text-brand-light placeholder-brand-light/60 font-inherit border-2 border-brand-accent/30 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <option value="" className="bg-brand-primary text-brand-light">Select a service</option>
                    <option value="saas-development" className="bg-brand-primary text-brand-light">SaaS Platform Development</option>
                    <option value="web-application" className="bg-brand-primary text-brand-light">Custom Web Application</option>
                    <option value="recording" className="bg-brand-primary text-brand-light">Studio Recording</option>
                    <option value="mixing" className="bg-brand-primary text-brand-light">Music Production/Mixing</option>
                    <option value="media" className="bg-brand-primary text-brand-light">Digital Media Services</option>
                    <option value="consultation" className="bg-brand-primary text-brand-light">Technical Consultation</option>
                  </select>
                  {/* Input glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur"></div>
                </div>
              </div>
              
              <div className="text-left group">
                <label htmlFor="name" className="block text-brand-light font-semibold mb-3 transition-colors group-focus-within:text-brand-accent">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-brand-primary/40 text-brand-light placeholder-brand-light/60 font-inherit border-2 border-brand-accent/30 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Your full name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur"></div>
                </div>
              </div>
              
              <div className="text-left group">
                <label htmlFor="email" className="block text-brand-light font-semibold mb-3 transition-colors group-focus-within:text-brand-accent">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-brand-primary/40 text-brand-light placeholder-brand-light/60 font-inherit border-2 border-brand-accent/30 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur"></div>
                </div>
              </div>
              
              <div className="text-left group">
                <label htmlFor="message" className="block text-brand-light font-semibold mb-3 transition-colors group-focus-within:text-brand-accent">
                  Project Details
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project, timeline, goals, and budget range..."
                    required
                    className="w-full p-4 rounded-xl bg-brand-primary/40 text-brand-light placeholder-brand-light/60 font-inherit resize-vertical border-2 border-brand-accent/30 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all duration-300 backdrop-blur-sm"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/20 to-brand-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur"></div>
                </div>
              </div>
              
              {/* Enhanced Submit Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-primary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full py-4 px-8 bg-gradient-to-r from-brand-accent to-brand-primary text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-brand-accent/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-brand-accent rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-brand-light/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    {/* Studio Information */}
          <div className="space-y-8 mt-16 max-w-3xl mx-auto text-white">
            <div className="bg-brand-primary/20 backdrop-blur-lg rounded-2xl p-8 border border-brand-accent/30">
              <h3 className="text-2xl font-bold text-brand-light mb-6">Studio Location</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-light mb-2">Address</h4>
                    <p className="text-brand-light/80 leading-relaxed">
                      Damrec Studio & Web Solutions<br />
                      Skirebo Göransberg 1<br />
                      564 91 Bankeryd<br />
                      Sweden
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-light mb-2">Phone</h4>
                    <a 
                      href="tel:+46702072725" 
                      className="text-brand-light/80 hover:text-brand-accent transition-colors duration-300 text-lg"
                    >
                      070-207 27 25
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-brand-light mb-2">Studio Hours</h4>
                    <p className="text-brand-light/80">
                      By appointment only<br />
                      Monday - Sunday: Flexible scheduling
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-brand-accent/20">
                <p className="text-brand-light/70 text-sm leading-relaxed">
                  Located in the beautiful countryside of Bankeryd, our studio offers a peaceful environment perfect for creative recording sessions and focused development work.
                </p>
              </div>
            </div>
          </div>
          
          {/* Interactive Map */}
          <div className="relative mt-16 max-w-3xl mx-auto">
            <div className="bg-brand-primary/20 backdrop-blur-lg rounded-2xl p-6 border border-brand-accent/30">
              <h3 className="text-xl font-bold text-brand-light mb-4">Find Us on the Map</h3>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2003.5!2d14.1!3d57.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSkirebo%20G%C3%B6ransberg%201%2C%20564%2091%20Bankeryd%2C%20Sweden!5e0!3m2!1sen!2sse!4v1!5m2!1sen!2sse"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                />
                
                {/* Map overlay with studio info */}
                <div className="absolute top-4 left-4 bg-brand-deep/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-brand-accent/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse"></div>
                    <span className="text-brand-light text-sm font-medium">Damrec Studio</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Skirebo+Göransberg+1,+564+91+Bankeryd,+Sweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-brand-accent to-brand-primary text-white px-4 py-3 rounded-lg font-semibold text-center hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  Directions
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Skirebo+Göransberg+1,+564+91+Bankeryd,+Sweden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary/40 backdrop-blur-sm text-brand-light px-4 py-3 rounded-lg font-semibold hover:bg-brand-primary/60 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Map
                </a>
              </div>
            </div>
          </div>
    </section>
  )
}