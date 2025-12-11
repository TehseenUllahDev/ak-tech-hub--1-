import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Shield, Users, Zap, Award, Target, BookOpen, ChevronLeft, ChevronRight, Linkedin, Twitter } from 'lucide-react';
import { Card3D, FadeInSection } from '../components/ThreeD';
import { TESTIMONIALS, LEADERSHIP } from '../data';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Earth/Tech
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Chips
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Cyber City
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" // Matrix
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
  const [leadersPerView, setLeadersPerView] = useState(2);

  // Calculate responsive leaders per view
  useEffect(() => {
    const updateLeadersPerView = () => {
      if (window.innerWidth >= 768) {
        setLeadersPerView(2); // Desktop: 2 leaders
      } else {
        setLeadersPerView(1); // Mobile: 1 leader
      }
    };

    updateLeadersPerView();
    window.addEventListener('resize', updateLeadersPerView);
    
    return () => window.removeEventListener('resize', updateLeadersPerView);
  }, []);

  // Hero carousel timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Leadership carousel auto-rotate (optional)
  useEffect(() => {
    const leaderTimer = setInterval(() => {
      nextLeaderSlide();
    }, 6000);
    return () => clearInterval(leaderTimer);
  }, [leadersPerView]);

  const nextSlide = () => setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
  const prevSlide = () => setCurrentImage((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);

  // Total slides for leadership carousel
  const totalLeaderSlides = Math.ceil(LEADERSHIP.length / leadersPerView);

  // Next slide for leadership carousel
  const nextLeaderSlide = () => {
    setCurrentLeaderIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= totalLeaderSlides ? 0 : nextIndex;
    });
  };

  // Previous slide for leadership carousel
  const prevLeaderSlide = () => {
    setCurrentLeaderIndex((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? totalLeaderSlides - 1 : prevIndex;
    });
  };

  // Get current leaders to display
  const getCurrentLeaders = () => {
    const start = currentLeaderIndex * leadersPerView;
    return LEADERSHIP.slice(start, start + leadersPerView);
  };

  return (
    <div className="flex flex-col gap-24 pb-20">
      
      {/* 1. Hero Section with Carousel */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGES[currentImage]})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary"></div>
        </div>
        
        {/* Carousel Controls (Subtle) */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-ui-panel hover:bg-accent/20 text-text-muted hover:text-text-main transition-all hidden md:block border border-ui-border">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-ui-panel hover:bg-accent/20 text-text-muted hover:text-text-main transition-all hidden md:block border border-ui-border">
          <ChevronRight size={32} />
        </button>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 px-4 py-1 rounded-full border border-accent/50 bg-accent/10 text-accent font-display text-sm tracking-widest uppercase"
          >
            Innovate. Learn. Connect.
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black mb-6 leading-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-text-main to-text-muted drop-shadow-[0_0_15px_var(--shadow-color)]">FUTURE</span> 
            <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-glow to-accent drop-shadow-[0_0_25px_var(--color-accent)]">IS NOW</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            AK Tech Hub empowers the next generation by bridging the gap between youth and cutting-edge technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/contact" className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-bold text-lg transition-all shadow-[0_0_20px_var(--color-accent)] hover:shadow-[0_0_40px_var(--color-accent-hover)] flex items-center gap-2 justify-center group">
              Start Innovation <Zap size={20} className="group-hover:fill-current"/>
            </Link>
            <Link to="/employees" className="px-8 py-4 bg-ui-panel hover:bg-ui-panel/80 backdrop-blur-md border border-ui-border text-text-main rounded-full font-bold text-lg transition-all flex items-center gap-2 justify-center hover:border-accent/50">
              Meet Our Team <Users size={20}/>
            </Link>
          </motion.div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-12 h-1 rounded-full transition-all ${currentImage === idx ? 'bg-accent shadow-[0_0_10px_var(--color-accent)]' : 'bg-ui-border'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Leadership Section (Carousel) */}
      <FadeInSection>
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4 text-text-main">Visionary Leadership</h2>
            <p className="text-center text-text-muted mb-6 max-w-2xl mx-auto">
              Guided by industry veterans committed to excellence and innovation.
            </p>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: totalLeaderSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentLeaderIndex(idx)}
                  className={`w-12 h-1 rounded-full transition-all ${currentLeaderIndex === idx ? 'bg-accent shadow-[0_0_10px_var(--color-accent)]' : 'bg-ui-border'}`}
                />
              ))}
            </div>
          </div>
          
          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevLeaderSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 p-3 rounded-full bg-ui-panel hover:bg-accent/20 text-text-muted hover:text-text-main transition-all border border-ui-border shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextLeaderSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 p-3 rounded-full bg-ui-panel hover:bg-accent/20 text-text-muted hover:text-text-main transition-all border border-ui-border shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Leaders Grid with Carousel Effect */}
            <div className="overflow-hidden">
              <motion.div
                key={currentLeaderIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {getCurrentLeaders().map((leader) => (
                  <Card3D key={leader.id}>
                    <div className="bg-primary-light/50 p-6 rounded-2xl border border-ui-border hover:border-accent/50 transition-all group backdrop-blur-sm relative overflow-hidden h-full">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex flex-col md:flex-row gap-6 items-center h-full">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-accent to-purple-600 shadow-xl shrink-0">
                          <img 
                            src={leader.imageUrl} 
                            alt={leader.name} 
                            className="w-full h-full rounded-full object-cover border-4 border-primary" 
                          />
                        </div>
                        
                        <div className="text-center md:text-left flex-1">
                          <h3 className="text-2xl font-display font-bold text-text-main">{leader.name}</h3>
                          <div className="text-accent font-bold text-sm tracking-wider uppercase mb-3">
                            {leader.role}
                          </div>
                          <p className="text-text-muted text-sm leading-relaxed mb-4">
                            {leader.bio}
                          </p>
                          <div className="flex justify-center md:justify-start gap-4">
                            {leader.socials?.linkedin && (
                              <a 
                                href={leader.socials.linkedin} 
                                className="text-text-muted hover:text-accent transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Linkedin size={20} />
                              </a>
                            )}
                            {leader.socials?.twitter && (
                              <a 
                                href={leader.socials.twitter} 
                                className="text-text-muted hover:text-accent transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Twitter size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                ))}
                
                {/* Empty card placeholder if odd number of leaders */}
                {getCurrentLeaders().length === 1 && leadersPerView === 2 && (
                  <div className="hidden md:block"></div>
                )}
              </motion.div>
            </div>
            
            {/* Mobile Indicators (dots) */}
            <div className="flex justify-center gap-2 mt-8 md:hidden">
              {LEADERSHIP.map((_, idx) => {
                const slideIndex = Math.floor(idx / leadersPerView);
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentLeaderIndex(slideIndex)}
                    className={`w-3 h-3 rounded-full transition-all ${currentLeaderIndex === slideIndex ? 'bg-accent' : 'bg-ui-border'}`}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 3. Vision Section */}
      <FadeInSection>
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 perspective-1000">
              <Card3D>
                <div className="bg-primary-light/80 backdrop-blur-sm p-8 rounded-2xl border border-ui-border shadow-[0_0_30px_var(--shadow-color)] hover:shadow-[0_0_30px_var(--color-accent-glow)_inset] transition-all">
                  <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent animate-pulse-glow">
                     <Target size={32} />
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-4 text-text-main">Our Vision</h2>
                  <p className="text-text-muted text-lg leading-relaxed">
                    "To empower the next generation by bridging the gap between youth and cutting-edge technology, fostering a culture of innovation and ethical tech practices."
                  </p>
                </div>
              </Card3D>
            </div>
            <div className="order-1 md:order-2">
               <h3 className="text-accent font-bold tracking-widest mb-2 uppercase text-sm">The Dream</h3>
               <h2 className="text-4xl font-display font-bold mb-6 text-text-main">Shaping Tomorrow's Tech Leaders</h2>
               <p className="text-text-muted mb-6 text-lg">We believe in a future where technology is accessible, ethical, and a force for good. Our vision drives every project we undertake and every student we mentor.</p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 4. Mission Section */}
      <FadeInSection>
        <section className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="text-left md:text-right">
               <h3 className="text-accent font-bold tracking-widest mb-2 uppercase text-sm">The Path</h3>
               <h2 className="text-4xl font-display font-bold mb-6 text-text-main">Guiding Excellence</h2>
               <p className="text-text-muted mb-6 text-lg">We don't just teach technology; we instill the mindset required to thrive in a digital-first world. From coding best practices to ethical AI usage.</p>
            </div>
            <div>
              <Card3D>
                <div className="bg-gradient-to-bl from-primary-light to-primary p-8 rounded-2xl border border-ui-border shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-accent"><BookOpen size={100} /></div>
                  <h2 className="text-3xl font-display font-bold mb-4 relative z-10 text-text-main">Our Mission</h2>
                  <p className="text-text-muted text-lg leading-relaxed relative z-10">
                    "To guide and inspire students towards meaningful and positive technological advancements, ensuring they are equipped with the right knowledge and skills to thrive in a rapidly evolving digital world."
                  </p>
                </div>
              </Card3D>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 5. Core Services Preview */}
      <FadeInSection>
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 skew-y-3 transform origin-bottom-right"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-text-main">What We Do</h2>
              <div className="h-1 w-20 bg-accent mx-auto rounded-full shadow-[0_0_10px_var(--color-accent)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { icon: <Code size={30} />, title: "Software Development", desc: "Custom web and mobile solutions tailored to business needs." },
                 { icon: <Shield size={30} />, title: "Cyber Security", desc: "Protecting digital assets with state-of-the-art security protocols." },
                 { icon: <BookOpen size={30} />, title: "IT Education", desc: "Comprehensive training programs for the next gen developers." }
               ].map((item, idx) => (
                 <motion.div 
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="bg-primary-light/50 p-8 rounded-2xl border border-ui-border hover:border-accent/50 transition-all group backdrop-blur-sm shadow-sm hover:shadow-lg"
                 >
                    <div className="w-14 h-14 bg-ui-panel rounded-full flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all shadow-[0_0_15px_rgba(0,0,0,0)] group-hover:shadow-[0_0_20px_var(--color-accent)]">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-text-main group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-text-muted">{item.desc}</p>
                 </motion.div>
               ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/services" className="inline-flex items-center gap-2 text-accent hover:text-text-main transition-colors font-medium tracking-wide">
                View All Services <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* 6. Stats Section */}
      <FadeInSection>
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "50+", label: "Employees" },
              { val: "120+", label: "Projects Done" },
              { val: "500+", label: "Students Trained" },
              { val: "10+", label: "Global Partners" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-ui-panel rounded-2xl border border-ui-border backdrop-blur-sm hover:bg-primary-light transition-colors">
                <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">{stat.val}</div>
                <div className="text-text-muted text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* 7. Why Choose Us */}
      <FadeInSection>
        <section className="container mx-auto px-4">
           <div className="bg-gradient-to-r from-primary-light to-primary border border-ui-border rounded-3xl p-10 md:p-20 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
             <div className="relative z-10 grid md:grid-cols-2 gap-10">
               <div>
                 <h2 className="text-3xl font-display font-bold mb-6 text-text-main">Why AK Tech Hub?</h2>
                 <ul className="space-y-4">
                   {[
                     "Industry-Standard Curriculum",
                     "Real-world Project Experience",
                     "Mentorship from Experts",
                     "Focus on Innovation & Ethics"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-lg text-text-muted">
                       <Award size={20} className="text-accent" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="flex items-center justify-center">
                 <div className="bg-black/30 p-8 rounded-xl backdrop-blur-md border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm">
                    <p className="text-xl italic font-serif text-white">"Innovation is the ability to see change as an opportunity - not a threat."</p>
                    <div className="mt-4 flex gap-1">
                      {[1,2,3,4,5].map(s => <div key={s} className="w-2 h-2 rounded-full bg-accent"></div>)}
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </section>
      </FadeInSection>

      {/* 8. Testimonials */}
      <FadeInSection>
        <section className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12 text-text-main">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-primary-light/30 p-8 rounded-2xl border border-ui-border relative hover:border-accent/30 transition-colors">
                 <div className="text-5xl text-accent/10 font-serif absolute top-4 right-4">"</div>
                 <p className="text-text-muted mb-6 italic relative z-10">{t.content}</p>
                 <div>
                   <div className="font-bold text-text-main text-lg">{t.name}</div>
                   <div className="text-sm text-accent">{t.role}</div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </FadeInSection>

       {/* 9. CTA */}
       <section className="container mx-auto px-4 text-center">
         <div className="py-20 border-t border-ui-border relative overflow-hidden">
           <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full transform scale-75 opacity-20"></div>
           <h2 className="text-4xl font-display font-bold mb-6 text-text-main relative z-10">Ready to Transform Your Future?</h2>
           <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto relative z-10">Join us at AK Tech Hub either as a student, a partner, or a team member. Let's build something great together.</p>
           <Link to="/contact" className="relative z-10 inline-block px-10 py-4 bg-text-invert text-primary font-bold rounded-full hover:bg-gray-400 transition-colors shadow-[0_0_20px_var(--shadow-color)]">
             Get in Touch
           </Link>
         </div>
       </section>
    </div>
  );
};

export default Home;