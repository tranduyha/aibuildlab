"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { NavigationItem } from "@/types";

interface MainNavProps {
  items: NavigationItem[];
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  if (href.startsWith("/tools/")) {
    return pathname.startsWith("/tools");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`main-nav${isOpen ? " main-nav-open" : ""}`}>
      <button
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        className="nav-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span aria-hidden="true" className="nav-toggle-lines">
          <span />
          <span />
          <span />
        </span>
        <span>Menu</span>
      </button>
      <nav className="navigation" id="primary-navigation" aria-label="Primary navigation">
        {items.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`nav-link${isActive ? " nav-link-active" : ""}`}
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
