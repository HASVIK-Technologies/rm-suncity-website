"use client";

import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBook,
  FaBus,
  FaLaptop,
  FaClipboardList,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaMobileAlt,
  FaDownload,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { CONTACT } from "@/config/contact";

export default function SchoolFeePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-87.5 flex items-center"
        style={{
          background: "url(/images/school.jpeg) no-repeat center center/cover",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            School Fee Structure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-200 max-w-2xl"
          >
            Transparent and affordable fee structure for quality education at RM Suncity Public School
          </motion.p>
        </div>
      </section>

      {/* Fee Structure Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Fee Structure {new Date().getFullYear()}-{new Date().getFullYear() + 1}
            </h2>
            <p className="text-gray-600">
              Comprehensive fee breakdown for all classes
            </p>
          </motion.div>

          {/* Fee Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-5 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold">
              <div className="p-4 text-center">Class</div>
              <div className="p-4 text-center">Admission Fee</div>
              <div className="p-4 text-center">Tuition Fee (Monthly)</div>
              <div className="p-4 text-center">Annual Charges</div>
              <div className="p-4 text-center">Total Annual</div>
            </div>

            {/* Rows */}
            {[
              { class: "Nursery - LKG", admission: "₹5,000", tuition: "₹1,500", annual: "₹8,000", total: "₹31,000" },
              { class: "UKG - Class 2", admission: "₹6,000", tuition: "₹1,800", annual: "₹10,000", total: "₹37,600" },
              { class: "Class 3 - Class 5", admission: "₹7,000", tuition: "₹2,000", annual: "₹12,000", total: "₹43,000" },
              { class: "Class 6 - Class 8", admission: "₹8,000", tuition: "₹2,500", annual: "₹15,000", total: "₹53,000" },
              { class: "Class 9 - Class 10", admission: "₹10,000", tuition: "₹3,000", annual: "₹18,000", total: "₹64,000" },
            ].map((row, index) => (
              <div
                key={row.class}
                className={`grid grid-cols-5 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-orange-50 transition-colors`}
              >
                <div className="p-4 text-center font-medium text-gray-800 border-r border-gray-100">
                  {row.class}
                </div>
                <div className="p-4 text-center text-gray-600 border-r border-gray-100">
                  {row.admission}
                </div>
                <div className="p-4 text-center text-gray-600 border-r border-gray-100">
                  {row.tuition}
                </div>
                <div className="p-4 text-center text-gray-600 border-r border-gray-100">
                  {row.annual}
                </div>
                <div className="p-4 text-center font-semibold text-orange-600">
                  {row.total}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Charges Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Additional Charges
            </h2>
            <p className="text-gray-600">
              Optional services and their respective fees
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaBus,
                title: "Transportation",
                description: "Pickup & drop facility available",
                price: "₹1,500/month",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: FaBook,
                title: "Books & Uniform",
                description: "Complete set of textbooks and uniform",
                price: "₹4,500/year",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: FaLaptop,
                title: "Computer Lab",
                description: "Computer education charges",
                price: "₹500/month",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: FaGraduationCap,
                title: "Activity Charges",
                description: "Sports, arts & extracurricular",
                price: "₹800/month",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-xl font-bold text-orange-600">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information Section */}
      <section className="py-16 bg-linear-to-r from-orange-500 to-amber-500">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Important Fee Information
            </h2>
            <p className="text-white/90">
              Please read the following guidelines carefully
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FaCalendarAlt,
                title: "Fee Payment Schedule",
                description: "Fees are to be paid quarterly (April, July, October, January). Late fee charges of ₹100 per day apply after the 15th of the month.",
              },
              {
                icon: FaExclamationTriangle,
                title: "Late Payment Policy",
                description: "A late fee of ₹100 per day will be charged for payments received after the due date. Students may not be allowed to appear for exams if fees are pending.",
              },
              {
                icon: FaCheckCircle,
                title: "Fee Concession",
                description: "Concessions are available for siblings, economically weaker sections, and meritorious students. Please contact the school office for details.",
              },
              {
                icon: FaClipboardList,
                title: "Refund Policy",
                description: "Admission fee is non-refundable. Tuition fee will be refunded on a pro-rata basis if a student withdraws with 30 days notice.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <item.icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Methods
            </h2>
            <p className="text-gray-600">
              Choose a convenient payment method for fee submission
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaCreditCard,
                title: "Online Payment",
                description: "Pay via school portal using credit/debit card or net banking",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: FaUniversity,
                title: "Bank Transfer",
                description: "Direct transfer to school account via NEFT/RTGS",
                color: "from-green-500 to-green-600",
              },
              {
                icon: FaMoneyBillWave,
                title: "Cash Payment",
                description: "Pay at school office during working hours",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: FaMobileAlt,
                title: "UPI Payment",
                description: "Pay using any UPI app (Google Pay, PhonePe, Paytm)",
                color: "from-orange-500 to-orange-600",
              },
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-linear-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}>
                  <method.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}