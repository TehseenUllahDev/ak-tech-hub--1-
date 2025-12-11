import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-gray-400 mb-10 text-lg">
            Whether you have a project in mind, want to join our courses, or just say hello, we'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                <p className="text-gray-400">123 Tech Park Avenue,<br/>Silicon Valley, City - 560001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Call Us</h3>
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email Us</h3>
                <p className="text-gray-400">contact@aktechhub.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/30 p-8 md:p-10 rounded-3xl border border-white/5"
        >
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Message</label>
              <textarea rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" placeholder="How can we help you?"></textarea>
            </div>

            <button type="button" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-accent/50">
              Send Message <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
