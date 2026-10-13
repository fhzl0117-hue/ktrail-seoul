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
    // Corrected Oct 2026 — the old coordinates (37.5326, 126.9653) landed
    // ~900m north, up around Yongsan Electronics Market, while the real
    // building (Yongsan Trade Center) sits much further south near Sinyongsan
    // Station. Pulled directly from Google's own listing for "하이브 본사"
    // (Plus Code 8Q98GXF7+QJ, decoded via Open Location Code) — Google's own
    // anchor point for the building, not a re-derived estimate.
    lat: 37.524438,
    lng: 126.964063,
    // Google's CID for the "하이브 본사" listing — lets the Directions button
    // deep-link straight to the real place card (photo, hours, rating)
    // instead of a bare coordinate pin. See placeCid note on sm-hq below.
    placeCid: "13144725326438441994",
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
    // Refined again Oct 2026 — pulled directly from Google's own listing for
    // "SM엔터테인먼트" (Plus Code 8Q99G2VV+QG) to land exactly on the building
    // instead of the neighboring one (the prior estimate was already close,
    // off by ~30m, but still landed one building over).
    lat: 37.544438,
    lng: 127.043813,
    // Google's CID (a stable per-place numeric id, found via the place's
    // own Google Maps URL) for the "SM엔터테인먼트" listing. Used by the
    // Directions button (maps?cid=...) to open the real place card
    // directly — unlike name-based matching, a CID can't silently resolve
    // to the wrong listing (see app.js for what that bug looked like).
    placeCid: "13360487032937613638",
    blurb: "SM's current headquarters near Seoul Forest, after moving from Gangnam. Distinctive facade is a popular exterior photo spot — no public tours of the building itself.",
    address: "83-21 Wangsimni-ro, Seongdong-gu, Seoul",
  },
  {
    id: "kwangya-seongsu",
    name: "KWANGYA@SEONGSU",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    // Refined Oct 2026 — pulled directly from Google's own "KWANGYA" listing
    // (Plus Code 8Q99G2VV+XF4) rather than reusing sm-hq's coordinates; the
    // store sits a few doors from SM HQ, not in the same footprint.
    lat: 37.544888,
    lng: 127.043703,
    // Google's CID for the "KWANGYA" listing.
    placeCid: "5833447494692811602",
    blurb: "SM's official fixed-location store near its Seongsu HQ — merch for EXO, NCT, aespa and the rest of the roster, plus occasional artist pop-up events.",
    address: "Seongsu-dong, Seongdong-gu, Seoul",
  },
  {
    id: "jyp-hq",
    name: "JYP Entertainment HQ",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    // Corrected Oct 2026, then corrected AGAIN same day — first pass used
    // Google's "JYP ENTERTAINMENT" listing (Plus Code 8Q99G4FH+HJR), which
    // turned out to be geotagged at the Gangdong-daero/Olympic Park site
    // for JYP's planned new headquarters. A news search (Oct 8, 2026
    // reporting) found that project was CANCELLED — JYP is staying at its
    // existing Seongnae-dong office instead, so that Olympic Park pin was
    // never right to begin with. Re-anchored to JYP Training Center (Plus
    // Code 8Q99G4JF+424), part of the real Seongnae-dong compound right by
    // Gangdong-gu Office Station — matching the address this entry already
    // had before either "fix."
    lat: 37.530263,
    lng: 127.122578,
    // Google's CID for the "JYP Training Center" listing at this address —
    // the Seongnae-dong compound itself isn't separately indexed as "JYP
    // headquarters" on Google, so this is the closest verified, correctly
    // located listing to deep-link the Directions button to.
    placeCid: "6067173456796752006",
    blurb: "JYP's headquarters in Seongnae-dong, near Gangdong-gu Office Station — the company scrapped a planned move to a new Godeok-dong building in Oct 2026 and is staying put, expanding into neighboring buildings instead. Exterior photo spot only.",
    address: "17 Seongnae-ro, Gangdong-gu, Seoul",
  },
  {
    id: "yg-hq",
    name: "YG Entertainment HQ",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    // Corrected Oct 2026 — the old coordinates (37.5497, 126.9138) landed
    // almost exactly on Hapjeong Station, ~500m east of the real building.
    // Refined again Oct 2026 — pulled directly from Google's own listing
    // for "YG 엔터테인먼트" (Plus Code 8Q98GWX5+H4, decoded via the Open
    // Location Code algorithm), which is the exact anchor point Google Maps
    // itself uses for the building. The earlier estimate (37.5489, 126.9079,
    // from Wikipedia + two independent POI sources) was already close, but
    // this value is Google's own ground truth for the place.
    lat: 37.548938,
    lng: 126.907813,
    // Google's CID for the "YG 엔터테인먼트" listing.
    placeCid: "6942462994394796577",
    blurb: "YG's Hapjeong headquarters, expanded with a newer building alongside the original. The exterior and logo sign are a regular stop on fan walking routes.",
    address: "7 Huiujeong-ro 1-gil, Mapo-gu, Seoul",
  },
  {
    id: "yg-republique",
    name: "Same Cafe (더세임)",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    // Renamed + corrected Oct 2026. Previously listed as "YG Republique /
    // Same Cafe" at generic Hapjeong-dong coordinates (37.5495, 126.9140) —
    // left uncorrected in the earlier coordinate pass specifically because
    // "YG Republique" collides on Google with an unrelated Korean steakhouse
    // chain of the same name, and guessing wrong seemed worse than leaving
    // it approximate. Found the real listing by searching the storefront
    // signage instead: Google lists the actual shop (right next door to
    // YG HQ, confirmed by its own photo showing "ZM-ILLENNIAL"-style branded
    // signage reading "SameE") as "더세임 (theSameE)," Plus Code 8Q98GWX5+P34 —
    // the old coordinates were ~560m off, out near Hapjeong Station.
    lat: 37.549262,
    lng: 126.907703,
    // Google's CID for the "더세임 (theSameE)" listing.
    placeCid: "13184743900771831046",
    blurb: "Official merch shop right next to YG's building — BLACKPINK, BIGBANG, TREASURE and more. Branded on-site as \"더세임 (theSameE)\"; the old 'YG Republique' name is best avoided when searching, since it collides with an unrelated steakhouse chain.",
    address: "6-3 Huiujeong-ro 1-gil, Mapo-gu, Seoul",
  },
  {
    // Left coordinate-only on purpose (no placeCid) — this is a shopping
    // district, not a single Google-listed place. Pinning it to the CID of
    // one storefront inside it would misrepresent the spot the same way the
    // old agency bugs did, just in the other direction.
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
    // Area, not a single POI — same reasoning as myeongdong-street above;
    // intentionally left without a placeCid.
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
    // FLAGGED Oct 2026, not yet resolved — checked this against Google's own
    // listing while CID-matching the rest of the map, and the Hongdae LINE
    // FRIENDS store shows "폐업함" (permanently closed) on Google Maps. A
    // follow-up search found the Gangnam and Sinsa flagship stores are ALSO
    // marked closed — this looks like a chain-wide pullback from big Seoul
    // physical stores (LINE FRIENDS has been closing retail elsewhere too,
    // e.g. China), not a one-off. Left in place pending a decision on
    // whether to remove this spot or swap in a still-open alternative —
    // do not add a placeCid here, since deep-linking to a closed listing
    // would just repeat the kind of bug this whole pass was fixing.
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
    // Corrected Oct 2026 — the old coordinates were ~300m off from Google's
    // own listing for "땡스 네이쳐 카페" (Plus Code 8Q98HW3F+9G3); still open,
    // still in Hongdae, just the wrong building.
    lat: 37.553387,
    lng: 126.923797,
    // Google's CID for the "땡스 네이쳐 카페" listing.
    placeCid: "5293001072268168222",
    blurb: "Long-running sheep-themed cafe in Hongdae linked to BTOB's Yook Sungjae's family — a well-known idol-adjacent fan stop.",
    address: "10 Hongik-ro, Mapo-gu, Seoul",
  },
  {
    id: "kbs-music-bank",
    name: "KBS Music Bank Hall",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert / Broadcast",
    // Corrected Oct 2026 — the old coordinates (37.5305, 126.8991) actually
    // sit west of Yeouido, nowhere near KBS. Re-anchored to Google's listing
    // for "KBS 별관" (the KBS Annex/New Wing, home of the Open Hall where
    // Music Bank is actually filmed — not the main KBS building next door),
    // Plus Code 8Q98GW9H+CV2.
    lat: 37.518512,
    lng: 126.929641,
    // Google's CID for the "KBS 별관" listing.
    placeCid: "1155635602800723877",
    blurb: "Home of KBS Music Bank tapings, recorded Fridays, at the KBS Annex (별관) building. Check official ticketing/fan-cafe windows before your trip — slots fill fast around comebacks.",
    address: "359 Yeouidaebang-ro, Yeongdeungpo-gu, Seoul",
  },
  {
    id: "sbs-inkigayo",
    name: "SBS Inkigayo (Prism Tower)",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert / Broadcast",
    // Corrected Oct 2026 — the old coordinates and address (Mokdongjungang-ro,
    // Yangcheon-gu) were SBS's OLD home before it relocated to Sangam-dong's
    // Digital Media City in 2014; the old Mok-dong building is no longer
    // SBS's broadcast center. Re-anchored to Google's listing for "SBS
    // 프리즘타워," Plus Code 8Q98HVHV+V4M — about 6km from where the old pin
    // was, a different district entirely.
    lat: 37.579712,
    lng: 126.892797,
    // Google's CID for the "SBS 프리즘타워" listing.
    placeCid: "6790277554703352457",
    blurb: "Home of SBS Inkigayo tapings, recorded Sundays, at SBS's Prism Tower broadcast center in Sangam-dong's Digital Media City.",
    address: "82 Sangamsan-ro, Mapo-gu, Seoul",
  },
  {
    id: "gocheok-skydome",
    name: "Gocheok Sky Dome",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    // Refined Oct 2026 against Google's own listing (Plus Code 8Q98FVX8+6RG)
    // — the old coordinates were already essentially correct, adjusted by
    // only a few meters.
    lat: 37.498063,
    lng: 126.867078,
    // Google's CID for the "고척스카이돔" listing.
    placeCid: "14016936797243767845",
    blurb: "Major indoor arena frequently hosting large-scale K-pop concerts and fan events.",
    address: "430 Gyeongin-ro, Guro-gu, Seoul",
  },
  {
    id: "kspo-dome",
    name: "KSPO Dome (Olympic Gym)",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    // Refined Oct 2026 against Google's own listing (Plus Code 8Q99G49G+MW9).
    lat: 37.519163,
    lng: 127.127359,
    // Google's CID for the "KSPO DOME 올림픽체조경기장" listing.
    placeCid: "4281451917961304730",
    blurb: "One of Seoul's most-used concert arenas inside Olympic Park, hosting fan meets and comeback showcases year-round.",
    address: "Olympic Park, Songpa-gu, Seoul",
  },
  {
    id: "jamsil-arena",
    name: "Jamsil Indoor Stadium",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert Venue",
    // Refined Oct 2026 against Google's own listing (Plus Code 8Q99G38F+H5X).
    lat: 37.516487,
    lng: 127.072984,
    // Google's CID for the "잠실실내체육관" listing.
    placeCid: "9434396273439886893",
    blurb: "Major indoor arena next to the Jamsil Sports Complex, regularly hosting concerts, fan meetings and award shows.",
    address: "Jamsil-dong, Songpa-gu, Seoul",
  },
  {
    // Neighborhood, not a single POI — intentionally left without a
    // placeCid, same reasoning as myeongdong-street/hongdae-busking above.
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
    // Refined Oct 2026 against Google's own listing for "부산아시아드 주경기장"
    // (Plus Code 8Q7F53R5+28W) — the old coordinates were already close,
    // adjusted by roughly 300m to land on the main stadium rather than the
    // adjacent auxiliary stadium.
    lat: 35.190112,
    lng: 129.058328,
    // Google's CID for the "부산아시아드 주경기장" listing.
    placeCid: "11763719727823849208",
    blurb: "Busan's largest stadium and the city's go-to K-pop mega-concert venue — hosted BTS's free 'Yet To Come' concert in 2022 and the 'ARIRANG' world tour stop in June 2026.",
    address: "344 World Cup-daero, Geoje-dong, Yeonje-gu, Busan",
  },
  {
    id: "bexco",
    name: "BEXCO",
    city: "busan",
    category: "venue",
    categoryLabel: "Concert / Convention",
    // Refined Oct 2026 against Google's own listing (Plus Code 8Q7F549P+HCV).
    lat: 35.168988,
    lng: 129.136047,
    // Google's CID for the "벡스코" listing.
    placeCid: "12926862440120636745",
    blurb: "Busan's main exhibition and convention center — main stage for the annual Busan One Asia Festival (BOF), a K-pop festival co-organized by SM Culture & Contents.",
    address: "55 APEC-ro, Haeundae-gu, Busan",
  },
  {
    id: "busan-cinema-center",
    name: "Busan Cinema Center",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    // Refined Oct 2026 against Google's own listing for "영화의전당"
    // (Plus Code 8Q7F54CG+FV8).
    lat: 35.171163,
    lng: 129.127203,
    // Google's CID for the "영화의전당" listing.
    placeCid: "11688726100284882033",
    blurb: "Striking rooftop-canopy venue that hosts the Busan International Film Festival (BIFF) — red carpet events regularly draw idol-actors and their fans.",
    address: "120 Suyeonggangbyeon-daero, Haeundae-gu, Busan",
  },
  {
    id: "gamcheon-culture-village",
    name: "Gamcheon Culture Village",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    // Refined Oct 2026 against Google's own listing for "감천문화마을"
    // (Plus Code 8Q7F32W6+X64).
    lat: 35.097387,
    lng: 129.010578,
    // Google's CID for the "감천문화마을" listing.
    placeCid: "10916164570297726627",
    blurb: "Colorful hillside village turned open-air art district — also known among fans for murals of BTS members painted by visiting fans over the years.",
    address: "203 Gamnae 2-ro, Saha-gu, Busan",
  },
  {
    id: "dadaepo-beach",
    name: "Dadaepo Beach",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    // Refined Oct 2026 against Google's own listing for "다대포해수욕장"
    // (Plus Code 8Q7C2XW8+QF9).
    lat: 35.046913,
    lng: 128.966234,
    // Google's CID for the "다대포해수욕장" listing.
    placeCid: "11454355034539952208",
    blurb: "Wide sunset beach with wooden boardwalks — a fan pilgrimage spot since BTS's Jimin shared making New Year's wishes here in 2016.",
    address: "14 Morundae 1-gil, Dadae-dong, Saha-gu, Busan",
  },
  {
    id: "zm-illennial-cafe",
    name: "ZM-illennial Cafe",
    city: "busan",
    category: "cafe",
    categoryLabel: "Cafe",
    // Corrected Oct 2026 — the old coordinates were ~1.3km off. Re-anchored
    // to Google's listing "지밀레니얼" (Plus Code 8Q7F43QJ+G3V) at the exact
    // same street address this entry already had (135 Jinnam-ro); confirmed
    // by the listing's own storefront photo, which shows "ZM-ILLENNIAL"
    // signage above the door.
    lat: 35.138863,
    lng: 129.080172,
    // Google's CID for the "지밀레니얼" listing.
    placeCid: "13463393972549992624",
    blurb: "Cafe run by BTS member Jimin's father (formerly Magnate) — displays fan gifts and BTS memorabilia, and has hosted fan-facing events around BTS milestones.",
    address: "135 Jinnam-ro, Nam-gu, Busan",
  },
  {
    id: "jagalchi-market",
    name: "Jagalchi Market",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    // Refined Oct 2026 against Google's own listing for "자갈치시장"
    // (Plus Code 8Q7F32WJ+M83).
    lat: 35.096637,
    lng: 129.030797,
    // Google's CID for the "자갈치시장" listing.
    placeCid: "5166631765211852909",
    blurb: "Korea's largest seafood market and a classic Busan landmark — featured in Korean film and a regular stop on Busan K-pop/K-culture fan tours.",
    address: "52 Jagalchihaean-ro, Jung-gu, Busan",
  },
  {
    id: "gwangalli-beach",
    name: "Gwangalli Beach",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    // Refined Oct 2026 against Google's own listing for "광안리해수욕장"
    // (Plus Code 8Q7F5439+7F7).
    lat: 35.153162,
    lng: 129.118672,
    // Google's CID for the "광안리해수욕장" listing.
    placeCid: "18405632102592812795",
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
