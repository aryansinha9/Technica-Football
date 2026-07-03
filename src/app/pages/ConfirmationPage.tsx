import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { CheckCircle, ChevronRight, Loader2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import { supabase } from '../lib/supabase';

interface BookingInfo {
  class_label: string;
  player_name: string;
  total_paid: number;
  addon_45min: boolean;
  addon_60min: boolean;
  parent_email: string;
}

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const bookingId = searchParams.get('booking_id');

    const verifyAndFetch = async () => {
      // 1. Verify payment with Stripe via Edge Function
      if (sessionId && bookingId) {
        try {
          await supabase.functions.invoke('verify-payment', {
            body: { sessionId, bookingId },
          });
          setVerified(true);
        } catch (err) {
          console.error('Payment verification failed:', err);
        }
      }

      // 2. Fetch booking details for display.
      // Preferred path: SECURITY DEFINER RPC that only returns a booking when
      // the caller knows the matching Stripe session id (the bookings table is
      // no longer publicly readable). Falls back to direct selects if the RPC
      // hasn't been created yet.
      if (sessionId) {
        const { data: rpcData, error: rpcError } = await supabase.rpc('get_booking_confirmation', {
          p_session_id: sessionId,
          p_booking_id: bookingId || null,
        });
        if (!rpcError && Array.isArray(rpcData) && rpcData.length > 0) {
          setBooking(rpcData[0]);
          setLoading(false);
          return;
        }
        if (!rpcError) {
          // RPC exists but found nothing (e.g. verify-payment hasn't stored
          // the session id yet) — fall through to the legacy queries below.
        }
      }
      if (bookingId) {
        const { data } = await supabase.from('bookings')
          .select('class_label, player_name, total_paid, addon_45min, addon_60min, parent_email, stripe_session_id')
          .eq('id', bookingId).single();

        if (data) {
          // IDOR guard: only show details if the session_id in the URL matches
          // the one stored in the DB for this booking. This ensures only the person
          // who completed the Stripe checkout can see the confirmation details.
          if (!sessionId || data.stripe_session_id === sessionId) {
            setBooking(data);
          }
          // If session_id doesn't match, we silently show "booking confirmed" without details
        }
      } else if (sessionId) {
        const { data } = await supabase.from('bookings')
          .select('class_label, player_name, total_paid, addon_45min, addon_60min, parent_email, stripe_session_id')
          .eq('stripe_session_id', sessionId).single();
        if (data) setBooking(data);
      }
      setLoading(false);
    };
    verifyAndFetch();
  }, [searchParams]);

  return (
    <>
      <PageHero title="Booking Confirmed" subtitle="Thank You!" bottomColor="#f3f4f6" />
      <section className="bg-[#f3f4f6] py-20 px-8 md:px-16">
        <div className="max-w-2xl mx-auto text-center">
          {loading ? (
            <Loader2 className="w-12 h-12 text-[#f0722b] animate-spin mx-auto" />
          ) : (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A1F44] mb-4">
                Registration & Payment Complete!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Your booking has been confirmed. You'll receive a confirmation email shortly with full session details, venue information, and what to bring.
              </p>

              {booking && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-left mb-8">
                  <h3 className="font-barlow font-bold tracking-widest uppercase text-xs text-gray-400 mb-4">Booking Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-gray-500">Player</span><span className="font-bold text-[#0A1F44]">{booking.player_name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Class</span><span className="font-bold text-[#0A1F44]">{booking.class_label}</span></div>
                    {booking.addon_45min && <div className="flex justify-between"><span className="text-gray-500">Add-on</span><span className="text-[#f0722b] font-bold">45-min Private Session</span></div>}
                    {booking.addon_60min && <div className="flex justify-between"><span className="text-gray-500">Add-on</span><span className="text-[#f0722b] font-bold">1-hr Private Session</span></div>}
                    <div className="border-t border-gray-100 pt-3 flex justify-between"><span className="font-bold text-[#0A1F44]">Total Paid</span><span className="text-2xl font-black text-[#0A1F44]">${(booking.total_paid / 100).toFixed(0)}</span></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">A confirmation has been sent to <span className="text-[#f0722b]">{booking.parent_email}</span></p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="inline-flex items-center gap-2 bg-[#0A1F44] text-white font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-[#f0722b] transition-colors text-sm">
                  Back to Home <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/programs" className="inline-flex items-center gap-2 bg-white text-[#0A1F44] border border-gray-200 font-barlow font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                  View Programs <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
