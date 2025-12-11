import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../data';
import * as Icons from 'lucide-react';
import { Card3D } from '../components/ThreeD';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-display font-bold mb-4 text-text-main"
        >
          Our Services
        </motion.h1>
        <p className="text-text-muted max-w-2xl mx-auto">
          Comprehensive digital solutions and educational programs designed to elevate your business and career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => {
          // Dynamic Icon Rendering
          // @ts-ignore - Lucide icons are dynamic
          const IconComponent = Icons[service.icon.charAt(0).toUpperCase() + service.icon.slice(1)] || Icons.Box;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card3D className="h-full">
                <div className="bg-ui-panel backdrop-blur-sm border border-ui-border p-8 rounded-2xl h-full flex flex-col hover:bg-ui-panel/80 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {/* @ts-ignore */}
                    <div className="text-white"><Icons.Layers size={32}/></div> 
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-text-main group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <button className="mt-6 text-accent hover:text-accent-hover font-medium flex items-center gap-2 group">
                    Learn More 
                    <Icons.ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300"/>
                  </button>
                </div>
              </Card3D>
            </motion.div>
          );
        })}
      </div>
      
      {/* Additional Services Section */}
      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-primary-light/50 to-primary/50 backdrop-blur-sm border border-ui-border rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 text-text-main">
                Why Choose Our Services?
              </h2>
              <ul className="space-y-4">
                {[
                  "Industry-leading expertise in cutting-edge technologies",
                  "Customized solutions for your specific business needs",
                  "Continuous support and maintenance",
                  "Proven track record of successful projects",
                  "Competitive pricing with transparent costs",
                  "Focus on security and scalability"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-text-muted">
                    <div className="w-2 h-2 mt-2 rounded-full bg-accent flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-ui-panel/50 p-8 rounded-2xl border border-ui-border">
              <h3 className="text-xl font-bold mb-4 text-text-main">Get a Free Consultation</h3>
              <p className="text-text-muted mb-6">
                Not sure which service is right for you? Schedule a free consultation with our experts.
              </p>
              <button className="w-full bg-accent hover:bg-accent-hover text-text-invert py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_20px_var(--color-accent)]">
                Schedule Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Process Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-display font-bold text-center mb-12 text-text-main">
          Our Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { 
              step: "01", 
              title: "Discovery", 
              desc: "We understand your requirements and goals" 
            },
            { 
              step: "02", 
              title: "Planning", 
              desc: "Create a detailed roadmap and strategy" 
            },
            { 
              step: "03", 
              title: "Execution", 
              desc: "Develop and implement the solution" 
            },
            { 
              step: "04", 
              title: "Support", 
              desc: "Provide ongoing maintenance and updates" 
            }
          ].map((process, idx) => (
            <div 
              key={idx} 
              className="bg-ui-panel backdrop-blur-sm border border-ui-border p-6 rounded-2xl text-center hover:border-accent/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {process.step}
              </div>
              <h3 className="text-lg font-bold mb-2 text-text-main">{process.title}</h3>
              <p className="text-text-muted text-sm">{process.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;