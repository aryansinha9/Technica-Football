import { useState } from 'react';
import { Phone, Mail, Facebook, Instagram, Send, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { useSponsors } from '../lib/useSiteContent';

const programOptions = [
  'Term Program',
  'Individual Sessions',
  'Academy Development Squad',
  'Holiday Clinic',
  'Club Technical Training',
  'Vacation Care',
  'General Inquiry',
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

export default function ContactPage() {
  const { sponsors } = useSponsors();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    childName: '',
    email: '',
    phone: '',
    programInterest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    const formatted = formatPhone(raw);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (raw.length > 0 && raw.length < 10) {
      setPhoneError('Please enter a valid 10-digit Australian number (e.g. 0400 123 456)');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, email: val }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ad2c357f-8850-4467-815d-a15aea89f373',
          subject: 'General Enquiry — Technica Football',
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) setSubmitted(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHero title="Contact" subtitle="Get In Touch" bottomColor="#f3f4f6" />

      {/* Contact Info + Form */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Contact Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-2">REACH OUT TO US</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mb-8" />
            <p className="text-gray-600 leading-relaxed mb-10">
              Have a question about our programs, want to book a session, or interested in partnering with us? We'd love to hear from you.
            </p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div>
                <p className="font-barlow font-bold tracking-widest uppercase text-orange-500 text-sm mb-1">Founder & Head Coach</p>
                <p className="text-2xl font-black">Mackenzie Dunn</p>
              </div>
              <div className="border-t border-gray-100" />
              <a href="tel:0400422802" className="flex items-center gap-4 group">
                <Phone className="w-6 h-6 text-[#0A1F44] shrink-0 group-hover:text-[#f0722b] transition-colors" />
                <div>
                  <p className="text-xs text-gray-500 font-barlow tracking-widest uppercase mb-0.5">Phone</p>
                  <p className="font-bold text-lg group-hover:text-[#f0722b] transition-colors">0400 422 802</p>
                </div>
              </a>
              <a href="mailto:info@technicafootball.com.au" className="flex items-center gap-4 group">
                <Mail className="w-6 h-6 text-[#0A1F44] shrink-0 group-hover:text-[#f0722b] transition-colors" />
                <div>
                  <p className="text-xs text-gray-500 font-barlow tracking-widest uppercase mb-0.5">Email</p>
                  <p className="font-bold text-lg group-hover:text-[#f0722b] transition-colors">info@technicafootball.com.au</p>
                </div>
              </a>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 font-barlow tracking-widest uppercase mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=100086871345661"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 rounded-xl bg-[#0A1F44] flex items-center justify-center hover:bg-[#f0722b] transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/technicafootball/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-xl bg-[#0A1F44] flex items-center justify-center hover:bg-[#f0722b] transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map — directly under contact details */}
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#f0722b] shadow-md mt-6" style={{ minHeight: '280px', flex: 1 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1572.9842075545314!2d150.9116118!3d-33.7135074!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80233407745e107b%3A0x2c5c6d4a807d16e5!2sTechnica%20Football!5e1!3m2!1sen!2sau!4v1777697188142!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)', position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Technica Football Location"
              />
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-wide mb-2">SEND AN ENQUIRY</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mb-8" />

            {submitted ? (
              <div className="bg-white rounded-2xl border border-green-200 shadow-sm p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-[#0A1F44]">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ firstName: '', lastName: '', childName: '', email: '', phone: '', programInterest: '', message: '' }); }}
                  className="mt-6 text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-sm hover:underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Parent First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Parent Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="childName" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Child's Name (Optional)</label>
                  <input
                    id="childName"
                    name="childName"
                    type="text"
                    value={formData.childName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44]"
                    placeholder="Enter child's name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-[#0A1F44] ${emailError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-gray-200 focus:border-[#0A1F44] focus:ring-[#0A1F44]/10'}`}
                    placeholder="john@example.com"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Phone Number <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-[#0A1F44] ${phoneError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-gray-200 focus:border-[#0A1F44] focus:ring-[#0A1F44]/10'}`}
                    placeholder="0400 000 000"
                    maxLength={12}
                  />
                  {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                </div>
                <div>
                  <label htmlFor="programInterest" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Program Interest <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
                  <select
                    id="programInterest"
                    name="programInterest"
                    value={formData.programInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] bg-white"
                  >
                    <option value="">Select a program...</option>
                    {programOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5 font-barlow tracking-wide uppercase">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0A1F44] focus:ring-2 focus:ring-[#0A1F44]/10 outline-none transition-all text-[#0A1F44] resize-none"
                    placeholder="Tell us about your child's age, experience, and any questions you have..."
                  />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending…' : <><span>Send Message</span><Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-[#f9fafb] text-[#0A1F44] pt-0 pb-29 px-8 md:px-16">
        {/* Wave up into grey form section */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f9fafb" fillOpacity="1" d="M0,255L480,240L960,265L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-wider mb-3">OUR PARTNERS</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-32 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {sponsors.map(sponsor => (
              <a
                key={sponsor.id}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                className="flex items-center justify-center w-48 h-24 hover:scale-105 transition-transform duration-300"
              >
                <img src={sponsor.logo_url} alt={sponsor.name} className="max-h-20 max-w-[180px] w-auto h-auto object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors CTA Section */}
      <section className="relative bg-[#0A1F44] text-white pt-2 pb-29 px-8 md:px-16 text-center">
        {/* Wave up into partners */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,255L480,240L960,265L1440,248L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-500 font-barlow font-bold tracking-[0.3em] uppercase text-sm mb-4">Partnership Opportunities</p>
          <h3 className="text-3xl md:text-4xl font-black mb-4">Become a Sponsor</h3>
          <p className="text-white/70 leading-relaxed mb-8">
            Interested in sponsoring Technica Football? Get in touch with us to explore partnership opportunities and how your brand can support the next generation of football talent.
          </p>
          <a
            href="mailto:info@technicafootball.com.au?subject=Sponsorship Enquiry"
            className="inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-white hover:text-[#f0722b] transition-colors duration-300 text-base shadow-lg"
          >
            Enquire About Sponsorship <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </>
  );
}
