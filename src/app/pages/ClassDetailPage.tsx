import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ChevronRight, MapPin, Phone, Mail, Clock, AlertTriangle, CalendarDays, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';
import { useTermClasses, type TermClass } from '../lib/useSiteContent';

export default function ClassDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { classes: termClasses, loading } = useTermClasses();
  const [classData, setClassData] = useState<TermClass | undefined>(undefined);
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (slug && termClasses.length > 0) {
      const data = termClasses.find(c => c.slug === slug);
      setClassData(data);

      if (data) {
        supabase
          .from('classes')
          .select('spots_remaining')
          .eq('id', data.id)
          .single()
          .then(({ data: row }) => {
            if (row) setSpotsRemaining(row.spots_remaining);
          });
      }
    }
  }, [slug, termClasses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1F44] flex flex-col items-center justify-center text-white">
        <h2 className="text-xl font-barlow tracking-widest uppercase">Loading Class...</h2>
      </div>
    );
  }

  if (!classData) {
    return (
      <>
        <PageHero title="Class Not Found" subtitle="" bottomColor="#f3f4f6" />
        <section className="bg-[#f3f4f6] text-[#0A1F44] py-32 px-8 text-center">
          <p className="text-xl text-gray-600 mb-8">Sorry, we couldn't find that class.</p>
          <Link to="/programs/term-program" className="inline-flex items-center gap-2 bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-[#f0722b] transition-colors text-sm">
            Back to Term Program <ChevronRight className="w-4 h-4" />
          </Link>
        </section>
      </>
    );
  }

  const spots = spotsRemaining ?? 0;
  const spotsColor = spots <= 5 ? 'text-red-500' : spots <= 8 ? 'text-amber-500' : 'text-green-500';
  const spotsBg = spots <= 5 ? 'bg-red-500/10' : spots <= 8 ? 'bg-amber-500/10' : 'bg-green-500/10';

  // Parse the description into structured content
  const descLines = classData.description.split('\n').filter(l => l.trim());
  const introParagraph = descLines[0];
  const bulletPoints = descLines.filter(l => l.startsWith('- ')).map(l => l.replace('- ', ''));
  const outroLines = descLines.filter(l => !l.startsWith('- ') && l !== introParagraph);

  return (
    <>
      <PageHero title={classData.title} subtitle={classData.subtitle} bottomColor="#f3f4f6" />

      {/* Alert Banner */}
      <section className="bg-[#f3f4f6] pt-8 pb-0 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-amber-800 text-sm font-medium">This course has started, but you can book the remaining sessions.</p>
          </div>
        </div>
      </section>

      {/* Class Overview Card */}
      <section className="bg-[#f3f4f6] pt-8 pb-12 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#0A1F44] px-8 py-6">
              <h2 className="text-xl font-barlow font-bold tracking-widest uppercase text-white">{classData.subtitle}</h2>
              <p className="text-white/60 text-sm mt-1">{classData.location}</p>
            </div>
            {/* Body */}
            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Started {classData.startedDate}</p>
                  <p className="text-4xl font-black text-[#0A1F44]">${classData.price}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{classData.address}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${spotsColor} ${spotsBg}`}>
                    <Users className="w-4 h-4" />
                    {spots} spot{spots !== 1 ? 's' : ''} left
                  </span>
                </div>
              </div>

              {/* Book Now CTA */}
              <Link
                to={`/programs/term-program/book/${classData.slug}`}
                className="w-full bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-[#0A1F44] transition-colors duration-300 flex items-center justify-center gap-2 text-base shadow-lg"
              >
                Book Now <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="bg-white py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-[#f0722b] font-barlow font-bold text-xs tracking-widest uppercase">Service Description</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-wide text-[#0A1F44] mt-2">TECHNICA FOOTBALL TERM PROGRAM — TERM 2</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mt-4" />
          </div>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">{introParagraph}</p>
          <ul className="space-y-3 mb-6">
            {bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#f0722b] shrink-0 mt-2.5" />
                <span className="text-gray-700 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
          {outroLines.map((line, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-3">{line}</p>
          ))}
        </div>
      </section>

      {/* Contact Details */}
      <section className="bg-[#f3f4f6] py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-[#f0722b] font-barlow font-bold text-xs tracking-widest uppercase">Contact Details</span>
            <h2 className="text-2xl font-black tracking-wide text-[#0A1F44] mt-2">{classData.address}</h2>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mt-4" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-[#f0722b] shrink-0" />
              <span>{classData.fullAddress}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-[#f0722b] shrink-0" />
              <a href="tel:0400422802" className="hover:text-[#f0722b] transition-colors">0400 422 802</a>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-5 h-5 text-[#f0722b] shrink-0" />
              <a href="mailto:info@technicafootball.com.au" className="hover:text-[#f0722b] transition-colors">info@technicafootball.com.au</a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="bg-[#0A1F44] text-white py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="text-[#f0722b] font-barlow font-bold text-xs tracking-widest uppercase">Upcoming Sessions</span>
            <h2 className="text-2xl font-black tracking-wide text-white mt-2">Dates: {classData.dateRange}</h2>
            <p className="text-white/60 text-sm mt-2">Total of {classData.totalSessions} sessions</p>
            <div className="flex items-center gap-2 mt-2 text-white/40 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Zone: Australian Eastern Standard Time (AEST)</span>
            </div>
            <div className="h-1 bg-[#f0722b] rounded-full w-24 mt-4" />
          </div>

          <div className="space-y-3">
            {classData.sessions.map((session, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <CalendarDays className="w-5 h-5 text-[#f0722b] shrink-0" />
                  <div>
                    <p className="font-bold text-white text-sm">{session.date}</p>
                    <p className="text-white/60 text-xs">{session.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm font-bold">{session.duration}</p>
                  <p className="text-white/40 text-xs">{session.durationLabel}</p>
                </div>
                <p className="text-[#f0722b] text-sm font-barlow font-bold tracking-wider hidden sm:block">{session.coach}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#f3f4f6] py-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black tracking-wide text-[#0A1F44] mb-4">Ready to Join?</h2>
          <p className="text-gray-600 mb-8">Secure your spot in the {classData.title} — {classData.subtitle}</p>
          <Link
            to={`/programs/term-program/book/${classData.slug}`}
            className="inline-flex items-center gap-2 bg-[#f0722b] text-white font-barlow font-bold tracking-widest uppercase px-10 py-4 rounded-xl hover:bg-[#0A1F44] transition-colors duration-300 text-sm shadow-lg"
          >
            Book Now <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
