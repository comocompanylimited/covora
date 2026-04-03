// ─── Mens Filter & Sort Config — Single Source of Truth ──────────────────────
// Used across: mens category pages, future womens pages, header mega menus.

export type FilterType = "checkbox" | "color" | "size" | "price"

export interface FilterOption {
  label: string
  value: string  // URL param value / WooCommerce attribute slug
  hex?: string   // color swatches only
}

export interface FilterGroup {
  id: string              // URL search param key
  label: string           // display heading
  type: FilterType
  defaultExpanded?: boolean
  viewMoreAfter?: number  // hide options beyond this count behind "View More"
  options?: FilterOption[]
  // price-type only:
  priceMin?: number
  priceMax?: number
  currency?: string
}

export interface SortOption {
  value: string            // URL param value
  label: string            // display label
  wcOrderby?: "menu_order" | "popularity" | "rating" | "date" | "price"
  wcOrder?: "asc" | "desc"
}

// ─── Sort options ─────────────────────────────────────────────────────────────
export const MENS_SORT_OPTIONS: SortOption[] = [
  { value: "recommend",  label: "Recommend",        wcOrderby: "menu_order", wcOrder: "desc" },
  { value: "popularity", label: "Most Popular",      wcOrderby: "popularity", wcOrder: "desc" },
  { value: "date",       label: "New Arrivals",      wcOrderby: "date",       wcOrder: "desc" },
  { value: "rating",     label: "Top Rated",         wcOrderby: "rating",     wcOrder: "desc" },
  { value: "price",      label: "Price Low to High", wcOrderby: "price",      wcOrder: "asc"  },
  { value: "price-desc", label: "Price High to Low", wcOrderby: "price",      wcOrder: "desc" },
]

// ─── Filter groups (display order = sidebar order) ────────────────────────────
export const MENS_FILTERS: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    type: "checkbox",
    defaultExpanded: true,
    options: [
      { label: "Men Clothing",                          value: "men-clothing" },
      { label: "Men Plus Size Clothing",                value: "men-plus-size-clothing" },
      { label: "Men Clothing Accessories",              value: "men-clothing-accessories" },
      { label: "Men Traditional & Cultural Wear",       value: "men-traditional-cultural-wear" },
      { label: "Men Uniforms & Special Clothing",       value: "men-uniforms-special-clothing" },
      { label: "Men Underwear and Sleepwear",           value: "men-underwear-sleepwear" },
      { label: "Plus Size Men Underwear and Sleepwear", value: "plus-size-men-underwear-sleepwear" },
    ],
  },
  {
    id: "color",
    label: "Color",
    type: "color",
    defaultExpanded: true,
    options: [
      { label: "Pink",   value: "pink",   hex: "#e8b4c0" },
      { label: "Purple", value: "purple", hex: "#8b5fa8" },
      { label: "Grey",   value: "grey",   hex: "#909090" },
      { label: "Khaki",  value: "khaki",  hex: "#bab08a" },
      { label: "White",  value: "white",  hex: "#f5efe8" },
      { label: "Red",    value: "red",    hex: "#c43a35" },
      { label: "Green",  value: "green",  hex: "#3a7a3a" },
      { label: "Brown",  value: "brown",  hex: "#8b5e3c" },
    ],
  },
  {
    id: "size",
    label: "Size",
    type: "size",
    defaultExpanded: true,
    options: [
      { label: "XS",  value: "xs"  },
      { label: "S",   value: "s"   },
      { label: "M",   value: "m"   },
      { label: "L",   value: "l"   },
      { label: "XL",  value: "xl"  },
      { label: "2XL", value: "2xl" },
      { label: "3XL", value: "3xl" },
      { label: "4XL", value: "4xl" },
      { label: "5XL", value: "5xl" },
    ],
  },
  {
    id: "price",
    label: "Price Range (NZD)",
    type: "price",
    defaultExpanded: true,
    priceMin: 1,
    priceMax: 533,
    currency: "NZD",
  },
  {
    id: "style",
    label: "Style",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Street",   value: "street"   },
      { label: "Work",     value: "work"     },
      { label: "Vacation", value: "vacation" },
      { label: "Sexy",     value: "sexy"     },
      { label: "Cute",     value: "cute"     },
      { label: "Party",    value: "party"    },
    ],
  },
  {
    id: "fit",
    label: "Fit Type",
    type: "checkbox",
    defaultExpanded: false,
    options: [
      { label: "Oversized",   value: "oversized"   },
      { label: "Regular Fit", value: "regular-fit" },
      { label: "Skinny",      value: "skinny"      },
      { label: "Loose",       value: "loose"       },
      { label: "Slim Fit",    value: "slim-fit"    },
    ],
  },
  {
    id: "type",
    label: "Type",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Shacket",      value: "shacket"      },
      { label: "Poncho",       value: "poncho"       },
      { label: "Quilted",      value: "quilted"      },
      { label: "Short Sleeve", value: "short-sleeve" },
      { label: "Bottoms",      value: "bottoms"      },
      { label: "Top",          value: "top"          },
    ],
  },
  {
    id: "material",
    label: "Material",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Lace",             value: "lace"             },
      { label: "Knitwear",         value: "knitwear"         },
      { label: "Composite Fabric", value: "composite-fabric" },
      { label: "Viscose",          value: "viscose"          },
      { label: "French Terry",     value: "french-terry"     },
      { label: "Knitted Jersey",   value: "knitted-jersey"   },
    ],
  },
  {
    id: "length",
    label: "Length",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Mini Shorts", value: "mini-shorts" },
      { label: "Long",        value: "long"        },
      { label: "Midi",        value: "midi"        },
      { label: "Crop",        value: "crop"        },
      { label: "Micro Crop",  value: "micro-crop"  },
      { label: "Extra Long",  value: "extra-long"  },
    ],
  },
  {
    id: "details",
    label: "Details",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Button",           value: "button"           },
      { label: "Knot",             value: "knot"             },
      { label: "Pocket",           value: "pocket"           },
      { label: "Scallop",          value: "scallop"          },
      { label: "Contrast Binding", value: "contrast-binding" },
      { label: "Tie Front",        value: "tie-front"        },
    ],
  },
  {
    id: "pattern",
    label: "Pattern Type",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Chevron",         value: "chevron"         },
      { label: "Scarf Print",     value: "scarf-print"     },
      { label: "Baroque",         value: "baroque"         },
      { label: "Polka Dot",       value: "polka-dot"       },
      { label: "Snakeskin Print", value: "snakeskin-print" },
      { label: "Tie Dye",         value: "tie-dye"         },
    ],
  },
  {
    id: "neckline",
    label: "Neckline",
    type: "checkbox",
    defaultExpanded: false,
    options: [
      { label: "Deep V Neck",     value: "deep-v-neck"     },
      { label: "Square Neck",     value: "square-neck"     },
      { label: "Mandarin Collar", value: "mandarin-collar" },
    ],
  },
  {
    id: "sleeve",
    label: "Sleeve Length",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Short Sleeve",                value: "short-sleeve"          },
      { label: "Long Sleeve",                 value: "long-sleeve"           },
      { label: "Sleeveless",                  value: "sleeveless"            },
      { label: "Half Sleeve",                 value: "half-sleeve"           },
      { label: "Wrist-Length Sleeve",         value: "wrist-length-sleeve"   },
      { label: "Three Quarter Length Sleeve", value: "three-quarter-sleeve"  },
    ],
  },
  {
    id: "features",
    label: "Features",
    type: "checkbox",
    defaultExpanded: false,
    viewMoreAfter: 5,
    options: [
      { label: "Comfortable",   value: "comfortable"   },
      { label: "Great quality", value: "great-quality" },
      { label: "Lightweight",   value: "lightweight"   },
      { label: "Soft",          value: "soft"          },
      { label: "Stretch",       value: "stretch"       },
      { label: "Softness",      value: "softness"      },
    ],
  },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

/** All searchParam keys used by filters (for URL building helpers) */
export const FILTER_PARAM_KEYS = MENS_FILTERS.flatMap((g) =>
  g.type === "price" ? ["price_min", "price_max"] : [g.id]
)
