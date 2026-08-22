/* ============================================================
   HOUSE OF AETHERIA — Product data
   Source photography: existing catalog images from the live
   Shopify store. Swap the `image` / `gallery` arrays here once
   new campaign photography is shot — nothing else needs to change.
   ============================================================ */

const AETHERIA_PRODUCTS = [
  {
    id: "onyx",
    index: "01",
    name: "Onyx",
    fullName: "21-Piece Onyx Makeup Brush Set",
    tagline: "Nineteen brushes. One uncompromising finish.",
    price: 130,
    priceDisplay: "Dhs. 130.00",
    image: "https://thehouseofaetheria.com/cdn/shop/files/01_2.jpg?v=1784134039&width=1946",
    gallery: [
      "https://thehouseofaetheria.com/cdn/shop/files/01_2.jpg?v=1784134039&width=1200",
      "https://thehouseofaetheria.com/cdn/shop/files/balck_Brush.jpg?v=1767966102&width=1200",
      "https://thehouseofaetheria.com/cdn/shop/files/IMG_0948.jpg?v=1784133734&width=1200",
      "https://thehouseofaetheria.com/cdn/shop/files/97A0B24B-9443-410A-8171-A4580637C1CA.png?v=1784133705&width=1200"
    ],
    description: "A bold, all-black collection built for flawless, professional-grade application. Nineteen brushes with ultra-soft, high-density synthetic bristles cover every step of a routine, from base to eyes to finishing touches, in a sleek Onyx finish.",
    included: ["19 all-black professional brushes", "1 V-shape makeup puff", "1 makeup storage bag", "1 canvas travel bag"],
    howToUse: "Use the larger, densely packed heads for base and powder work; the tapered and pencil brushes are built for precision eye and contour detail. The V-shape puff is designed for crease-free under-eye setting.",
    reviews: [
      { name: "Sarah", text: "This set has everything I need. The brushes feel really nice on the skin and haven't shed at all. I've been using them every day, and they're still as good as new." },
      { name: "Anonymous", text: "Now my staple set — base to eyes to contouring to highlighter, this has it all. The all-black look makes it really elegant and the logo looks lovely." }
    ]
  },
  {
    id: "pearl",
    index: "02",
    name: "Pearl",
    fullName: "Pearl Makeup Brush Set, 14 Pieces",
    tagline: "Vegan bristles, wrapped in quiet luxury.",
    price: 111,
    priceDisplay: "Dhs. 111.00",
    image: "https://thehouseofaetheria.com/cdn/shop/files/04_2.jpg?v=1784134607&width=1946",
    gallery: [
      "https://thehouseofaetheria.com/cdn/shop/files/04_2.jpg?v=1784134607&width=1200"
    ],
    description: "Fourteen professional vegan-bristle brushes set in a warm white finish with wooden handles. A softer, quieter counterpart to Onyx — built for a natural, editorial complexion.",
    included: ["14 professional vegan-bristle brushes", "1 V-shape makeup puff", "1 canvas bag", "1 makeup bag"],
    howToUse: "The wooden handles are weighted for control during base application; rotate to the smaller heads for precise concealer and highlight placement.",
    reviews: [
      { name: "Fatima", text: "Soft on the skin and the white finish looks so much more expensive than what I paid for it." },
      { name: "Layla", text: "My go-to for a natural everyday face. The puff alone is worth it." }
    ]
  },
  {
    id: "grigio",
    index: "03",
    name: "Grigio",
    fullName: "Grigio Professional Makeup Brush Set, 18 Pieces",
    tagline: "Eighteen tools. Every finish, considered.",
    price: 125,
    priceDisplay: "Dhs. 125.00",
    image: "https://thehouseofaetheria.com/cdn/shop/files/02_2.jpg?v=1784134167&width=1946",
    gallery: [
      "https://thehouseofaetheria.com/cdn/shop/files/02_2.jpg?v=1784134167&width=1200"
    ],
    description: "An eighteen-piece set in a muted grey finish, built for a full face and eye routine with room for precision detail work. The tonal middle ground between Onyx and Pearl.",
    included: ["18 professional brushes", "1 V-shape makeup puff", "1 canvas bag", "1 makeup bag"],
    howToUse: "A complete routine set — start with the largest heads for base and blush, then move to the smaller eye brushes for blending and definition.",
    reviews: [
      { name: "Noor", text: "Great range of brush sizes, and the grey handles don't show product buildup the way lighter sets do." },
      { name: "Amira", text: "Bought this after trying a friend's Onyx set. Just as soft, more brushes for the price." }
    ]
  },
  {
    id: "duo",
    index: "04",
    name: "Dubai Duo",
    fullName: "The Dubai Duo, 4-Piece Gold Brush Set",
    tagline: "Dual-sided precision, dressed in gold.",
    price: 99,
    priceDisplay: "Dhs. 99.00",
    image: "https://thehouseofaetheria.com/cdn/shop/files/03_2.jpg?v=1784134520&width=1946",
    gallery: [
      "https://thehouseofaetheria.com/cdn/shop/files/03_2.jpg?v=1784134520&width=1200"
    ],
    description: "Four dual-sided brushes in a luxury gold finish, paired with a V-shape puff and a pink travel bag. The most compact set in the collection — built for a fast, precise routine or travel.",
    included: ["4 dual-sided gold brushes", "1 V-shape makeup puff", "1 pink makeup bag"],
    howToUse: "Each brush carries two distinct heads — use one side for application, flip for blending, cutting the number of tools you need to carry in half.",
    reviews: [
      { name: "Hana", text: "Perfect for my gym bag. The gold finish gets so many compliments." },
      { name: "Reem", text: "Small set but the dual-sided brushes genuinely cover everything I need for a quick face." }
    ]
  }
];

function aetheriaGetProduct(id) {
  return AETHERIA_PRODUCTS.find(p => p.id === id);
}

/* ============================================================
   LOOKBOOK / CAMPAIGN PHOTOGRAPHY
   ------------------------------------------------------------
   Empty for now — the grid on the homepage shows a placeholder
   until this has entries. To add photos once they're ready,
   just add objects here, e.g.:

   const AETHERIA_GALLERY = [
     { image: "https://your-image-url.jpg", alt: "Onyx set on a stone vanity" },
     { image: "https://your-image-url-2.jpg", alt: "Pearl brush detail" },
   ];

   Nothing else needs to change — script.js reads this array and
   builds the grid automatically. Add as many as you like.
   ============================================================ */

const AETHERIA_GALLERY = [];
