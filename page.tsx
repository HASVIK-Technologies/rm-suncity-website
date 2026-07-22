import React from "react";

export default function FAQsPage() {
  const faqs = [
    {
      question: "What are the school timings?",
      answer: "School timings are from 8:00 AM to 2:30 PM from Monday to Friday. Saturday timings are from 8:00 AM to 12:30 PM for students up to Class 5. Pre-primary students have separate timings."
    },
    {
      question: "How do I apply for admission?",
      answer: "You can apply for admission by filling out the online registration form available on our website or visiting the school office for offline registration. Please visit our Admission page for detailed process."
    },
    {
      question: "What is the fee payment mode?",
      answer: "Fees can be paid online through our payment portal, or at the school office via cash, cheque, or demand draft. For online payments, please visit the Payment Portal section."
    },
    {
      question: "Is transportation facility available?",
      answer: "Yes, we provide transportation facility for students residing within a 15 km radius of the school. Routes and pickup points are finalized at the beginning of each academic session."
    },
    {
      question: "What extracurricular activities are offered?",
      answer: "We offer a wide range of activities including sports (cricket, basketball, football, athletics), music (vocal and instrumental), dance, art & craft, robotics, and various clubs for different interests."
    },
    {
      question: "How can I track my child's progress?",
      answer: "Parents can track their child's progress through our parent portal which provides access to attendance records, test scores, and periodic report cards. PTM sessions are also held quarterly."
    },
    {
      question: "What is the student-teacher ratio?",
      answer: "We maintain a healthy student-teacher ratio of 20:1 in primary classes and 25:1 in secondary classes to ensure personalized attention for every student."
    },
    {
      question: "Are medical facilities available in school?",
      answer: "Yes, we have a well-equipped infirmary with a qualified nurse on campus. In case of emergencies, students are immediately taken to the nearest hospital."
    },
    {
      question: "How do I contact the school for grievances?",
      answer: "You can contact us through the Contact page on our website, visit the school office during working hours, or email us at the official school email address provided on our contact page."
    },
    {
      question: "What documents are required for admission?",
      answer: "Required documents include birth certificate, Aadhar cards (child and parents), previous school TC (for Class II and above), report card, passport size photographs, address proof, and parent's ID proof."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Find answers to commonly asked questions about admissions, fees, facilities, and more.
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer p-6">
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </h3>
                    <span className="text-orange-600 group-open:rotate-180 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Please contact our admissions team.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}