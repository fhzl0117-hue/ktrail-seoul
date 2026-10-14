// K-Trail Seoul — i18n (added Oct 2026, language-picker pass)
//
// Scope, deliberately: UI chrome only (nav, buttons, labels, About copy).
// Spot `name`, `blurb`, and `address` in data.js stay English in every
// language — translating ~58 researched, source-checked spot descriptions
// into 4 languages reliably (and keeping them in sync as spots are added)
// was out of scope for this pass. Revisit if demand shows up.
//
// Language is auto-detected from the visitor's browser/OS language
// (navigator.languages) on first visit — no manual step required — and
// can be overridden any time via the globe picker in the header, which is
// then remembered (localStorage) for that visitor. Falls back to English
// when the browser language isn't one of the four supported, since the
// app's existing audience (before this pass) was already all-English.

const SUPPORTED_LANGS = ["en", "ko", "ja", "zh"];
const LANG_LABELS = { en: "English", ko: "한국어", ja: "日本語", zh: "中文" };
const LANG_KEY = "ktrail_lang_v1";

let currentLang = "en";

function detectInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch (e) { /* storage unavailable — fall through to detection */ }
  const navLangs = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || "en"];
  for (const raw of navLangs) {
    const code = (raw || "").toLowerCase();
    if (code.startsWith("ko")) return "ko";
    if (code.startsWith("ja")) return "ja";
    // Matches zh, zh-CN, zh-SG, zh-Hans, zh-TW, zh-HK, zh-Hant alike —
    // this pass only has Simplified Chinese copy, so every zh-* variant
    // (Traditional included) gets routed to it rather than falling through
    // to English; revisit if Traditional-specific copy is ever added.
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) return "en";
  }
  return "en";
}

// ---- UI chrome strings ----
const UI_STRINGS = {
  en: {
    appSubtitle: "K-pop pilgrimage guide",
    themeToggleAria: "Toggle dark mode",
    langPickerAria: "Change language",
    searchPlaceholder: "Search spots…",
    offlineSaveAria: "Save current view for offline use",
    listEmpty: "No spots match your search.",
    savedEmpty: "No saved spots yet. Tap the star on any place to save it here.",
    tabMap: "Map",
    tabList: "List",
    tabSaved: "Saved",
    tabAbout: "About",
    sheetDirections: "Directions",
    sheetSaveDefault: "☆ Save",
    sheetSaveActive: "★ Saved",
    sheetShare: "🔗 Share",
    sheetLinkMoreInfo: "More info",
    installPromptText: "Install K-Trail Seoul for quick, offline-ready access",
    installIOSText: "Install this app: tap Share, then “Add to Home Screen”",
    installActionLabel: "Install",
    installDismissAria: "Dismiss",
    toastLinkCopied: "Link copied!",
    toastOfflineUnsupported: "This browser can't save for offline use",
    toastSavingProgress: "Saving offline view… {done}/{total}",
    toastSavedPartial: "Saved {ok}/{total} tiles ({failed} failed)",
    toastSavedFull: "Offline view saved — {n} tiles",
    aboutTitle: "About K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> is an offline-ready pilgrimage map for international K-pop fans visiting Korea, covering <strong>Seoul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> and <strong>Jeju</strong> — agency HQs, concert venues, cafes, culture spots, and now nearby stays and eats too. Every location is researched from public sources and cross-checked across 2+ sources where possible, but Korea's K-pop map moves fast (agencies relocate, venues change) — always verify hours, access and current addresses before relying on it to travel.",
    aboutP2: "Tip: on the Map tab, the download icon next to Search saves that view's map tiles for offline use — handy before you lose signal underground, on the subway, or abroad. It only saves what's on screen, not the whole city, to stay within OpenStreetMap's usage policy.",
    aboutP3: "Found something outdated or missing? This map keeps growing — more Stay/Eat coverage and additional cities are planned.",
    aboutPinsHeading: "What the pins mean",
    aboutBadge: "Part of the K-Wire Network",
  },
  ko: {
    appSubtitle: "K팝 성지순례 가이드",
    themeToggleAria: "다크 모드 전환",
    langPickerAria: "언어 변경",
    searchPlaceholder: "장소 검색…",
    offlineSaveAria: "현재 화면 오프라인 저장",
    listEmpty: "검색 결과와 일치하는 장소가 없어요.",
    savedEmpty: "저장한 장소가 아직 없어요. 장소의 별 아이콘을 눌러 저장해 보세요.",
    tabMap: "지도",
    tabList: "목록",
    tabSaved: "저장됨",
    tabAbout: "정보",
    sheetDirections: "길찾기",
    sheetSaveDefault: "☆ 저장",
    sheetSaveActive: "★ 저장됨",
    sheetShare: "🔗 공유",
    sheetLinkMoreInfo: "자세히 보기",
    installPromptText: "K-Trail Seoul을 설치하면 더 빠르고 오프라인에서도 쓸 수 있어요",
    installIOSText: "앱 설치하기: 공유 버튼을 누른 뒤 “홈 화면에 추가”를 선택하세요",
    installActionLabel: "설치",
    installDismissAria: "닫기",
    toastLinkCopied: "링크가 복사됐어요!",
    toastOfflineUnsupported: "이 브라우저에서는 오프라인 저장을 지원하지 않아요",
    toastSavingProgress: "오프라인 화면 저장 중… {done}/{total}",
    toastSavedPartial: "{ok}/{total} 타일 저장됨 ({failed}개 실패)",
    toastSavedFull: "오프라인 화면 저장 완료 — 타일 {n}개",
    aboutTitle: "K-Trail Seoul 소개",
    aboutP1: "<strong>K-Trail Seoul</strong>은 한국을 방문하는 해외 K팝 팬들을 위한 오프라인 지원 성지순례 지도예요. <strong>서울</strong>, <strong>부산</strong>, <strong>고양</strong>, <strong>인천</strong>, <strong>제주</strong>까지 다섯 도시의 소속사 본사, 공연장, 카페, 문화 스팟은 물론 이제 숙소와 맛집 정보까지 담고 있어요. 모든 장소는 공개된 출처를 바탕으로 조사했고 가능한 경우 2개 이상의 출처로 교차 확인했지만, 한국의 K팝 지형은 빠르게 바뀌어요(소속사 이전, 공연장 변경 등) — 이동 전에는 항상 운영시간·출입 가능 여부·현재 주소를 다시 확인하세요.",
    aboutP2: "팁: 지도 탭에서 검색창 옆의 다운로드 아이콘을 누르면 현재 화면의 지도 타일을 오프라인으로 저장할 수 있어요 — 지하철 안이나 해외 로밍 중 신호가 끊기기 전에 유용해요. OpenStreetMap 이용 정책을 지키기 위해 화면에 보이는 부분만 저장되고, 도시 전체가 저장되진 않아요.",
    aboutP3: "잘못되었거나 빠진 정보를 발견하셨나요? 이 지도는 계속 업데이트되고 있어요 — 숙소·맛집 정보와 추가 도시도 계획 중이에요.",
    aboutPinsHeading: "핀 색깔 안내",
    aboutBadge: "K-Wire Network의 일부",
  },
  ja: {
    appSubtitle: "K-POP聖地巡礼ガイド",
    themeToggleAria: "ダークモード切り替え",
    langPickerAria: "言語を変更",
    searchPlaceholder: "スポットを検索…",
    offlineSaveAria: "現在の表示をオフライン保存",
    listEmpty: "検索条件に一致するスポットがありません。",
    savedEmpty: "保存したスポットはまだありません。星アイコンをタップして保存しましょう。",
    tabMap: "マップ",
    tabList: "リスト",
    tabSaved: "保存済み",
    tabAbout: "About",
    sheetDirections: "経路",
    sheetSaveDefault: "☆ 保存",
    sheetSaveActive: "★ 保存済み",
    sheetShare: "🔗 シェア",
    sheetLinkMoreInfo: "詳細を見る",
    installPromptText: "K-Trail Seoulをインストールすると、より速く、オフラインでも使えます",
    installIOSText: "アプリをインストール：共有ボタンをタップし、「ホーム画面に追加」を選択してください",
    installActionLabel: "インストール",
    installDismissAria: "閉じる",
    toastLinkCopied: "リンクをコピーしました！",
    toastOfflineUnsupported: "このブラウザはオフライン保存に対応していません",
    toastSavingProgress: "オフライン表示を保存中… {done}/{total}",
    toastSavedPartial: "{ok}/{total}枚のタイルを保存しました（{failed}枚失敗）",
    toastSavedFull: "オフライン表示を保存しました — タイル{n}枚",
    aboutTitle: "K-Trail Seoulについて",
    aboutP1: "<strong>K-Trail Seoul</strong>は、韓国を訪れる海外のK-POPファンのためのオフライン対応・聖地巡礼マップです。<strong>ソウル</strong>、<strong>釜山</strong>、<strong>高陽（コヤン）</strong>、<strong>仁川</strong>、<strong>済州</strong>の5都市をカバーし、所属事務所本社、コンサート会場、カフェ、カルチャースポットに加え、近隣のホテルやグルメ情報も掲載しています。すべてのスポットは公開情報をもとに調査し、可能な限り2つ以上の情報源で確認していますが、韓国のK-POPシーンは変化が早いため（事務所の移転、会場の変更など）、訪問前に必ず営業時間・アクセス・現在の住所をご確認ください。",
    aboutP2: "ヒント：マップタブの検索欄の横にあるダウンロードアイコンをタップすると、表示中の地図タイルをオフライン保存できます。地下鉄内や海外でのローミング中、電波が届かなくなる前に便利です。OpenStreetMapの利用規約に従い、画面に表示されている範囲のみ保存され、都市全体は保存されません。",
    aboutP3: "情報の誤りや不足を見つけましたか？このマップは今後も更新予定です — ホテル・グルメ情報の拡充や対応都市の追加を計画しています。",
    aboutPinsHeading: "ピンの色について",
    aboutBadge: "K-Wire Networkの一部",
  },
  zh: {
    appSubtitle: "K-POP朝圣地图",
    themeToggleAria: "切换深色模式",
    langPickerAria: "切换语言",
    searchPlaceholder: "搜索地点…",
    offlineSaveAria: "保存当前视图以供离线使用",
    listEmpty: "没有符合搜索条件的地点。",
    savedEmpty: "还没有收藏的地点。点击任意地点的星标即可收藏。",
    tabMap: "地图",
    tabList: "列表",
    tabSaved: "收藏",
    tabAbout: "关于",
    sheetDirections: "导航",
    sheetSaveDefault: "☆ 收藏",
    sheetSaveActive: "★ 已收藏",
    sheetShare: "🔗 分享",
    sheetLinkMoreInfo: "查看详情",
    installPromptText: "安装 K-Trail Seoul，获得更快速度和离线访问",
    installIOSText: "安装此应用：点击分享按钮，然后选择“添加到主屏幕”",
    installActionLabel: "安装",
    installDismissAria: "关闭",
    toastLinkCopied: "链接已复制！",
    toastOfflineUnsupported: "此浏览器不支持离线保存",
    toastSavingProgress: "正在保存离线地图… {done}/{total}",
    toastSavedPartial: "已保存 {ok}/{total} 个图块（{failed} 个失败）",
    toastSavedFull: "离线地图已保存 — 共 {n} 个图块",
    aboutTitle: "关于 K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> 是一份专为来韩旅行的海外K-POP粉丝打造的离线朝圣地图，覆盖<strong>首尔</strong>、<strong>釜山</strong>、<strong>高阳</strong>、<strong>仁川</strong>和<strong>济州</strong>五座城市 — 包含经纪公司总部、演唱会/录制场馆、咖啡馆、文化景点，现在还新增了附近的住宿与美食信息。所有地点均基于公开资料调查，并尽可能通过两个以上独立来源交叉核实，但韩国的K-POP版图变化很快（经纪公司搬迁、场馆变更等）— 出行前请务必再次确认营业时间、是否可进入及当前地址。",
    aboutP2: "小贴士：在地图标签页，点击搜索框旁的下载图标即可将当前画面的地图图块保存到离线状态 — 适合在地铁里或海外漫游信号中断前提前使用。为遵守OpenStreetMap的使用政策，仅保存屏幕上显示的范围，不会保存整座城市。",
    aboutP3: "发现信息过时或遗漏了？这份地图会持续更新 — 我们计划增加更多住宿/美食内容以及新的城市。",
    aboutPinsHeading: "图钉颜色说明",
    aboutBadge: "K-Wire Network 成员站点",
  },
};

function t(key) {
  const dict = UI_STRINGS[currentLang] || UI_STRINGS.en;
  if (key in dict) return dict[key];
  return UI_STRINGS.en[key] || key;
}

// ---- City names (CITIES lives in data.js; this just supplies translated
// labels for the same five keys, so data.js stays single-source for
// coordinates/zoom and doesn't need a language-aware label itself) ----
const CITY_LABELS = {
  seoul: { en: "Seoul", ko: "서울", ja: "ソウル", zh: "首尔" },
  busan: { en: "Busan", ko: "부산", ja: "釜山", zh: "釜山" },
  goyang: { en: "Goyang", ko: "고양", ja: "高陽", zh: "高阳" },
  incheon: { en: "Incheon", ko: "인천", ja: "仁川", zh: "仁川" },
  jeju: { en: "Jeju", ko: "제주", ja: "済州", zh: "济州" },
};
function tCity(cityKey) {
  const map = CITY_LABELS[cityKey];
  if (!map) return cityKey;
  return map[currentLang] || map.en;
}

// ---- Category chip / legend labels (the short form, keyed by the same
// `key` CATEGORIES already uses in data.js) ----
const CATEGORY_CHIP_LABELS = {
  all: { en: "All", ko: "전체", ja: "すべて", zh: "全部" },
  agency: { en: "Agencies", ko: "소속사", ja: "事務所", zh: "经纪公司" },
  shopping: { en: "Shopping", ko: "쇼핑", ja: "ショッピング", zh: "购物" },
  culture: { en: "Culture", ko: "문화", ja: "カルチャー", zh: "文化" },
  cafe: { en: "Cafes", ko: "카페", ja: "カフェ", zh: "咖啡馆" },
  venue: { en: "Venues", ko: "공연장", ja: "会場", zh: "场馆" },
  stay: { en: "Stay", ko: "숙박", ja: "宿泊", zh: "住宿" },
  eat: { en: "Eat", ko: "맛집", ja: "グルメ", zh: "美食" },
};
function tCategoryChip(catKey) {
  const map = CATEGORY_CHIP_LABELS[catKey];
  if (!map) return catKey;
  return map[currentLang] || map.en;
}

// ---- Per-spot categoryLabel (data.js, longer/more specific form — e.g.
// "Concert / Broadcast" — than the chip labels above) and linkLabel
// (Stay/Eat/airport sheet link text). Keyed by the exact English string
// data.js already carries, since that's the stable id these come with;
// an unrecognized string (e.g. a label on a spot added later without a
// matching entry here) just falls back to showing the English text
// as-is rather than breaking. ----
const CATEGORY_LABEL_TRANSLATIONS = {
  "Agency (exterior)": { ko: "소속사 (외관)", ja: "事務所（外観のみ）", zh: "经纪公司（仅外观）" },
  "Cafe": { ko: "카페", ja: "カフェ", zh: "咖啡馆" },
  "Concert / Broadcast": { ko: "공연 / 방송", ja: "コンサート/放送", zh: "演唱会/录制" },
  "Concert / Convention": { ko: "공연 / 컨벤션", ja: "コンサート/コンベンション", zh: "演唱会/展会" },
  "Concert / Culture": { ko: "공연 / 문화", ja: "コンサート/カルチャー", zh: "演唱会/文化" },
  "Concert Venue": { ko: "공연장", ja: "コンサート会場", zh: "演出场馆" },
  "Culture": { ko: "문화", ja: "カルチャー", zh: "文化" },
  "Hotel": { ko: "호텔", ja: "ホテル", zh: "酒店" },
  "Restaurant": { ko: "레스토랑", ja: "レストラン", zh: "餐厅" },
  "Shopping": { ko: "쇼핑", ja: "ショッピング", zh: "购物" },
};
function tCategoryLabel(enLabel) {
  if (currentLang === "en") return enLabel;
  const map = CATEGORY_LABEL_TRANSLATIONS[enLabel];
  return (map && map[currentLang]) || enLabel;
}

const LINK_LABEL_TRANSLATIONS = {
  "Check rates": { ko: "요금 확인", ja: "料金を見る", zh: "查看房价" },
  "Search flights": { ko: "항공편 검색", ja: "フライトを検索", zh: "搜索航班" },
  "View on map": { ko: "지도에서 보기", ja: "地図で見る", zh: "在地图上查看" },
};
function tLinkLabel(enLabel) {
  if (currentLang === "en") return enLabel;
  const map = LINK_LABEL_TRANSLATIONS[enLabel];
  return (map && map[currentLang]) || enLabel;
}

// ---- Generic attribute-driven apply (covers static markup in index.html) ----
function applyI18n(root) {
  const scope = root || document;
  scope.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  scope.querySelectorAll("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  scope.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  scope.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  scope.querySelectorAll("[data-i18n-title]").forEach(el => { el.setAttribute("title", t(el.dataset.i18nTitle)); });
}
