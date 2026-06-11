"use client";

import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setIsVisible(window.scrollY > 420);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      aria-label="Back to top"
      className={`back-to-top-button${isVisible ? " back-to-top-button-visible" : ""}`}
      data-tooltip="Back to top"
      onClick={handleClick}
      type="button"
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
        <path d="M10 4.5 4.75 9.75l1.4 1.4L9 8.3v7.2h2V8.3l2.85 2.85 1.4-1.4L10 4.5Z" />
      </svg>
    </button>
  );
}
