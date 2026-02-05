import React from "react";

export default function Loader({ fading }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        src="/Loader3.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-[102%] object-cover object-top"
      />
    </div>

  );
}
