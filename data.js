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
//
// Jeju note: added Oct 2026, deliberately starting with Culture only.
// Researched a Jeju cafe angle too (idol-family/idol-run businesses, same
// pattern as Thanks Nature Cafe / ZM-illennial Cafe) — the one real
// candidate, musician Lee Sang-soon's (Lee Hyori's husband) cafe
// "Longplay" in Gujwa-eup, closed in Apr 2024 after 2 years (part of a
// broader wave — 252 Jeju cafes closed in 2024, a record high), so it's
// NOT included. No K-pop idol was found to be from Jeju or running a
// family business there either. Agencies/concert venues don't apply —
// Jeju has no agency HQs and sees very little large-scale K-pop touring
// given the logistics of an island. Revisit the cafe gap in a future pass.
//
// Busan/Goyang/Incheon Cafe+Culture pass (Oct 2026): widened scope to
// K-culture-adjacent spots, same lens as Seoul's Onion/K-Star Road pass.
// Found one solid culture add each for Busan (hwangnyeongsan) and Goyang
// (goyang-rm-mural, RM's hometown connection). A second Busan cafe was
// searched for and not found. Incheon came up empty on both counts this
// pass — a Minji-from-Incheon hometown lead didn't check out on
// verification.
//
// Incheon follow-up pass (Oct 2026): found a culture add —
// incheon-asiad-stadium, NewJeans' "Attention" MV filming location,
// corroborated by Incheon's own tourism office. Cafe search retried via
// the Incheon-native-idol angle (Minho/SHINee, Hyoyeon/Girls' Generation
// are both confirmed Incheon-born) — no family-run business found for
// either, so the cafe gap remains; revisit in a future pass.

const CITIES = [
  { key: "seoul", label: "Seoul", center: [37.5505, 126.99], zoom: 12 },
  { key: "busan", label: "Busan", center: [35.1595, 129.0756], zoom: 12 },
  { key: "goyang", label: "Goyang", center: [37.6729, 126.7445], zoom: 13 },
  { key: "incheon", label: "Incheon", center: [37.4674, 126.5283], zoom: 11 },
  { key: "jeju", label: "Jeju", center: [33.33, 126.45], zoom: 10 },
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
    // Added Oct 2026 — "더 많은 스팟 추가" / "나머지 기획사들도 올려" pass. Not SM's
    // Seongsu HQ (D-Tower) — this is SM's separate production/recording
    // studio in Gangnam, where fansigns and comeback promo events are
    // regularly held. Google lists it with 4,200+ reviews, more than any
    // other agency building on this map, which tracks with it being a
    // well-known fan gathering spot in its own right. Verified via Google's
    // own listing for "SM엔터테인먼트 스튜디오센터" (Plus Code 8Q99G3H2+48M),
    // domain smtown.com confirmed.
    id: "sm-studio-center",
    name: "SM Entertainment Studio Center",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.527838,
    lng: 127.050797,
    placeCid: "12645987624944663126",
    blurb: "SM's production/recording studio in Gangnam, separate from the Seongsu HQ — a long-running fan gathering spot for fansigns and comeback promotions.",
    address: "114 Seolleung-ro 190-gil, Gangnam-gu, Seoul",
  },
  {
    // Added Oct 2026. Same Yongsan Trade Center complex as hybe-hq above
    // (coordinates land within ~50m of it) — ADOR is a HYBE label, not a
    // separate building. Verified via Google's "어도어" listing (Plus Code
    // 8Q98GXF7+VPW), domain ador.world confirmed.
    id: "ador",
    name: "ADOR",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.524738,
    lng: 126.964328,
    placeCid: "7871264265742838178",
    blurb: "HYBE's NewJeans label, based in the same Yongsan Trade Center complex as HYBE HQ — exterior only, no public entry.",
    address: "42 Hangang-daero, Yongsan-gu, Seoul",
  },
  {
    // Added Oct 2026. Same HYBE/Yongsan Trade Center complex as hybe-hq.
    // Verified via Google's "쏘스뮤직" listing (Plus Code 8Q98GXF7+QMX),
    // domain sourcemusic.com confirmed.
    id: "source-music",
    name: "Source Music",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.524488,
    lng: 126.964234,
    placeCid: "9366497415417202892",
    blurb: "HYBE's LE SSERAFIM label, based in the same Yongsan Trade Center complex as HYBE HQ — exterior only, no public entry.",
    address: "42 Hangang-daero, Yongsan-gu, Seoul",
  },
  {
    // Added Oct 2026. Same HYBE/Yongsan Trade Center complex as hybe-hq.
    // Verified via Google's "빌리프랩" listing (Plus Code 8Q98GXF7+RP9),
    // domain beliftlab.com confirmed.
    id: "belift-lab",
    name: "Belift Lab",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.524537,
    lng: 126.964359,
    placeCid: "2807343437586447066",
    blurb: "HYBE's ENHYPEN label, based in the same Yongsan Trade Center complex as HYBE HQ — exterior only, no public entry.",
    address: "42 Hangang-daero, Yongsan-gu, Seoul",
  },
  {
    // Added Oct 2026. Same HYBE/Yongsan Trade Center complex as hybe-hq —
    // but unlike ador/source-music/belift-lab, this one has its own
    // street-level entrance with visible "PLEDIS" signage (confirmed via
    // the listing's own storefront photo). Verified via Google's
    // "플레디스엔터테인먼트" listing (Plus Code 8Q98GXF7+VM9), domain
    // pledis.co.kr confirmed.
    id: "pledis",
    name: "Pledis Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.524663,
    lng: 126.964234,
    placeCid: "4423944542037532638",
    blurb: "HYBE's SEVENTEEN and NU'EST label — a dedicated street-level building with visible PLEDIS signage, a popular exterior photo stop.",
    address: "42 Hangang-daero, Yongsan-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "스타쉽엔터테인먼트" listing
    // (Plus Code 8Q99G2FX+3HR), domain starship-ent.com confirmed.
    id: "starship",
    name: "Starship Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.522738,
    lng: 127.048891,
    placeCid: "3086743827876969422",
    blurb: "Home to IVE, Monsta X, Cravity and more, in Cheongdam — exterior only, no public entry.",
    address: "4-5 Samseong-ro 146-gil, Gangnam-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "큐브엔터테인먼트" listing (Plus
    // Code 8Q99G3W3+794) — storefront photo shows clear "CUBE
    // ENTERTAINMENT" signage. Domain cubeent.co.kr confirmed.
    id: "cube",
    name: "Cube Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.545637,
    lng: 127.053453,
    placeCid: "3574919407948452786",
    blurb: "Home to (G)I-DLE, BTOB and more — storefront-level building with clear CUBE ENTERTAINMENT signage, near Seongsu.",
    address: "83 Achasan-ro, Seongdong-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "FNC엔터테인먼트" listing (Plus
    // Code 8Q99G2HX+2X5), domain confirmed via listing's own website link.
    id: "fnc",
    name: "FNC Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.527513,
    lng: 127.049984,
    placeCid: "3823376765188789805",
    blurb: "Home to SF9 and FNC's acting roster — exterior only, no public entry.",
    address: "46 Dosan-daero 85-gil, Gangnam-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "RBW 엔터테인먼트" listing (Plus
    // Code 8Q99H39C+H44), domain rbbridge.com (RBW's parent company)
    // confirmed. Located in Dongdaemun-gu, not Gangnam like most agencies.
    id: "rbw",
    name: "RBW Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.568888,
    lng: 127.070328,
    placeCid: "16494609962765781815",
    blurb: "Home to Mamamoo, Oneus and Onewe — exterior only, in Dongdaemun-gu, a bit off the usual Gangnam/Yongsan agency circuit.",
    address: "7 Janghan-ro 20-gil, Dongdaemun-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "WAKEONE Entertainment" listing
    // (Plus Code 8Q98GWWH+85W), domain wake-one.com confirmed.
    id: "wakeone",
    name: "WAKEONE Entertainment",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.545862,
    lng: 126.927953,
    placeCid: "2028545611017023193",
    blurb: "Home to ZEROBASEONE — exterior only, no public entry.",
    address: "153 Tojeong-ro, Mapo-gu, Seoul",
  },
  {
    // Added Oct 2026. Verified via Google's "피네이션" listing (Plus Code
    // 8Q99G29G+WHQ), domain pnation.com confirmed.
    id: "p-nation",
    name: "P NATION",
    city: "seoul",
    category: "agency",
    categoryLabel: "Agency (exterior)",
    lat: 37.519838,
    lng: 127.026484,
    placeCid: "603840989169456954",
    blurb: "PSY's label, also home to Jessi and more — exterior only, in southern Gangnam.",
    address: "21 Nonhyeon-ro 151-gil, Gangnam-gu, Seoul",
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
    // RESOLVED Oct 2026 — flagged earlier the same day as possibly closed,
    // because Google had a separate "홍대 라인프렌즈 스토어" listing marked
    // "폐업함." Turned out to be a stale duplicate: the actual store at this
    // same address (141 Yanghwa-ro) is alive and well, just re-listed under
    // its current brand name "케이팝 스퀘어 홍대" / LINE FRIENDS SQUARE
    // (linefriendssquare.com) — confirmed by the listing's own storefront
    // photo, which shows a large lit-up "LINE FRIENDS" sign. 4.7★ (1,302
    // reviews), open daily until 10pm. Coordinates refined to Google's
    // anchor point, Plus Code 8Q98HW4C+6J9.
    id: "line-friends-hongdae",
    name: "LINE FRIENDS SQUARE Hongdae",
    city: "seoul",
    category: "shopping",
    categoryLabel: "Shopping",
    lat: 37.555537,
    lng: 126.921609,
    // Google's CID for the "케이팝 스퀘어 홍대" (LINE FRIENDS SQUARE) listing.
    placeCid: "2270385078175387144",
    blurb: "Multi-floor character store in Hongdae (inside L7 Hongdae) with a dedicated BT21 (BTS) section plus official merch corners for other groups — now operating under the name LINE FRIENDS SQUARE.",
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
  {
    // Added Oct 2026. Free K-culture experience center run by the Korea
    // Tourism Organization at its Seoul Center — found while researching
    // this batch; confirmed still operating (4.6★, 1,159 reviews) via
    // Google's "하이커 그라운드" listing (Plus Code 8Q98HX9J+CPQ).
    id: "hikr-ground",
    name: "HiKR Ground",
    city: "seoul",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.568588,
    lng: 126.981859,
    placeCid: "16102048317544180866",
    blurb: "Free K-culture experience center run by the Korea Tourism Organization — K-pop dance challenges, XR photo zones, and music-video green-screen booths.",
    address: "40 Cheonggyecheon-ro, Jung-gu, Seoul",
  },
  {
    // Added Oct 2026. Mnet/CJ ENM's broadcast center in Sangam DMC, where
    // M Countdown is filmed — rounds out the KBS Music Bank / SBS Inkigayo
    // pair above into the full weekly-music-show trio. Verified via
    // Google's "CJ ENM" listing (Plus Code 8Q98HVHR+CJ8), right next to the
    // SBS Prism Tower pin on the map.
    id: "cj-enm-center",
    name: "CJ ENM Center (Mnet)",
    city: "seoul",
    category: "venue",
    categoryLabel: "Concert / Broadcast",
    lat: 37.578538,
    lng: 126.891578,
    placeCid: "6008577960837327191",
    blurb: "Mnet's broadcast center in Sangam DMC, where M Countdown is filmed — right next to SBS's Prism Tower.",
    address: "66 Sangamsan-ro, Mapo-gu, Seoul",
  },
  {
    // Added Oct 2026 — Cafe and Culture were thin relative to Agencies
    // (15 agency pins vs. 1 cafe / 3 culture), so this batch widens scope
    // from strictly K-pop-run spots to K-culture-adjacent hotspots fans
    // visit as part of the same trip, per Boss's go-ahead. Gangnam-gu's
    // official Hallyu walking trail along Dosan-daero (Cheongdam-dong to
    // Apgujeong Rodeo Station), lined with large "Gangnamdol" art-toy
    // statues honoring top K-pop acts. This pin marks the BTS statue —
    // confirmed via Google's "BTS GangnamDol" listing (Plus Code
    // 8Q99G2GV+PWX, 4.3★, 52 reviews) — the best-anchored single POI
    // along the trail; walk the street to find the others (Girls'
    // Generation, EXO, and more).
    id: "k-star-road-gangnamdol",
    name: "K-Star Road (Gangnamdol Statues)",
    city: "seoul",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.526863,
    lng: 127.044859,
    placeCid: "6855479743375263331",
    blurb: "Gangnam-gu's official Hallyu walking trail along Dosan-daero, lined with large \"Gangnamdol\" art-toy statues honoring top K-pop acts. This pin marks the BTS statue in Cheongdam-dong — keep walking toward Apgujeong Rodeo Station to find Girls' Generation, EXO, and more.",
    address: "141-14 Cheongdam-dong, Gangnam-gu, Seoul",
  },
  {
    // Added Oct 2026, same Cafe-section reinforcement as k-star-road-
    // gangnamdol above. The original branch that kicked off Seongsu-dong's
    // reinvention — the existing seongsu-dong pin already calls the
    // neighborhood "a magnet for idol sightings and brand pop-ups," and
    // this is its best-known anchor cafe. Confirmed via Google's "어니언
    // 성수점" listing (Plus Code 8Q99G3V5+V7W, 4.2★, 3,542 reviews, still
    // operating).
    id: "onion-seongsu",
    name: "Onion Seongsu",
    city: "seoul",
    category: "cafe",
    categoryLabel: "Cafe",
    lat: 37.544738,
    lng: 127.058203,
    placeCid: "16399518467326764911",
    blurb: "Industrial-chic bakery cafe in a converted 1970s factory — the original branch that kicked off Seongsu-dong's reinvention as Seoul's trendiest neighborhood (now also SM's home turf), and a steady magnet for content shoots and idol sightings.",
    address: "8 Achasan-ro 9-gil, Seongdong-gu, Seoul",
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
  {
    // Added Oct 2026 — Busan/Goyang/Incheon cafe+culture pass, same lens
    // as the Seoul widen-to-K-culture-adjacent pass. Searched hard for a
    // second Busan cafe (another idol-family business, same pattern as
    // zm-illennial-cafe) and came up empty — so this is a culture add
    // instead. A standing, independently famous Busan night-view landmark
    // (427m, view of Gwangan Bridge) that ALSO got a one-off purple-light
    // tribute during BTS's free Oct 2022 Busan Expo-bid concert (reported
    // alongside the stadium and the New Port promotion booth as the
    // city's "Purple Road"). The lights were a 2022 one-off; the
    // beacon-mound viewpoint itself is permanent and not an event space,
    // so unlike the excluded ARIRANG pop-ups this is listed as a normal
    // standing spot, not a time-limited one. Verified via Google's "황령산
    // 봉수대" listing (Plus Code 8Q7F534J+RRW, 4.7★, 3,947 reviews, 24hr).
    id: "hwangnyeongsan",
    name: "Hwangnyeongsan Beacon Mound",
    city: "busan",
    category: "culture",
    categoryLabel: "Culture",
    lat: 35.157113,
    lng: 129.082078,
    placeCid: "9894731693206159625",
    blurb: "Busan's best-known night-view peak (427m), overlooking Gwangan Bridge — lit purple for a night during BTS's free 2022 Busan Expo-bid concert, part of the city's \"Purple Road\" tribute alongside the stadium itself.",
    address: "San 50-1, Daeyeon-dong, Nam-gu, Busan",
  },

  // ---- Goyang ----
  {
    // Added Oct 2026. Verified via Google's "고양종합운동장" listing
    // (Plus Code 8Q98MPGV+H64). Promoted by Goyang's own mayor as a
    // "K-culture 성지" (K-culture pilgrimage site) in 2025-2026 coverage —
    // hosted G-Dragon, BLACKPINK, and Coldplay stadium concerts. Distinct
    // from the adjacent 고양종합운동장 보조경기장 (auxiliary stadium),
    // same main-vs-auxiliary distinction checked for busan-asiad-stadium.
    id: "goyang-stadium",
    name: "Goyang Stadium",
    city: "goyang",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 37.676388,
    lng: 126.743078,
    placeCid: "17157002227709954818",
    blurb: "Goyang's main stadium and a fast-rising K-pop mega-concert venue, having hosted G-Dragon, BLACKPINK, and Coldplay stadium shows.",
    address: "1601 Jungang-ro, Ilsanseo-gu, Goyang",
  },
  {
    // Added Oct 2026. Verified via Google's "킨텍스 제1전시장" listing
    // (Plus Code 8Q98MP9W+H9R), kintex.com confirmed. KINTEX is a
    // multi-hall complex (Hall 1 / Hall 2 / Hall 3A); Hall 1 is used here
    // as the representative, most-reviewed building, same pattern as the
    // HYBE/Yongsan complex entries. Long-running home of KCON Korea and
    // other major K-pop conventions/concerts — note: MAMA 2026 is
    // confirmed to be held in Osaka, Japan, not here, so that event is
    // intentionally not referenced in the blurb.
    id: "kintex",
    name: "KINTEX",
    city: "goyang",
    category: "venue",
    categoryLabel: "Concert / Convention",
    lat: 37.668988,
    lng: 126.745891,
    placeCid: "13858383688022604352",
    blurb: "Korea's largest convention center and a long-running home of KCON Korea, plus major K-pop concerts and fan conventions throughout the year.",
    address: "217-60 Kintex-ro, Ilsanseo-gu, Goyang",
  },
  {
    // Added Oct 2026 — same Busan/Goyang/Incheon cafe+culture pass as
    // hwangnyeongsan above. RM (BTS) grew up in Ilsan, Goyang, and the
    // city leaned into that for its own tourism marketing ahead of the
    // Goyang Stadium BTS-adjacent concert season: a large RM mural on the
    // Goyang Tourist Information Center's exterior wall, the starting
    // point of an official city "star course" walking route through spots
    // tied to his youth (Ilsan Lake Park, La Festa/Western Dome shopping,
    // Bamnidan-gil), confirmed via Korean press (Hankyung, Apr 2026).
    // Pinned at the Information Center itself, the course's fixed anchor
    // point, rather than the informal multi-stop route. Verified via
    // Google's "고양관광정보센터" listing (Plus Code 8Q98MQ5F+Q6W, 4.2★, 23
    // reviews, operating).
    id: "goyang-rm-mural",
    name: "Goyang Tourist Info Center (RM Mural)",
    city: "goyang",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.659488,
    lng: 126.773078,
    placeCid: "7418265619931547844",
    blurb: "A large mural of BTS's RM — who grew up in Ilsan, Goyang — covers the Goyang Tourist Information Center's exterior wall, marking the start of the city's official \"star course\" walking route through spots tied to his youth.",
    address: "1271-1 Jungang-ro, Ilsandong-gu, Goyang",
  },

  // ---- Incheon ----
  {
    // Added Oct 2026. Verified via Google's "인천국제공항" listing (Plus
    // Code 8Q98FC5R+FQ8). Korea's main international gateway and a
    // long-documented site of "airport fashion" fan culture — idols'
    // arrival/departure outfits are closely watched by fans and press, and
    // the airport has repeatedly made news (incl. a 2024 "celebrity
    // entrance" proposal that was scrapped after backlash) over how to
    // manage the fan crowds that gather here. Pinned at the airport's own
    // Google anchor point, not a specific terminal/gate.
    id: "incheon-airport",
    name: "Incheon International Airport",
    city: "incheon",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.458663,
    lng: 126.441953,
    placeCid: "10181407952118529748",
    blurb: "Korea's main international gateway and the epicenter of \"airport fashion\" culture — idols' arrival and departure outfits are closely tracked by fans and press, and crowds regularly gather here around major group comings and goings.",
    address: "272 Gonghang-ro, Jung-gu, Incheon",
  },
  {
    // Added Oct 2026. Verified via Google's "상상플랫폼" listing (Plus Code
    // 8Q98FJG7+FR5), domain sangsangplatform.or.kr confirmed. A converted
    // warehouse cultural space near Wolmido/Incheon Chinatown that hosts
    // the city's own long-running INK (Incheon K-POP) Concert each autumn
    // at its outdoor plaza — the 16th edition ran Oct 25, 2025 with
    // BOYNEXTDOOR, KISS OF LIFE and others. Year-round cultural venue, not
    // a one-off pop-up, so listed as a standing spot rather than a
    // time-limited event.
    id: "sangsang-platform",
    name: "Sangsang Platform",
    city: "incheon",
    category: "venue",
    categoryLabel: "Concert / Culture",
    lat: 37.476138,
    lng: 126.614609,
    placeCid: "5521682040626759256",
    blurb: "Converted-warehouse cultural space near Wolmido and Incheon Chinatown — its outdoor plaza hosts the city's own INK (Incheon K-POP) Concert every autumn, drawing a rotating lineup of current idol groups.",
    address: "33 Wolmi-ro, Jung-gu, Incheon",
  },
  {
    // Added Oct 2026 — reinforcement pass for Busan/Goyang/Incheon.
    // Verified via Google's "인스파이어 아레나" listing (Plus Code
    // 8Q98F98R+M6X), domain inspireresorts.com confirmed. A major indoor
    // arena at the Inspire Entertainment Resort on Yeongjongdo, a short
    // ride from Incheon Airport — hosts HYBE's own annual Weverse Con
    // festival (2024 and 2025 editions) plus standalone concerts (LE
    // SSERAFIM's 2025 spring lineup, Xdinary Heroes' sold-out 2026 show).
    // Currently one of the most active K-pop concert venues to open in
    // Korea since 2024, not a one-off event space.
    id: "inspire-arena",
    name: "Inspire Arena",
    city: "incheon",
    category: "venue",
    categoryLabel: "Concert Venue",
    lat: 37.466738,
    lng: 126.390609,
    placeCid: "1254261659163781375",
    blurb: "Major arena at the Inspire Entertainment Resort on Yeongjongdo, near Incheon Airport — hosts HYBE's own annual Weverse Con festival plus a steady stream of standalone K-pop concerts (LE SSERAFIM, Xdinary Heroes and more).",
    address: "127 Gonghangmunhwa-ro, Jung-gu, Incheon",
  },
  {
    // Added Oct 2026 — second Incheon cafe/culture pass. A cafe candidate
    // was searched again (idol-family business, Incheon-native-idol
    // angle via Minho/SHINee and Hyoyeon/Girls' Generation, both
    // confirmed Incheon-born) and still came up empty — no verifiable
    // business ownership found, so this is a culture add instead. Korean
    // press (Informatics View travel site, Oct 2024) reports NewJeans'
    // debut MV "Attention" (2022) was filmed here; independently
    // corroborated by Incheon's own official tourism site
    // (eng-itour.incheon.go.kr), which lists the stadium as the final
    // stop on a site-visit tour specifically because of the "Attention"
    // shoot. Built for the 2014 Incheon Asian Games, still an active
    // public venue. Verified via Google's "인천아시아드주경기장" listing
    // (Plus Code 8Q98GMX8+3J5, 4.3★, 1,504 reviews, operating).
    id: "incheon-asiad-stadium",
    name: "Incheon Asiad Main Stadium",
    city: "incheon",
    category: "culture",
    categoryLabel: "Culture",
    lat: 37.547637,
    lng: 126.666609,
    placeCid: "14132670497398556508",
    blurb: "Centerpiece stadium built for the 2014 Incheon Asian Games — the filming location for NewJeans' debut music video \"Attention\" (2022), confirmed by Incheon's own tourism office, which includes it as a stop on an official site-visit tour.",
    address: "379-2 Yeonhui-dong, Seo-gu, Incheon",
  },

  // ---- Jeju ----
  {
    // Added Oct 2026 — new city, Culture-only to start (see the Jeju note
    // near CITIES above for why no Cafe entry). Confirmed via multiple
    // Korean entertainment-press reports (Seoul Shinmun, May 2024) that
    // this beach is the filming location for NewJeans' "Bubble Gum" music
    // video (30M+ views). Verified via Google's "황우치해안" listing (Plus
    // Code 8Q5868P8+WQQ, 4.3★, 22 reviews).
    id: "hwangwuchi-beach",
    name: "Hwangwuchi Beach",
    city: "jeju",
    category: "culture",
    categoryLabel: "Culture",
    lat: 33.237338,
    lng: 126.316984,
    placeCid: "12898838176534340394",
    blurb: "Quiet volcanic-rock beach in Andeok-myeon, best known to fans as the filming location for NewJeans' \"Bubble Gum\" music video.",
    address: "Sagye-ri, Andeok-myeon, Seogwipo, Jeju",
  },
  {
    // Added Oct 2026. Garden/cafe venue confirmed via Korean press (Seoul
    // Shinmun, Aug 2025) as the filming site for BTS member Jin's variety
    // show "Handsomes" (핸썸즈) — and, not coincidentally, the official Sept
    // 2025 venue for Jeju province's own Hallyu fan-tourism festival
    // ("Purple Festa"), run specifically because of that Jin connection.
    // Verified via Google's "베케" listing (Plus Code 8Q587J63+PP4, 4.4★,
    // 712 reviews, operating).
    id: "becke-garden",
    name: "Becke Garden",
    city: "jeju",
    category: "culture",
    categoryLabel: "Culture",
    lat: 33.261763,
    lng: 126.604328,
    placeCid: "9910919085685905836",
    blurb: "Sprawling private garden and cafe in Seogwipo, used as a filming site for BTS Jin's variety show \"Handsomes\" — and the venue Jeju province chose for its own Hallyu fan-tourism festival in 2025 because of it.",
    address: "48 Hyodon-ro, Seogwipo, Jeju",
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
