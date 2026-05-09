import PageHero from '../components/PageHero';

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" bottomColor="#ffffff" />

      <section className="relative bg-white text-[#0A1F44] pt-16 pb-40 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 font-barlow tracking-widest uppercase mb-4">Terms and Conditions for Technica Football</p>
          <p className="text-sm text-gray-400 font-barlow tracking-widest uppercase mb-12">Last Updated: 17/02/2026</p>

          <div className="space-y-3 text-gray-700 leading-relaxed mb-10">
            <p>
              These Terms and Conditions ("Agreement") govern your participation in soccer coaching services ("Services") provided by Technica Football ("Company," "we," "us," or "our"). By booking or attending any session, you agree to comply with and be bound by this Agreement.
            </p>
          </div>

          <div className="space-y-10">

            <Section number="1" title="Booking and Payments">
              <SubSection id="1.1" heading="Booking">
                All sessions must be booked in advance through our website or by direct communication with us. We recommend booking early to ensure availability.
              </SubSection>
              <SubSection id="1.2" heading="Payment">
                Payment for all coaching sessions must be made at the time of booking, or as otherwise agreed. Payments can be made via website payment or bank transfer.
              </SubSection>
              <SubSection id="1.3" heading="Pricing">
                Prices for sessions are listed on our website or communicated directly to you. Prices may be subject to change, but existing bookings will not be affected.
              </SubSection>
              <SubSection id="1.4" heading="Cancellations and Rescheduling">
                <p className="font-semibold text-[#0A1F44] mt-2 mb-1">Private Sessions:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cancellations made more than 24 hours before the scheduled session are eligible for a make-up session or refund, at the client's choice.</li>
                  <li>Cancellations made within 24 hours of the session are not eligible for a refund. A make-up session may be offered at the discretion of the head coach.</li>
                </ul>
                <p className="font-semibold text-[#0A1F44] mt-4 mb-1">Term, Preschool, Holiday Clinic, OOSH and Vacation Care Programs:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No refunds are provided for missed sessions due to illness, holidays, or other personal reasons.</li>
                  <li>Where availability permits, players may attend one make-up session per term, provided there is space in another suitable session.</li>
                  <li>Make-up sessions are not guaranteed and must be arranged in advance with Technica Football.</li>
                  <li>Make-up sessions must be used within the same term and cannot be carried over into future terms.</li>
                </ul>
              </SubSection>
              <SubSection id="1.5" heading="Refund Policy">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Refunds are not provided except in exceptional circumstances, as determined at the sole discretion of Technica Football.</li>
                  <li>Where a refund is approved, a $10 processing fee will apply.</li>
                </ul>
              </SubSection>
              <SubSection id="1.6" heading="Weather and Coach Cancellations">
                <p>Technica Football reserves the right to cancel or modify sessions due to weather conditions, venue unavailability, or coach illness.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>The format and scheduling of make-up sessions will be determined by Technica Football.</li>
                  <li>No refunds will be issued for cancelled sessions unless required under Australian Consumer Law.</li>
                </ul>
              </SubSection>
              <SubSection id="1.7" heading="Minimum Participant Numbers">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Technica Football reserves the right to cancel, reschedule, merge, or modify any session or program where minimum participant numbers are not met.</li>
                  <li>Where a session is cancelled due to insufficient numbers, participants will be offered a make-up session or credit.</li>
                  <li>Technica Football is not liable for any additional costs incurred by participants as a result of such changes.</li>
                </ul>
              </SubSection>
            </Section>

            <Section number="2" title="Session Conduct">
              <SubSection id="2.1" heading="Session Timeliness">
                Please arrive on time for your scheduled session. Late arrivals will not be extended and will forfeit that session's full value.
              </SubSection>
              <SubSection id="2.2" heading="Attire">
                All participants should wear appropriate soccer gear, including comfortable sportswear, soccer boots, and shin guards. Technica Football is not responsible for any injury resulting from inadequate or improper attire.
              </SubSection>
              <SubSection id="2.3" heading="Behavior">
                We expect all participants to conduct themselves respectfully. Technica Football reserves the right to remove any participant from a session who engages in disruptive or unsafe behavior. Refunds will not be provided in such cases.
              </SubSection>
            </Section>

            <Section number="3" title="Liability and Health">
              <SubSection id="3.1" heading="Physical Condition">
                By participating in our coaching sessions, you confirm that you or your child are physically fit to do so. It is your responsibility to inform Technica Football of any pre-existing medical conditions or injuries that may affect your ability to participate.
              </SubSection>
              <SubSection id="3.2" heading="Medical Conditions">
                Participants with medical conditions must notify us prior to attending sessions and ensure they have the relevant necessary medication with them at all times during training.
              </SubSection>
              <SubSection id="3.3" heading="Injury and Risk">
                Participation in football training involves inherent risks. To the extent permitted by law, Technica Football is not liable for any injury, loss, or damage sustained during sessions. All participants take part at their own risk.
              </SubSection>
              <SubSection id="3.4" heading="Emergency Services">
                If an ambulance or emergency medical services are called during a session, the Company is not liable for any associated costs.
              </SubSection>
            </Section>

            <Section number="4" title="Use of Personal Data">
              <SubSection id="4.1" heading="Data Collection">
                We collect personal data for the purpose of booking, billing, and providing Services. We respect your privacy and handle your data in accordance with applicable privacy laws.
              </SubSection>
              <SubSection id="4.2" heading="Communication">
                <p>By booking a session, you agree to receive communication from us, including reminders, updates, and promotional materials.</p>
                <p className="mt-1">You may opt out of promotional communications at any time.</p>
              </SubSection>
            </Section>

            <Section number="5" title="Intellectual Property">
              <SubSection id="5.1" heading="Content Ownership">
                All materials (e.g., videos, coaching drills, training plans) provided by Technica Football are proprietary and may not be reproduced or distributed without prior written consent from the Company.
              </SubSection>
            </Section>

            <Section number="6" title="Amendments and Updates">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football reserves the right to modify or update these Terms and Conditions at any time. Any changes will be communicated to clients and will take effect immediately upon posting on our website.
              </p>
            </Section>

            <Section number="7" title="Player and Parent Expectations">
              <SubSection id="7.1" heading="Player Expectations">
                <p className="mb-2">As a participant in our soccer programs, players are expected to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Follow Instructions:</strong> Listen to and follow the guidance of coaches and staff at all times.</li>
                  <li><strong>Show Respect:</strong> Demonstrate respect for coaches, teammates, opponents, and others on the field. Disruptive or disrespectful behavior will not be tolerated.</li>
                  <li><strong>Maintain a Positive Attitude:</strong> Exhibit sportsmanship and a positive attitude, both during practice and games.</li>
                  <li><strong>Commit to Participation:</strong> Attend scheduled sessions on time and participate to the best of their ability. Consistent attendance is key to improvement.</li>
                  <li><strong>Wear Proper Attire:</strong> Come dressed in appropriate sportswear, including soccer boots and shin guards. Players should also bring water and any other required equipment.</li>
                  <li><strong>Focus on Safety:</strong> Abide by all safety rules provided by the coaches and staff. This includes using equipment correctly and reporting any discomfort or injury immediately.</li>
                  <li><strong>No Physical or Verbal Abuse:</strong> Players must refrain from using any form of physical aggression, bullying, or inappropriate language during any session or event.</li>
                </ul>
              </SubSection>
              <SubSection id="7.2" heading="Parent/Guardian Expectations">
                <p className="mb-2">Parents or guardians of players are expected to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Support and Encourage:</strong> Encourage your child's participation and development in a positive and supportive manner. Avoid any negative comments or actions towards players, coaches, or officials.</li>
                  <li><strong>Ensure Punctuality:</strong> Ensure your child arrives on time for their scheduled sessions. Late arrivals may result in missed participation or forfeited time.</li>
                  <li><strong>Maintain Open Communication:</strong> Keep communication lines open with the coaching staff. If your child has any special needs or medical concerns, please inform us ahead of time.</li>
                  <li><strong>Respect Coaching Decisions:</strong> Allow the coaches to manage the sessions and make decisions regarding player participation. Any concerns about coaching or the program should be addressed privately and professionally with the coaching staff, not during sessions.</li>
                  <li><strong>Provide Proper Equipment:</strong> Ensure your child has the necessary attire (including shin guards and soccer boots) for each session. Be sure they are properly equipped for safety and comfort.</li>
                  <li><strong>Health and Safety:</strong> Ensure your child is physically fit to participate and inform us of any health concerns or medical conditions that may impact their ability to engage in physical activity.</li>
                  <li><strong>Pick Up on Time:</strong> Be prompt in picking up your child after the session. Coaches are not responsible for supervising children outside of scheduled session times. Late fees of $15 apply for every 15 minutes (or part thereof) after session completion.</li>
                </ul>
              </SubSection>
              <SubSection id="7.3" heading="Failure to Meet Expectations">
                Failure to meet or adhere to any of these expectations, or breach of any part of this Agreement, may result in the suspension or cancellation of a player's participation in our sessions. No refund will be provided in such cases.
              </SubSection>
            </Section>

            <Section number="8" title="Photography and Media">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football may take photographs or videos during sessions for promotional and marketing purposes, including use on social media and our website.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                By participating, you consent to the use of such images unless you notify us in writing prior to the session.
              </p>
            </Section>

            <Section number="9" title="Force Majeure">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football shall not be liable for any failure or delay in performing its obligations where such failure or delay is due to events beyond its reasonable control, including but not limited to extreme weather conditions, natural disasters, government restrictions, pandemics, venue closures, or other unforeseen circumstances.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                In such cases, Technica Football may reschedule affected sessions or provide credit at its discretion.
              </p>
            </Section>

            <Section number="10" title="Governing Law">
              <p className="text-gray-700 leading-relaxed pl-5">
                These Terms and Conditions are governed by the laws of New South Wales, Australia.
              </p>
            </Section>

            <Section number="11" title="Contact Information">
              <p className="text-gray-700 leading-relaxed pl-5 mb-4">
                For questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="pl-5 space-y-1 text-gray-700">
                <p>Email: <a href="mailto:info@technicafootball.com.au" className="text-[#f0722b] hover:underline">info@technicafootball.com.au</a></p>
                <p>Phone: <a href="tel:0400422802" className="text-[#f0722b] hover:underline">0400 422 802</a></p>
              </div>
            </Section>

          </div>
        </div>
      </section>
    </>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="pt-4">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-1 shrink-0 self-stretch bg-[#f0722b] rounded-full mt-1" />
        <h2 className="font-barlow font-bold uppercase tracking-wide text-lg text-[#0A1F44]">
          {number}. {title}
        </h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function SubSection({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <div className="pl-5">
      <p className="font-semibold text-[#0A1F44] mb-2">
        <span className="text-[#f0722b] mr-1">{id}</span> {heading}:
      </p>
      <div className="text-gray-700 leading-relaxed space-y-1">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>
    </div>
  );
}
