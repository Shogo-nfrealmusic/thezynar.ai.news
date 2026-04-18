"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
} from "@tabler/icons-react";

const footerLinks = {
  categories: [
    { name: "Latest", href: "/latest" },
    { name: "Tech", href: "/tech" },
    { name: "AI", href: "/ai" },
    { name: "Gadget", href: "/gadget" },
    { name: "Trend", href: "/trend" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Advertise", href: "/advertise" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { name: "X", href: "https://x.com", icon: IconBrandX },
  { name: "Instagram", href: "https://instagram.com", icon: IconBrandInstagram },
  { name: "YouTube", href: "https://youtube.com", icon: IconBrandYoutube },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo & description */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="thezynar.ai"
                width={240}
                height={64}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              A next-generation tech media delivering the latest in technology, AI, and gadget news. Stay ahead of the future with daily updates.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">Newsletter</h4>
              <p className="mt-1.5 text-xs text-neutral-500">
                Get the latest news delivered to your inbox
              </p>
              <form className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <IconMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-sm border border-neutral-800 bg-neutral-900 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-600 transition-colors focus:border-green-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-sm bg-green-500 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-green-400"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-neutral-400">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-neutral-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-widest text-neutral-400">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-green-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-neutral-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-neutral-600">
              © {currentYear} thezynar.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-800 bg-neutral-900 text-neutral-500 transition-all hover:border-green-500/50 hover:text-green-400"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
