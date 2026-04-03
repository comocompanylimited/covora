// ─── Mens Category Data — Single Source of Truth ──────────────────────────────
// Used across: mens page, category nav, mega menu / drawer sections.

export interface CategoryItem {
  name: string
  slug: string
}

export interface CategoryGroup {
  id: string
  title: string
  slug: string        // destination for "View All" on this group
  items: CategoryItem[] // first item is always { name: "View All", slug: <group-slug> }
}

// ─── 1. Shop By Category (flat list, 18 items) ────────────────────────────────
export const MENS_SHOP_BY_CATEGORY: CategoryItem[] = [
  { name: "View All",              slug: "all" },
  { name: "New In",                slug: "new-in" },
  { name: "Top Rated",             slug: "top-rated" },
  { name: "Tops",                  slug: "tops" },
  { name: "Bottoms",               slug: "bottoms" },
  { name: "Denim",                 slug: "denim" },
  { name: "Co-ords",               slug: "co-ords" },
  { name: "Suits & Separates",     slug: "suits-separates" },
  { name: "Hoodies & Sweatshirts", slug: "hoodies-sweatshirts" },
  { name: "Plus Size",             slug: "plus-size" },
  { name: "Outerwear",             slug: "outerwear" },
  { name: "Knitwear",              slug: "knitwear" },
  { name: "Swimwear",              slug: "swimwear" },
  { name: "Underwear & Sleepwear", slug: "underwear-sleepwear" },
  { name: "Autumn-Winter",         slug: "autumn-winter" },
  { name: "Sweatpants",            slug: "sweatpants" },
  { name: "T-shirts",              slug: "t-shirts" },
  { name: "Valentine's Day",       slug: "valentines-day" },
]

// ─── 2. Category Groups with subcategories (11 groups) ────────────────────────
export const MENS_CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: "tops",
    title: "Tops",
    slug: "tops",
    items: [
      { name: "View All",    slug: "tops" },
      { name: "Shirts",      slug: "shirts" },
      { name: "T-shirts",    slug: "t-shirts" },
      { name: "Polo Shirts", slug: "polo-shirts" },
      { name: "Tank Tops",   slug: "tank-tops" },
      { name: "Graphics",    slug: "graphics-tops" },
    ],
  },
  {
    id: "bottoms",
    title: "Bottoms",
    slug: "bottoms",
    items: [
      { name: "View All",    slug: "bottoms" },
      { name: "Pants",       slug: "pants" },
      { name: "Sweatpants",  slug: "sweatpants" },
      { name: "Shorts",      slug: "shorts" },
      { name: "Joggers",     slug: "joggers" },
      { name: "Cargo Pants", slug: "cargo-pants" },
    ],
  },
  {
    id: "denim",
    title: "Denim",
    slug: "denim",
    items: [
      { name: "View All",                     slug: "denim" },
      { name: "Jeans",                         slug: "jeans" },
      { name: "Denim Jackets",                 slug: "denim-jackets" },
      { name: "Denim Shirts",                  slug: "denim-shirts" },
      { name: "Denim Co-ords",                 slug: "denim-co-ords" },
      { name: "Denim Jumpsuits & Overalls",    slug: "denim-jumpsuits-overalls" },
    ],
  },
  {
    id: "co-ords",
    title: "Co-ords",
    slug: "co-ords",
    items: [
      { name: "View All",              slug: "co-ords" },
      { name: "T-Shirt Co-ords",       slug: "t-shirt-co-ords" },
      { name: "Shirts",                slug: "co-ord-shirts" },
      { name: "Polo Co-ords",          slug: "polo-co-ords" },
      { name: "Outerwear",             slug: "co-ord-outerwear" },
      { name: "Hoodies & Sweatshirts", slug: "co-ord-hoodies-sweatshirts" },
    ],
  },
  {
    id: "suits-separates",
    title: "Suits & Separates",
    slug: "suits-separates",
    items: [
      { name: "View All",   slug: "suits-separates" },
      { name: "Suits",      slug: "suits" },
      { name: "Suit Pants", slug: "suit-pants" },
      { name: "Blazers",    slug: "blazers" },
      { name: "Waistcoats", slug: "waistcoats" },
      { name: "Tuxedos",    slug: "tuxedos" },
    ],
  },
  {
    id: "hoodies-sweatshirts",
    title: "Hoodies & Sweatshirts",
    slug: "hoodies-sweatshirts",
    items: [
      { name: "View All",      slug: "hoodies-sweatshirts" },
      { name: "Hoodies",       slug: "hoodies" },
      { name: "Sweatshirts",   slug: "sweatshirts" },
      { name: "Zip-up Hoodies", slug: "zip-up-hoodies" },
      { name: "Graphics",      slug: "graphics-hoodies" },
      { name: "Crewneck",      slug: "crewneck" },
    ],
  },
  {
    id: "plus-size",
    title: "Plus Size Clothing",
    slug: "plus-size",
    items: [
      { name: "View All",              slug: "plus-size" },
      { name: "Tops",                  slug: "plus-size-tops" },
      { name: "Bottoms",               slug: "plus-size-bottoms" },
      { name: "Co-ords",               slug: "plus-size-co-ords" },
      { name: "Denim",                 slug: "plus-size-denim" },
      { name: "Hoodies & Sweatshirts", slug: "plus-size-hoodies-sweatshirts" },
      { name: "Outerwear",             slug: "plus-size-outerwear" },
      { name: "Suits & Separates",     slug: "plus-size-suits-separates" },
      { name: "Knitwear",              slug: "plus-size-knitwear" },
    ],
  },
  {
    id: "outerwear",
    title: "Outerwear",
    slug: "outerwear",
    items: [
      { name: "View All",      slug: "outerwear" },
      { name: "Jackets & Coats", slug: "jackets-coats" },
      { name: "Winter Coats",  slug: "winter-coats" },
      { name: "Overcoats",     slug: "overcoats" },
      { name: "Down Coats",    slug: "down-coats" },
      { name: "Trench Coats",  slug: "trench-coats" },
      { name: "Vests",         slug: "vests" },
      { name: "Shackets",      slug: "shackets" },
      { name: "Faux Fur Coats", slug: "faux-fur-coats" },
    ],
  },
  {
    id: "knitwear",
    title: "Knitwear",
    slug: "knitwear",
    items: [
      { name: "View All",       slug: "knitwear" },
      { name: "Pullovers",      slug: "pullovers" },
      { name: "Knit Tops",      slug: "knit-tops" },
      { name: "Sweater Vests",  slug: "sweater-vests" },
      { name: "Cardigans",      slug: "cardigans" },
      { name: "Sweater Co-ords", slug: "sweater-co-ords" },
    ],
  },
  {
    id: "swimwear",
    title: "Swimwear",
    slug: "swimwear",
    items: [
      { name: "View All",        slug: "swimwear" },
      { name: "Beach Shorts",    slug: "beach-shorts" },
      { name: "Swim Shorts",     slug: "swim-shorts" },
      { name: "Beach Sets",      slug: "beach-sets" },
      { name: "Swim Rashguards", slug: "swim-rashguards" },
    ],
  },
  {
    id: "underwear-sleepwear",
    title: "Underwear & Sleepwear",
    slug: "underwear-sleepwear",
    items: [
      { name: "View All",   slug: "underwear-sleepwear" },
      { name: "Underwear",  slug: "underwear" },
      { name: "Loungewear", slug: "loungewear" },
      { name: "Shapewear",  slug: "shapewear" },
      { name: "Socks",      slug: "socks" },
    ],
  },
]

// ─── 3. Brands (28 brands) ────────────────────────────────────────────────────
export const MENS_BRANDS: CategoryItem[] = [
  { name: "HUEFORM",              slug: "hueform" },
  { name: "ROMWE MEN",            slug: "romwe-men" },
  { name: "PAVTROS",              slug: "pavtros" },
  { name: "SUMWON",               slug: "sumwon" },
  { name: "Manfinity CasualCool", slug: "manfinity-casualcool" },
  { name: "AXEPEAK",              slug: "axepeak" },
  { name: "Dazy Men",             slug: "dazy-men" },
  { name: "SWAVVY",               slug: "swavvy" },
  { name: "Easevo",               slug: "easevo" },
  { name: "MUSERO",               slug: "musero" },
  { name: "AKNOTIC",              slug: "aknotic" },
  { name: "justice brother",      slug: "justice-brother" },
  { name: "Infinite jeans",       slug: "infinite-jeans" },
  { name: "NEON BLANC",           slug: "neon-blanc" },
  { name: "Core Aspect",          slug: "core-aspect" },
  { name: "Manfinity Denimwave",  slug: "manfinity-denimwave" },
  { name: "RivetRise",            slug: "rivetrise" },
  { name: "MODCRASH",             slug: "modcrash" },
  { name: "Manfinity Citygents",  slug: "manfinity-citygents" },
  { name: "Officegu",             slug: "officegu" },
  { name: "Open Phase",           slug: "open-phase" },
  { name: "Driftmere",            slug: "driftmere" },
  { name: "ARC by SIGMAS",        slug: "arc-by-sigmas" },
  { name: "Manfinity Mode",       slug: "manfinity-mode" },
  { name: "Manfinity EMRG",       slug: "manfinity-emrg" },
  { name: "Manfinity LEGND",      slug: "manfinity-legnd" },
  { name: "Manfinity Joysei",     slug: "manfinity-joysei" },
  { name: "Manfinity AFTRDRK",    slug: "manfinity-aftrdrk" },
]

// ─── 4. More Categories ───────────────────────────────────────────────────────
export const MENS_MORE_CATEGORIES: CategoryItem[] = [
  { name: "Jumpsuits & Overalls",        slug: "jumpsuits-overalls" },
  { name: "Uniforms & Special Clothing", slug: "uniforms-special-clothing" },
  { name: "Traditional & Cultural Wear", slug: "traditional-cultural-wear" },
  { name: "Customized Clothing",         slug: "customized-clothing" },
]

// ─── 5. Recommended (editorial / curated tags) ───────────────────────────────
export const MENS_RECOMMENDED: CategoryItem[] = [
  { name: "Straight Pants",  slug: "straight-pants" },
  { name: "Turtleneck",      slug: "turtleneck" },
  { name: "Sweatpants",      slug: "sweatpants" },
  { name: "Leggings",        slug: "leggings" },
  { name: "Denim Shirt",     slug: "denim-shirt" },
  { name: "Denim Shorts",    slug: "denim-shorts" },
  { name: "Checked Shirt",   slug: "checked-shirt" },
  { name: "Cargo Pants",     slug: "cargo-pants" },
  { name: "Tank Tops",       slug: "tank-tops" },
  { name: "Harem Pants",     slug: "harem-pants" },
  { name: "Printed Shirt",   slug: "printed-shirt" },
  { name: "Baggy Pants",     slug: "baggy-pants" },
]

// ─── 6. Expanded Groups — for mega menu / drawer nav ─────────────────────────
// Not displayed on the main page; consumed by header mega menu components.
export const MENS_EXPANDED_GROUPS: CategoryGroup[] = [
  {
    id: "pants-types",
    title: "Pants",
    slug: "pants",
    items: [
      { name: "Leather Pants",   slug: "leather-pants" },
      { name: "Pencil Pants",    slug: "pencil-pants" },
      { name: "Casual Pants",    slug: "casual-pants" },
      { name: "Straight Pants",  slug: "straight-pants" },
      { name: "Baggy Pants",     slug: "baggy-pants" },
      { name: "Sweatpants",      slug: "sweatpants" },
      { name: "Down Pants",      slug: "down-pants" },
      { name: "Cargo Pants",     slug: "cargo-pants" },
      { name: "Leggings",        slug: "leggings" },
      { name: "Harem Pants",     slug: "harem-pants" },
    ],
  },
  {
    id: "down-jackets",
    title: "Down Jackets",
    slug: "down-jackets",
    items: [
      { name: "Long Down Jacket",        slug: "long-down-jacket" },
      { name: "Short Down Jacket",       slug: "short-down-jacket" },
      { name: "Lightweight Down Jacket", slug: "lightweight-down-jacket" },
      { name: "Hooded Down Jacket",      slug: "hooded-down-jacket" },
    ],
  },
  {
    id: "jacket-types",
    title: "Jackets",
    slug: "jackets-coats",
    items: [
      { name: "Aviator Jacket",   slug: "aviator-jacket" },
      { name: "Leather Coat",     slug: "leather-coat" },
      { name: "Baseball Uniform", slug: "baseball-uniform" },
      { name: "Vest",             slug: "vest" },
      { name: "Denim Jacket",     slug: "denim-jacket" },
      { name: "Trench",           slug: "trench" },
      { name: "Skin Coat",        slug: "skin-coat" },
      { name: "Woolen Coat",      slug: "woolen-coat" },
    ],
  },
  {
    id: "shirt-types",
    title: "Shirts",
    slug: "shirts",
    items: [
      { name: "Cargo Shirt",        slug: "cargo-shirt" },
      { name: "Cotton Linen Shirt", slug: "cotton-linen-shirt" },
      { name: "Shirt Jacket",       slug: "shirt-jacket" },
      { name: "Printed Shirt",      slug: "printed-shirt" },
      { name: "Denim Shirt",        slug: "denim-shirt" },
      { name: "Plain Shirt",        slug: "plain-shirt" },
      { name: "Formal Shirt",       slug: "formal-shirt" },
      { name: "Checked Shirt",      slug: "checked-shirt" },
    ],
  },
  {
    id: "sweater-types",
    title: "Sweaters",
    slug: "knitwear",
    items: [
      { name: "Turtleneck",     slug: "turtleneck" },
      { name: "Print Sweater",  slug: "print-sweater" },
      { name: "Cardigan",       slug: "cardigan" },
      { name: "Sweater Vest",   slug: "sweater-vest" },
      { name: "Striped Sweater", slug: "striped-sweater" },
      { name: "Pullovers",      slug: "pullovers" },
      { name: "Solid Sweater",  slug: "solid-sweater" },
      { name: "Sweater Coat",   slug: "sweater-coat" },
    ],
  },
  {
    id: "jeans-types",
    title: "Jeans",
    slug: "jeans",
    items: [
      { name: "Brushed Jeans", slug: "brushed-jeans" },
      { name: "Ripped Jeans",  slug: "ripped-jeans" },
      { name: "Tapered Jeans", slug: "tapered-jeans" },
      { name: "Slim Jeans",    slug: "slim-jeans" },
      { name: "Baggy Jeans",   slug: "baggy-jeans" },
      { name: "Washed Jeans",  slug: "washed-jeans" },
    ],
  },
  {
    id: "shorts-types",
    title: "Shorts",
    slug: "shorts",
    items: [
      { name: "Gym Shorts",          slug: "gym-shorts" },
      { name: "Board Shorts",        slug: "board-shorts" },
      { name: "Cotton Linen Shorts", slug: "cotton-linen-shorts" },
      { name: "Denim Shorts",        slug: "denim-shorts" },
      { name: "Cargo Shorts",        slug: "cargo-shorts" },
      { name: "Ice Shorts",          slug: "ice-shorts" },
      { name: "Casual Shorts",       slug: "casual-shorts" },
    ],
  },
  {
    id: "blazer-suits",
    title: "Blazer & Suits",
    slug: "suits-separates",
    items: [
      { name: "Suit Jackets",          slug: "suit-jackets" },
      { name: "Suits",                 slug: "suits" },
      { name: "Double Breasted Suits", slug: "double-breasted-suits" },
      { name: "Blazers",               slug: "blazers" },
      { name: "Single Breasted Suits", slug: "single-breasted-suits" },
      { name: "Suit Pants",            slug: "suit-pants" },
    ],
  },
  {
    id: "new-in-types",
    title: "New In",
    slug: "new-in",
    items: [
      { name: "New in Hoodies & Sweatshirts", slug: "new-in-hoodies-sweatshirts" },
      { name: "New in Pants",                 slug: "new-in-pants" },
      { name: "New in Shorts",                slug: "new-in-shorts" },
      { name: "New in Men's Sets",            slug: "new-in-mens-sets" },
      { name: "New in Suits & Blazers",       slug: "new-in-suits-blazers" },
      { name: "New in Tops & Tees",           slug: "new-in-tops-tees" },
      { name: "New in Down Coats",            slug: "new-in-down-coats" },
      { name: "New in Sweaters",              slug: "new-in-sweaters" },
      { name: "New in Parkas",                slug: "new-in-parkas" },
      { name: "New in Coats & Jackets",       slug: "new-in-coats-jackets" },
    ],
  },
  {
    id: "sets",
    title: "Sets",
    slug: "co-ords",
    items: [
      { name: "Sports Suits",  slug: "sports-suits" },
      { name: "Fashion Suits", slug: "fashion-suits" },
    ],
  },
]
