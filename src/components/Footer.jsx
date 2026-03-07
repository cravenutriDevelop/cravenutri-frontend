import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../assets/frontend_assets/logo.png";

const Footer = () => {

  const socialIcons = [
    { Icon: FaInstagram, link: "https://www.instagram.com/cravenutri/" },
    { Icon: FaFacebookF, link: "https://www.facebook.com/profile.php?id=61583708367018" },
    { Icon: FaYoutube, link: "https://www.youtube.com/channel/UCW6lVgmjkruB9DoV10Mq5iQ" },
    { Icon: FaXTwitter, link: "https://x.com/cravenutri" },
    { Icon: FaLinkedin, link: "https://www.linkedin.com/company/cravenutri/" },
    { Icon: FaEnvelope, link: "mailto:official@cravenutri.com" },
  ];

  const companyLinks = [
    { name: "About", path: "/about" },
    { name: "Our Team", path: "/team" },
    { name: "Shop", path: "/collection" },
  ];

  const supportLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping", path: "/shipping-policy" },
  ];

  const legalLinks = [
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-800">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <img src={logo} alt="CraveNutri" className="h-10 mb-4" />

            <p className="text-sm text-gray-500 leading-relaxed">
              Where cravings meet nutrition.  
              Healthy, natural snacks crafted for everyday energy.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              {socialIcons.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-amber-500 hover:text-black transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-amber-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-amber-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="hover:text-amber-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CraveNutri. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;