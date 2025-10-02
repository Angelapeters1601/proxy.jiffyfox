import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSms,
} from "react-icons/fa";
import icon from "/icon.jpg";

export default function Footer() {
  const quickLinks = [
    { text: "Services", href: "https://jiffyfox.com/services" },
    { text: "Projects", href: "https://jiffyfox.com/projects" },
    { text: "Clients", href: "https://jiffyfox.com/clients" },
    { text: "About", href: "https://jiffyfox.com/about" },
    { text: "Contact", href: "https://jiffyfox.com/contact" },
    { text: "Help", href: "https://jiffyfox.com/help" },
    { text: "Terms of service", href: "https://jiffyfox.com/terms" },
    { text: "Privacy policy", href: "https://jiffyfox.com/privacy" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook />,
      label: "Facebook",
      href: "https://facebook.com/jiffyfox",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      href: "https://twitter.com/jiffyfox",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/jiffyfox",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: "https://youtube.com/jiffyfox",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/jiffyfox",
    },
  ];

  return (
    <footer className="jiffy-bg-dark tracking-wide leading-relaxed text-gray-100 py-10 px-4 mt-12">
      <div className="container mx-auto max-w-6xl flex flex-col items-center gap-10">
        {/* Logo + Links + Socials */}
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="https://jiffyfox.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icon}
                alt="jiffyfox logo"
                className="w-12 h-12 rounded-full shadow-lg shadow-purple-600 object-contain bg-white p-1 hover:scale-105 transition-transform"
              />
            </a>
            <h3 className="text-xl font-bold">JiffyFox</h3>
          </div>

          {/* Quick Links */}
          <div className="w-full max-w-3xl border border-purple-400 rounded-lg p-4">
            <h4 className="font-semibold text-center mb-3">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-purple-300 transition-colors text-sm whitespace-nowrap"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-4 flex-wrap justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 transition-colors text-2xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 text-center">
          {/* Phone */}
          <div className="flex items-center gap-2 group">
            <FaPhone className="text-white group-hover:text-purple-300 transition-colors duration-200" />
            <span className="font-semibold">Call:</span>
            <a
              href="tel:+12026706164"
              className="text-white hover:text-purple-300 transition-colors duration-200 hover:underline underline-offset-2"
            >
              (202) 670-6164
            </a>
          </div>

          {/* SMS */}
          <div className="flex items-center gap-2 group">
            <FaSms className="text-white group-hover:text-purple-300 transition-colors duration-200" />
            <span className="font-semibold">Text:</span>
            <a
              href="sms:+13027037500"
              className="text-white hover:text-purple-300 transition-colors duration-200 hover:underline underline-offset-2"
            >
              (302) 703-7500
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 group">
            <FaEnvelope className="text-white group-hover:text-purple-300 transition-colors duration-200" />
            <span className="font-semibold">Email:</span>
            <a
              href="mailto:help@jiffyfox.com"
              className="text-white hover:text-purple-300 transition-colors duration-200 hover:underline underline-offset-2"
            >
              help@jiffyfox.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 group">
            <FaMapMarkerAlt className="text-white group-hover:text-purple-300 transition-colors duration-200" />
            <span className="font-semibold">Address:</span>
            <p className="text-sm">1 JiffyFox Way, Edgemoor, DE 19809</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full border-t border-purple-400/20 pt-6 text-center">
          <p className="text-sm tracking-wide">
            &copy; {new Date().getFullYear()} JiffyFox Corporation. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
