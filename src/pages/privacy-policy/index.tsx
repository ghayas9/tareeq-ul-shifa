
// // pages/privacy-policy.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import Head from 'next/head';
// import Layout from '@/components/layout/Layout';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { FiChevronDown, FiShield, FiInfo, FiShare2, FiUsers, FiLock, FiFileText, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// export default function PrivacyPolicy() {
//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();
//   const scrollProgress = useTransform(scrollY, [0, 1000], [0, 100]);

//   // State for table of contents
//   const [showTableOfContents, setShowTableOfContents] = useState(false);

//   // Create references for each section to smooth scroll
//   const refs = {
//     collect: useRef<HTMLDivElement>(null),
//     use: useRef<HTMLDivElement>(null),
//     share: useRef<HTMLDivElement>(null),
//     rights: useRef<HTMLDivElement>(null),
//     cookies: useRef<HTMLDivElement>(null),
//     security: useRef<HTMLDivElement>(null),
//     children: useRef<HTMLDivElement>(null),
//     updates: useRef<HTMLDivElement>(null),
//     contact: useRef<HTMLDivElement>(null),
//   };

//   // Toggle section expansion
//   const toggleSection = (section: string) => {
//     setActiveSection(activeSection === section ? null : section);
//   };

//   // Scroll to a section
//   const scrollToSection = (section: string) => {
//     setShowTableOfContents(false);
//     const ref = refs[section as keyof typeof refs];
//     if (ref && ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   // Structure for sections to show in TOC
//   const sections = [
//     { id: 'collect', title: 'Information We Collect', icon: <FiInfo className="text-teal-500" /> },
//     { id: 'use', title: 'How We Use Your Information', icon: <FiFileText className="text-teal-500" /> },
//     { id: 'share', title: 'Information Sharing and Disclosure', icon: <FiShare2 className="text-teal-500" /> },
//     { id: 'rights', title: 'Your Rights and Choices', icon: <FiUsers className="text-teal-500" /> },
//     { id: 'cookies', title: 'Cookies and Tracking Technologies', icon: <FiInfo className="text-teal-500" /> },
//     { id: 'security', title: 'Data Security', icon: <FiLock className="text-teal-500" /> },
//     { id: 'children', title: 'Children\'s Privacy', icon: <FiShield className="text-teal-500" /> },
//     { id: 'updates', title: 'Policy Updates', icon: <FiFileText className="text-teal-500" /> },
//     { id: 'contact', title: 'Contact Us', icon: <FiMail className="text-teal-500" /> },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: { ease: 'easeOut', duration: 0.5 },
//     },
//   };

//   const sectionVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: 'easeOut',
//       },
//     },
//   };

//   const pulseVariants = {
//     pulse: {
//       scale: [1, 1.05, 1],
//       opacity: [0.7, 0.9, 0.7],
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const floatVariants = {
//     float: {
//       y: [0, -10, 0],
//       transition: {
//         duration: 4,
//         repeat: Infinity,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const fadeInUpVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.8, ease: 'easeOut' }
//     }
//   };

//   return (
//     <Layout>
//       <Head>
//         <title>Privacy Policy | Tareeq-ul-Shifa Pharmacy</title>
//         <meta
//           name="description"
//           content="Tareeq-ul-Shifa Pharmacy's privacy policy outlines how we collect, use, and protect your personal information."
//         />
//       </Head>

//       <div className="container mx-auto px-4 py-12 relative overflow-hidden" ref={containerRef}>
//         {/* Decorative elements */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           <motion.div
//             className="absolute top-40 right-20 w-64 h-64 rounded-full bg-teal-100 opacity-30"
//             animate={{ 
//               x: [0, 20, 0],
//               y: [0, 15, 0],
//             }}
//             transition={{ 
//               duration: 8,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <motion.div
//             className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-blue-100 opacity-20"
//             animate={{ 
//               x: [0, 15, 0],
//               y: [0, -15, 0],
//             }}
//             transition={{ 
//               duration: 10,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//           <motion.div
//             className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-purple-100 opacity-30"
//             animate={{ 
//               x: [0, -10, 0],
//               y: [0, 20, 0],
//             }}
//             transition={{ 
//               duration: 7,
//               repeat: Infinity,
//               ease: "easeInOut"
//             }}
//           />
//         </div>

//         {/* Progress bar */}
//         <motion.div 
//           className="fixed top-0 left-0 right-0 h-1 bg-teal-500 z-50"
//           style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
//         />

//         {/* Table of contents button - fixed position */}
//         <motion.button
//           className="fixed bottom-6 right-6 bg-teal-500 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center"
//           onClick={() => setShowTableOfContents(!showTableOfContents)}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <FiFileText className="text-xl" />
//           <span className="ml-2 mr-1">Sections</span>
//           <FiChevronDown className={`transition-transform duration-300 ${showTableOfContents ? 'rotate-180' : ''}`} />
//         </motion.button>

//         {/* Floating table of contents */}
//         <AnimatePresence>
//           {showTableOfContents && (
//             <motion.div
//               className="fixed bottom-20 right-6 bg-white rounded-xl shadow-xl z-40 w-72 overflow-hidden"
//               initial={{ opacity: 0, y: 20, height: 0 }}
//               animate={{ opacity: 1, y: 0, height: 'auto' }}
//               exit={{ opacity: 0, y: 20, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
//                 <h3 className="font-bold">Privacy Policy Sections</h3>
//               </div>
//               <div className="py-2 max-h-80 overflow-y-auto">
//                 {sections.map((section) => (
//                   <motion.button
//                     key={section.id}
//                     className="flex items-center w-full p-3 text-left hover:bg-teal-50 transition-colors text-gray-700"
//                     onClick={() => scrollToSection(section.id)}
//                     whileHover={{ x: 5 }}
//                   >
//                     <span className="mr-3">{section.icon}</span>
//                     <span>{section.title}</span>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Header with gradient background */}
//         <motion.div 
//           className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-emerald-500"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//         >
//           <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
//           <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          
//           <div className="relative z-10 px-8 py-16 text-center text-white">
//             <motion.div
//               className="inline-block mb-6 p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
//             >
//               <FiShield className="text-4xl" />
//             </motion.div>
            
//             <motion.h1 
//               className="text-5xl font-bold mb-6"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               Privacy Policy
//             </motion.h1>
            
//             <motion.p 
//               className="text-xl max-w-2xl mx-auto"
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//             >
//               How we collect, use, and protect your personal information
//             </motion.p>
            
//             <motion.p
//               className="mt-6 text-white text-opacity-80"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               Last Updated: April 9, 2025
//             </motion.p>
//           </div>
//         </motion.div>

//         {/* Introduction card */}
//         <motion.div
//           className="max-w-4xl mx-auto mb-12 bg-white rounded-xl shadow-lg p-8 relative z-10"
//           variants={fadeInUpVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.p
//             className="text-lg leading-relaxed text-gray-700"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//           >
//             At Tareeq-ul-Shifa Pharmacy, we are committed to protecting your
//             privacy and ensuring the security of your personal information.
//             This Privacy Policy explains how we collect, use, disclose, and
//             safeguard your information when you visit our website or use our
//             services. Please read this policy carefully to understand our practices.
//           </motion.p>
//         </motion.div>

//         {/* Main content sections */}
//         <div className="max-w-4xl mx-auto space-y-8">
//           {/* Information We Collect */}
//           <motion.div 
//             ref={refs.collect}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('collect')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500">
//                 <FiInfo className="text-2xl text-teal-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Information We Collect</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'collect' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-teal-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {(activeSection === 'collect' || activeSection === null) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
//                         <motion.span
//                           className="inline-block w-2 h-8 bg-teal-500 mr-3"
//                           initial={{ height: 0 }}
//                           whileInView={{ height: 32 }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.4 }}
//                         />
//                         Personal Information
//                       </h3>
//                       <p className="mb-4">
//                         We may collect personal information that you voluntarily provide
//                         to us when you:
//                       </p>
//                       <ul className="list-none pl-6 mb-6 space-y-3">
//                         {[
//                           'Register an account with us',
//                           'Fill prescriptions or place orders',
//                           'Sign up for our newsletter',
//                           'Contact us with inquiries',
//                           'Participate in surveys or promotions',
//                         ].map((item, index) => (
//                           <motion.li
//                             key={index}
//                             className="flex items-center"
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: index * 0.1, duration: 0.5 }}
//                           >
//                             <motion.span
//                               className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-3"
//                               whileInView={{ scale: [0, 1.5, 1] }}
//                               viewport={{ once: true }}
//                               transition={{ duration: 0.5 }}
//                             />
//                             {item}
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
//                         <motion.span
//                           className="inline-block w-2 h-8 bg-blue-400 mr-3"
//                           initial={{ height: 0 }}
//                           whileInView={{ height: 32 }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.4 }}
//                         />
//                         Health Information
//                       </h3>
//                       <p className="mb-4">
//                         As a pharmacy, we collect and maintain health information
//                         necessary to provide our services, including prescription
//                         details, medical conditions, allergies, and other relevant
//                         health data. This information is protected under applicable
//                         healthcare privacy laws.
//                       </p>
//                     </div>
                    
//                     <div>
//                       <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
//                         <motion.span
//                           className="inline-block w-2 h-8 bg-purple-400 mr-3"
//                           initial={{ height: 0 }}
//                           whileInView={{ height: 32 }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.4 }}
//                         />
//                         Automatically Collected Information
//                       </h3>
//                       <p className="mb-4">
//                         When you visit our website, we may automatically collect certain
//                         information about your device and browsing actions, including:
//                       </p>
//                       <ul className="list-none pl-6 mb-6 space-y-3">
//                         {[
//                           'IP address and device information',
//                           'Browser type and operating system',
//                           'Pages visited and time spent on our website',
//                           'Referral sources',
//                         ].map((item, index) => (
//                           <motion.li
//                             key={index}
//                             className="flex items-center"
//                             initial={{ opacity: 0, x: -20 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: index * 0.1, duration: 0.5 }}
//                           >
//                             <motion.span
//                               className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-3"
//                               whileInView={{ scale: [0, 1.5, 1] }}
//                               viewport={{ once: true }}
//                               transition={{ duration: 0.5 }}
//                             />
//                             {item}
//                           </motion.li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* How We Use Your Information */}
//           <motion.div 
//             ref={refs.use}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('use')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-500">
//                 <FiFileText className="text-2xl text-blue-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">How We Use Your Information</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'use' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-blue-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {(activeSection === 'use' || activeSection === null) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     We use the information we collect for various purposes, including:
//                   </p>
//                   <ul className="list-none pl-6 mb-6 space-y-3">
//                     {[
//                       'Providing and improving our pharmacy services',
//                       'Processing and filling prescriptions',
//                       'Communicating with you about your orders and prescriptions',
//                       'Managing your account and preferences',
//                       'Sending promotional offers and newsletters (with your consent)',
//                       'Analyzing website usage to enhance user experience',
//                       'Ensuring compliance with legal and regulatory requirements',
//                     ].map((item, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center"
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1, duration: 0.5 }}
//                       >
//                         <motion.span
//                           className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-3"
//                           whileInView={{ scale: [0, 1.5, 1] }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.5 }}
//                         />
//                         {item}
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Information Sharing and Disclosure */}
//           <motion.div 
//             ref={refs.share}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('share')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500">
//                 <FiShare2 className="text-2xl text-purple-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Information Sharing and Disclosure</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'share' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-purple-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'share' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     We may share your information in the following circumstances:
//                   </p>
//                   <ul className="list-none pl-6 mb-6 space-y-3">
//                     {[
//                       'With healthcare providers involved in your care',
//                       'With insurance companies for billing purposes',
//                       'With service providers who assist in our operations',
//                       'When required by law or to protect our rights',
//                       'In the event of a business transaction, such as a merger or acquisition',
//                     ].map((item, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center"
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1, duration: 0.5 }}
//                       >
//                         <motion.span
//                           className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-3"
//                           whileInView={{ scale: [0, 1.5, 1] }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.5 }}
//                         />
//                         {item}
//                       </motion.li>
//                     ))}
//                   </ul>
//                   <p className="mb-4 font-medium">
//                     We do not sell or rent your personal information to third parties for marketing purposes.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Add more collapsible sections for other policy parts */}
//           {/* Your Rights and Choices */}
//           <motion.div 
//             ref={refs.rights}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('rights')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-500">
//                 <FiUsers className="text-2xl text-green-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Your Rights and Choices</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'rights' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-green-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'rights' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     Depending on your location, you may have certain rights regarding your personal information:
//                   </p>
//                   <ul className="list-none pl-6 mb-6 space-y-3">
//                     {[
//                       'Access to your personal information',
//                       'Correction of inaccurate or incomplete information',
//                       'Deletion of your personal information in certain circumstances',
//                       'Restriction or objection to certain processing activities',
//                       'Data portability to transfer your information to another service',
//                       'Withdrawal of consent at any time (where processing is based on consent)',
//                     ].map((item, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center"
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1, duration: 0.5 }}
//                       >
//                         <motion.span
//                           className="inline-block w-2 h-2 rounded-full bg-green-500 mr-3"
//                           whileInView={{ scale: [0, 1.5, 1] }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.5 }}
//                         />
//                         {item}
//                       </motion.li>
//                     ))}
//                   </ul>
//                   <p className="mb-4">
//                     To exercise these rights, please contact us using the information provided in the "Contact Us" section.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Contact Section with special animation */}
//           <motion.div
//             ref={refs.contact}
//             variants={fadeInUpVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-xl overflow-hidden text-white"
//           >
//             <div className="md:flex">
//               <div className="md:w-2/3 p-8">
//                 <motion.h2
//                   className="text-2xl font-bold mb-4 flex items-center"
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   <FiMail className="mr-3" />
//                   Contact Us
//                 </motion.h2>
//                 <motion.p
//                   className="mb-6 text-lg"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2, duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   If you have questions, concerns, or requests regarding this
//                   Privacy Policy or our privacy practices, please contact us:
//                 </motion.p>
//                 <motion.div 
//                   className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mb-6"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                   viewport={{ once: true }}
//                   whileHover={{ 
//                     boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
//                     y: -5
//                   }}
//                 >
//                   <div className="space-y-4">
//                     <div className="flex items-center">
//                       <FiMapPin className="mr-3 text-teal-200" />
//                       <div>
//                         <p className="font-bold">Tareeq-ul-Shifa Pharmacy</p>
//                         <p>123 Health Street</p>
//                         <p>City, State 12345</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       <FiMail className="mr-3 text-teal-200" />
//                       <p>privacy@tareeqshifa.com</p>
//                     </div>
//                     <div className="flex items-center">
//                       <FiPhone className="mr-3 text-teal-200" />
//                       <p>(123) 456-7890</p>
//                     </div>
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5, duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   <motion.a
//                     href="/contact"
//                     className="inline-block bg-white text-teal-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
//                     whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Contact Form
//                   </motion.a>
//                 </motion.div>
//               </div>
//               <motion.div
//                 className="md:w-1/3 bg-white bg-opacity-10 p-8 flex items-center justify-center"
//                 initial={{ opacity: 0, x: 20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4, duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <motion.div
//                   className="text-center"
//                   variants={floatVariants}
//                   animate="float"
//                 >
//                   <div className="w-24 h-24 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
//                     <FiShield className="text-4xl" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2">Privacy Commitment</h3>
//                   <p>We value your trust and are committed to protecting your privacy and personal information.</p>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Data Security */}
//           <motion.div 
//             ref={refs.security}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('security')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
//                 <FiLock className="text-2xl text-blue-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Data Security</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'security' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-blue-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'security' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, accidental loss, alteration, or disclosure. These measures include:
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                     <motion.div 
//                       className="bg-blue-50 rounded-lg p-5"
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.1, duration: 0.5 }}
//                       whileHover={{ 
//                         y: -5,
//                         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
//                       }}
//                     >
//                       <h3 className="font-bold text-blue-700 mb-2">Encryption</h3>
//                       <p className="text-gray-700">All sensitive information is encrypted during transmission and at rest.</p>
//                     </motion.div>
                    
//                     <motion.div 
//                       className="bg-blue-50 rounded-lg p-5"
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.2, duration: 0.5 }}
//                       whileHover={{ 
//                         y: -5,
//                         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
//                       }}
//                     >
//                       <h3 className="font-bold text-blue-700 mb-2">Access Controls</h3>
//                       <p className="text-gray-700">Strict access controls and authentication mechanisms for our systems.</p>
//                     </motion.div>
                    
//                     <motion.div 
//                       className="bg-blue-50 rounded-lg p-5"
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.3, duration: 0.5 }}
//                       whileHover={{ 
//                         y: -5,
//                         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
//                       }}
//                     >
//                       <h3 className="font-bold text-blue-700 mb-2">Regular Audits</h3>
//                       <p className="text-gray-700">We conduct regular security audits and vulnerability assessments.</p>
//                     </motion.div>
                    
//                     <motion.div 
//                       className="bg-blue-50 rounded-lg p-5"
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: 0.4, duration: 0.5 }}
//                       whileHover={{ 
//                         y: -5,
//                         boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
//                       }}
//                     >
//                       <h3 className="font-bold text-blue-700 mb-2">Staff Training</h3>
//                       <p className="text-gray-700">Regular staff training on privacy and security best practices.</p>
//                     </motion.div>
//                   </div>
                  
//                   <p className="mt-6 text-gray-700">
//                     While we implement these safeguards, no data transmission or storage system can be guaranteed to be 100% secure. If you have reason to believe your interaction with us is no longer secure, please contact us immediately.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Cookies and Tracking Technologies */}
//           <motion.div 
//             ref={refs.cookies}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('cookies')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500">
//                 <FiInfo className="text-2xl text-amber-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Cookies and Tracking Technologies</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'cookies' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-amber-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'cookies' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     Our website uses cookies and similar tracking technologies to collect information about your browsing behavior and preferences. Cookies are small text files stored on your device that help us improve your experience by:
//                   </p>
//                   <ul className="list-none pl-6 mb-6 space-y-3">
//                     {[
//                       'Remembering your login status and preferences',
//                       'Understanding how you use our website',
//                       'Personalizing content and features',
//                       'Measuring the effectiveness of our marketing campaigns',
//                       'Analyzing website traffic and performance'
//                     ].map((item, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center"
//                         initial={{ opacity: 0, x: -20 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.1, duration: 0.5 }}
//                       >
//                         <motion.span
//                           className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-3"
//                           whileInView={{ scale: [0, 1.5, 1] }}
//                           viewport={{ once: true }}
//                           transition={{ duration: 0.5 }}
//                         />
//                         {item}
//                       </motion.li>
//                     ))}
//                   </ul>
//                   <p className="mb-4">
//                     You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Children's Privacy */}
//           <motion.div 
//             ref={refs.children}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('children')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-500">
//                 <FiShield className="text-2xl text-pink-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Children's Privacy</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'children' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-pink-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'children' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     Our services are not directed to individuals under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected personal information from a child under 13, we will promptly delete that information.
//                   </p>
//                   <p className="mb-4">
//                     If you are a parent or guardian and believe we may have collected information about your child, please contact us immediately.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Policy Updates */}
//           <motion.div 
//             ref={refs.updates}
//             className="bg-white rounded-xl shadow-lg overflow-hidden"
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className="cursor-pointer"
//               onClick={() => toggleSection('updates')}
//             >
//               <div className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-l-4 border-gray-500">
//                 <FiFileText className="text-2xl text-gray-500 mr-4" />
//                 <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Policy Updates</h2>
//                 <motion.div
//                   animate={{ rotate: activeSection === 'updates' ? 180 : 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FiChevronDown className="text-xl text-gray-500" />
//                 </motion.div>
//               </div>
//             </motion.div>
            
//             <AnimatePresence>
//               {activeSection === 'updates' && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="p-6"
//                 >
//                   <p className="mb-4">
//                     We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on our website with a revised "Last Updated" date.
//                   </p>
//                   <p className="mb-4">
//                     We encourage you to review this Privacy Policy periodically to stay informed about our information practices. Your continued use of our services after changes to the Privacy Policy constitutes your acceptance of the updated terms.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         </div>

//         {/* Final Call-to-Action Card */}
//         <motion.div
//           className="max-w-4xl mx-auto mt-16 mb-8 bg-white rounded-xl overflow-hidden shadow-lg"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, margin: "-100px" }}
//         >
//           <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2" />
//           <div className="p-8 text-center">
//             <motion.h2 
//               className="text-2xl font-bold text-gray-800 mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               Your Privacy Matters to Us
//             </motion.h2>
//             <motion.p 
//               className="text-gray-600 mb-8 max-w-2xl mx-auto"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               If you have any questions about this Privacy Policy or our privacy practices, please don't hesitate to contact us. Your trust is our priority.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <motion.a
//                 href="/contact-us"
//                 className="inline-block bg-teal-500 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Contact Us
//               </motion.a>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </Layout>
//   );
// }


// pages/privacy-policy.tsx
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiShield, FiInfo, FiFileText, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 1000], [0, 100]);

  // State for table of contents
  const [showTableOfContents, setShowTableOfContents] = useState(false);

  // Create references for each section to smooth scroll
  const refs = {
    collect: useRef<HTMLDivElement>(null),
    use: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Scroll to a section
  const scrollToSection = (section: string) => {
    setShowTableOfContents(false);
    const ref = refs[section as keyof typeof refs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structure for sections to show in TOC
  const sections = [
    { id: 'collect', title: 'Information We Collect', icon: <FiInfo className="text-teal-500" /> },
    { id: 'use', title: 'How We Use Your Information', icon: <FiFileText className="text-teal-500" /> },
    { id: 'contact', title: 'Contact Us', icon: <FiMail className="text-teal-500" /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: 'easeOut', duration: 0.5 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Tareeq-ul-Shifa Pharmacy</title>
        <meta
          name="description"
          content="Tareeq-ul-Shifa Pharmacy's privacy policy outlines how we collect, use, and protect your personal information."
        />
      </Head>

      <div className="container mx-auto px-4 py-12 relative overflow-hidden" ref={containerRef}>
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-40 right-20 w-64 h-64 rounded-full bg-teal-100 opacity-30"
            animate={{ 
              x: [0, 20, 0],
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -left-20 top-1/4 w-80 h-80 rounded-full bg-blue-100 opacity-20"
            animate={{ 
              x: [0, 15, 0],
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-purple-100 opacity-30"
            animate={{ 
              x: [0, -10, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-teal-500 z-50"
          style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
        />

        {/* Table of contents button - fixed position */}
        <motion.button
          className="fixed bottom-6 right-6 bg-teal-500 text-white p-3 rounded-full shadow-lg z-40 flex items-center justify-center"
          onClick={() => setShowTableOfContents(!showTableOfContents)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiFileText className="text-xl" />
          <span className="ml-2 mr-1">Sections</span>
          <FiChevronDown className={`transition-transform duration-300 ${showTableOfContents ? 'rotate-180' : ''}`} />
        </motion.button>

        {/* Floating table of contents */}
        <AnimatePresence>
          {showTableOfContents && (
            <motion.div
              className="fixed bottom-20 right-6 bg-white rounded-xl shadow-xl z-40 w-72 overflow-hidden"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                <h3 className="font-bold">Privacy Policy Sections</h3>
              </div>
              <div className="py-2 max-h-80 overflow-y-auto">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    className="flex items-center w-full p-3 text-left hover:bg-teal-50 transition-colors text-gray-700"
                    onClick={() => scrollToSection(section.id)}
                    whileHover={{ x: 5 }}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span>{section.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with gradient background */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-emerald-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          
          <div className="relative z-10 px-8 py-16 text-center text-white">
            <motion.div
              className="inline-block mb-6 p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <FiShield className="text-4xl" />
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              className="text-xl max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              How we collect, use, and protect your personal information
            </motion.p>
            
            <motion.p
              className="mt-6 text-white text-opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Last Updated: April 9, 2025
            </motion.p>
          </div>
        </motion.div>

        {/* Introduction card */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 bg-white rounded-xl shadow-lg p-8 relative z-10"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-lg leading-relaxed text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            At Tareeq-ul-Shifa Pharmacy, we are committed to protecting your
            privacy and ensuring the security of your personal information.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or use our
            services. Please read this policy carefully to understand our practices.
          </motion.p>
        </motion.div>

        {/* Main content sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information We Collect */}
          <motion.div 
            ref={refs.collect}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => toggleSection('collect')}
            >
              <div className="flex items-center p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-l-4 border-teal-500">
                <FiInfo className="text-2xl text-teal-500 mr-4" />
                <h2 className="text-2xl font-semibold text-gray-800 flex-grow">Information We Collect</h2>
                <motion.div
                  animate={{ rotate: activeSection === 'collect' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-xl text-teal-500" />
                </motion.div>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {activeSection === 'collect' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                        <motion.span
                          className="inline-block w-2 h-8 bg-teal-500 mr-3"
                          initial={{ height: 0 }}
                          whileInView={{ height: 32 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        />
                        Personal Information
                      </h3>
                      <p className="mb-4">
                        We may collect personal information that you voluntarily provide
                        to us when you:
                      </p>
                      <ul className="list-none pl-6 mb-6 space-y-3">
                        {[
                          'Register an account with us',
                          'Fill prescriptions or place orders',
                          'Sign up for our newsletter',
                          'Contact us with inquiries',
                          'Participate in surveys or promotions',
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <motion.span
                              className="inline-block w-2 h-2 rounded-full bg-teal-500 mr-3"
                              whileInView={{ scale: [0, 1.5, 1] }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                        <motion.span
                          className="inline-block w-2 h-8 bg-blue-400 mr-3"
                          initial={{ height: 0 }}
                          whileInView={{ height: 32 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        />
                        Health Information
                      </h3>
                      <p className="mb-4">
                        As a pharmacy, we collect and maintain health information
                        necessary to provide our services, including prescription
                        details, medical conditions, allergies, and other relevant
                        health data. This information is protected under applicable
                        healthcare privacy laws.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center">
                        <motion.span
                          className="inline-block w-2 h-8 bg-purple-400 mr-3"
                          initial={{ height: 0 }}
                          whileInView={{ height: 32 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                        />
                        Automatically Collected Information
                      </h3>
                      <p className="mb-4">
                        When you visit our website, we may automatically collect certain
                        information about your device and browsing actions, including:
                      </p>
                      <ul className="list-none pl-6 mb-6 space-y-3">
                        {[
                          'IP address and device information',
                          'Browser type and operating system',
                          'Pages visited and time spent on our website',
                          'Referral sources',
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                          >
                            <motion.span
                              className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-3"
                              whileInView={{ scale: [0, 1.5, 1] }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                            />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div 
            ref={refs.use}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="cursor-pointer"
              onClick={() => toggleSection('use')}
            >
              <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-500">
                <FiFileText className="text-2xl text-blue-500 mr-4" />
                <h2 className="text-2xl font-semibold text-gray-800 flex-grow">How We Use Your Information</h2>
                <motion.div
                  animate={{ rotate: activeSection === 'use' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-xl text-blue-500" />
                </motion.div>
              </div>
            </motion.div>
            
            <AnimatePresence>
              {activeSection === 'use' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <p className="mb-4">
                    We use the information we collect for various purposes, including:
                  </p>
                  <ul className="list-none pl-6 mb-6 space-y-3">
                    {[
                      'Providing and improving our pharmacy services',
                      'Processing and filling prescriptions',
                      'Communicating with you about your orders and prescriptions',
                      'Managing your account and preferences',
                      'Sending promotional offers and newsletters (with your consent)',
                      'Analyzing website usage to enhance user experience',
                      'Ensuring compliance with legal and regulatory requirements',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <motion.span
                          className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-3"
                          whileInView={{ scale: [0, 1.5, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Section with special animation */}
          <motion.div
            ref={refs.contact}
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-xl overflow-hidden text-white"
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <motion.h2
                  className="text-2xl font-bold mb-4 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FiMail className="mr-3" />
                  Contact Us
                </motion.h2>
                <motion.p
                  className="mb-6 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy or our privacy practices, please contact us:
                </motion.p>
                <motion.div 
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                    y: -5
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FiMapPin className="mr-3 text-teal-200" />
                      <div>
                        <p className="font-bold">Tareeq-ul-Shifa Pharmacy</p>
                        <p>123 Health Street</p>
                        <p>City, State 12345</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="mr-3 text-teal-200" />
                      <p>privacy@tareeqshifa.com</p>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="mr-3 text-teal-200" />
                      <p>(123) 456-7890</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href="/contact"
                    className="inline-block bg-white text-teal-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Form
                  </motion.a>
                </motion.div>
              </div>
              <motion.div
                className="md:w-1/3 bg-white bg-opacity-10 p-8 flex items-center justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-center"
                  variants={floatVariants}
                  animate="float"
                >
                  <div className="w-24 h-24 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                    <FiShield className="text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Privacy Commitment</h3>
                  <p>We value your trust and are committed to protecting your privacy and personal information.</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Final Call-to-Action Card */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 mb-8 bg-white rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2" />
          <div className="p-8 text-center">
            <motion.h2 
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Your Privacy Matters to Us
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              If you have any questions about this Privacy Policy or our privacy practices, please don't hesitate to contact us. Your trust is our priority.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contact-us"
                className="inline-block bg-teal-500 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}