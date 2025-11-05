// hooks/useScrollDirection.js
// Returns "up" or "down" depending on direction.
// Adjust threshold (useScrollDirection({ threshold: 10 })) for slower responsiveness.

//TODO: Any optimization needed for the threshold ?
//       - detection so the nav doesn’t reappear immediately on tiny scrolls upward (a common refinement for smoother UX)?

import { useEffect, useState } from "react";

export default function useScrollDirection({ threshold = 5 } = {}) {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const y = window.scrollY;
      const diff = y - lastY;

      // threshold avoids micro jiggles on tiny scrolls.
      if (Math.abs(diff) > threshold) {
        setScrollDir(diff > 0 ? "down" : "up");
        lastY = y > 0 ? y : 0;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // requestAnimationFrame ensures smooth, throttled updates.
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrollDir;
}
