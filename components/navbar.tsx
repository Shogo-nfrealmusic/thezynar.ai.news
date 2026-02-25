"use client";

import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import {
  IconHome,
  IconNews,
  IconCpu,
  IconRobot,
  IconDeviceMobile,
  IconTrendingUp,
} from "@tabler/icons-react";

const iconClass = "h-4 w-4 text-neutral-500 dark:text-white";

export function Navbar() {
  const navItems = [
    {
      name: "HOME",
      link: "/",
      icon: <IconHome className={iconClass} />,
    },
    {
      name: "LATEST",
      link: "/latest",
      icon: <IconNews className={iconClass} />,
    },
    {
      name: "TECH",
      link: "/tech",
      icon: <IconCpu className={iconClass} />,
    },
    {
      name: "AI",
      link: "/ai",
      icon: <IconRobot className={iconClass} />,
    },
    {
      name: "GADGET",
      link: "/gadget",
      icon: <IconDeviceMobile className={iconClass} />,
    },
    {
      name: "TREND",
      link: "/trend",
      icon: <IconTrendingUp className={iconClass} />,
    },
  ];

  return (
    <div className="relative w-full translate-z-0">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
