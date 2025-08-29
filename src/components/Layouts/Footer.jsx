import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import '../../App.css';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <h2 className="text-xl font-bold text-teal-500 flex items-center gap-2">
              <span className="text-2xl">*</span> Logo
            </h2>
            <p className="text-gray-600 mt-3 text-sm font-manrope">
              Your ultimate companion for friends, teams, and communities.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-teal-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-500">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 font-manrope">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-manrope">
              <li><a href="#" className="hover:text-teal-500 font-manrope">About Us</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Contact</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Careers</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Blog</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 font-manrope">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-manrope">
              <li><a href="#" className="hover:text-teal-500 font-manrope">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">FAQ</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Terms of Service</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3 font-manrope">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 font-manrope">
              <li><a href="#" className="hover:text-teal-500 font-manrope">Features</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">Integrations</a></li>
              <li><a href="#" className="hover:text-teal-500 font-manrope">API</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 font-manrope">
            © 2024 GroupSphere. All rights reserved.
          </p>

          {/* App Store + Play Store */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
