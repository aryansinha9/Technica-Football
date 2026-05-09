import PageHero from '../components/PageHero';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';

export default function ClubTechnikaTrainingPage() {
  return (
    <>
      <PageHero title="Club Technica Training" subtitle="Community Training Sessions" bottomColor="#f3f4f6" />

      {/* Coming Soon Section */}
      <section className="relative bg-[#f3f4f6] text-[#0A1F44] min-h-[70vh] flex items-center justify-center px-8 md:px-16 py-32">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block bg-[#f0722b] text-white font-barlow font-bold text-sm tracking-[0.3em] uppercase px-6 py-3 rounded-xl mb-8 shadow-lg">
            ⚠ Not Yet Available
          </span>

          <h2 className="text-5xl md:text-6xl font-black tracking-wide mb-3 text-[#0A1F44]">
            COMING SOON
          </h2>
          <p className="text-[#f0722b] font-barlow font-bold tracking-widest uppercase text-base mb-8">
            Club Technica Training
          </p>
          <div className="h-1 bg-[#f0722b] rounded-full w-24 mx-auto mb-10" />

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-4">
            Club Technica Training is a community group training program focused on technical development, teamwork, and building the Technica Football culture.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-12">
            Program details, session schedules, and online bookings will be available very soon. In the meantime, reach out to us directly with any questions.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-[#f0722b] transition-colors duration-300 text-sm"
          >
            Contact Us <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
