"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LineChart, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { logoutAction } from "@/lib/actions/auth-actions";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/overview", label: "Overview", Icon: LayoutDashboard },
  { href: "/forecast", label: "Disease Forecast", Icon: LineChart },
];

export function AppNav({ fullName }: { fullName: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/overview">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map(({ href, label, Icon }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">{fullName}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </form>
        </div>
      </div>
      <nav className="flex items-center gap-1 border-t border-border px-4 py-2 sm:hidden">
        {NAV_LINKS.map(({ href, label, Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
