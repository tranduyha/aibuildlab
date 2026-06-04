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
  const [openSubmenuId, setOpenSubmenuId] = useState<number | null>(null);
  const topLevelHrefs = new Set(items.map((item) => item.href));

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
          const childItems = item.children ?? [];
          const isOwnActive = isActivePath(pathname, item.href);
          const activeNestedChildren = childItems.filter(
            (child) => !topLevelHrefs.has(child.href) && isActivePath(pathname, child.href),
          );
          const isActive =
            isOwnActive ||
            activeNestedChildren.length > 0;

          if (childItems.length > 0) {
            const isMobileSubmenuOpen = openSubmenuId === item.id;

            return (
              <div
                className="group relative max-[980px]:rounded-lg"
                key={item.id}
              >
                <button
                  aria-current={isOwnActive ? "page" : undefined}
                  aria-expanded={isMobileSubmenuOpen}
                  className={`nav-link inline-flex cursor-pointer items-center gap-2 max-[980px]:flex max-[980px]:w-full max-[980px]:items-center max-[980px]:justify-between max-[980px]:text-left${
                    isActive ? " nav-link-active" : ""
                  }`}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.innerWidth <= 980) {
                      setOpenSubmenuId((current) => (current === item.id ? null : item.id));
                    }
                  }}
                  type="button"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto flex h-4 w-4 shrink-0 items-center justify-center text-slate-500 transition-transform duration-200 group-hover:text-sky-700 group-focus-within:text-sky-700 ${
                      isMobileSubmenuOpen
                        ? "rotate-180 text-sky-700"
                        : "group-hover:rotate-180 group-focus-within:rotate-180"
                    }`}
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6.5L8 10L12 6.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.75"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={`pointer-events-none absolute left-1/2 top-full z-20 hidden w-56 -translate-x-1/2 pt-3 opacity-0 transition group-hover:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:block group-focus-within:pointer-events-auto group-focus-within:opacity-100 max-[980px]:static max-[980px]:w-full max-[980px]:translate-x-0 max-[980px]:pt-1 ${
                    isMobileSubmenuOpen
                      ? "max-[980px]:pointer-events-auto max-[980px]:block max-[980px]:opacity-100"
                      : "max-[980px]:pointer-events-none max-[980px]:hidden max-[980px]:opacity-0"
                  }`}
                >
                  <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/10 max-[980px]:border-0 max-[980px]:bg-transparent max-[980px]:p-0 max-[980px]:pl-3 max-[980px]:shadow-none">
                    {childItems.map((child) => {
                      const isChildActive =
                        !topLevelHrefs.has(child.href) && isActivePath(pathname, child.href);

                      return (
                        <Link
                          aria-current={isChildActive ? "page" : undefined}
                          className={`block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-100 hover:text-sky-800 focus-visible:bg-sky-100 focus-visible:text-sky-800 max-[980px]:mt-1 max-[980px]:border-l max-[980px]:border-slate-200 max-[980px]:bg-slate-50 max-[980px]:text-slate-700${
                            isChildActive ? " bg-sky-50 text-sky-700 max-[980px]:border-sky-300" : ""
                          }`}
                          href={child.href}
                          key={child.id}
                          onClick={() => {
                            setIsOpen(false);
                            setOpenSubmenuId(null);
                          }}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }

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
