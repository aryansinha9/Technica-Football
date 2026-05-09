import PageHero from '../components/PageHero';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    id: 'q1',
    question: 'Do we accept Active Kids Vouchers?',
    answer: 'Yes! We are a registered Active Kids provider. You can use your Active Kids voucher to offset the cost of our programs. Simply provide your voucher details when registering.',
  },
  {
    id: 'q2',
    question: 'What happens if my child cannot attend a session?',
    answer: 'Please notify us beforehand if your child is unable to attend. Sessions are planned based on attendance numbers, so your notification helps us prepare appropriately. Make-up sessions are available if you notify us before the session starts.',
  },
  {
    id: 'q3',
    question: 'What clothing and footwear should players wear?',
    answer: 'Activewear is recommended for all sessions. For outdoor sessions, football boots are preferred, though joggers are acceptable. For indoor sessions, please do not wear outdoor football boots — sports shoes or indoor-specific footwear only.',
  },
  {
    id: 'q4',
    question: 'Do we provide a jersey or kit?',
    answer: null, // Handled with custom render
    isApparel: true,
  },
  {
    id: 'q5',
    question: 'What happens in bad weather?',
    answer: 'Player safety is always our top priority. Whether a session proceeds depends on the specific weather conditions at the time. If a session is cancelled, all registered participants will be notified via email and/or text message as early as possible. Otherwise, the session will go ahead as planned.',
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['q1']));

  const toggle = (id: string) => setOpenItems(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <>
      <PageHero title="FAQ" subtitle="Frequently Asked Questions" bottomColor="#ffffff" />

      {/* FAQ Accordion */}
      <section className="relative bg-white text-[#0A1F44] pt-24 pb-32 px-8 md:px-16 min-h-[640px] md:min-h-[700px]">
        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {faqs.map((faq) => {
              const isOpen = openItems.has(faq.id);
              return (
                <div key={faq.id} className={`transition-colors duration-200 ${isOpen ? 'bg-[#0A1F44]' : 'bg-white hover:bg-gray-50'}`}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-barlow font-bold text-lg md:text-xl tracking-wide uppercase transition-colors ${isOpen ? 'text-white' : 'text-[#0A1F44]'}`}>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-8">
                      {faq.isApparel ? (
                        <div>
                          <p className="text-white/80 leading-relaxed mb-5">
                            Yes, we do offer official Technica Football training kits. You can purchase them directly through our apparel store.
                          </p>
                          <a
                            href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
                          >
                            Purchase here <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      ) : (
                        <p className="text-white/80 leading-relaxed">{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Kids Strip */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] pt-24 pb-44 px-8 md:px-16">
        {/* Grey wave jutting UP into white */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#f3f4f6" fillOpacity="1" d="M0,260L480,240L960,265L1440,250L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
          <img src="/ACTIVE-KIDS.png" alt="Active Kids Provider" className="h-28 w-auto object-contain" />
          <div>
            <p className="font-barlow font-bold text-xl md:text-2xl uppercase tracking-wide">Registered Active Kids Provider</p>
            <p className="text-gray-600 mt-2">Use your voucher towards any Technica Football program.</p>
          </div>
        </div>
      </section>

      {/* Apparel CTA */}
      <section className="relative bg-[#0A1F44] text-white pt-20 pb-28 px-8 md:px-16">
        {/* Navy wave jutting UP into grey */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none -translate-y-[99%]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 235 1440 85" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px] lg:h-[80px]">
            <path fill="#0A1F44" fillOpacity="1" d="M0,255L480,240L960,260L1440,245L1440,320L960,320L480,320L0,320Z" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto text-center py-8">
          <p className="text-orange-500 font-barlow font-bold tracking-[0.3em] uppercase text-sm mb-4">Official Merchandise</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-wide">Get Your Technica Kit</h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Represent Technica Football on and off the pitch. Shop our official merchandise including jerseys, shorts, long sleeves, and more.
          </p>
          <a
            href="https://deployfootball.com/collections/technica-football-official-merchandise-store-deploy-football"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg"
          >
            Shop Apparel <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
