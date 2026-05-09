import PageHero from '../components/PageHero';

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" bottomColor="#ffffff" />

      <section className="relative bg-white text-[#0A1F44] pt-16 pb-40 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 font-barlow tracking-widest uppercase mb-12">Last updated September 24, 2023</p>

          <div className="prose prose-lg max-w-none space-y-10 text-gray-700 leading-relaxed">

            <p>
              This privacy notice for Technica Football ('we', 'us', or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visit our website at <a href="http://www.technicafootball.com.au" target="_blank" rel="noopener noreferrer" className="text-[#f0722b] hover:underline">http://www.technicafootball.com.au</a>, or any website of ours that links to this privacy notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            <p>
              Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:technicafootballnsw@gmail.com" className="text-[#f0722b] hover:underline">technicafootballnsw@gmail.com</a>.
            </p>

            <Section number="1" title="WHAT INFORMATION DO WE COLLECT?">
              <p className="font-semibold text-[#0A1F44] mb-3">Personal information you disclose to us</p>
              <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
              <p className="mt-4"><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>names</li>
                <li>phone numbers</li>
                <li>email addresses</li>
                <li>usernames</li>
              </ul>
              <p className="mt-4"><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
              <p className="mt-4"><strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is stored by Stripe. You may find their privacy notice link(s) here: <a href="https://stripe.com/en-au/privacy" target="_blank" rel="noopener noreferrer" className="text-[#f0722b] hover:underline">https://stripe.com/en-au/privacy</a>.</p>
              <p className="mt-4"><strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called 'HOW DO WE HANDLE YOUR SOCIAL LOGINS?' below.</p>
              <p className="mt-4">All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
            </Section>

            <Section number="2" title="HOW DO WE PROCESS YOUR INFORMATION?">
              <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see 'WHAT ARE YOUR PRIVACY RIGHTS?' below.</li>
                <li><strong>To post testimonials.</strong> We post testimonials on our Services that may contain personal information.</li>
                <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                <li><strong>To evaluate and improve our Services, products, marketing, and your experience.</strong> We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</li>
                <li><strong>To comply with our legal obligations.</strong> We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</li>
              </ul>
            </Section>

            <Section number="3" title="WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?">
              <p>We may need to share your personal information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>When we use Google Maps Platform APIs.</strong> We may share your information with certain Google Maps Platform APIs (e.g. Google Maps API, Places API).</li>
              </ul>
            </Section>

            <Section number="4" title="DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?">
              <p><em>In Short: We may use cookies and other tracking technologies to collect and store your information.</em></p>
              <p className="mt-3">We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
            </Section>

            <Section number="5" title="HOW DO WE HANDLE YOUR SOCIAL LOGINS?">
              <p>Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.</p>
              <p className="mt-3">We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.</p>
            </Section>

            <Section number="6" title="HOW LONG DO WE KEEP YOUR INFORMATION?">
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
              <p className="mt-3">When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
            </Section>

            <Section number="7" title="DO WE COLLECT INFORMATION FROM MINORS?">
              <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:technicafootballnsw@gmail.com" className="text-[#f0722b] hover:underline">technicafootballnsw@gmail.com</a>.</p>
            </Section>

            <Section number="8" title="WHAT ARE YOUR PRIVACY RIGHTS?">
              <p><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
              <p className="mt-3">However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
              <p className="mt-4"><strong>Opting out of marketing and promotional communications:</strong> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</p>
              <p className="mt-4 font-semibold text-[#0A1F44]">Account Information</p>
              <p className="mt-2">If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Log in to your account settings and update your user account.</li>
                <li>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</li>
              </ul>
              <p className="mt-4"><strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.</p>
              <p className="mt-4">If you have questions or comments about your privacy rights, you may email us at <a href="mailto:technicafootballnsw@gmail.com" className="text-[#f0722b] hover:underline">technicafootballnsw@gmail.com</a>.</p>
            </Section>

            <Section number="9" title="CONTROLS FOR DO-NOT-TRACK FEATURES">
              <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
            </Section>

            <Section number="10" title="DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?">
              <p>We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 (Privacy Act).</p>
              <p className="mt-3">This privacy notice satisfies the notice requirements defined in the Privacy Act, in particular: what personal information we collect from you, from which sources, for which purposes, and other recipients of your personal information.</p>
              <p className="mt-3">If you do not wish to provide the personal information necessary to fulfill their applicable purpose, it may affect our ability to provide our services, in particular:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>offer you the products or services that you want</li>
                <li>respond to or help with your requests</li>
                <li>manage your account with us</li>
                <li>confirm your identity and protect your account</li>
              </ul>
              <p className="mt-4">At any time, you have the right to request access to or correction of your personal information. You can make such a request by contacting us by using the contact details provided in the section 'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?'</p>
              <p className="mt-4">If you believe we are unlawfully processing your personal information, you have the right to submit a complaint about a breach of the Australian Privacy Principles to the Office of the Australian Information Commissioner.</p>
            </Section>

            <Section number="11" title="DO WE MAKE UPDATES TO THIS NOTICE?">
              <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated 'Revised' date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
            </Section>

            <Section number="12" title="HOW CAN YOU CONTACT US ABOUT THIS NOTICE?">
              <p>If you have questions or comments about this notice, you may email us at <a href="mailto:technicafootballnsw@gmail.com" className="text-[#f0722b] hover:underline">technicafootballnsw@gmail.com</a>.</p>
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
      <div className="pl-5 space-y-3 text-gray-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
