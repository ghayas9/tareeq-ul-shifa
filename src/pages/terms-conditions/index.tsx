// pages/terms-conditions.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import {
  FiChevronDown,
  FiBook,
  FiShield,
  FiClock,
  FiAlertCircle,
  FiPackage,
  FiCreditCard,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';

export default function TermsConditions() {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    1: true, // Start with first section expanded
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
  });

  // Toggle section expansion
  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Section data with icons for visual appeal
  const sections = [
    {
      id: 1,
      title: 'Definitions',
      icon: <FiBook className="text-teal-500" />,
      content: (
        <>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>"We," "us," "our,"</strong> and{' '}
              <strong>"Tareeq-ul-Shifa"</strong> refer to Tareeq-ul-Shifa
              Pharmacy.
            </li>
            <li>
              <strong>"Website"</strong> refers to the website operated by
              Tareeq-ul-Shifa, including all content, services, and
              functionality offered through the website.
            </li>
            <li>
              <strong>"You" and "your"</strong> refer to the individual or
              entity accessing or using our website and services.
            </li>
            <li>
              <strong>"Services"</strong> refers to all pharmacy services,
              products, information, tools, and features provided by
              Tareeq-ul-Shifa.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: 'Use of Website and Services',
      icon: <FiShield className="text-blue-500" />,
      content: (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                2.1 Eligibility
              </h3>
              <p>
                You must be at least 18 years old to use our website and
                services. By using our website and services, you represent and
                warrant that you are at least 18 years old and have the legal
                capacity to enter into these Terms.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                2.2 Account Registration
              </h3>
              <p>
                Some features of our website may require you to create an
                account. When registering for an account, you agree to provide
                accurate, current, and complete information. You are responsible
                for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account. You agree
                to notify us immediately of any unauthorized use of your
                account.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                2.3 Acceptable Use
              </h3>
              <p className="mb-3">
                You agree not to use our website and services for any unlawful
                or prohibited purpose. Prohibited activities include, but are
                not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Using the website in a way that could damage, disable, or
                  impair its functioning
                </li>
                <li>
                  Attempting to gain unauthorized access to any part of the
                  website
                </li>
                <li>
                  Using the website to transmit any malware, viruses, or other
                  harmful code
                </li>
                <li>Collecting user information without consent</li>
                <li>Engaging in any fraudulent or deceptive activity</li>
                <li>
                  Using the website to harass, abuse, or harm another person
                </li>
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 3,
      title: 'Ordering Medications and Products',
      icon: <FiPackage className="text-purple-500" />,
      content: (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                3.1 Prescription Medications
              </h3>
              <p>
                All prescription medications require a valid prescription from a
                licensed healthcare provider. We reserve the right to verify the
                authenticity of prescriptions and to refuse to fill any
                prescription that we determine, in our professional judgment, is
                not valid or appropriate.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                3.2 Order Acceptance
              </h3>
              <p>
                All orders placed through our website are subject to our
                acceptance. We reserve the right to refuse or cancel any order
                for any reason, including limitations on quantities available
                for purchase, inaccuracies in pricing or product information, or
                problems identified by our credit and fraud avoidance
                department.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                3.3 Pricing and Payment
              </h3>
              <p>
                All prices displayed on our website are in [local currency] and
                are subject to change without notice. We strive to ensure that
                all information on our website, including prices, is accurate,
                but errors may occur. If we discover an error in the price of
                items you have ordered, we will inform you and give you the
                option of reconfirming your order at the correct price or
                canceling it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                3.4 Delivery and Pickup
              </h3>
              <p>
                We offer delivery and pickup options for orders. Delivery times
                and availability may vary depending on your location and the
                items ordered. We are not responsible for delays caused by
                factors outside our control, such as weather conditions or
                carrier delays.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 4,
      title: 'Intellectual Property',
      icon: <FiCreditCard className="text-pink-500" />,
      content: (
        <>
          <p>
            All content on our website, including text, graphics, logos, images,
            and software, is the property of Tareeq-ul-Shifa or its content
            suppliers and is protected by copyright, trademark, and other
            intellectual property laws. You may not reproduce, distribute,
            display, sell, lease, transmit, create derivative works from,
            translate, modify, reverse-engineer, disassemble, decompile, or
            otherwise exploit this website or any portion of it without our
            express written consent.
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: 'Disclaimer of Warranties',
      icon: <FiAlertCircle className="text-yellow-500" />,
      content: (
        <>
          <div className="space-y-3">
            <p>
              Our website and services are provided on an "as is" and "as
              available" basis. To the maximum extent permitted by law, we
              disclaim all warranties, express or implied, including but not
              limited to implied warranties of merchantability, fitness for a
              particular purpose, and non-infringement.
            </p>
            <p>
              We do not warrant that our website will be uninterrupted or
              error-free, that defects will be corrected, or that our website or
              the servers that make it available are free of viruses or other
              harmful components.
            </p>
            <p>
              The information provided on our website is for general
              informational purposes only and should not be relied upon as
              medical advice. Always consult with a qualified healthcare
              provider for medical advice, diagnosis, or treatment.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 6,
      title: 'Limitation of Liability',
      icon: <FiShield className="text-red-500" />,
      content: (
        <>
          <p>
            To the maximum extent permitted by law, Tareeq-ul-Shifa and its
            affiliates, officers, employees, agents, partners, and licensors
            shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages, including but not limited to,
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from your access to or use of or inability to access or
            use the website or services.
          </p>
        </>
      ),
    },
    {
      id: 7,
      title: 'Indemnification',
      icon: <FiShield className="text-green-500" />,
      content: (
        <>
          <p>
            You agree to indemnify, defend, and hold harmless Tareeq-ul-Shifa
            and its affiliates, officers, employees, agents, partners, and
            licensors from and against any and all claims, demands, liabilities,
            costs, or expenses, including reasonable attorneys' fees, resulting
            from your violation of these Terms, your use of our website and
            services, or your violation of any rights of another.
          </p>
        </>
      ),
    },
    {
      id: 8,
      title: 'Modifications to Terms',
      icon: <FiClock className="text-orange-500" />,
      content: (
        <>
          <p>
            We reserve the right to modify these Terms at any time. All changes
            are effective immediately when posted on our website. Your continued
            use of our website and services after any such changes constitutes
            your acceptance of the modified Terms.
          </p>
        </>
      ),
    },
    {
      id: 9,
      title: 'Governing Law and Jurisdiction',
      icon: <FiBook className="text-indigo-500" />,
      content: (
        <>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Country/State], without giving effect to any
            principles of conflicts of law. You agree that any legal action or
            proceeding between you and Tareeq-ul-Shifa shall be brought
            exclusively in the courts located in [Your City/State].
          </p>
        </>
      ),
    },
    {
      id: 10,
      title: 'Termination',
      icon: <FiAlertCircle className="text-gray-500" />,
      content: (
        <>
          <p>
            We reserve the right to terminate or suspend your account and access
            to our website and services at our sole discretion, without notice,
            for any reason, including but not limited to a breach of these
            Terms.
          </p>
        </>
      ),
    },
    {
      id: 11,
      title: 'Severability',
      icon: <FiBook className="text-teal-500" />,
      content: (
        <>
          <p>
            If any provision of these Terms is found to be unenforceable or
            invalid, that provision shall be limited or eliminated to the
            minimum extent necessary so that these Terms shall otherwise remain
            in full force and effect and enforceable.
          </p>
        </>
      ),
    },
    {
      id: 12,
      title: 'Entire Agreement',
      icon: <FiBook className="text-blue-500" />,
      content: (
        <>
          <p>
            These Terms constitute the entire agreement between you and
            Tareeq-ul-Shifa regarding your use of our website and services,
            superseding any prior agreements between you and Tareeq-ul-Shifa.
          </p>
        </>
      ),
    },
    {
      id: 13,
      title: 'Contact Information',
      icon: <FiMail className="text-purple-500" />,
      content: (
        <>
          <p className="mb-4">
            If you have any questions or concerns about these Terms, please
            contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start mb-2">
              <FiMapPin className="mt-1 mr-3 text-teal-500" />
              <div>
                <p className="font-medium">Tareeq-ul-Shifa Pharmacy</p>
                <p>123 Health Street</p>
                <p>City, State 12345</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <FiMail className="mr-3 text-teal-500" />
              <p>legal@tareeqshifa.com</p>
            </div>
            <div className="flex items-center">
              <FiPhone className="mr-3 text-teal-500" />
              <p>(123) 456-7890</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <Layout>
      <Head>
        <title>Terms and Conditions | Tareeq-ul-Shifa Pharmacy</title>
        <meta
          name="description"
          content="Please review the terms and conditions for using Tareeq-ul-Shifa Pharmacy's website and services."
        />
      </Head>

      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-12 w-64 h-64 rounded-full bg-teal-100 opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -left-40 top-1/3 w-80 h-80 rounded-full bg-blue-100 opacity-20"
            animate={{
              x: [0, 25, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-100 opacity-30"
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header with gradient background */}
          <motion.div
            className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-r from-teal-600 to-emerald-500"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white opacity-5 rounded-full"></div>

            <div className="relative z-10 px-8 py-16 text-center text-white">
              <motion.div
                className="inline-block mb-6 p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
              >
                <FiBook className="text-4xl" />
              </motion.div>

              <motion.h1
                className="text-5xl font-bold mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Terms and Conditions
              </motion.h1>

              <motion.p
                className="text-xl max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Please review our terms and conditions carefully
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

          {/* Introduction Card */}
          <motion.div
            className="max-w-4xl mx-auto mb-10 bg-white rounded-xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.p
              className="text-lg leading-relaxed text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              Welcome to Tareeq-ul-Shifa Pharmacy. These Terms and Conditions
              govern your use of our website and services. By accessing or using
              our website, placing orders, or using any of our services, you
              agree to be bound by these Terms. Please read them carefully.
            </motion.p>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                variants={itemVariants}
                whileHover={{
                  y: -3,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-gray-50">
                    <div className="mr-4 text-xl">{section.icon}</div>
                    <h2 className="text-xl font-semibold text-gray-800 flex-grow">
                      {section.id}. {section.title}
                    </h2>
                    <motion.div
                      animate={{
                        rotate: expandedSections[section.id] ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="text-xl text-gray-500" />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedSections[section.id] ? 'auto' : 0,
                    opacity: expandedSections[section.id] ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0">{section.content}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100 shadow-sm text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Have Questions About Our Terms?
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our team is here to help clarify any part of our terms and
              conditions
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
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
