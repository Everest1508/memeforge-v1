import { Metadata } from "next";

export const metadata = {
  title: "Terms and Conditions",
  description: "The Terms and Conditions page for our service.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white font-[Inter] pt-28">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 font-[SpaceComic] drop-shadow-[2px_2px_0px_#000]">Terms and Conditions</h1>
        <p className="text-xl text-gray-500">Effective Date: 27-04-2025</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">1. Acceptance of Terms</h2>
        <p className="text-base text-gray-600">
          By accessing or using our services, you agree to comply with these terms and conditions. If you do not agree to these terms, you may not use our services.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">2. Changes to Terms</h2>
        <p className="text-base text-gray-600">
          We may update these terms and conditions from time to time. Any changes will be posted on this page, and the updated date will be reflected at the top of the page.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">3. User Responsibilities</h2>
        <p className="text-base text-gray-600">
          As a user of our services, you agree to:
          <ul className="list-disc pl-5">
            <li>Provide accurate and up-to-date information.</li>
            <li>Respect the rights of others while using our services.</li>
            <li>Not engage in any unlawful or harmful activity.</li>
          </ul>
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">4. Account and Security</h2>
        <p className="text-base text-gray-600">
          You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">5. Privacy and Data Collection</h2>
        <p className="text-base text-gray-600">
          We collect and process personal data as outlined in our Privacy Policy. By using our services, you consent to the collection and use of your data in accordance with our Privacy Policy.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">6. Termination</h2>
        <p className="text-base text-gray-600">
          We reserve the right to suspend or terminate your access to our services if you violate these terms or engage in harmful activities.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">7. Limitation of Liability</h2>
        <p className="text-base text-gray-600">
          We are not liable for any direct or indirect damages resulting from the use of our services. Our liability is limited to the maximum extent permitted by law.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">8. Governing Law</h2>
        <p className="text-base text-gray-600">
          These terms will be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law principles.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
        <p className="text-base text-gray-600">
          If you have any questions about these terms, please contact us at:
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
          className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 drop-shadow-[2px_2px_0px_#000]"
        >
          Close
        </a>
      </div>
    </div>
  );
}
