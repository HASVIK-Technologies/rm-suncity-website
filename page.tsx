import React from "react";

export default function AdmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Process</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Welcome to RM Suncity Public School. We're excited to have you consider us for your child's education journey.
          </p>
        </div>
      </section>

      {/* Admission Process Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How to Apply</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Registration</h3>
              <p className="text-gray-600">
                Fill out the online admission form with your child's details and your contact information.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Document Submission</h3>
              <p className="text-gray-600">
                Submit required documents including birth certificate, previous school records, and photographs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interaction Round</h3>
              <p className="text-gray-600">
                Schedule and attend the interaction round with your child to assess their readiness.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmation</h3>
              <p className="text-gray-600">
                Upon selection, complete the admission formalities and pay the fees to confirm the seat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Required Documents</h2>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Birth Certificate of the child</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Aadhar Card (Child & Parents)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Previous School Transfer Certificate (if applicable)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Report Card of Previous Class</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Passport Size Photographs (4 copies)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Address Proof</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600 mt-1">✓</span>
                <span className="text-gray-700">Parent's Income Certificate (for scholarship purposes)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Age Criteria */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Age Criteria</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Pre-Primary (Nursery)</h3>
              <p className="text-gray-700">Child should be minimum 3 years old as on 31st March of the admission year.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Class I</h3>
              <p className="text-gray-700">Child should be minimum 5 years old as on 31st March of the admission year.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Class II onwards</h3>
              <p className="text-gray-700">Admission is subject to seat availability and clearance from the previous school.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-semibold text-orange-600 mb-4">Special Cases</h3>
              <p className="text-gray-700">Age relaxation may be considered on a case-to-case basis with proper documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-8">
            Our admission team is here to assist you with any queries regarding the admission process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/school-fee" 
              className="inline-block bg-white text-orange-600 border-2 border-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
            >
              View Fee Structure
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}