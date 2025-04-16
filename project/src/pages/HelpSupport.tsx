import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { MessageSquare, HelpCircle } from 'lucide-react';

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqs = [
    {
      question: 'How long can I borrow a book?',
      answer: 'Books can be borrowed for up to 14 days. You can renew them once for an additional 7 days if no one else has reserved them.',
    },
    {
      question: 'What happens if I return a book late?',
      answer: 'Late returns incur a fine of $0.50 per day. Please return books on time to avoid fines and ensure other students can access them.',
    },
    {
      question: 'How many books can I borrow at once?',
      answer: 'Students can borrow up to 5 books at a time. Additional books require special permission from the library staff.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Help & Support</h1>

        <div className="grid gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Contact Support</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;