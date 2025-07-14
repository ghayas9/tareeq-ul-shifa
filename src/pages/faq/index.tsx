// pages/faq.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiChevronUp, FiPhone, FiMail, FiClock } from 'react-icons/fi';

export default function FAQ() {
  // State to track which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Toggle FAQ item expansion
  const toggleItem = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "What are your pharmacy hours?",
      answer: "Our pharmacy is open Monday through Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 4:00 PM. Holiday hours may vary, and we recommend checking our website or calling ahead on holidays.",
      category: "general"
    },
    {
      id: 2,
      question: "How do I transfer my prescriptions to Tareeq-ul-Shifa Pharmacy?",
      answer: "Transferring prescriptions is easy! You can either bring your current prescription bottles to our pharmacy, call us at (123) 456-7890 with your prescription information, or use our online prescription transfer form. Our pharmacists will handle the rest and contact your previous pharmacy to transfer your prescriptions.",
      category: "prescriptions"
    },
    {
      id: 3,
      question: "Do you offer prescription delivery?",
      answer: "Yes, we offer free prescription delivery within a 5-mile radius of our pharmacy for orders over $20. For locations beyond 5 miles or orders under $20, a small delivery fee may apply. We also offer expedited same-day delivery options for urgent medications.",
      category: "services"
    },
    {
      id: 4,
      question: "How do I refill my prescription?",
      answer: "You can refill your prescription in several ways: by calling our pharmacy at (123) 456-7890, using our mobile app, registering on our website and requesting refills online, or by visiting our pharmacy in person. For automatic refills on maintenance medications, ask about our auto-refill program.",
      category: "prescriptions"
    },
    {
      id: 5,
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans including Medicare, Medicaid, and private insurance providers. Please bring your insurance card when you visit or provide your insurance information when setting up your account online to ensure we have your current coverage details.",
      category: "general"
    },
    {
      id: 6,
      question: "Can I speak with a pharmacist about my medications?",
      answer: "Absolutely! Our pharmacists are available during all business hours to discuss your medications, potential side effects, drug interactions, or any other questions you may have. You can speak with a pharmacist in person, by phone, or schedule a comprehensive medication review appointment.",
      category: "services"
    },
    {
      id: 7,
      question: "Do you offer vaccinations?",
      answer: "Yes, we offer a variety of vaccinations including flu, pneumonia, shingles, tetanus, and travel vaccines. Many vaccinations are available on a walk-in basis, while some may require an appointment. Our pharmacists are certified immunizers and can help determine which vaccines are right for you.",
      category: "services"
    },
    {
      id: 8,
      question: "What should I do if I miss a dose of my medication?",
      answer: "If you miss a dose of your medication, what to do depends on the specific medication and how late you are taking it. As a general rule, take it as soon as you remember unless it's almost time for your next dose. For specific guidance, please contact our pharmacist for personalized advice based on your medication.",
      category: "medication"
    },
    {
      id: 9,
      question: "Do you compound medications?",
      answer: "Yes, we offer compounding services to prepare customized medications that meet specific patient needs. Our compounding pharmacists can create medications in different strengths or dosage forms, combine multiple medications, or formulate medications without certain allergens or inactive ingredients.",
      category: "services"
    },
    {
      id: 10,
      question: "How can I dispose of unused or expired medications?",
      answer: "We provide a safe medication disposal program at our pharmacy. You can bring your unused or expired medications to our drop-off box during regular business hours. Please note that certain medications may require special disposal methods, and our pharmacists can provide guidance on proper disposal.",
      category: "medication"
    },
    {
      id: 11,
      question: "Can I order prescription refills online?",
      answer: "Yes, you can order prescription refills through our secure website or mobile app. Simply create an account, add your prescriptions, and request refills when needed. You'll receive notifications when your refills are ready for pickup or delivery.",
      category: "prescriptions"
    },
    {
      id: 12,
      question: "Do you offer medication synchronization?",
      answer: "Yes, we offer a medication synchronization program that aligns all your prescription refills to be filled on the same day each month. This convenient service reduces multiple trips to the pharmacy and helps ensure you never run out of your medications.",
      category: "prescriptions"
    }
  ];

  // Categories for FAQ organization
  const categories = [
    { id: "general", name: "General Information", icon: "🏥", color: "bg-blue-500" },
    { id: "prescriptions", name: "Prescriptions & Refills", icon: "💊", color: "bg-green-500" },
    { id: "services", name: "Services", icon: "🩺", color: "bg-purple-500" },
    { id: "medication", name: "Medication Management", icon: "📋", color: "bg-pink-500" }
  ];

  // Filter items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems([]);
      return;
    }
    
    const filtered = faqItems.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredItems(filtered);
  }, [searchQuery]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Filter items by category
  const getItemsByCategory = (categoryId: string) => {
    return faqItems.filter(item => item.category === categoryId);
  };

  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | Tareeq-ul-Shifa Pharmacy</title>
        <meta name="description" content="Find answers to common questions about Tareeq-ul-Shifa Pharmacy's services, prescriptions, and policies." />
      </Head>
      
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Gradient Background Banner */}
        <motion.div 
          className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-emerald-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          
          <div className="relative z-10 px-8 py-16 text-center text-white">
            <motion.h1 
              className="text-5xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Find answers to common questions about our pharmacy services
            </motion.p>
          </div>
        </motion.div>
        
        {/* Search Box with Animation */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-5 pl-14 rounded-xl border-2 border-teal-100 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 shadow-md text-lg transition-all duration-300"
            />
            <div className="absolute left-5 top-5 text-teal-500">
              <FiSearch className="h-6 w-6" />
            </div>
            
            {searchQuery.trim() !== '' && (
              <motion.button
                className="absolute right-5 top-5 text-gray-400 hover:text-teal-600"
                onClick={() => setSearchQuery('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
          
          {/* Search results counter */}
          {searchQuery.trim() !== '' && (
            <motion.p 
              className="mt-2 text-gray-600 text-sm pl-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Found {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </motion.p>
          )}
        </motion.div>
        
        {/* Display search results if any */}
        {searchQuery.trim() !== '' && (
          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Results</h2>
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300"
                    variants={itemVariants}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                      <motion.span 
                        className="text-teal-500 bg-teal-50 p-2 rounded-full"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {expandedItems[item.id] ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expandedItems[item.id] && (
                        <motion.div 
                          className="px-6 pb-6 text-gray-700"
                          variants={answerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <p className="leading-relaxed">{item.answer}</p>
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center"
                variants={itemVariants}
              >
                <p className="text-gray-600">No questions matching your search. Try different keywords or browse categories below.</p>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Only show categories and main content if not searching */}
        {searchQuery.trim() === '' && (
          <>
            {/* FAQ Categories with Icons and Hover Effects */}
            <motion.div 
              className="max-w-4xl mx-auto mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map(category => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    onClick={() => {
                      setActiveCategory(activeCategory === category.id ? null : category.id);
                      setTimeout(() => {
                        document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 100);
                    }}
                    className={`cursor-pointer rounded-xl shadow-md p-6 text-center transition-all duration-300 ${
                      activeCategory === category.id 
                        ? `${category.color} text-white` 
                        : 'bg-white hover:bg-teal-50'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`text-3xl mb-3 ${activeCategory === category.id ? 'text-white' : 'text-teal-500'}`}>
                        {category.icon}
                      </div>
                      <h2 className={`text-lg font-semibold mb-2 ${activeCategory === category.id ? 'text-white' : 'text-teal-600'}`}>
                        {category.name}
                      </h2>
                      <p className={`text-sm ${activeCategory === category.id ? 'text-teal-50' : 'text-gray-500'}`}>
                        {getItemsByCategory(category.id).length} questions
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* FAQ Content by Category - Only show active category if one is selected */}
            <motion.div 
              className="max-w-4xl mx-auto space-y-16"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories
                .filter(category => activeCategory ? category.id === activeCategory : true)
                .map(category => {
                  const categoryItems = getItemsByCategory(category.id);
                  return (
                    <motion.div 
                      key={category.id} 
                      id={category.id} 
                      className="scroll-mt-24"
                      variants={itemVariants}
                    >
                      <div className="flex items-center mb-8">
                        <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-white text-2xl mr-4`}>
                          {category.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {category.name}
                        </h2>
                      </div>
                      
                      <div className="space-y-4">
                        {categoryItems.map((item) => (
                          <motion.div 
                            key={item.id} 
                            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 border-transparent hover:border-teal-500"
                            variants={itemVariants}
                            layout
                          >
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                            >
                              <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                              <motion.span 
                                className="text-teal-500 bg-teal-50 p-2 rounded-full"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {expandedItems[item.id] ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {expandedItems[item.id] && (
                                <motion.div 
                                  className="px-6 pb-6 text-gray-700"
                                  variants={answerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="hidden"
                                  layout
                                >
                                  <p className="leading-relaxed">{item.answer}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </>
        )}
        
        {/* Back to top button that appears when scrolling */}
        <motion.button
          className="fixed bottom-8 right-8 bg-teal-500 text-white p-4 rounded-full shadow-lg z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
        
        {/* Still Have Questions - Enhanced Card with Animation */}
        <motion.div 
          className="max-w-4xl mx-auto mt-20 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-1">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-500 md:flex">
              <div className="md:w-2/3 p-8">
                <motion.h2 
                  className="text-3xl font-bold text-white mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Still Have Questions?
                </motion.h2>
                <motion.p 
                  className="text-white text-lg mb-8 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  We're here to help! Our knowledgeable pharmacists and staff are ready to answer any additional questions you may have.
                </motion.p>
                <motion.div 
                  className="space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a 
                    href="/contact" 
                    className="inline-block bg-white text-teal-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Us
                  </motion.a>
                  <motion.a 
                    href="tel:+1234567890" 
                    className="inline-block bg-transparent text-white border-2 border-white font-medium px-6 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition duration-300"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Call Now
                  </motion.a>
                </motion.div>
              </div>
              <motion.div 
                className="md:w-1/3 bg-white bg-opacity-10 p-8 flex items-center justify-center"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-white">
                  <p className="text-xl font-semibold mb-6">Contact Information</p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <FiPhone className="h-5 w-5 mr-3" />
                      <p>(123) 456-7890</p>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="h-5 w-5 mr-3" />
                      <p>info@tareeqshifa.com</p>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="h-5 w-5 mr-3" />
                      <p>Mon-Fri 9AM-8PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}