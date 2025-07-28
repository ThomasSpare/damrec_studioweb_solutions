// components/About.tsx
import Image from 'next/image'

export default function About() {
  return (
    <section className="py-24 px-8 bg-brand-deep/90">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-light mb-8">
              From Studio to SaaS: 8+ Years of Innovation
            </h2>
            <p className="text-xl text-brand-light/80 mb-6 leading-relaxed">
              What started as a passion for music production has evolved into building enterprise-level software platforms. My journey from recording artists to serving thousands of users worldwide demonstrates the power of combining creative vision with technical execution.
            </p>
            <p className="text-xl text-brand-light/80 mb-6 leading-relaxed">
              Skribble represents the evolution from recording studio to music technology innovation. Currently in final testing phase, this platform demonstrates my ability to architect complex applications that solve real industry problems.
            </p>
            <p className="text-xl text-brand-light/80 mb-8 leading-relaxed">
              The unique combination of deep music industry knowledge and full-stack development expertise allows me to build technology solutions that truly understand user needs - a perfect foundation for expanding into SaaS development.
            </p>
            
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">Beta</div>
                <div className="text-brand-light/70">SaaS Platform</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">8+</div>
                <div className="text-brand-light/70">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-accent mb-2">50+</div>
                <div className="text-brand-light/70">Projects Delivered</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center relative">
            {/* Floating background elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 rounded-full blur-xl"></div>
            
            {/* Main photo container */}
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-accent rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></div>
              
              {/* Middle ring */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full p-2 shadow-2xl">
                {/* Inner photo container */}
                <div className="w-full h-full bg-gradient-to-br from-brand-light/10 to-transparent rounded-full p-1 backdrop-blur-sm">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-brand-light/20 shadow-inner">
                    <Image
                      src="/images/me.jpg"
                      alt="Thomas Spåre - Founder of Damrec Productions"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </div>
              </div>
              
              {/* Decorative floating dots */}
              <div className="absolute top-4 right-8 w-3 h-3 bg-brand-accent rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-4 w-2 h-2 bg-brand-light/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-4 w-4 h-4 bg-brand-primary/80 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            
            {/* Profile Information */}
            <div className="absolute top-[330px] w-[400px] left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-brand-primary/20 backdrop-blur-lg rounded-2xl px-8 py-6 border border-brand-accent/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-brand-light mb-2">Thomas Spåre</h3>
                <p className="text-brand-light/80 font-medium mb-3">Founder, Damrec Productions</p>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-brand-light/70">
                  <a 
                    href="tel:+46702072725" 
                    className="flex items-center gap-2 hover:text-brand-accent transition-colors duration-300 group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    070-207 27 25
                  </a>
                  <div className="hidden sm:block w-1 h-1 bg-brand-light/40 rounded-full"></div>
                  <div className="flex items-center gap-2 text-brand-light/60">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Jönköping, Sweden
                  </div>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                  <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-brand-light/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}