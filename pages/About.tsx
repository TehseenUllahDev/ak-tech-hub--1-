import React from 'react';
import { motion } from 'framer-motion';
import { FadeInSection } from '../components/ThreeD';

const About = () => {
  return (
    <div className="pb-20 pt-10">
      {/* Header */}
      <section className="container mx-auto px-4 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6"
        >
          About <span className="text-accent">Us</span>
        </motion.h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          We are builders, educators, and innovators passionate about technology and its potential to change the world.
        </p>
      </section>

      {/* History / Story */}
      <FadeInSection>
        <section className="container mx-auto px-4 mb-20">
          <div className="bg-gray-800/50 rounded-3xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Team working" 
                className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold font-display">Who We Are</h2>
              <p className="text-gray-300 leading-relaxed">
                AK Tech Hub Pvt. Ltd. is a modern learning center and digital solutions company dedicated to providing high-quality IT education, software services, and professional skill development.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Founded on the principles of innovation and excellence, AK Hub aims to equip students with both technical and practical skills that match global industry requirements. We bridge the gap between academic theory and industry reality.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Values */}
      <FadeInSection>
        <section className="container mx-auto px-4 mb-20">
           <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
           <div className="grid md:grid-cols-3 gap-6">
             {[
               { title: "Innovation", desc: "Constantly pushing boundaries and exploring new technologies." },
               { title: "Integrity", desc: "Upholding the highest standards of ethics in everything we do." },
               { title: "Excellence", desc: "Delivering superior quality in education and development services." }
             ].map((val, idx) => (
               <div key={idx} className="bg-primary-light p-8 rounded-xl border-l-4 border-accent hover:bg-gray-800 transition-colors">
                 <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                 <p className="text-gray-400">{val.desc}</p>
               </div>
             ))}
           </div>
        </section>
      </FadeInSection>

      {/* Team CTA */}
      <FadeInSection>
         <div className="container mx-auto px-4 text-center bg-gradient-to-r from-blue-900/40 to-purple-900/40 py-16 rounded-3xl">
            <h2 className="text-3xl font-bold mb-4">Meet the Minds Behind AK Tech Hub</h2>
            <p className="text-gray-300 mb-8">Our diverse team of experts is our greatest asset.</p>
            <a href="#/employees" className="px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors">
              View Team Directory
            </a>
         </div>
      </FadeInSection>
    </div>
  );
};

export default About;
