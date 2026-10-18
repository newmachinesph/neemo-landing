'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  BugAntIcon,
  LightBulbIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Navbar, Footer } from '@/components/layout';
import { CTAButton } from '@/components/landing';
import { submitContactForm } from '@/actions/contact';

const contactReasons = [
  {
    id: 'general',
    icon: ChatBubbleLeftRightIcon,
    title: 'General Inquiry',
    description: 'Questions about Neemo or how to get started',
    responseTime: '24-48 hours',
  },
  {
    id: 'support',
    icon: QuestionMarkCircleIcon,
    title: 'Account Support',
    description: 'Help with your account, login issues, or settings',
    responseTime: '12-24 hours',
  },
  {
    id: 'bug',
    icon: BugAntIcon,
    title: 'Report a Bug',
    description: 'Found something not working? Let us know!',
    responseTime: '24-48 hours',
  },
  {
    id: 'feature',
    icon: LightBulbIcon,
    title: 'Feature Request',
    description: 'Have an idea to make Neemo better?',
    responseTime: '1-2 weeks',
  },
];

const officeInfo = {
  address: 'Makati City, Metro Manila, Philippines',
  email: 'hello@neemo.app',
  hours: 'Monday - Friday, 9:00 AM - 6:00 PM PHT',
};

export default function ContactPage() {
  const [selectedReason, setSelectedReason] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const result = await submitContactForm({
      ...formData,
      contactReason: selectedReason,
    });

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
        <Navbar />

        {/* Success Message */}
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-[#fce4e8] dark:bg-[#f58560]/20 rounded-full mx-auto mb-6">
              <CheckCircleIcon className="w-8 h-8 text-[#9b1b3c] dark:text-[#f58560]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h1>
            <p className="text-gray-600 dark:text-white/70 mb-8">
              Thank you for reaching out. We've received your message and will get back to you within{' '}
              {contactReasons.find((r) => r.id === selectedReason)?.responseTime || '24-48 hours'}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="/" arrow={false}>
                Back to Home
              </CTAButton>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-6 py-3 text-base font-medium text-gray-700 dark:text-white bg-white dark:bg-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2f0a18]">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fdf2f4] to-white dark:from-[#4a0d24] dark:to-[#2f0a18]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-white/70">
            Have questions or feedback? We'd love to hear from you. Our team is here to help!
          </p>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What can we help you with?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactReasons.map((reason) => (
              <button
                key={reason.id}
                onClick={() => setSelectedReason(reason.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedReason === reason.id
                    ? 'border-[#f58560] bg-[#fdf2f4] dark:bg-[#f58560]/10'
                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white dark:bg-white/[0.06]'
                }`}
              >
                <reason.icon
                  className={`w-6 h-6 mb-3 ${
                    selectedReason === reason.id ? 'text-[#9b1b3c] dark:text-[#f58560]' : 'text-gray-400 dark:text-white/50'
                  }`}
                />
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{reason.title}</h3>
                <p className="text-sm text-gray-500 dark:text-white/60 mb-2">{reason.description}</p>
                <p className="text-xs text-gray-400 dark:text-white/40 flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  Response: {reason.responseTime}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560] focus:border-transparent"
                      placeholder="Juan dela Cruz"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560] focus:border-transparent"
                      placeholder="juan@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560] focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f58560] focus:border-transparent resize-none"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium text-[#2f0a18] bg-[#f58560] rounded-lg hover:bg-[#f79b7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {errorMessage && (
                  <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-white/[0.06] rounded-xl p-6 space-y-6 border border-gray-200 dark:border-white/10">
                <h3 className="font-semibold text-gray-900 dark:text-white">Other Ways to Reach Us</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                      <a
                        href={`mailto:${officeInfo.email}`}
                        className="text-sm text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a]"
                      >
                        {officeInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BuildingOfficeIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Office</p>
                      <p className="text-sm text-gray-600 dark:text-white/70">{officeInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-[#9b1b3c] dark:text-[#f58560] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Business Hours</p>
                      <p className="text-sm text-gray-600 dark:text-white/70">{officeInfo.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/faq" className="text-sm text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a]">
                        → Check our FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/how-it-works" className="text-sm text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a]">
                        → How Neemo Works
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-sm text-[#9b1b3c] dark:text-[#f58560] hover:text-[#831530] dark:hover:text-[#f79b7a]">
                        → About Neemo
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#fce4e8] dark:bg-[#f58560]/15 rounded-lg p-4 border border-[#f9d0d8] dark:border-[#f58560]/30">
                  <p className="text-sm text-[#6b1028] dark:text-[#f58560]">
                    <strong>Pro tip:</strong> For faster support, check our{' '}
                    <Link href="/faq" className="underline">
                      FAQ page
                    </Link>{' '}
                    first. Many common questions are answered there!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
