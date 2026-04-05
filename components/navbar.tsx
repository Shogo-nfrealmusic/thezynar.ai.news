import { FloatingNav, type NavUser } from "@/components/ui/floating-navbar";
import { getUser } from "@/lib/supabase/auth";
import {
  IconHome,
  IconNews,
  IconCpu,
  IconRobot,
  IconDeviceMobile,
  IconTrendingUp,
} from "@tabler/icons-react";

const iconClass = "h-4 w-4 text-neutral-500 dark:text-white";

const navItems = [
  { name: "HOME", link: "/", icon: <IconHome className={iconClass} /> },
  { name: "LATEST", link: "/latest", icon: <IconNews className={iconClass} /> },
  { name: "TECH", link: "/tech", icon: <IconCpu className={iconClass} /> },
  { name: "AI", link: "/ai", icon: <IconRobot className={iconClass} /> },
  { name: "GADGET", link: "/gadget", icon: <IconDeviceMobile className={iconClass} /> },
  { name: "TREND", link: "/trend", icon: <IconTrendingUp className={iconClass} /> },
];

export async function Navbar() {
  const authUser = await getUser();

  const user: NavUser | null = authUser
    ? {
        displayName:
          authUser.user_metadata?.full_name ??
          authUser.user_metadata?.name ??
          "",
        avatarUrl: authUser.user_metadata?.avatar_url ?? undefined,
        email: authUser.email ?? undefined,
      }
    : null;

  return (
    <div className="relative w-full translate-z-0">
      <FloatingNav navItems={navItems} user={user} />
    </div>
  );
}
