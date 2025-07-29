// components/Showcase.tsx
import Link from 'next/link'
import { MessageSquareMore}  from 'lucide-react'




export default function Showcase() {
  return (
    <section className="py-24 px-8 bg-brand-deep/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-gradient-to-r from-brand-accent to-brand-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Featured Project
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-light mb-6">
              Skribble: Music Collaboration Platform
            </h2>
            <p className="text-xl text-brand-light/80 mb-8 leading-relaxed">
              A professional SaaS platform currently in final testing phase. Built for producers and artists worldwide with real-time collaboration, precision timestamping, and seamless DAW integration.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg flex items-center justify-center text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-square-more-icon lucide-message-square-more"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>
                  </div>
                <div>
                  <h4 className="font-semibold text-brand-light mb-1">Real-time Collaboration</h4>
                  <p className="text-brand-light/70 text-sm">Live cursor tracking and instant sync</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg flex items-center justify-center text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-computer-icon lucide-computer"><rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h2"/><path d="M12 18h6"/></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-light mb-1">DAW Integration</h4>
                  <p className="text-brand-light/70 text-sm">Export to Reaper, Pro Tools, Logic</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg flex items-center justify-center text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-expand-icon lucide-expand"><path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/></svg>
                </div>
                <div>
                  <h4 className="font-semibold text-brand-light mb-1">Enterprise Scale</h4>
                  <p className="text-brand-light/70 text-sm">Built for professional workflows</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              {/* <Link 
                href="" 
                target="_blank"
                className="btn btn-primary"
              >
                View Live Platform
              </Link> */}
              <Link href="#contact" className="btn btn-secondary bg-brand-accent/20 text-brand-light border-brand-accent/40 hover:bg-brand-accent/30">
                Discuss Your Project
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              {/* Video Container */}
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster="/images/skribble-thumbnail.jpg"
                >
                  <source src="/videos/skribble-demo.mp4" type="video/mp4" />
                  <source src="/videos/skribble-demo.webm" type="video/webm" />
                  {/* Fallback for browsers that don't support video */}
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-brand-primary to-brand-accent text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎵</div>
                      <p className="text-lg">Video not supported</p>
                      <p className="text-sm opacity-75">View the live platform instead</p>
                    </div>
                  </div>
                </video>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-brand-accent to-brand-primary rounded-full opacity-60 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full opacity-40 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}