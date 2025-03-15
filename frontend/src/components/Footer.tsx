import { FaFacebook, FaInstagram, FaTimesCircle } from "react-icons/fa";
import { MdPhone, MdEmail } from "react-icons/md";

const FRONT_URL = "https://vigilant-halibut-gvj64vj9prw394p-5173.app.github.dev/";

const Footer = () => {
  return (
    <footer className="w-full bg-[#5B654F] text-white py-6 px-6 md:px-12">
      <div className="container ml-20 mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Left Section - Logo & Socials */}
        <div className="max-w-xs">
          <h2 className="text-lg font-bold">BUKIDExplorer</h2>
          <p className="!text-white text-sm mt-2">\
            Experience the breathtaking landscapes and rich cultural heritage of the highland paradise of the Philippines.
          </p>
          <div className="flex gap-4 mt-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-gray-300" />
            <FaInstagram className="cursor-pointer hover:text-gray-300" />
            <FaTimesCircle className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="font-semibold text-md mb-2">Quick Links</h3>
          <ul className="text-sm space-y-1">
            <li><a href={`${FRONT_URL}`} className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Destinations</a></li>
            <li><a href={`${FRONT_URL}nature`} className="hover:underline">Nature Escapes</a></li>
            <li><a href={`${FRONT_URL}thrilling-adventures`} className="hover:underline">Thrilling Adventures</a></li>
            <li><a href={`${FRONT_URL}dining`} className="hover:underline">Dining Spots</a></li>
          </ul>
        </div>

        {/* Middle Section - Resources */}
        <div>
          <h3 className="font-semibold text-md mb-2">Resources</h3>
          <ul className="text-sm space-y-1">
            <li><a href={`${FRONT_URL}facts`} className="hover:underline">FAQs</a></li>
            <li><a href={`${FRONT_URL}about`} className="hover:underline">About Us</a></li>
            <li><a href={`${FRONT_URL}privacy`} className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Section - Contact */}
        <div>
          <h3 className="font-semibold text-md mb-2">Get In Touch</h3>
          <div className="flex items-center gap-2 text-sm">
            <MdPhone className="text-lg" />
            <span>09123456789</span>
          </div>
          <div className="flex items-center gap-2 text-sm mt-2">
            <MdEmail className="text-lg" />
            <span>BukidnonExplorer@gmail.com</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-gray-400 text-center text-xs mt-6 pt-4">
        Copyright © 2025 BUKIDExplorer. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
