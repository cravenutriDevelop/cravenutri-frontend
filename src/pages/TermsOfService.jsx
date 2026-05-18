import Title from "../components/Title";
import SEO from "../components/SEO";

const TermsOfService = () => {

  const sections = [
    {
      title: "1. Online Store Terms",
      text: "By using this website you confirm that you are at least the legal age in your jurisdiction. Our products may not be used for any illegal or unauthorized purpose."
    },
    {
      title: "2. General Conditions",
      text: "We reserve the right to refuse service to anyone at any time. You may not copy, reproduce, sell or exploit any part of our service without written permission."
    },
    {
      title: "3. Accuracy of Information",
      text: "Information on this site is provided for general purposes only. We do not guarantee that all information is complete, accurate or current."
    },
    {
      title: "4. Modifications to Services",
      text: "Prices and services may change without notice. We reserve the right to modify or discontinue any product or service at any time."
    },
    {
      title: "5. Products",
      text: "Some products may be available exclusively online. We reserve the right to limit quantities and discontinue products without prior notice."
    },
    {
      title: "6. Billing & Account Information",
      text: "You agree to provide accurate and complete purchase and account information for all transactions made through our store."
    },
    {
      title: "7. Third-Party Tools",
      text: "We may provide access to third-party tools which we do not control. Use of such tools is entirely at your own risk."
    },
    {
      title: "8. Third-Party Links",
      text: "Our site may contain links to third-party websites. We are not responsible for their content, policies, or practices."
    },
    {
      title: "9. User Feedback",
      text: "Any suggestions, ideas, or feedback submitted to us may be used freely by CraveNutri without obligation or compensation."
    },
    {
      title: "10. Personal Information",
      text: "Your personal information submitted through the website is governed by our Privacy Policy."
    },
    {
      title: "11. Errors & Updates",
      text: "Occasionally there may be typographical errors or inaccuracies. We reserve the right to correct or update information without prior notice."
    },
    {
      title: "12. Prohibited Uses",
      text: "You may not use our site for unlawful activities, harassment, malware distribution, phishing, or collecting personal data without consent."
    },
    {
      title: "13. Limitation of Liability",
      text: "CraveNutri will not be liable for any direct, indirect, or consequential damages resulting from the use of our website or products."
    },
    {
      title: "14. Governing Law",
      text: "These Terms of Service are governed by the laws of India."
    },
    {
      title: "15. Changes to Terms",
      text: "We may update these Terms at any time. Continued use of the website means you accept the updated terms."
    }
  ];

  return (
    <>
      <SEO
        title="Terms of Service | CraveNutri"
        description="Read the terms and conditions for using CraveNutri services, website, and products."
        url="https://cravenutri.com/terms-of-service"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <div className="bg-[#FFFBF7] min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="flex justify-center mb-12">
            <h1 className="sr-only">Terms of Service – CraveNutri</h1>
            <Title text1={"Terms of"} text2={"Service"} />
          </div>

          <p className="text-gray-600 text-center mb-12">
            These Terms of Service govern your use of the CraveNutri website and
            the purchase of our products. By accessing this site, you agree to
            these terms.
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.text}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Contact Information
            </h2>

            <p className="text-gray-600 mb-4">
              If you have any questions regarding these Terms of Service,
              please contact us:
            </p>

            <div className="text-gray-600 space-y-1">
              <p><strong>Company:</strong> CraveNutri</p>
              <p><strong>Email:</strong> support@cravenutri.com</p>
              <p><strong>Phone:</strong> +91-XXXXXXXXXX</p>
              <p><strong>Address:</strong> India</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TermsOfService;