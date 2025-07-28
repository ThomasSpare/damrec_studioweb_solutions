// components/Services.tsx
import { CodeXml, MicVocalIcon, KeyboardMusic, Film} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <CodeXml className="w-8 h-8" />,
      title: 'Full-Stack Web Applications',
      description: 'Enterprise-level web applications and SaaS platforms. From music collaboration tools to custom business solutions - I build scalable applications that serve thousands of users.',
      features: [
        'SaaS Platform Development',
        'Real-time Collaboration Tools',
        'Audio Processing Applications',
        'Custom Business Solutions',
        'Database Architecture & APIs',
        'Cloud Deployment & Scaling'
      ],
      featured: true
    },
    {
      icon: <MicVocalIcon className="w-8 h-8" />,
      title: 'Professional Recording',
      description: 'State-of-the-art recording studio with professional equipment. Experienced in recording various genres and working with artists of all levels.',
      features: [
        'Multi-track Recording',
        'Vocal & Instrumental Sessions',
        'Live Band Recording',
        'Podcast Recording',
        'Professional Studio Environment',
        'Equipment Consultation'
      ]
    },
    {
      icon: <KeyboardMusic className="w-8 h-8" />,
      title: 'Music Production & Mixing',
      description: 'Professional mixing and music production services. Transform your recordings into polished, radio-ready tracks with industry-standard techniques.',
      features: [
        'Professional Mixing',
        'Music Production',
        'Audio Mastering',
        'Sound Design',
        'Post-Production',
        'Format Delivery'
      ]
    },
    {
      icon: <Film className="w-8 h-8" />,
      title: 'Digital Media Services',
      description: 'Comprehensive digital media solutions including video editing, voice-over work, and multimedia content creation for various platforms.',
      features: [
        'Video Editing (Blender)',
        'Voice-Over Recording',
        'Motion Graphics',
        'Audio for Video',
        'Content Creation',
        'Media Consulting'
      ]
    }
  ]

  return (
    <section id="services" className="py-24 px-8 bg-brand-deep">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-light mb-16">
          Professional Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`service-card ${service.featured ? 'bg-gradient-to-br from-brand-primary to-brand-accent text-white relative overflow-hidden' : ''}`}
            >
              {service.featured && (
                <div className="absolute top-4 right-4 text-2xl"></div>
              )}
              <div className={`service-icon ${service.featured ? 'bg-white/20' : ''}`}>
                {service.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${service.featured ? 'text-white' : 'text-brand-light'}`}>
                {service.title}
              </h3>
              <p className={`mb-6 ${service.featured ? 'text-white/90' : 'text-brand-light/70'}`}>
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className={`flex items-center gap-3 ${service.featured ? 'text-white' : 'text-brand-light/80'}`}
                  >
                    <span className={`${service.featured ? 'text-brand-light' : 'text-brand-accent'} font-bold`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}