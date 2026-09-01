// HorizontalScroller.jsx
import { useRef, useState, useCallback, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ScrollTrack = styled(Box)({
  display: "flex",
  gap: 12,
  overflowX: "auto",
  scrollBehavior: "smooth",
  // hide native scrollbar
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // old Edge/IE
  "&::-webkit-scrollbar": {
    // Chrome/Safari
    display: "none",
  },
});

const ScrollWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

export default function HorizontalScroller({ children, scrollStep = 200 }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scroll = (direction) => {
    trackRef.current?.scrollBy({
      left: direction === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    });
  };

  return (
    <ScrollWrapper>
      <IconButton
        size="small"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        sx={{ color: "var(--color-accent)" }}
      >
        <ChevronLeftIcon />
      </IconButton>

      <ScrollTrack ref={trackRef}>{children}</ScrollTrack>

      <IconButton
        size="small"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        sx={{ color: "var(--color-accent)" }}
      >
        <ChevronRightIcon />
      </IconButton>
    </ScrollWrapper>
  );
}
