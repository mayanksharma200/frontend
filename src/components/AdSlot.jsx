import React from "react";

const sizeMap = {
  "120x600": { width: 120, height: 600 },
  "160x600": { width: 160, height: 600 },
  "225x150": { width: 225, height: 150 },
  "240x400": { width: 240, height: 400 },
  "300x250": { width: 300, height: 250 },
  "320x50": { width: 320, height: 50 },
  "480x240": { width: 480, height: 240 },
  "500x280": { width: 500, height: 280 },
  "600x314": { width: 600, height: 314 },
  "728x90": { width: 728, height: 90 },
  "1000x300": { width: 1000, height: 300 },
  "1080x607": { width: 1080, height: 607 },
  "1200x628": { width: 1200, height: 628 },
};

const AdSlot = ({
  alt = "Advertisement",
  url,
  label = "ADVERTISEMENT",
  className = "",
  style = {},
}) => (
  // Mobile: gray bg | Desktop: transparent bg
  <div className="w-full bg-neutral-200 sm:bg-transparent py-5 flex justify-center items-center">
    {/* Desktop */}
    <div
      className="hidden sm:flex flex-col items-center w-full"
      style={{ maxWidth: 728 }}
    >
      {/* Label */}
      <div className="w-full text-center pt-2 pb-2">
        <span className="text-[11px] text-neutral-500 font-semibold tracking-widest uppercase select-none">
          {label}
        </span>
      </div>
      {/* Image, NO white bg/card */}
      <div className="w-full flex justify-center items-center px-2 pb-2">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
          aria-label={alt}
        >
          <img
            src="/ads/900x400.jpg"
            alt={alt}
            loading="lazy"
            className="w-full h-auto object-contain"
            style={{ maxWidth: 728 }}
          />
        </a>
      </div>
    </div>
    {/* Mobile: everything in a card */}
    <div
      className="flex flex-col items-center w-full sm:hidden px-2"
      style={{ maxWidth: 340 }}
    >
      <div className="w-full bg-white rounded-lg shadow flex flex-col items-center">
        {/* Label INSIDE CARD */}
        <div className="w-full text-center pt-3 pb-2">
          <span className="text-[11px] text-neutral-500 font-semibold tracking-widest uppercase select-none">
            {label}
          </span>
        </div>
        {/* Ad image */}
        <div className="w-full flex justify-center items-center px-2 pb-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
            aria-label={alt}
          >
            <img
              src="/ads/300x250.jpg"
              alt={alt}
              loading="lazy"
              className="w-full h-auto object-contain"
              style={{ maxWidth: 300, maxHeight: 250 }}
            />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default AdSlot;
