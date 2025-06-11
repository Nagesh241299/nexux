import React from 'react';

function getLuminance(hex: string) {
  if (!hex || typeof hex !== 'string') return 1; // Assume light color fallback

  // Ensure it starts with '#' and is 7 characters like "#ffffff"
  if (!/^#([0-9A-F]{6})$/i.test(hex)) {
    console.warn('Invalid hex color:', hex);
    return 1; // Treat invalid colors as light
  }

  // Remove "#" and convert hex to RGB
  hex = hex.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Convert to sRGB
  const [sr, sg, sb] = [r, g, b].map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * sr + 0.7152 * sg + 0.0722 * sb;
}


function isDarkColor(hexColor: any) {
  const luminance = getLuminance(hexColor);
  return luminance < 0.5;
}

const ColorText = ({ bgColor, text, style = {} }: any) => {
  const isDark = isDarkColor(bgColor);
  const textColor = isDark ? '#ffffff' : '#000000';

  const combinedStyle = {
    backgroundColor: bgColor,
    color: textColor,
    padding: '1rem',
    ...style,
  };

  return <div style={combinedStyle}>{text}</div>;
};

export default ColorText;
