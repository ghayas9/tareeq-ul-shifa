// pages/about.tsx
import React, { useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiStar, FiUsers, FiMapPin, FiPhone, FiMail, FiClock, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';

export default function AboutUs() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatAnimation = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  // Team member data
  const teamMembers = [
    {
      name: "Dr. Ahmed Hassan",
      role: "Head Pharmacist",
      description: "With over 15 years of experience, Dr. Ahmed leads our team with expertise in clinical pharmacy and patient care.",
      image: "/images/placeholder-male.jpg" // Replace with actual image
    },
    {
      name: "Fatima Ali",
      role: "Pharmacy Manager",
      description: "Fatima ensures our pharmacy operations run smoothly while maintaining our high standards of customer service.",
      image: "/images/placeholder-female.jpg" // Replace with actual image
    },
    {
      name: "Dr. Sara Khan",
      role: "Clinical Consultant",
      description: "Sara specializes in medication therapy management and provides expert consultation for complex health conditions.",
      image: "/images/placeholder-female.jpg" // Replace with actual image
    }
  ];

  return (
    <Layout>
      <Head>
        <title>About Us | Tareeq-ul-Shifa Pharmacy</title>
        <meta name="description" content="Learn about Tareeq-ul-Shifa Pharmacy's mission, values, and dedicated team." />
      </Head>
      
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-40 right-10 w-80 h-80 rounded-full bg-teal-50 opacity-60"
            animate={{ 
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-blue-50 opacity-50"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-green-50 opacity-40"
            animate={{ 
              x: [0, -15, 0],
              y: [0, 25, 0],
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section with Animated Elements */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-2xl mb-16 bg-gradient-to-r from-green-500 via-teal-500 to-teal-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background shapes */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
            <div className="absolute right-1/4 bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            
            <div className="container mx-auto px-6 py-20 text-center relative z-10">
              <motion.div
                className="inline-block mb-6 bg-white bg-opacity-20 p-6 rounded-full backdrop-blur-sm"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <Image 
                  src="/logo.png" 
                  alt="Tareeq-ul-Shifa Logo"
                  width={60}
                  height={60}
                  className=""
                />
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                About Tareeq-ul-Shifa Pharmacy
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white opacity-90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Your Trusted Partner in Health and Wellness Since 2010
              </motion.p>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <motion.a
                  href="#our-story"
                  className="inline-flex items-center bg-white text-teal-600 font-bold px-8 py-4 rounded-lg shadow-lg transition duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Discover Our Story
                  <FiChevronRight className="ml-2" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Mission and Vision */}
          <motion.div 
            className="max-w-5xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Our Mission & Vision
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-500 h-full"
                whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-teal-50 p-4 rounded-full inline-block mb-4">
                  <FiStar className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  At Tareeq-ul-Shifa, our mission is to provide accessible, high-quality pharmaceutical care that improves the health and wellbeing of our community. We are committed to offering personalized service, expert advice, and affordable medication to every customer who walks through our doors.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-500 h-full"
                whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-green-50 p-4 rounded-full inline-block mb-4">
                  <FiAward className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  We envision a healthier community where everyone has access to professional pharmaceutical care and education. Tareeq-ul-Shifa aims to be a leader in innovative pharmacy services, combining traditional wisdom with modern healthcare practices to meet the diverse needs of our patients.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Our Story */}
          <motion.div 
            id="our-story"
            className="max-w-5xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Our Story
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center p-8">
                  <motion.div
                    className="relative w-full h-64 md:h-full"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image 
                      src="/images/pharmacy-storefront.jpg" // Replace with an actual image of your pharmacy
                      alt="Tareeq-ul-Shifa Pharmacy"
                      fill
                      className="object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                </div>
                <div className="md:w-3/5 p-8">
                  <motion.div 
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.p className="text-gray-600" variants={cardVariants}>
                      Tareeq-ul-Shifa Pharmacy was founded in 2010 with a simple yet powerful vision: to create a pharmacy that treats customers like family. Our name "Tareeq-ul-Shifa," which means "The Path to Healing," reflects our commitment to guiding our customers toward better health.
                    </motion.p>
                    <motion.p className="text-gray-600" variants={cardVariants}>
                      What began as a small neighborhood pharmacy has grown into a trusted healthcare destination, serving thousands of patients with care and dedication. Throughout our journey, we have maintained our founding principles of integrity, compassion, and excellence in everything we do.
                    </motion.p>
                    <motion.p className="text-gray-600" variants={cardVariants}>
                      Today, we continue to evolve and expand our services while staying true to our roots. We embrace technological advancements and healthcare innovations to provide you with the best possible pharmaceutical care, all while maintaining the personal touch that has defined Tareeq-ul-Shifa from the beginning.
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Our Values */}
          <motion.div 
            className="max-w-5xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Our Values
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 text-center h-full"
                variants={cardVariants}
                whileHover={{ y: -7, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-teal-100 p-4 rounded-full inline-block mb-4"
                  variants={floatAnimation as any}
                  animate="float"
                >
                  <FiAward className="h-8 w-8 text-teal-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Integrity</h3>
                <p className="text-gray-600">We uphold the highest ethical standards in all our practices, ensuring transparency and honesty in every interaction.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 text-center h-full"
                variants={cardVariants}
                whileHover={{ y: -7, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-green-100 p-4 rounded-full inline-block mb-4"
                  variants={floatAnimation as any}
                  animate="float"
                >
                  <FiHeart className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
                <p className="text-gray-600">We treat each customer with empathy and understanding, recognizing that behind every prescription is a person with unique needs.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 text-center h-full"
                variants={cardVariants}
                whileHover={{ y: -7, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-blue-100 p-4 rounded-full inline-block mb-4"
                  variants={floatAnimation as any}
                  animate="float"
                >
                  <FiStar className="h-8 w-8 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">We pursue excellence in all aspects of our service, constantly striving to improve and innovate in pharmaceutical care.</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Meet Our Team */}
          {/* <motion.div 
            className="max-w-5xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Meet Our Team
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
                  variants={cardVariants}
                  whileHover={{ y: -7, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex space-x-3 justify-center">
                        <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-teal-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-teal-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-teal-100 transition-colors">
                          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
          
          {/* Contact CTA */}
          <motion.div 
            className="max-w-5xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl shadow-xl overflow-hidden">
              <div className="md:flex items-center">
                <motion.div 
                  className="md:w-2/3 p-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Have Questions? We're Here to Help!</h2>
                  <p className="text-white opacity-90 mb-6">
                    Our knowledgeable pharmacists are always available to answer your questions and provide personalized advice.
                  </p>
                  <motion.a 
                    href="/contact" 
                    className="inline-flex items-center bg-white text-teal-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us Today
                    <FiChevronRight className="ml-2" />
                  </motion.a>
                </motion.div>
                <motion.div 
                  className="md:w-1/3 p-8"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white bg-opacity-20 p-6 rounded-lg text-white backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <FiMapPin className="mr-2" /> Visit Our Pharmacy
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start mb-2">
                        <FiMapPin className="mt-1 mr-3 text-teal-200" />
                        <div>
                          <p>123 Health Street</p>
                          <p>City, State 12345</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="mr-3 text-teal-200" />
                        <p>(123) 456-7890</p>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="mr-3 text-teal-200" />
                        <p>info@tareeqshifa.com</p>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-3 text-teal-200" />
                        <div>
                          <p>Mon-Fri: 9AM-8PM</p>
                          <p>Sat: 9AM-6PM</p>
                          <p>Sun: 10AM-4PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div 
            className="max-w-5xl mx-auto my-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Our Journey
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2> */}

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-gradient-to-b from-teal-500 to-green-400"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {/* 2010 - Founding */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center">
                    <div className="absolute z-10 w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white font-bold">2010</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-10 md:text-right mb-4 md:mb-0">
                      <div className="bg-white p-5 rounded-lg shadow-md ml-auto md:ml-0 md:mr-10 max-w-md">
                        <h3 className="font-bold text-xl text-teal-600 mb-2">Founding</h3>
                        <p className="text-gray-600">Tareeq-ul-Shifa Pharmacy was founded with a mission to provide personalized healthcare services to our community.</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10 hidden md:block">
                      <div className="h-48 w-full relative overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/images/founding.jpg" // Replace with actual image
                          alt="Founding of Tareeq-ul-Shifa"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 2015 - Expansion */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center">
                    <div className="absolute z-10 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold">2015</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-10 hidden md:block">
                      <div className="h-48 w-full relative overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/images/expansion.jpg" // Replace with actual image
                          alt="Expansion of services"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10 mb-4 md:mb-0">
                      <div className="bg-white p-5 rounded-lg shadow-md mr-auto md:mr-0 md:ml-10 max-w-md">
                        <h3 className="font-bold text-xl text-blue-600 mb-2">Expansion</h3>
                        <p className="text-gray-600">We expanded our services to include medication therapy management, immunizations, and health screenings.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 2020 - Digital Transformation */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center">
                    <div className="absolute z-10 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white font-bold">2020</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-10 md:text-right mb-4 md:mb-0">
                      <div className="bg-white p-5 rounded-lg shadow-md ml-auto md:ml-0 md:mr-10 max-w-md">
                        <h3 className="font-bold text-xl text-green-600 mb-2">Digital Transformation</h3>
                        <p className="text-gray-600">Launched our website and mobile app for online prescription refills, teleconsultations, and medication delivery services.</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10 hidden md:block">
                      <div className="h-48 w-full relative overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/images/digital.jpg" // Replace with actual image
                          alt="Digital transformation"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* 2025 - Today */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center">
                    <div className="absolute z-10 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold">Now</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-10 hidden md:block">
                      <div className="h-48 w-full relative overflow-hidden rounded-lg shadow-md">
                        <Image
                          src="/images/today.jpg" // Replace with actual image
                          alt="Tareeq-ul-Shifa today"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-10 mb-4 md:mb-0">
                      <div className="bg-white p-5 rounded-lg shadow-md mr-auto md:mr-0 md:ml-10 max-w-md">
                        <h3 className="font-bold text-xl text-purple-600 mb-2">Today and Beyond</h3>
                        <p className="text-gray-600">Today, we continue to grow and innovate, always focused on our core mission of providing exceptional healthcare services to our community.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Testimonials */}
          {/* <motion.div 
            className="max-w-5xl mx-auto my-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                What Our Customers Say
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Regular Customer",
                  testimonial: "The pharmacists at Tareeq-ul-Shifa are incredibly knowledgeable and take the time to explain my medications. I've been coming here for years and wouldn't go anywhere else!",
                  image: "/images/testimonial1.jpg"
                },
                {
                  name: "Mohammed Ali",
                  role: "Patient",
                  testimonial: "When I was diagnosed with diabetes, the team at Tareeq-ul-Shifa provided exceptional support and education. They helped me understand my condition and medications.",
                  image: "/images/testimonial2.jpg"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                      <Image 
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-teal-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <svg className="h-10 w-10 text-teal-100 absolute -top-3 -left-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                    </svg>
                    <p className="text-gray-600 pl-5">{testimonial.testimonial}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
          
          {/* Partners/Accreditations */}
          {/* <motion.div 
            className="max-w-5xl mx-auto mb-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-10 text-center relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                Our Partners & Accreditations
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-400"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <div className="bg-white rounded-xl shadow-lg p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-16 w-full relative grayscale hover:grayscale-0 transition-all duration-300">
                      <Image 
                        src={`/images/partner${item}.png`} // Replace with actual partner logos
                        alt={`Partner ${item}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </Layout>
  );
}