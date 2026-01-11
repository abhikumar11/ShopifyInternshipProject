import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const colors = {
    primary: "#008060",
    textMain: "#202223",
    textMuted: "#6d7175",
    border: "#e1e3e5",
    bgDark: "#111213" // Slightly darker than textMain for contrast
  };

  return (
    <footer className="bg-white border-t border-[#e1e3e5]">
      {/* 1. Newsletter Strip */}
      <div className="bg-[#f6f6f7] py-16 border-b border-[#e1e3e5]">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[#202223] mb-2">Join our newsletter</h2>
            <p className="text-[#6d7175] text-sm">Be the first to know about new collections and exclusive offers.</p>
          </div>
          <div className="w-full max-w-md">
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-4 py-3 rounded-lg border border-[#e1e3e5] focus:ring-2 focus:ring-[#008060] focus:outline-none text-sm"
              />
              <button className="bg-[#202223] text-white p-3 rounded-lg hover:bg-black transition-all flex items-center justify-center group">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            <p className="text-[10px] text-[#6d7175] mt-3">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#008060] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl italic">N</span>
            </div>
            <span className="text-xl font-black text-[#202223] tracking-tighter uppercase">NEXUS</span>
          </Link>
          <p className="text-[#6d7175] text-sm leading-relaxed max-w-sm">
            Elevating the standard of online commerce with precision-engineered tools for vendors and a curated experience for shoppers.
          </p>
          <div className="flex gap-4 mt-8">
            <SocialIcon icon={<Instagram size={18}/>} />
            <SocialIcon icon={<Twitter size={18}/>} />
            <SocialIcon icon={<Facebook size={18}/>} />
            <SocialIcon icon={<Youtube size={18}/>} />
          </div>
        </div>

        {/* Link Columns */}
        <FooterColumn title="Shop" links={["New Arrivals", "Best Sellers", "Sale Items", "Collections"]} />
        <FooterColumn title="Vendor" links={["Sell on Nexus", "Vendor Dashboard", "Success Stories", "API Docs"]} />
        <FooterColumn title="Support" links={["Help Center", "Shipping Policy", "Returns", "Contact Us"]} />
      </div>

      {/* 3. Bottom Bar */}
      <div className="border-t border-[#e1e3e5] py-8 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-[#6d7175] uppercase tracking-widest">
          <p>© 2026 NEXUS COMMERCE INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link className="hover:text-[#202223]">Privacy</Link>
            <Link className="hover:text-[#202223]">Terms</Link>
            <Link className="hover:text-[#202223]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-components for cleaner code
const FooterColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4">
    <h4 className="text-[12px] font-bold text-[#202223] uppercase tracking-[0.1em]">{title}</h4>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link}>
          <Link to="#" className="text-sm text-[#6d7175] hover:text-[#008060] transition-colors">{link}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 rounded-full border border-[#e1e3e5] flex items-center justify-center text-[#6d7175] hover:text-[#008060] hover:border-[#008060] transition-all">
    {icon}
  </button>
);

export default Footer;