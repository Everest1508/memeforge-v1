// app/privacy-policy/page.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our Privacy Policy page outlining the data we collect and its usage.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white font-[Melon] pt-28">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 font-[SpaceComic] drop-shadow-[2px_2px_0px_#000]">Privacy Policy</h1>
        <p className="text-xl text-gray-500">Effective Date: 27-04-2025</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
        <p className="text-base text-gray-600">
          We collect the following types of information:
        </p>
        <ul className="list-disc pl-5">
          <li>Personal Information (e.g., name, email)</li>
          <li>Usage Data (e.g., device information, interactions)</li>
          <li>Cookies and Tracking for analytics and improvements</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        <p className="text-base text-gray-600">
          We use the information to:
        </p>
        <ul className="list-disc pl-5">
          <li>Provide and maintain our services</li>
          <li>Improve user experience and app functionality</li>
          <li>Communicate with you about updates or offers</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">3. Data Security</h2>
        <p className="text-base text-gray-600">
          We use industry-standard security measures to protect your personal data, including encryption and secure servers.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">4. Your Rights</h2>
        <p className="text-base text-gray-600">
          You can request to:
        </p>
        <ul className="list-disc pl-5">
          <li>Access your personal information</li>
          <li>Correct or delete information</li>
          <li>Opt-out of communications</li>
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">5. Third-Party Links</h2>
        <p className="text-base text-gray-600">
          Our app may contain links to external websites. We are not responsible for their privacy practices. Please review their privacy policies.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">6. Children's Privacy</h2>
        <p className="text-base text-gray-600">
          Our app is not intended for children under 13. We do not knowingly collect data from children.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">7. Contact Us</h2>
        <p className="text-base text-gray-600">
          If you have any questions, please contact us at:
          <br />
          <a
            href="mailto:support@memeforge.lol"
            className="text-blue-600 hover:underline"
          >
            support@memeforge.lol
          </a>
        </p>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 drop-shadow-[2px_2px_0px_#000]"
        >
          Close
        </a>
      </div>
    </div>
  );
}
