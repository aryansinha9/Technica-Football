import PageHero from '../components/PageHero';

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" bottomColor="#ffffff" />

      <section className="relative bg-white text-[#0A1F44] pt-16 pb-40 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 font-barlow tracking-widest uppercase mb-4">Terms and Conditions for Technica Football</p>
          <p className="text-sm text-gray-400 font-barlow tracking-widest uppercase mb-12">Last Updated: 23/08/2026</p>

          <div className="space-y-3 text-gray-700 leading-relaxed mb-10">
            <p>
              These Terms and Conditions ("Terms") govern your participation in the soccer coaching and development services ("Services") provided by Technica Football ("Technica", "we", "us" or "our").
            </p>
            <p>
              By booking, registering for, paying for, or attending any Technica Football session or program, you acknowledge that you have read, understood and agree to be bound by these Terms.
            </p>
            <p>
              For the purposes of these Terms, Services include the Technica Football Term Program, Private Sessions, Vacation Care, Holiday Clinic, Academy Development Squad and Club Technical Training.
            </p>
          </div>

          <div className="space-y-10">

            <Section number="1" title="Booking, Payments and Cancellations">
              <SubSection id="1.1" heading="Booking">
                All Services must be booked or registered for in advance through the Technica Football website or another approved booking method. Places are subject to availability, and Technica may limit participant numbers where necessary for safety, coaching standards or session quality.
              </SubSection>
              <SubSection id="1.2" heading="Parent/Guardian Authority and Consent">
                Where a participant is under 18, the person making the booking confirms they are the participant's parent, legal guardian or otherwise authorised to provide consent. By registering a participant, the parent/guardian agrees to these Terms on their behalf and confirms all information provided is accurate and complete.
              </SubSection>
              <SubSection id="1.3" heading="Payment">
                Payment must be made at the time of booking or registration unless otherwise agreed with Technica. Payments may be made through the Technica Football website, bank transfer or another approved payment method. Bookings are not confirmed until payment has been received or an alternative arrangement has been agreed.
              </SubSection>
              <SubSection id="1.4" heading="Pricing">
                Current prices are published on the Technica Football website or communicated directly to clients. Technica reserves the right to change pricing at any time. Price changes will not affect confirmed and paid bookings unless otherwise communicated.
              </SubSection>
              <SubSection id="1.5" heading="Cancellations and Rescheduling">
                <p className="font-semibold text-[#0A1F44] mt-2 mb-1">Private Sessions:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cancellations made more than 24 hours before the scheduled session are eligible for either a make-up session or refund, at the client's choice.</li>
                  <li>Cancellations made within 24 hours are not eligible for a refund. A make-up session may be offered at Technica's discretion.</li>
                  <li>Failure to attend without notice will be treated as a late cancellation and will not ordinarily be eligible for a refund or make-up session.</li>
                </ul>
                <p className="font-semibold text-[#0A1F44] mt-4 mb-1">Term Program, Academy Development Squad, Club Technical Training, Vacation Care and Holiday Clinic:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No refunds are provided for individual sessions missed due to illness, holidays, personal commitments or other participant-related reasons.</li>
                  <li>Where availability permits, Technica may allow one make-up session per term in another suitable session.</li>
                  <li>Make-up sessions must be arranged in advance, are subject to availability and must be completed within the same term.</li>
                  <li>Make-up sessions cannot be transferred to a future term and are not guaranteed.</li>
                </ul>
                <p className="mt-4">Specific cancellation conditions may apply to individual programs, events, tournaments or holiday activities and will be communicated during registration where applicable.</p>
              </SubSection>
              <SubSection id="1.6" heading="Refund Policy">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Except where otherwise specified in these Terms, agreed by Technica or required under Australian Consumer Law, refunds are not generally provided after a booking or registration has been confirmed.</li>
                  <li>Refund requests may be considered by Technica in exceptional circumstances.</li>
                  <li>Where a refund is approved, a $10 processing fee may apply.</li>
                  <li>Nothing in these Terms excludes, restricts or modifies any rights or remedies that cannot lawfully be excluded under Australian Consumer Law.</li>
                </ul>
              </SubSection>
              <SubSection id="1.7" heading="Weather, Venue and Coach Cancellations">
                <p>Technica may cancel, postpone, reschedule or modify a session or program due to circumstances including severe weather, venue closure or unavailability, coach illness, safety concerns, government restrictions or other circumstances outside Technica's reasonable control.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Where a session is cancelled by Technica, a make-up session, credit or other appropriate arrangement may be offered.</li>
                  <li>The format and scheduling of make-up sessions will be determined by Technica.</li>
                  <li>Where a refund or other remedy is required under Australian Consumer Law, Technica will provide the applicable remedy.</li>
                </ul>
              </SubSection>
              <SubSection id="1.8" heading="Minimum Participant Numbers">
                <p>Technica may cancel, reschedule, merge or modify a session or program where minimum participant numbers are not met.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Where a program is cancelled due to insufficient numbers, affected participants will be offered an appropriate make-up session, credit or other arrangement.</li>
                  <li>Technica is not responsible for additional costs incurred by participants as a result of such changes, except where otherwise required by law.</li>
                </ul>
              </SubSection>
            </Section>

            <Section number="2" title="Program-Specific Conditions">
              <SubSection id="2.1" heading="Term Program">
                <p>The Term Program operates according to the schedule and structure published for the relevant term.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Participants are expected to attend consistently and arrive prepared and on time.</li>
                  <li>Term fees cover the relevant program period and do not entitle participants to refunds for individual missed sessions, subject to rights under Australian Consumer Law.</li>
                </ul>
              </SubSection>
              <SubSection id="2.2" heading="Private Sessions">
                <p>Private Sessions are individually scheduled and subject to availability.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>The session length, location, price and other conditions will be confirmed at booking.</li>
                  <li>Rescheduling is subject to Section 1.5.</li>
                </ul>
              </SubSection>
              <SubSection id="2.3" heading="Vacation Care">
                <p>Vacation Care may operate under different schedules, locations and supervision arrangements from regular Technica sessions.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Drop-off, pick-up, activity and supervision requirements will be communicated during registration.</li>
                  <li>Parents/guardians must provide accurate medical and emergency contact information before attendance.</li>
                  <li>Participants must remain within designated activity areas and follow all instructions from Technica coaches and staff.</li>
                  <li>Parents/guardians must follow all applicable drop-off and collection requirements.</li>
                </ul>
              </SubSection>
              <SubSection id="2.4" heading="Holiday Clinic">
                <p>Holiday Clinics may include coaching activities, games, competitions and other football-related activities.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Session times, locations and requirements will be communicated during registration.</li>
                  <li>Activities may be modified due to weather, venue conditions, safety concerns or other circumstances outside Technica's reasonable control.</li>
                </ul>
              </SubSection>
              <SubSection id="2.5" heading="Academy Development Squad">
                <p>The Academy Development Squad is a development-focused program for selected players.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Participation may be subject to trials, assessments, selection criteria or invitation.</li>
                  <li>Selection does not guarantee ongoing participation or selection for any team, tournament, competition, representative program, club pathway or future Technica program.</li>
                  <li>Technica may review player attendance, behaviour, development and suitability throughout the program.</li>
                  <li>Players are expected to attend consistently, participate positively, follow coaching instructions and demonstrate respect towards coaches, teammates, opponents, officials and other participants.</li>
                  <li>Additional fees for tournaments, competitions, uniforms, registration or other activities will be communicated separately where applicable.</li>
                  <li>Technica may suspend or end a player's participation where their behaviour, attendance, conduct or other circumstances are inconsistent with program expectations.</li>
                </ul>
              </SubSection>
              <SubSection id="2.6" heading="Club Technical Training">
                <p>Club Technical Training is a technical football development service delivered by Technica in partnership with a participating football club or organisation.</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Structure, schedule, location, age groups and payment arrangements will be communicated during registration or through the relevant club partnership.</li>
                  <li>Fees may be paid by the club, individual players or another agreed party.</li>
                  <li>Participants must follow reasonable instructions from Technica and the participating club, including venue and safety requirements.</li>
                  <li>Club Technical Training complements a player's existing football development and does not replace regular club training or competition unless otherwise agreed.</li>
                  <li>Changes to club schedules, venue availability or club operations may affect sessions. Technica will communicate material changes where reasonably possible.</li>
                </ul>
              </SubSection>
              <SubSection id="2.7" heading="No Guarantee of Sporting Outcomes">
                <p>Technica provides coaching, training and player development services but does not guarantee any particular sporting outcome, including a specific level of improvement, performance, selection, team placement, competition result, representative selection, academy selection or other sporting achievement.</p>
                <p className="mt-2">Player development may be affected by factors including attendance, effort, ability, age, experience, physical development, attitude and circumstances outside Technica's reasonable control.</p>
              </SubSection>
            </Section>

            <Section number="3" title="Session Conduct, Safety and Property">
              <SubSection id="3.1" heading="Session Timeliness">
                Participants should arrive a few minutes before their scheduled session to allow time to prepare. Late arrivals will not ordinarily result in an extension and may result in the participant forfeiting part or all of the session.
              </SubSection>
              <SubSection id="3.2" heading="Attire and Equipment">
                <p>Participants must wear appropriate football and sports attire, including where applicable:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Appropriate sports clothing;</li>
                  <li>Football boots or suitable athletic footwear;</li>
                  <li>Shin guards;</li>
                  <li>A suitable drink bottle; and</li>
                  <li>Any equipment specifically requested by Technica.</li>
                </ul>
                <p className="mt-2">Participants are responsible for ensuring their equipment is suitable and safe for use.</p>
              </SubSection>
              <SubSection id="3.3" heading="Behaviour">
                <p>Technica expects all participants to behave respectfully and safely. Technica may remove a participant from a session where they engage in disruptive, aggressive, abusive, unsafe or otherwise inappropriate behaviour.</p>
                <p className="mt-2">No refund or make-up session will ordinarily be provided where a participant is removed due to unacceptable behaviour.</p>
              </SubSection>
              <SubSection id="3.4" heading="Venue Requirements">
                <p>Participants and parents/guardians must comply with reasonable rules and directions of the venue, participating club, school, council or other organisation hosting a Technica session.</p>
                <p className="mt-2">Technica may refuse or restrict participation where venue requirements are not followed or continued participation presents a safety or operational concern.</p>
              </SubSection>
              <SubSection id="3.5" heading="Personal Property">
                Participants are responsible for their own belongings and equipment. To the extent permitted by law, Technica is not responsible for personal items that are lost, stolen or damaged during a session, program, event or activity.
              </SubSection>
            </Section>

            <Section number="4" title="Player and Parent/Guardian Expectations">
              <SubSection id="4.1" heading="Player Expectations">
                <p className="mb-2">As a participant in Technica Football programs, players are expected to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Follow Instructions:</strong> Listen to and follow reasonable instructions from coaches and staff.</li>
                  <li><strong>Show Respect:</strong> Treat coaches, teammates, opponents, officials, parents and other participants with respect.</li>
                  <li><strong>Maintain a Positive Attitude:</strong> Demonstrate good sportsmanship and a willingness to learn.</li>
                  <li><strong>Commit to Participation:</strong> Attend consistently, arrive on time and participate to the best of their ability.</li>
                  <li><strong>Wear Proper Attire:</strong> Attend with appropriate clothing, footwear, shin guards and required equipment.</li>
                  <li><strong>Focus on Safety:</strong> Follow safety instructions, use equipment correctly and report any injury, pain or discomfort to a coach.</li>
                  <li><strong>Maintain Appropriate Behaviour:</strong> Players must not engage in bullying, physical aggression, threatening behaviour, discrimination, harassment or inappropriate language.</li>
                </ul>
              </SubSection>
              <SubSection id="4.2" heading="Parent/Guardian Expectations">
                <p className="mb-2">Parents/guardians are expected to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Support and Encourage:</strong> Encourage their child's participation and development positively.</li>
                  <li><strong>Ensure Punctuality:</strong> Ensure their child arrives on time and is properly prepared.</li>
                  <li><strong>Maintain Open Communication:</strong> Inform Technica of relevant information affecting their child's participation, including injuries or medical concerns.</li>
                  <li><strong>Respect Coaching Decisions:</strong> Allow coaches to manage sessions and make appropriate participation decisions. Concerns should be raised privately and respectfully.</li>
                  <li><strong>Provide Proper Equipment:</strong> Ensure their child has suitable clothing, footwear, shin guards, water and required equipment.</li>
                  <li><strong>Health and Safety:</strong> Ensure their child is fit to participate and provide accurate and relevant health or medical information.</li>
                  <li><strong>Follow Venue Requirements:</strong> Comply with reasonable requirements of the venue, participating club or other organisation.</li>
                  <li><strong>Pick Up on Time:</strong> Ensure their child is collected promptly after the scheduled session.</li>
                  <li><strong>Provide Accurate Information:</strong> Keep registration, emergency contact, medical and other information accurate and up to date.</li>
                </ul>
              </SubSection>
              <SubSection id="4.3" heading="Late Pick-Up">
                <p>Parents/guardians must collect children promptly at the scheduled conclusion of their session.</p>
                <p className="mt-2">A $15 late pick-up fee will apply for every 15 minutes, or part thereof, that a child remains after the scheduled session completion time.</p>
                <p className="mt-2">Coaches and staff are not responsible for supervising children outside scheduled session times except where reasonably necessary while awaiting collection.</p>
                <p className="mt-2">Repeated late pick-ups may result in alternative collection arrangements being required or future participation being restricted.</p>
              </SubSection>
              <SubSection id="4.4" heading="Failure to Meet Expectations">
                <p>Failure to comply with these expectations or any other part of these Terms may result in a participant being warned, removed from a session, suspended or excluded from a program.</p>
                <p className="mt-2">Technica will consider the circumstances of each situation when determining an appropriate response.</p>
              </SubSection>
            </Section>

            <Section number="5" title="Child Safety and Safeguarding">
              <SubSection id="5.1" heading="Commitment to Child Safety">
                <p>Technica Football is committed to providing a safe, inclusive and supportive environment for children and young people.</p>
                <p className="mt-2">Technica expects all coaches, staff, contractors, participants, parents and guardians to behave appropriately and contribute to a safe environment.</p>
              </SubSection>
              <SubSection id="5.2" heading="Coach and Staff Conduct">
                <p>Technica coaches, staff and relevant personnel are expected to maintain appropriate professional boundaries and comply with applicable child safety requirements, policies and procedures.</p>
                <p className="mt-2">All coaches and other personnel required by law to hold a NSW Working With Children Check (WWCC) must hold and maintain a valid clearance before undertaking child-related work for Technica.</p>
                <p className="mt-2">Technica will also take reasonable steps to ensure relevant coaches and personnel meet applicable first aid, child safety and other training or screening requirements appropriate to their role.</p>
              </SubSection>
              <SubSection id="5.3" heading="Appropriate Behaviour">
                <p>Technica does not tolerate bullying, abuse, harassment, discrimination, threatening behaviour, inappropriate communication or other conduct that may place a child or participant at risk.</p>
                <p className="mt-2">Technica may remove or restrict any person from a session, program or venue where their conduct raises a safety or safeguarding concern.</p>
              </SubSection>
              <SubSection id="5.4" heading="Communication with Participants">
                <p>Communication with participants under 18 should generally occur through their parent/guardian or approved Technica communication channels.</p>
                <p className="mt-2">Technica may establish reasonable rules regarding communication, photography, social media, transportation, physical contact and interactions between coaches, staff and participants.</p>
              </SubSection>
              <SubSection id="5.5" heading="Reporting Concerns">
                <p>Parents, guardians, participants and other individuals are encouraged to notify Technica of any child safety or safeguarding concern as soon as reasonably possible.</p>
                <p className="mt-2">Technica will respond to concerns in accordance with applicable laws, child safety requirements and its internal policies and procedures.</p>
              </SubSection>
            </Section>

            <Section number="6" title="Health, Medical Conditions and Risk">
              <SubSection id="6.1" heading="Physical Condition">
                <p>By booking or participating in a Technica Service, the participant or their parent/guardian acknowledges that football and physical activity involve physical exertion and inherent risks.</p>
                <p className="mt-2">Participants are responsible for ensuring they are fit and able to participate.</p>
              </SubSection>
              <SubSection id="6.2" heading="Medical Conditions and Injuries">
                <p>Parents/guardians must inform Technica of relevant medical conditions, allergies, injuries, disabilities or other circumstances that may affect safe participation.</p>
                <p className="mt-2">Participants who require medication or medical equipment must have the necessary items available as appropriate.</p>
                <p className="mt-2">Parents/guardians must provide accurate and up-to-date information regarding relevant medical conditions, allergies, medications, injuries and emergency procedures.</p>
              </SubSection>
              <SubSection id="6.3" heading="Injury and Risk">
                <p>Participation in football training, games and related activities involves inherent risks, including injury.</p>
                <p className="mt-2">Participants acknowledge these risks and agree to follow reasonable safety instructions provided by Technica coaches and staff.</p>
                <p className="mt-2">To the extent permitted by law, Technica is not responsible for loss, damage or injury arising from participation in the Services, except where such liability cannot lawfully be excluded or limited.</p>
              </SubSection>
              <SubSection id="6.4" heading="Emergency Medical Assistance">
                <p>If a participant becomes injured or unwell, Technica will take reasonable steps to respond appropriately and may contact the parent/guardian or emergency services where necessary.</p>
                <p className="mt-2">Technica coaches and staff are not medical professionals and will only provide first aid or other assistance within the scope of their training, qualifications and reasonable ability.</p>
                <p className="mt-2">If an ambulance or emergency medical service is required, associated costs are the responsibility of the participant or parent/guardian, except where otherwise required by law.</p>
                <p className="mt-2">Parents/guardians authorise Technica to seek emergency medical assistance where reasonably necessary if they cannot be contacted in time.</p>
              </SubSection>
            </Section>

            <Section number="7" title="Personal Information and Communication">
              <SubSection id="7.1" heading="Collection and Use of Personal Information">
                <p>Technica collects personal information necessary to manage bookings, registrations, payments, communication, participant safety and delivery of its Services.</p>
                <p className="mt-2">Technica will handle personal information in accordance with applicable Australian privacy laws and its Privacy Policy.</p>
              </SubSection>
              <SubSection id="7.2" heading="Communication">
                <p>By booking or registering for a Technica Service, you agree to receive service-related communications, including:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Session reminders;</li>
                  <li>Schedule and venue updates;</li>
                  <li>Program information;</li>
                  <li>Weather or cancellation notices; and</li>
                  <li>Other important service information.</li>
                </ul>
                <p className="mt-2">Where consent has been provided, Technica may also send promotional or marketing communications. You may opt out of promotional communications at any time.</p>
              </SubSection>
            </Section>

            <Section number="8" title="Photography and Media">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football may photograph or record participants during sessions, games, clinics, events or other activities for promotional, educational and marketing purposes, including use on the Technica Football website, social media and other promotional materials.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                Media consent for participants under 18 will be managed separately through the registration or consent process and is not a condition of participation unless otherwise communicated for a specific activity.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                Parents/guardians may decline or withdraw media consent by notifying Technica in writing. Where consent has not been provided or has been withdrawn, Technica will take reasonable steps to avoid intentionally using identifiable images of that participant for promotional purposes.
              </p>
            </Section>

            <Section number="9" title="Intellectual Property">
              <p className="text-gray-700 leading-relaxed pl-5">
                All coaching materials, training plans, drills, videos, documents, graphics, written content, branding and other materials created or provided by Technica Football remain the property of Technica or its relevant rights holder.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                These materials may not be copied, reproduced, distributed, modified, published or commercially used without prior written permission from Technica.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                This does not prevent participants from using coaching information provided to them for their own personal football development.
              </p>
            </Section>

            <Section number="10" title="Force Majeure">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football will not be liable for failure or delay in providing Services where the failure or delay results from circumstances beyond its reasonable control, including:
              </p>
              <ul className="list-disc pl-11 space-y-1 mt-2 text-gray-700 leading-relaxed">
                <li>Extreme weather;</li>
                <li>Natural disasters;</li>
                <li>Government restrictions;</li>
                <li>Pandemics or public health restrictions;</li>
                <li>Venue closures;</li>
                <li>Power or infrastructure failures;</li>
                <li>Transport or access issues;</li>
                <li>Coach illness or unexpected unavailability; or</li>
                <li>Other unforeseen circumstances.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                Where reasonably possible, Technica will provide notice of affected sessions and may offer a rescheduled session, credit or other appropriate arrangement.
              </p>
            </Section>

            <Section number="11" title="Amendments and Updates">
              <p className="text-gray-700 leading-relaxed pl-5">
                Technica Football reserves the right to update or amend these Terms from time to time. Updated Terms will be published on the Technica Football website and will apply to future bookings and registrations.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                Where a material change affects an existing booking or ongoing program, Technica will provide reasonable notice where appropriate.
              </p>
            </Section>

            <Section number="12" title="Governing Law">
              <p className="text-gray-700 leading-relaxed pl-5">
                These Terms and Conditions are governed by the laws of New South Wales, Australia.
              </p>
              <p className="text-gray-700 leading-relaxed pl-5 mt-2">
                Nothing in these Terms is intended to exclude, restrict or modify any rights or remedies available to consumers under Australian Consumer Law or any other applicable law.
              </p>
            </Section>

            <Section number="13" title="Contact Information">
              <p className="text-gray-700 leading-relaxed pl-5 mb-4">
                For questions, concerns or requests relating to these Terms and Conditions, please contact Technica Football:
              </p>
              <div className="pl-5 space-y-1 text-gray-700">
                <p>Email: <a href="mailto:info@technicafootball.com.au" className="text-[#f0722b] hover:underline">info@technicafootball.com.au</a></p>
                <p>Phone: <a href="tel:0400422802" className="text-[#f0722b] hover:underline">0400 422 802</a></p>
                <p>Website: <a href="https://technicafootball.com.au" className="text-[#f0722b] hover:underline">technicafootball.com.au</a></p>
              </div>
              <div className="pl-5 mt-8">
                <p className="font-black text-[#0A1F44] tracking-wide">Technica Football</p>
                <p className="font-barlow font-bold tracking-widest uppercase text-[#f0722b] text-sm mt-1">Train. Develop. Achieve.</p>
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
