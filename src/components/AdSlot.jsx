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
  size = "728x90",
  className = "",
  style = {},
  alt = "Advertisement",
  url, // <-- New prop for external link
}) => {
  const { width, height } = sizeMap[size] || sizeMap["728x90"];
  const imgElement = (
    <img
      src={`/ads/${size}.jpg`}
      alt={alt}
      loading="lazy"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: width,
        maxHeight: height,
        objectFit: "contain",
        borderRadius: "14px",
        boxShadow: "0 2px 12px 0 rgba(50,50,93,.07)",
        background: "#fff",
        display: "block",
        cursor: url ? "pointer" : "default",
      }}
    />
  );

  return (
    <div
      className={`flex justify-center items-center w-full mx-auto my-6 ${className}`}
      style={{
        maxWidth: width,
        ...style,
      }}
    >
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", width: "100%" }}
          aria-label={alt}
        >
          {imgElement}
        </a>
      ) : (
        imgElement
      )}
    </div>
  );
};

export default AdSlot;
