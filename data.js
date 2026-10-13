// REAL, RESEARCHED LOCATIONS — researched via web search, Oct 2026.
// Addresses verified against 2+ independent sources where possible.
// Coordinates are street/building-level approximations, not GPS-surveyed.
// A few notes on volatility: K-pop agency HQs relocate periodically
// (SM, JYP and YG have all moved since 2021) — re-verify before any
// paid release. HYBE Insight museum closed to the public in Jan 2023;
// no confirmed Seoul reopening was found during this research pass, so
// it is NOT listed as a visitable museum here — only the HQ exterior is.
//
// Busan note: "BTS THE CITY: ARIRANG in Busan" (Jun 5–21, 2026) added a
// wave of temporary pop-ups/installations across the city — those are
// NOT included here since they were time-limited and have since ended.
// Only permanent, year-round spots are listed for Busan.
// Also deliberately excluded: a specific school tied to a member's
// childhood — kept off the list out of respect for a functioning school.

const CITIES = [
  { key: "seoul", label: "Seoul", center: [37.5505, 126.99], zoom: 12 },
  { key: "busan", label: "Busan", center: [35.1595, 129.0756], zoom: 12 },
];

const PILGRIMAGE_SPOTS = [
  // ---- Seoul ----
  {
    id: "hybe-hq",
    name: "HYBE Headquarters",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.5326,
    lng: 126.9653,
    blurb: "Working HQ for BTS, TXT, ENHYPEN, LE SSERAFIM, BOYNEXTDOOR and more — exterior photo spot only, no public entry. The HYBE Insight museum here closed in Jan 2023 and has not confirmed a Seoul reopening — check official channels before planning a museum visit.",
    address: "42 Hangang-daero, Yongsan-gu, Seoul",
  },
  {
    id: "sm-hq",
    name: "SM Entertainment HQ (D-Tower)",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    // Corrected Oct 2026 — same class of bug as the YG pin below: the old
    // longitude (127.0557) landed ~1.3km east of the real building, past
    // Seongsu Station. Re-verified against Seoul Forest park's own listed
    // coordinates (37.5446, 127.0398) and Seoul-forest Station's (37.5436,
    // 127.0447) — the D-Tower sits right between them, "in front of Seoul
    // Forest," which the old pin's position didn't match at all.
    lat: 37.5442,
    lng: 127.0434,
    blurb: "SM's current headquarters near Seoul Forest, after moving from Gangnam. Distinctive facade is a popular exterior photo spot — no public tours of the building itself.",
    address: "83-21 Wangsimni-ro, Seongdong-gu, Seoul",
  },
  {
    id: "kwangya-seongsu",
    name: "KWANGYA@SEONGSU",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    // Same building as sm-hq above (basement level of 83-21 Wangsimni-ro,
    // confirmed via the store's own listed address) — corrected alongside it.
    lat: 37.5442,
    lng: 127.0433,
    blurb: "SM's official fixed-location store near its Seongsu HQ — merch for EXO, NCT, aespa and the rest of the roster, plus occasional artist pop-up events.",
    address: "Seongsu-dong, Seongdong-gu, Seoul",
  },
  {
    id: "jyp-hq",
    name: "JYP Entertainment HQ",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.5301,
    lng: 127.1326,
    blurb: "JYP's headquarters near Olympic Park, after moving from Cheongdam-dong. Exterior photo spot only — the public cafe here has closed, and it's roughly 45–60 min from central Seoul by subway.",
    address: "205 Gangdong-daero, Seongnae-dong, Gangdong-gu, Seoul",
  },
  {
    id: "yg-hq",
    name: "YG Entertainment HQ",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    // Corrected Oct 2026 — the old coordinates (37.5497, 126.9138) landed
    // almost exactly on Hapjeong Station, ~500m east of the real building,
    // which is why tapping this pin only ever showed generic "nearby
    // station" results instead of YG's own building. Re-verified against
    // Wikipedia's listed address (7 Huiujeong-ro 1-gil) and two independent
    // POI sources giving ~37.5488, 126.908 for that address — closer to the
    // Han River / Mangwon-dong border, matching on-the-ground descriptions.
    lat: 37.5489,
    lng: 126.9079,
    blurb: "YG's Hapjeong headquarters, expanded with a newer building alongside the original. The exterior and logo sign are a regular stop on fan walking routes.",
    address: "7 Huiujeong-ro 1-gil, Mapo-gu, Seoul",
  },
  {
    id: "yg-republique",
    name: "YG Republique / Same Cafe",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    lat: 37.5495,
    lng: 126.9140,
    blurb: "Official merch shop right outside YG's building, plus the adjacent Same Cafe — BLACKPINK, BIGBANG, TREASURE and more.",
    address: "Hapjeong-dong, Mapo-gu, Seoul",
  },
  {
    id: "myeongdong-street",
    name: "Myeongdong K-pop Street",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    lat: 37.5636,
    lng: 126.9850,
    blurb: "Dense cluster of official and multi-brand K-pop merch stores, photocard shops, and pop-up spaces in the Myeongdong shopping district.",
    address: "Myeongdong, Jung-gu, Seoul",
  },
  {
    id: "hongdae-busking",
    name: "Hongdae Busking Street",
    city: "seoul",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.5563,
    lng: 126.9237,
    blurb: "Iconic street-performance strip near Hongik University — many idols busked here pre-debut. Lively nights with live covers and dance crews.",
    address: "Hongdae, Mapo-gu, Seoul",
  },
  {
    id: "line-friends-hongdae",
    name: "LINE Friends Flagship Store",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    lat: 37.5537,
    lng: 126.9228,
    blurb: "Multi-floor character store in Hongdae with a dedicated BT21 (BTS) section plus official merch corners for other groups.",
    address: "141 Yanghwa-ro, Mapo-gu, Seoul",
  },
  {
    id: "thanks-nature-cafe",
    name: "Thanks Nature Cafe",
    city: "seoul",
    category: "cafe",
    categoryLabel: "Cafe",
    lat: 37.5558,
    lng: 126.9215,
    blurb: "Long-running sheep-themed cafe in Hongdae linked to BTOB's Yook Sungjae's family — a well-known idol-adjacent fan stop.",
    address: "486 Seogyo-dong, Mapo-gu, Seoul",
  },
  {
    id: "kbs-music-bank",
    name: "KBS Music Bank Hall",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert / Broadcast",
    lat: 37.5305,
    lng: 126.8991,
    blurb: "Home of KBS Music Bank tapings, recorded Fridays. Check official ticketing/fan-cafe windows before your trip — slots fill fast around comebacks.",
    address: "Yeouido-dong, Yeongdeungpo-gu, Seoul",
  },
  {
    id: "sbs-inkigayo",
    name: "SBS Inkigayo (Prism Tower)",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert / Broadcast",
    lat: 37.5264,
    lng: 126.8646,
    blurb: "Home of SBS Inkigayo tapings, recorded Sundays, at SBS's Prism Tower broadcast center.",
    address: "88 Mokdongjungang-ro, Yangcheon-gu, Seoul",
  },
  {
    id: "gocheok-skydome",
    name: "Gocheok Sky Dome",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 37.4982,
    lng: 126.8672,
    blurb: "Major indoor arena frequently hosting large-scale K-pop concerts and fan events.",
    address: "430 Gyeongin-ro, Guro-gu, Seoul",
  },
  {
    id: "kspo-dome",
    name: "KSPO Dome (Olympic Gym)",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 37.5206,
    lng: 127.1268,
    blurb: "One of Seoul's most-used concert arenas inside Olympic Park, hosting fan meets and comeback showcases year-round.",
    address: "Olympic Park, Songpa-gu, Seoul",
  },
  {
    id: "jamsil-arena",
    name: "Jamsil Indoor Stadium",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 37.5151,
    lng: 127.0719,
    blurb: "Major indoor arena next to the Jamsil Sports Complex, regularly hosting concerts, fan meetings and award shows.",
    address: "Jamsil-dong, Songpa-gu, Seoul",
  },
  {
    id: "seongsu-dong",
    name: "Seongsu-dong",
    city: "seoul",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.5445,
    lng: 127.0520,
    blurb: "Seoul's reclaimed-warehouse district turned dessert-cafe and flagship-store hotspot — now also SM's home neighborhood, and a magnet for idol sightings and brand pop-ups.",
    address: "Seongsu-dong, Seongdong-gu, Seoul",
  },

  // ---- Busan ----
  {
    id: "busan-asiad-stadium",
    name: "Busan Asiad Main Stadium",
    city: "busan",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 35.1930,
    lng: 129.0587,
    blurb: "Busan's largest stadium and the city's go-to K-pop mega-concert venue — hosted BTS's free 'Yet To Come' concert in 2022 and the 'ARIRANG' world tour stop in June 2026.",
    address: "344 World Cup-daero, Geoje-dong, Yeonje-gu, Busan",
  },
  {
    id: "bexco",
    name: "BEXCO",
    city: "busan",
    category: "venue",
    categoryLabel: "Concert / Convention",
    lat: 35.1687,
    lng: 129.1363,
    blurb: "Busan's main exhibition and convention center — main stage for the annual Busan One Asia Festival (BOF), a K-pop festival co-organized by SM Culture & Contents.",
    address: "55 APEC-ro, Haeundae-gu, Busan",
  },
  {
    id: "busan-cinema-center",
    name: "Busan Cinema Center",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.1697,
    lng: 129.1289,
    blurb: "Striking rooftop-canopy venue that hosts the Busan International Film Festival (BIFF) — red carpet events regularly draw idol-actors and their fans.",
    address: "1467 U-dong, Haeundae-gu, Busan",
  },
  {
    id: "gamcheon-culture-village",
    name: "Gamcheon Culture Village",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.0973,
    lng: 129.0106,
    blurb: "Colorful hillside village turned open-air art district — also known among fans for murals of BTS members painted by visiting fans over the years.",
    address: "203 Gamnae 2-ro, Saha-gu, Busan",
  },
  {
    id: "dadaepo-beach",
    name: "Dadaepo Beach",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.0486,
    lng: 128.9690,
    blurb: "Wide sunset beach with wooden boardwalks — a fan pilgrimage spot since BTS's Jimin shared making New Year's wishes here in 2016.",
    address: "14 Morundae 1-gil, Dadae-dong, Saha-gu, Busan",
  },
  {
    id: "zm-illennial-cafe",
    name: "ZM-illennial Cafe",
    city: "busan",
    category: "cafe",
    categoryLabel: "Cafe",
    lat: 35.1379,
    lng: 129.0943,
    blurb: "Cafe run by BTS member Jimin's father (formerly Magnate) — displays fan gifts and BTS memorabilia, and has hosted fan-facing events around BTS milestones.",
    address: "135 Jinnam-ro, Nam-gu, Busan",
  },
  {
    id: "jagalchi-market",
    name: "Jagalchi Market",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.0969,
    lng: 129.0305,
    blurb: "Korea's largest seafood market and a classic Busan landmark — featured in Korean film and a regular stop on Busan K-pop/K-culture fan tours.",
    address: "52 Jagalchihaean-ro, Jung-gu, Busan",
  },
  {
    id: "gwangalli-beach",
    name: "Gwangalli Beach",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.1532,
    lng: 129.1186,
    blurb: "Beach with a postcard view of Gwangan Bridge, lit up nightly — a favorite backdrop for K-pop content and the site of a BTS drone light show in June 2026.",
    address: "Gwangalli, Suyeong-gu, Busan",
  },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "agency", label: "Agencies" },
  { key: "shopping", label: "Shopping" },
  { key: "culture", label: "Culture" },
  { key: "cafe", label: "Cafes" },
  { key: "venue", label: "Venues" },
];

const CATEGORY_COLORS = {
  agency: "#8A5A3B",
  shopping: "#B8863B",
  culture: "#6B7A5E",
  cafe: "#A2607A",
  venue: "#3B5873",
};

// Per-category pin/card icons. Using these (not the first letter of
// categoryLabel) avoids collisions — "Culture", "Cafe" and every Venue
// label ("Concert Venue", "Concert / Broadcast", ...) all start with "C".
const CATEGORY_ICONS = {
  agency: "🏢",
  shopping: "🛍️",
  culture: "🏛️",
  cafe: "☕",
  venue: "🎤",
};
