import { UploadedImageRecord } from '../lib/storage';

// Helper to generate a realistic luxury textile texture SVG Data URI
const createFabricSvgDataUri = (
  colorHex: string,
  secondaryHex: string,
  title: string,
  shadeName: string,
  weaveType: 'twill' | 'oxford' | 'herringbone' | 'slub' | 'satin' = 'twill'
): string => {
  const patternDefs = {
    twill: `
      <pattern id="p" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="${secondaryHex}" stroke-width="2.5" opacity="0.25" />
        <line x1="6" y1="0" x2="6" y2="12" stroke="#ffffff" stroke-width="0.8" opacity="0.12" />
      </pattern>`,
    oxford: `
      <pattern id="p" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="4" height="4" fill="${secondaryHex}" opacity="0.3" />
        <rect x="4" y="4" width="4" height="4" fill="${secondaryHex}" opacity="0.3" />
        <rect x="4" y="0" width="4" height="4" fill="#ffffff" opacity="0.1" />
        <rect x="0" y="4" width="4" height="4" fill="#ffffff" opacity="0.1" />
      </pattern>`,
    herringbone: `
      <pattern id="p" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M0,0 L8,8 L0,16 M8,8 L16,0 M8,8 L16,16" fill="none" stroke="${secondaryHex}" stroke-width="1.8" opacity="0.28" />
        <path d="M0,8 L8,16 M8,0 L16,8" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.15" />
      </pattern>`,
    slub: `
      <pattern id="p" width="24" height="12" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="16" y2="3" stroke="${secondaryHex}" stroke-width="1.5" opacity="0.35" />
        <line x1="12" y1="9" x2="24" y2="9" stroke="${secondaryHex}" stroke-width="2" opacity="0.3" />
        <line x1="4" y1="6" x2="20" y2="6" stroke="#ffffff" stroke-width="0.75" opacity="0.2" />
      </pattern>`,
    satin: `
      <pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <line x1="0" y1="0" x2="10" y2="10" stroke="#ffffff" stroke-width="1.2" opacity="0.18" />
        <line x1="5" y1="0" x2="15" y2="10" stroke="${secondaryHex}" stroke-width="1.5" opacity="0.15" />
      </pattern>`,
  };

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="65%" stop-color="#000000" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.7" />
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faecc5" />
      <stop offset="50%" stop-color="#d4af37" />
      <stop offset="100%" stop-color="#997328" />
    </linearGradient>
    ${patternDefs[weaveType]}
  </defs>

  <!-- Base Solid Fabric Tone -->
  <rect width="100%" height="100%" fill="${colorHex}" />

  <!-- Textured Woven Textile Grid -->
  <rect width="100%" height="100%" fill="url(#p)" />

  <!-- Studio Ambient Vignette & Highlights -->
  <rect width="100%" height="100%" fill="url(#vignette)" />

  <!-- Tailor Fold Seam Shadow -->
  <path d="M0 450 Q 400 480 800 450 L800 600 L0 600 Z" fill="#000000" opacity="0.35" />
  <line x1="0" y1="450" x2="800" y2="450" stroke="#000000" stroke-width="3" opacity="0.4" />
  <line x1="0" y1="452" x2="800" y2="452" stroke="#ffffff" stroke-width="1" opacity="0.15" />

  <!-- AL HAFIZ CLOTHS Embossed Gold Seal -->
  <g transform="translate(620, 80)">
    <circle cx="0" cy="0" r="48" fill="#11141c" stroke="url(#gold)" stroke-width="2.5" />
    <circle cx="0" cy="0" r="43" fill="none" stroke="url(#gold)" stroke-width="1" stroke-dasharray="3,3" />
    <text x="0" y="-12" fill="url(#gold)" font-family="serif" font-size="11" font-weight="bold" text-anchor="middle" letter-spacing="2">AL HAFIZ</text>
    <text x="0" y="4" fill="#ffffff" font-family="sans-serif" font-size="8" text-anchor="middle" letter-spacing="1.5">CLOTHS</text>
    <text x="0" y="18" fill="url(#gold)" font-family="sans-serif" font-size="7" font-weight="bold" text-anchor="middle">4.5 GAZ</text>
  </g>

  <!-- Fabric Shade Placard -->
  <g transform="translate(40, 480)">
    <rect width="360" height="85" rx="8" fill="#0c0e15" fill-opacity="0.9" stroke="url(#gold)" stroke-width="1.2" />
    <text x="20" y="30" fill="url(#gold)" font-family="serif" font-size="15" font-weight="bold" letter-spacing="1">${title}</text>
    <text x="20" y="52" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="600">Shade: ${shadeName}</text>
    <text x="20" y="70" fill="#9ca3af" font-family="sans-serif" font-size="10">Capry Guarantee · 100% Color Fastness · Karachi Delivery</text>
  </g>
</svg>
`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// 30 Curated Fabric & Suit Images for AL HAFIZ CLOTHS
export const INITIAL_30_FABRIC_IMAGES: UploadedImageRecord[] = [
  // 1-5: Studio Photography Assets
  {
    id: 'fabric-img-001',
    name: 'Al-Hafiz Royal Heritage Midnight Bolt & Gold Seal',
    url: '/src/assets/images/alhafiz_hero_fabric_1794403307217.jpg',
    category: 'Premium Unstitched Suits',
    createdAt: '2026-03-01T10:00:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-002',
    name: 'Al-Hafiz Executive Washing Wear - Charcoal & Bronze',
    url: '/src/assets/images/fabric_washing_wear_1794403306958.jpg',
    category: 'Washing Wear',
    createdAt: '2026-03-01T10:05:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-003',
    name: 'Al-Hafiz Pure Combed Cotton - Ivory Pearl Drape',
    url: '/src/assets/images/fabric_pure_cotton_1794403308588.jpg',
    category: 'Pure Cotton',
    createdAt: '2026-03-01T10:10:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-004',
    name: 'Al-Hafiz Mix Cotton - Royal Emerald & Khaki Presentation',
    url: '/src/assets/images/fabric_mix_cotton_1794403309088.jpg',
    category: 'Mix Cotton',
    createdAt: '2026-03-01T10:15:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-005',
    name: 'Al-Hafiz Textile Weave Craftsmanship Macro Texture',
    url: '/src/assets/images/fabric_craftsmanship_1794403309322.jpg',
    category: 'Master Weave Collection',
    createdAt: '2026-03-01T10:20:00Z',
    isCloud: true,
  },

  // 6-21: The 16 Complete Washing Wear Color Shades
  {
    id: 'fabric-img-006',
    name: 'Washing Wear - 01 Jet Black (Zahri Siyah)',
    url: createFabricSvgDataUri('#0f1115', '#2a2e38', 'WASHING WEAR SUIT', '01. Jet Black', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:00:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-007',
    name: 'Washing Wear - 02 Midnight Navy (Shahi Navy)',
    url: createFabricSvgDataUri('#14213d', '#000814', 'WASHING WEAR SUIT', '02. Midnight Navy', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:05:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-008',
    name: 'Washing Wear - 03 Charcoal Slate (Surmayi Khas)',
    url: createFabricSvgDataUri('#333a42', '#1f2429', 'WASHING WEAR SUIT', '03. Charcoal Slate', 'herringbone'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:10:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-009',
    name: 'Washing Wear - 04 Steel Grey (Fauladi Grey)',
    url: createFabricSvgDataUri('#4b5563', '#374151', 'WASHING WEAR SUIT', '04. Steel Grey', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:15:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-010',
    name: 'Washing Wear - 05 Royal Bronze (Peetal Shine)',
    url: createFabricSvgDataUri('#543d2b', '#3b2b1e', 'WASHING WEAR SUIT', '05. Royal Bronze', 'satin'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:20:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-011',
    name: 'Washing Wear - 06 Camel Khaki (Shahi Khaki)',
    url: createFabricSvgDataUri('#9a6b38', '#734e24', 'WASHING WEAR SUIT', '06. Camel Khaki', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:25:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-012',
    name: 'Washing Wear - 07 Military Olive (Zaitooni Green)',
    url: createFabricSvgDataUri('#3f4f34', '#2b3623', 'WASHING WEAR SUIT', '07. Military Olive', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:30:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-013',
    name: 'Washing Wear - 08 Chocolate Mocha (Gahra Coffee)',
    url: createFabricSvgDataUri('#382319', '#241610', 'WASHING WEAR SUIT', '08. Chocolate Mocha', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:35:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-014',
    name: 'Washing Wear - 09 Airforce Blue (Hawai Neela)',
    url: createFabricSvgDataUri('#1d3557', '#0f1d30', 'WASHING WEAR SUIT', '09. Airforce Blue', 'herringbone'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:40:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-015',
    name: 'Washing Wear - 10 Desert Sand (Sehrai Reti)',
    url: createFabricSvgDataUri('#c49a62', '#9e7640', 'WASHING WEAR SUIT', '10. Desert Sand', 'slub'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:45:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-016',
    name: 'Washing Wear - 11 Deep Maroon (Yaqooti Lal)',
    url: createFabricSvgDataUri('#581825', '#3b0f19', 'WASHING WEAR SUIT', '11. Deep Maroon', 'satin'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:50:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-017',
    name: 'Washing Wear - 12 Bottle Green (Zamarrudi Sabz)',
    url: createFabricSvgDataUri('#143d2b', '#0b2419', 'WASHING WEAR SUIT', '12. Bottle Green', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T09:55:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-018',
    name: 'Washing Wear - 13 Light Ash Grey (Khaaki Grey)',
    url: createFabricSvgDataUri('#9ca3af', '#6b7280', 'WASHING WEAR SUIT', '13. Light Ash Grey', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T10:00:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-019',
    name: 'Washing Wear - 14 Off-White Cream (Khandani Off-White)',
    url: createFabricSvgDataUri('#f3ede2', '#dcd2bf', 'WASHING WEAR SUIT', '14. Off-White Cream', 'slub'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T10:05:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-020',
    name: 'Washing Wear - 15 Dark Walnut (Akharoti Brown)',
    url: createFabricSvgDataUri('#2c1810', '#1c0f0a', 'WASHING WEAR SUIT', '15. Dark Walnut', 'twill'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T10:10:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-021',
    name: 'Washing Wear - 16 Royal Teal (Aabi Teal)',
    url: createFabricSvgDataUri('#0f4c5c', '#082f39', 'WASHING WEAR SUIT', '16. Royal Teal', 'satin'),
    category: 'Washing Wear',
    createdAt: '2026-03-02T10:15:00Z',
    isCloud: true,
  },

  // 22-26: Pure Cotton & Latha Finishes
  {
    id: 'fabric-img-022',
    name: 'Pure Cotton - Crisp Snow White (Chitta Safaid)',
    url: createFabricSvgDataUri('#ffffff', '#e2e8f0', 'PURE COTTON SUIT', 'Crisp Snow White', 'oxford'),
    category: 'Pure Cotton',
    createdAt: '2026-03-03T11:00:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-023',
    name: 'Pure Cotton - Giza Ivory Pearl (Motiya Safaid)',
    url: createFabricSvgDataUri('#fcf8f0', '#ede3d1', 'PURE COTTON SUIT', 'Ivory Pearl', 'twill'),
    category: 'Pure Cotton',
    createdAt: '2026-03-03T11:05:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-024',
    name: 'Pure Cotton - Monarch Stiff Traditional Latha',
    url: createFabricSvgDataUri('#f8f9fa', '#e9ecef', 'MONARCH LATHA', 'Stiff Traditional Latha', 'slub'),
    category: 'Pure Cotton',
    createdAt: '2026-03-03T11:10:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-025',
    name: 'Pure Cotton - Sultan Dobby Self Pattern Navy',
    url: createFabricSvgDataUri('#172554', '#0f172a', 'SULTAN DOBBY COTTON', 'Dobby Royal Navy', 'herringbone'),
    category: 'Pure Cotton',
    createdAt: '2026-03-03T11:15:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-026',
    name: 'Pure Cotton - Soft Almond Cream (Badami Ecru)',
    url: createFabricSvgDataUri('#ede2d1', '#d4c2a7', 'PURE COTTON SUIT', 'Almond Cream', 'oxford'),
    category: 'Pure Cotton',
    createdAt: '2026-03-03T11:20:00Z',
    isCloud: true,
  },

  // 27-30: Special Fabrics (Boski Silk Touch & Mix Cotton Weaves)
  {
    id: 'fabric-img-027',
    name: 'Kohinoor Boski Touch - Golden Champagne (Asli Boski Fall)',
    url: createFabricSvgDataUri('#f6e58d', '#dff9fb', 'KOHINOOR BOSKI', 'Golden Champagne', 'satin'),
    category: 'Other Fabric Varieties',
    createdAt: '2026-03-04T12:00:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-028',
    name: 'Kohinoor Boski Touch - Soft Pearl Silk',
    url: createFabricSvgDataUri('#f7f1e3', '#d1ccc0', 'KOHINOOR BOSKI', 'Soft Pearl Silk', 'satin'),
    category: 'Other Fabric Varieties',
    createdAt: '2026-03-04T12:05:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-029',
    name: 'Mix Cotton - Signature Pine Emerald Weave',
    url: createFabricSvgDataUri('#1e4d38', '#133526', 'MIX COTTON SUIT', 'Pine Emerald', 'twill'),
    category: 'Mix Cotton',
    createdAt: '2026-03-04T12:10:00Z',
    isCloud: true,
  },
  {
    id: 'fabric-img-030',
    name: 'Al-Hafiz Master Cutting 4.5 Gaz Roll Presentation',
    url: createFabricSvgDataUri('#2c3e50', '#1a252f', 'COMPLETE FULL SUIT', '4.5 Gaz Full Cutting', 'twill'),
    category: "Men's Suit Collection",
    createdAt: '2026-03-04T12:15:00Z',
    isCloud: true,
  },
];
