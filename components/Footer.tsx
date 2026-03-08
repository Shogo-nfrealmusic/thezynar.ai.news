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
    <footer className="relative bg-neutral-950 border-t border-neutral-800">
      {/* グラデーションライン */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* 上部セクション */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* ロゴ & 説明 */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="thezynar.ai"
                width={360}
                height={96}
                className="h-10 w-auto sm:h-12"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              A next-generation tech media delivering the latest in technology, AI, and gadget news. Stay ahead of the future with daily updates.
            </p>

            {/* ニュースレター */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white">Newsletter</h4>
              <p className="mt-2 text-xs text-neutral-500">
                Get the latest news delivered to your inbox
              </p>
              <form className="mt-3 flex gap-2">
                <div className="relative flex-1">
                  <IconMail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-2.5 pl-10 pr-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm text-neutral-500">
              © {currentYear} thezynar.ai. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
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
