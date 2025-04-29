"use client";
import { useEffect, useState } from "react";
import VideoReel                from "./VideoReel";   // ← your slider

export default function TestimonialGallery() {
  const [srcs, setSrcs] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/testimonial-reels")
      .then(r => r.json())
      .then(setSrcs)
      .catch(() => setSrcs([]));
  }, []);

  // render nothing until the list arrives
  if (!srcs.length) return null;
  return <VideoReel sources={srcs} />;
}
