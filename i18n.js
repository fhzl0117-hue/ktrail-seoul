// K-Trail Seoul — i18n (Oct 2026: 4-language launch, then expanded to 14
// after a K-pop-fandom-by-country pass — see the scope note below)
//
// Scope, deliberately: UI chrome only (nav, buttons, labels, About copy).
// Spot `name`, `blurb`, and `address` in data.js stay English in every
// language — translating ~58 researched, source-checked spot descriptions
// into 14 languages reliably (and keeping them in sync as spots are added)
// is out of scope for this pass. Revisit if demand shows up.
//
// Language is auto-detected from the visitor's browser/OS language
// (navigator.languages) on first visit — no manual step required — and
// can be overridden any time via the globe picker in the header, which is
// then remembered (localStorage) for that visitor. Falls back to English
// when the browser language isn't one of the supported ones.
//
// Language list: the original 4 (en/ko/ja/zh) plus es/it/fr/hi/ar/id, which
// Boss named directly, plus pt/th/vi/tr, added after researching which
// other countries actually have the largest K-pop fan bases (Oct 2026
// pass) — Brazil (pt), Thailand (th), Vietnam (vi) and Turkey (tr) all
// rank in the global top tier for K-pop streaming/engagement alongside
// the explicitly-requested set, per industry writeups (Twitter/X #KpopTwitter
// country-tweet-volume rankings, and 2026 fan-engagement roundups citing
// Spotify/YouTube growth by country). Malaysia (Malay) and the Philippines
// (Filipino) also showed up in that research but were left out of this
// pass — Malay has heavy mutual intelligibility with the Indonesian copy
// already here, and the Philippines' K-pop fan base already consumes
// English-language content at very high rates — revisit either if demand
// shows up.
//
// `ar` (Arabic) is right-to-left — see RTL_LANGS/isRTL() below, and the
// document.documentElement.dir wiring in app.js (initial load + setLang()).
// Flexbox rows mirror automatically under dir="rtl" (no extra CSS needed
// for most of the layout); style.css has a small `[dir="rtl"]` block for
// the few spots that hardcode a physical left/right value instead of a
// logical one. This is a good-faith RTL pass, not a native-speaker-
// reviewed one — a real device/RTL QA pass is worth doing before leaning
// on it heavily for an Arabic-speaking audience.

const SUPPORTED_LANGS = ["en", "ko", "ja", "zh", "es", "pt", "fr", "it", "id", "vi", "th", "hi", "ar", "tr"];
const LANG_LABELS = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
  es: "Español",
  pt: "Português",
  fr: "Français",
  it: "Italiano",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  th: "ไทย",
  hi: "हिन्दी",
  ar: "العربية",
  tr: "Türkçe",
};
const LANG_KEY = "ktrail_lang_v1";
const RTL_LANGS = ["ar"];
function isRTL(lang) { return RTL_LANGS.includes(lang); }

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
    if (code.startsWith("es")) return "es";
    // pt-BR and pt-PT both get the same (Brazilian-leaning) copy — see
    // the pt block below; no PT-specific variant yet.
    if (code.startsWith("pt")) return "pt";
    if (code.startsWith("fr")) return "fr";
    if (code.startsWith("it")) return "it";
    // "id" is the modern ISO 639-1 code for Indonesian; "in" was the old
    // one some older browsers/OSes still report — both map here.
    if (code.startsWith("id") || code.startsWith("in")) return "id";
    if (code.startsWith("vi")) return "vi";
    if (code.startsWith("th")) return "th";
    if (code.startsWith("hi")) return "hi";
    if (code.startsWith("ar")) return "ar";
    if (code.startsWith("tr")) return "tr";
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
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) has asked fans not to visit its office without prior arrangement and has warned of legal action, so K-Trail doesn't list a pin for it. Please don't go there.",
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
    noticeNoVisitKQ: "KQ엔터테인먼트(ATEEZ, xikers)는 사전 협의 없는 사옥 방문을 삼가달라고 요청했고 법적 대응도 예고했어요. 그래서 K-Trail에는 이곳 핀이 없어요. 방문하지 말아주세요.",
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
    noticeNoVisitKQ: "KQエンターテインメント(ATEEZ、xikers)は、事前の調整なしでの来訪を控えるよう求め、法的措置にも言及しています。そのためK-Trailにはピンを載せていません。訪問はお控えください。",
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
    noticeNoVisitKQ: "KQ Entertainment(ATEEZ、xikers)已请求粉丝勿在未事先安排的情况下前往其公司,并表示将采取法律行动,因此K-Trail不提供该地点标记。请勿前往。",
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
  es: {
    appSubtitle: "Guía de peregrinación K-pop",
    themeToggleAria: "Cambiar modo oscuro",
    langPickerAria: "Cambiar idioma",
    searchPlaceholder: "Buscar lugares…",
    offlineSaveAria: "Guardar vista actual para uso sin conexión",
    listEmpty: "Ningún lugar coincide con tu búsqueda.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) ha pedido a los fans que no visiten su oficina sin acuerdo previo y ha advertido de acciones legales, por eso K-Trail no incluye un pin. Por favor, no vayas.",
    savedEmpty: "Aún no has guardado ningún lugar. Toca la estrella de cualquier lugar para guardarlo aquí.",
    tabMap: "Mapa",
    tabList: "Lista",
    tabSaved: "Guardados",
    tabAbout: "Acerca de",
    sheetDirections: "Cómo llegar",
    sheetSaveDefault: "☆ Guardar",
    sheetSaveActive: "★ Guardado",
    sheetShare: "🔗 Compartir",
    sheetLinkMoreInfo: "Más información",
    installPromptText: "Instala K-Trail Seoul para un acceso rápido y sin conexión",
    installIOSText: "Instala esta app: toca Compartir y luego “Añadir a pantalla de inicio”",
    installActionLabel: "Instalar",
    installDismissAria: "Cerrar",
    toastLinkCopied: "¡Enlace copiado!",
    toastOfflineUnsupported: "Este navegador no puede guardar contenido sin conexión",
    toastSavingProgress: "Guardando vista sin conexión… {done}/{total}",
    toastSavedPartial: "Guardados {ok}/{total} mosaicos ({failed} fallidos)",
    toastSavedFull: "Vista guardada sin conexión — {n} mosaicos",
    aboutTitle: "Acerca de K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> es un mapa de peregrinación listo para uso sin conexión, pensado para fans internacionales de K-pop que visitan Corea, con cobertura de <strong>Seúl</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> y <strong>Jeju</strong> — sedes de agencias, recintos de conciertos, cafés, lugares culturales y ahora también alojamiento y restaurantes cercanos. Cada lugar se investigó a partir de fuentes públicas y se verificó con 2 o más fuentes cuando fue posible, pero el mapa K-pop de Corea cambia rápido (las agencias se mudan, los recintos cambian) — verifica siempre el horario, el acceso y la dirección actual antes de viajar.",
    aboutP2: "Consejo: en la pestaña Mapa, el icono de descarga junto a Buscar guarda los mosaicos del mapa de esa vista para uso sin conexión — útil antes de perder la señal bajo tierra, en el metro o en el extranjero. Solo guarda lo que ves en pantalla, no toda la ciudad, para respetar la política de uso de OpenStreetMap.",
    aboutP3: "¿Encontraste algo desactualizado o que falta? Este mapa sigue creciendo — se planea más cobertura de alojamiento/restaurantes y ciudades adicionales.",
    aboutPinsHeading: "Qué significan los pines",
    aboutBadge: "Parte de K-Wire Network",
  },
  pt: {
    appSubtitle: "Guia de peregrinação K-pop",
    themeToggleAria: "Alternar modo escuro",
    langPickerAria: "Mudar idioma",
    searchPlaceholder: "Buscar locais…",
    offlineSaveAria: "Salvar visualização atual para uso offline",
    listEmpty: "Nenhum local corresponde à sua busca.",
    noticeNoVisitKQ: "A KQ Entertainment (ATEEZ, xikers) pediu que os fãs não visitem o escritório sem combinar antes e alertou sobre ação judicial, por isso o K-Trail não tem um pin para ela. Por favor, não vá até lá.",
    savedEmpty: "Você ainda não salvou nenhum local. Toque na estrela de qualquer local para salvá-lo aqui.",
    tabMap: "Mapa",
    tabList: "Lista",
    tabSaved: "Salvos",
    tabAbout: "Sobre",
    sheetDirections: "Como chegar",
    sheetSaveDefault: "☆ Salvar",
    sheetSaveActive: "★ Salvo",
    sheetShare: "🔗 Compartilhar",
    sheetLinkMoreInfo: "Mais informações",
    installPromptText: "Instale o K-Trail Seoul para acesso rápido, mesmo offline",
    installIOSText: "Instale este app: toque em Compartilhar e depois em “Adicionar à Tela de Início”",
    installActionLabel: "Instalar",
    installDismissAria: "Fechar",
    toastLinkCopied: "Link copiado!",
    toastOfflineUnsupported: "Este navegador não consegue salvar para uso offline",
    toastSavingProgress: "Salvando visualização offline… {done}/{total}",
    toastSavedPartial: "Salvos {ok}/{total} blocos ({failed} falharam)",
    toastSavedFull: "Visualização offline salva — {n} blocos",
    aboutTitle: "Sobre o K-Trail Seoul",
    aboutP1: "O <strong>K-Trail Seoul</strong> é um mapa de peregrinação pronto para uso offline, feito para fãs internacionais de K-pop que visitam a Coreia, cobrindo <strong>Seul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> e <strong>Jeju</strong> — sedes de agências, locais de shows, cafés, pontos culturais e agora também hospedagens e restaurantes próximos. Cada local foi pesquisado a partir de fontes públicas e verificado com 2 ou mais fontes sempre que possível, mas o mapa do K-pop na Coreia muda rápido (agências se mudam, locais mudam) — sempre confira horários, acesso e o endereço atual antes de viajar.",
    aboutP2: "Dica: na aba Mapa, o ícone de download ao lado da busca salva os blocos do mapa dessa visualização para uso offline — útil antes de perder sinal no metrô ou no exterior. Só salva o que está na tela, não a cidade inteira, para respeitar a política de uso do OpenStreetMap.",
    aboutP3: "Encontrou algo desatualizado ou faltando? Este mapa continua crescendo — mais hospedagens/restaurantes e novas cidades estão planejados.",
    aboutPinsHeading: "O que os pinos significam",
    aboutBadge: "Parte da K-Wire Network",
  },
  fr: {
    appSubtitle: "Guide de pèlerinage K-pop",
    themeToggleAria: "Activer/désactiver le mode sombre",
    langPickerAria: "Changer de langue",
    searchPlaceholder: "Rechercher un lieu…",
    offlineSaveAria: "Enregistrer la vue actuelle pour une utilisation hors ligne",
    listEmpty: "Aucun lieu ne correspond à votre recherche.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) a demandé aux fans de ne pas se rendre à ses bureaux sans accord préalable et a prévenu qu'elle engagerait des poursuites ; K-Trail n'y place donc aucun repère. Merci de ne pas y aller.",
    savedEmpty: "Aucun lieu enregistré pour l'instant. Touchez l'étoile d'un lieu pour l'enregistrer ici.",
    tabMap: "Carte",
    tabList: "Liste",
    tabSaved: "Enregistrés",
    tabAbout: "À propos",
    sheetDirections: "Itinéraire",
    sheetSaveDefault: "☆ Enregistrer",
    sheetSaveActive: "★ Enregistré",
    sheetShare: "🔗 Partager",
    sheetLinkMoreInfo: "Plus d'infos",
    installPromptText: "Installez K-Trail Seoul pour un accès rapide, même hors ligne",
    installIOSText: "Installer l'application : touchez Partager, puis « Sur l'écran d'accueil »",
    installActionLabel: "Installer",
    installDismissAria: "Fermer",
    toastLinkCopied: "Lien copié !",
    toastOfflineUnsupported: "Ce navigateur ne permet pas l'enregistrement hors ligne",
    toastSavingProgress: "Enregistrement de la vue hors ligne… {done}/{total}",
    toastSavedPartial: "{ok}/{total} tuiles enregistrées ({failed} échecs)",
    toastSavedFull: "Vue hors ligne enregistrée — {n} tuiles",
    aboutTitle: "À propos de K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> est une carte de pèlerinage utilisable hors ligne, conçue pour les fans internationaux de K-pop qui visitent la Corée, couvrant <strong>Séoul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> et <strong>Jeju</strong> — sièges d'agences, salles de concert, cafés, lieux culturels et désormais hébergements et restaurants à proximité. Chaque lieu a été recherché à partir de sources publiques et recoupé avec au moins 2 sources lorsque possible, mais la carte K-pop de Corée évolue vite (déménagements d'agences, changements de salles) — vérifiez toujours les horaires, l'accès et l'adresse actuelle avant de vous y rendre.",
    aboutP2: "Astuce : dans l'onglet Carte, l'icône de téléchargement à côté de la recherche enregistre les tuiles de cette vue pour une utilisation hors ligne — pratique avant de perdre le signal dans le métro ou à l'étranger. Seul ce qui est affiché à l'écran est enregistré, pas la ville entière, afin de respecter la politique d'utilisation d'OpenStreetMap.",
    aboutP3: "Vous avez trouvé une information obsolète ou manquante ? Cette carte continue de s'enrichir — davantage d'hébergements/restaurants et de nouvelles villes sont prévus.",
    aboutPinsHeading: "Signification des épingles",
    aboutBadge: "Fait partie de K-Wire Network",
  },
  it: {
    appSubtitle: "Guida al pellegrinaggio K-pop",
    themeToggleAria: "Attiva/disattiva modalità scura",
    langPickerAria: "Cambia lingua",
    searchPlaceholder: "Cerca luoghi…",
    offlineSaveAria: "Salva la vista attuale per l'uso offline",
    listEmpty: "Nessun luogo corrisponde alla tua ricerca.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) ha chiesto ai fan di non recarsi nei suoi uffici senza accordi preventivi e ha avvertito di azioni legali, quindi K-Trail non include un pin. Per favore, non andarci.",
    savedEmpty: "Non hai ancora salvato nessun luogo. Tocca la stella su un luogo per salvarlo qui.",
    tabMap: "Mappa",
    tabList: "Elenco",
    tabSaved: "Salvati",
    tabAbout: "Info",
    sheetDirections: "Indicazioni",
    sheetSaveDefault: "☆ Salva",
    sheetSaveActive: "★ Salvato",
    sheetShare: "🔗 Condividi",
    sheetLinkMoreInfo: "Maggiori info",
    installPromptText: "Installa K-Trail Seoul per un accesso rapido e offline",
    installIOSText: "Installa l'app: tocca Condividi, poi “Aggiungi a Home”",
    installActionLabel: "Installa",
    installDismissAria: "Chiudi",
    toastLinkCopied: "Link copiato!",
    toastOfflineUnsupported: "Questo browser non supporta il salvataggio offline",
    toastSavingProgress: "Salvataggio vista offline… {done}/{total}",
    toastSavedPartial: "Salvati {ok}/{total} tile ({failed} falliti)",
    toastSavedFull: "Vista offline salvata — {n} tile",
    aboutTitle: "Informazioni su K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> è una mappa di pellegrinaggio utilizzabile offline, pensata per i fan internazionali del K-pop in visita in Corea, con copertura di <strong>Seoul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> e <strong>Jeju</strong> — sedi delle agenzie, luoghi per concerti, caffè, punti culturali e ora anche hotel e ristoranti nelle vicinanze. Ogni luogo è stato verificato tramite fonti pubbliche e, dove possibile, incrociato con 2 o più fonti, ma la mappa K-pop della Corea cambia rapidamente (le agenzie si trasferiscono, i luoghi cambiano) — verifica sempre orari, accessibilità e indirizzo attuale prima di partire.",
    aboutP2: "Suggerimento: nella scheda Mappa, l'icona di download accanto alla ricerca salva le tile della mappa di quella vista per l'uso offline — utile prima di perdere il segnale in metropolitana o all'estero. Viene salvato solo ciò che è visibile a schermo, non l'intera città, per rispettare la policy d'uso di OpenStreetMap.",
    aboutP3: "Hai trovato qualcosa di non aggiornato o mancante? Questa mappa continua a crescere — sono previste più informazioni su hotel/ristoranti e nuove città.",
    aboutPinsHeading: "Cosa significano i pin",
    aboutBadge: "Parte di K-Wire Network",
  },
  id: {
    appSubtitle: "Panduan ziarah K-pop",
    themeToggleAria: "Alihkan mode gelap",
    langPickerAria: "Ubah bahasa",
    searchPlaceholder: "Cari lokasi…",
    offlineSaveAria: "Simpan tampilan saat ini untuk digunakan offline",
    listEmpty: "Tidak ada lokasi yang cocok dengan pencarianmu.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) meminta penggemar tidak datang ke kantornya tanpa pengaturan sebelumnya dan memperingatkan tindakan hukum, jadi K-Trail tidak mencantumkan pin untuk lokasi ini. Mohon jangan ke sana.",
    savedEmpty: "Belum ada lokasi tersimpan. Ketuk ikon bintang di lokasi mana pun untuk menyimpannya di sini.",
    tabMap: "Peta",
    tabList: "Daftar",
    tabSaved: "Tersimpan",
    tabAbout: "Tentang",
    sheetDirections: "Petunjuk arah",
    sheetSaveDefault: "☆ Simpan",
    sheetSaveActive: "★ Tersimpan",
    sheetShare: "🔗 Bagikan",
    sheetLinkMoreInfo: "Info lebih lanjut",
    installPromptText: "Pasang K-Trail Seoul untuk akses cepat dan siap offline",
    installIOSText: "Pasang aplikasi ini: ketuk Bagikan, lalu pilih “Tambahkan ke Layar Utama”",
    installActionLabel: "Pasang",
    installDismissAria: "Tutup",
    toastLinkCopied: "Tautan disalin!",
    toastOfflineUnsupported: "Browser ini tidak dapat menyimpan untuk penggunaan offline",
    toastSavingProgress: "Menyimpan tampilan offline… {done}/{total}",
    toastSavedPartial: "Tersimpan {ok}/{total} ubin ({failed} gagal)",
    toastSavedFull: "Tampilan offline tersimpan — {n} ubin",
    aboutTitle: "Tentang K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> adalah peta ziarah siap-offline untuk penggemar K-pop internasional yang berkunjung ke Korea, mencakup <strong>Seoul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong>, dan <strong>Jeju</strong> — kantor pusat agensi, venue konser, kafe, titik budaya, dan kini juga penginapan serta tempat makan di sekitarnya. Setiap lokasi diteliti dari sumber publik dan, jika memungkinkan, diperiksa silang dengan 2+ sumber, tetapi peta K-pop Korea berubah cepat (agensi pindah, venue berganti) — selalu periksa kembali jam operasional, akses, dan alamat terkini sebelum bepergian.",
    aboutP2: "Tips: di tab Peta, ikon unduh di samping Cari menyimpan ubin peta tampilan tersebut untuk digunakan offline — berguna sebelum sinyal hilang di bawah tanah, di kereta, atau di luar negeri. Hanya menyimpan apa yang terlihat di layar, bukan seluruh kota, agar sesuai dengan kebijakan penggunaan OpenStreetMap.",
    aboutP3: "Menemukan info yang usang atau hilang? Peta ini terus berkembang — lebih banyak cakupan penginapan/tempat makan dan kota tambahan sedang direncanakan.",
    aboutPinsHeading: "Arti warna pin",
    aboutBadge: "Bagian dari K-Wire Network",
  },
  vi: {
    appSubtitle: "Cẩm nang hành hương K-pop",
    themeToggleAria: "Chuyển chế độ tối",
    langPickerAria: "Đổi ngôn ngữ",
    searchPlaceholder: "Tìm địa điểm…",
    offlineSaveAria: "Lưu chế độ xem hiện tại để dùng ngoại tuyến",
    listEmpty: "Không có địa điểm nào khớp với tìm kiếm của bạn.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) đã đề nghị người hâm mộ không đến văn phòng nếu chưa sắp xếp trước và cảnh báo sẽ có hành động pháp lý, vì vậy K-Trail không đánh dấu địa điểm này. Vui lòng đừng đến đó.",
    savedEmpty: "Bạn chưa lưu địa điểm nào. Chạm vào biểu tượng ngôi sao ở bất kỳ địa điểm nào để lưu vào đây.",
    tabMap: "Bản đồ",
    tabList: "Danh sách",
    tabSaved: "Đã lưu",
    tabAbout: "Giới thiệu",
    sheetDirections: "Chỉ đường",
    sheetSaveDefault: "☆ Lưu",
    sheetSaveActive: "★ Đã lưu",
    sheetShare: "🔗 Chia sẻ",
    sheetLinkMoreInfo: "Xem thêm",
    installPromptText: "Cài đặt K-Trail Seoul để truy cập nhanh, kể cả khi ngoại tuyến",
    installIOSText: "Cài đặt ứng dụng: chạm vào Chia sẻ, sau đó chọn “Thêm vào MH chính”",
    installActionLabel: "Cài đặt",
    installDismissAria: "Đóng",
    toastLinkCopied: "Đã sao chép liên kết!",
    toastOfflineUnsupported: "Trình duyệt này không hỗ trợ lưu ngoại tuyến",
    toastSavingProgress: "Đang lưu chế độ xem ngoại tuyến… {done}/{total}",
    toastSavedPartial: "Đã lưu {ok}/{total} ô bản đồ ({failed} lỗi)",
    toastSavedFull: "Đã lưu chế độ xem ngoại tuyến — {n} ô bản đồ",
    aboutTitle: "Giới thiệu về K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> là bản đồ hành hương sẵn sàng dùng ngoại tuyến, dành cho fan K-pop quốc tế đến thăm Hàn Quốc, bao phủ <strong>Seoul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> và <strong>Jeju</strong> — trụ sở công ty quản lý, địa điểm tổ chức concert, quán cà phê, điểm văn hóa, và giờ đây cả chỗ ở và quán ăn gần đó. Mỗi địa điểm được nghiên cứu từ các nguồn công khai và đối chiếu với 2 nguồn trở lên khi có thể, nhưng bản đồ K-pop của Hàn Quốc thay đổi nhanh (công ty quản lý chuyển địa điểm, địa điểm biểu diễn thay đổi) — hãy luôn kiểm tra lại giờ mở cửa, khả năng tiếp cận và địa chỉ hiện tại trước khi đi.",
    aboutP2: "Mẹo: ở tab Bản đồ, biểu tượng tải xuống cạnh ô tìm kiếm sẽ lưu các ô bản đồ của khung nhìn đó để dùng ngoại tuyến — hữu ích trước khi mất sóng dưới lòng đất, trên tàu điện ngầm, hoặc ở nước ngoài. Chỉ lưu phần hiển thị trên màn hình, không lưu toàn bộ thành phố, để tuân thủ chính sách sử dụng của OpenStreetMap.",
    aboutP3: "Thấy thông tin nào lỗi thời hoặc còn thiếu? Bản đồ này vẫn đang tiếp tục mở rộng — sẽ có thêm thông tin chỗ ở/quán ăn và các thành phố khác.",
    aboutPinsHeading: "Ý nghĩa các ghim",
    aboutBadge: "Một phần của K-Wire Network",
  },
  th: {
    appSubtitle: "คู่มือตามรอยสถานที่ K-pop",
    themeToggleAria: "สลับโหมดมืด",
    langPickerAria: "เปลี่ยนภาษา",
    searchPlaceholder: "ค้นหาสถานที่…",
    offlineSaveAria: "บันทึกมุมมองปัจจุบันไว้ใช้งานออฟไลน์",
    listEmpty: "ไม่พบสถานที่ที่ตรงกับการค้นหาของคุณ",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) ขอให้แฟนๆ อย่าเดินทางไปที่สำนักงานโดยไม่ได้นัดหมายล่วงหน้า และเตือนว่าจะดำเนินการทางกฎหมาย K-Trail จึงไม่ปักหมุดสถานที่นี้ กรุณาอย่าไปที่นั่น",
    savedEmpty: "ยังไม่มีสถานที่ที่บันทึกไว้ แตะไอคอนดาวที่สถานที่ใดก็ได้เพื่อบันทึกไว้ที่นี่",
    tabMap: "แผนที่",
    tabList: "รายการ",
    tabSaved: "บันทึกไว้",
    tabAbout: "เกี่ยวกับ",
    sheetDirections: "เส้นทาง",
    sheetSaveDefault: "☆ บันทึก",
    sheetSaveActive: "★ บันทึกแล้ว",
    sheetShare: "🔗 แชร์",
    sheetLinkMoreInfo: "ข้อมูลเพิ่มเติม",
    installPromptText: "ติดตั้ง K-Trail Seoul เพื่อเข้าถึงได้เร็วและใช้งานออฟไลน์ได้",
    installIOSText: "ติดตั้งแอปนี้: แตะปุ่มแชร์ แล้วเลือก “เพิ่มไปยังหน้าจอโฮม”",
    installActionLabel: "ติดตั้ง",
    installDismissAria: "ปิด",
    toastLinkCopied: "คัดลอกลิงก์แล้ว!",
    toastOfflineUnsupported: "เบราว์เซอร์นี้ไม่รองรับการบันทึกออฟไลน์",
    toastSavingProgress: "กำลังบันทึกมุมมองออฟไลน์… {done}/{total}",
    toastSavedPartial: "บันทึกแล้ว {ok}/{total} ไทล์ (ล้มเหลว {failed} รายการ)",
    toastSavedFull: "บันทึกมุมมองออฟไลน์แล้ว — {n} ไทล์",
    aboutTitle: "เกี่ยวกับ K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> คือแผนที่ตามรอยสถานที่ K-pop ที่ใช้งานออฟไลน์ได้ ออกแบบมาสำหรับแฟน K-pop นานาชาติที่มาเที่ยวเกาหลี ครอบคลุม <strong>โซล</strong> <strong>ปูซาน</strong> <strong>โกยาง</strong> <strong>อินชอน</strong> และ <strong>เจจู</strong> — สำนักงานใหญ่ค่าย สถานที่จัดคอนเสิร์ต คาเฟ่ จุดวัฒนธรรม และตอนนี้มีที่พักและร้านอาหารใกล้เคียงด้วย ทุกสถานที่ผ่านการค้นคว้าจากแหล่งข้อมูลสาธารณะและตรวจสอบไขว้จาก 2 แหล่งขึ้นไปเท่าที่ทำได้ แต่แผนที่ K-pop ของเกาหลีเปลี่ยนแปลงเร็วมาก (ค่ายย้ายที่ สถานที่เปลี่ยนไป) — ควรตรวจสอบเวลาทำการ การเข้าถึง และที่อยู่ปัจจุบันอีกครั้งก่อนเดินทางเสมอ",
    aboutP2: "เคล็ดลับ: ในแท็บแผนที่ ไอคอนดาวน์โหลดข้างช่องค้นหาจะบันทึกไทล์แผนที่ของมุมมองนั้นไว้ใช้งานออฟไลน์ — มีประโยชน์ก่อนสัญญาณหายในรถไฟใต้ดินหรือต่างประเทศ ระบบจะบันทึกเฉพาะส่วนที่แสดงบนหน้าจอเท่านั้น ไม่ใช่ทั้งเมือง เพื่อให้เป็นไปตามนโยบายการใช้งานของ OpenStreetMap",
    aboutP3: "เจอข้อมูลที่ล้าสมัยหรือขาดหายไปไหม? แผนที่นี้ยังคงเติบโตต่อเนื่อง — มีแผนเพิ่มข้อมูลที่พัก/ร้านอาหารและเมืองใหม่ ๆ อีก",
    aboutPinsHeading: "ความหมายของหมุด",
    aboutBadge: "ส่วนหนึ่งของ K-Wire Network",
  },
  hi: {
    appSubtitle: "K-पॉप तीर्थयात्रा गाइड",
    themeToggleAria: "डार्क मोड बदलें",
    langPickerAria: "भाषा बदलें",
    searchPlaceholder: "स्थान खोजें…",
    offlineSaveAria: "मौजूदा दृश्य ऑफ़लाइन उपयोग के लिए सेव करें",
    listEmpty: "आपकी खोज से मेल खाने वाला कोई स्थान नहीं मिला।",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) ने फ़ैंस से बिना पूर्व व्यवस्था अपने दफ़्तर न आने का अनुरोध किया है और क़ानूनी कार्रवाई की चेतावनी दी है, इसलिए K-Trail में इसका पिन नहीं है। कृपया वहाँ न जाएँ।",
    savedEmpty: "अभी तक कोई स्थान सेव नहीं किया गया। किसी भी स्थान पर स्टार आइकन दबाकर उसे यहाँ सेव करें।",
    tabMap: "मैप",
    tabList: "सूची",
    tabSaved: "सेव किए गए",
    tabAbout: "जानकारी",
    sheetDirections: "दिशा-निर्देश",
    sheetSaveDefault: "☆ सेव करें",
    sheetSaveActive: "★ सेव किया गया",
    sheetShare: "🔗 शेयर करें",
    sheetLinkMoreInfo: "अधिक जानकारी",
    installPromptText: "तेज़, ऑफ़लाइन एक्सेस के लिए K-Trail Seoul इंस्टॉल करें",
    installIOSText: "ऐप इंस्टॉल करें: शेयर पर टैप करें, फिर “होम स्क्रीन पर जोड़ें” चुनें",
    installActionLabel: "इंस्टॉल करें",
    installDismissAria: "बंद करें",
    toastLinkCopied: "लिंक कॉपी हो गया!",
    toastOfflineUnsupported: "यह ब्राउज़र ऑफ़लाइन सेव करने को सपोर्ट नहीं करता",
    toastSavingProgress: "ऑफ़लाइन दृश्य सेव हो रहा है… {done}/{total}",
    toastSavedPartial: "{ok}/{total} टाइल सेव हुईं ({failed} असफल)",
    toastSavedFull: "ऑफ़लाइन दृश्य सेव हो गया — {n} टाइल",
    aboutTitle: "K-Trail Seoul के बारे में",
    aboutP1: "<strong>K-Trail Seoul</strong> कोरिया आने वाले अंतरराष्ट्रीय K-पॉप फैंस के लिए एक ऑफ़लाइन-रेडी तीर्थयात्रा मैप है, जो <strong>सियोल</strong>, <strong>बुसान</strong>, <strong>गोयांग</strong>, <strong>इंचॉन</strong> और <strong>जेजू</strong> को कवर करता है — एजेंसी मुख्यालय, कॉन्सर्ट वेन्यू, कैफे, कल्चर स्पॉट्स, और अब आस-पास के ठहरने और खाने की जगहें भी। हर जगह सार्वजनिक स्रोतों से रिसर्च की गई है और जहाँ संभव हो वहाँ 2+ स्रोतों से क्रॉस-चेक की गई है, लेकिन कोरिया का K-पॉप मैप तेज़ी से बदलता है (एजेंसियाँ शिफ्ट होती हैं, वेन्यू बदलते हैं) — यात्रा से पहले हमेशा समय, एक्सेस और मौजूदा पता दोबारा जांच लें।",
    aboutP2: "टिप: मैप टैब में, सर्च के बगल वाला डाउनलोड आइकन उस दृश्य के मैप टाइल्स को ऑफ़लाइन उपयोग के लिए सेव कर देता है — यह मेट्रो में या विदेश में सिग्नल जाने से पहले काम आता है। OpenStreetMap की उपयोग नीति का पालन करने के लिए यह केवल स्क्रीन पर दिख रहे हिस्से को सेव करता है, पूरे शहर को नहीं।",
    aboutP3: "कुछ पुराना या छूटा हुआ मिला? यह मैप लगातार बढ़ रहा है — आगे और ठहरने/खाने की जगहें और नए शहर जोड़े जाने की योजना है।",
    aboutPinsHeading: "पिन का मतलब",
    aboutBadge: "K-Wire Network का हिस्सा",
  },
  ar: {
    appSubtitle: "دليل رحلة حج K-pop",
    themeToggleAria: "تبديل الوضع الداكن",
    langPickerAria: "تغيير اللغة",
    searchPlaceholder: "ابحث عن أماكن…",
    offlineSaveAria: "حفظ العرض الحالي للاستخدام دون اتصال",
    listEmpty: "لا توجد أماكن مطابقة لبحثك.",
    noticeNoVisitKQ: "طلبت KQ Entertainment (ATEEZ وxikers) من المعجبين عدم زيارة مكتبها دون ترتيب مسبق وحذّرت من اتخاذ إجراءات قانونية، لذلك لا يتضمن K-Trail دبوسًا لها. يرجى عدم الذهاب إلى هناك.",
    savedEmpty: "لم تحفظ أي مكان بعد. اضغط على نجمة أي مكان لحفظه هنا.",
    tabMap: "الخريطة",
    tabList: "القائمة",
    tabSaved: "المحفوظات",
    tabAbout: "حول",
    sheetDirections: "الاتجاهات",
    sheetSaveDefault: "☆ حفظ",
    sheetSaveActive: "★ محفوظ",
    sheetShare: "🔗 مشاركة",
    sheetLinkMoreInfo: "مزيد من المعلومات",
    installPromptText: "ثبّت K-Trail Seoul للوصول السريع دون اتصال بالإنترنت",
    installIOSText: "لتثبيت التطبيق: اضغط على مشاركة، ثم اختر “إضافة إلى الشاشة الرئيسية”",
    installActionLabel: "تثبيت",
    installDismissAria: "إغلاق",
    toastLinkCopied: "تم نسخ الرابط!",
    toastOfflineUnsupported: "لا يدعم هذا المتصفح الحفظ دون اتصال",
    toastSavingProgress: "جارٍ حفظ العرض دون اتصال… {done}/{total}",
    toastSavedPartial: "تم حفظ {ok}/{total} بلاطة ({failed} فشلت)",
    toastSavedFull: "تم حفظ العرض دون اتصال — {n} بلاطة",
    aboutTitle: "حول K-Trail Seoul",
    aboutP1: "<strong>K-Trail Seoul</strong> خريطة حج جاهزة للعمل دون اتصال، مخصصة لمعجبي K-pop الدوليين الزائرين لكوريا، وتغطي <strong>سيول</strong> و<strong>بوسان</strong> و<strong>غويانغ</strong> و<strong>إنتشون</strong> و<strong>جيجو</strong> — مقرات الوكالات، وأماكن الحفلات، والمقاهي، والمواقع الثقافية، والآن أماكن الإقامة والمطاعم القريبة أيضًا. تم البحث عن كل موقع من مصادر عامة والتحقق منه عبر مصدرين أو أكثر قدر الإمكان، لكن خريطة K-pop في كوريا تتغير بسرعة (انتقال الوكالات، تغيّر الأماكن) — تحقق دائمًا من أوقات العمل وإمكانية الوصول والعنوان الحالي قبل السفر.",
    aboutP2: "نصيحة: في تبويب الخريطة، تحفظ أيقونة التنزيل بجانب البحث بلاطات الخريطة لهذا العرض للاستخدام دون اتصال — مفيد قبل فقدان الإشارة تحت الأرض أو في المترو أو في الخارج. يتم حفظ ما يظهر على الشاشة فقط، وليس المدينة بأكملها، التزامًا بسياسة استخدام OpenStreetMap.",
    aboutP3: "وجدت معلومة قديمة أو ناقصة؟ هذه الخريطة في تطور مستمر — من المخطط إضافة المزيد من أماكن الإقامة والمطاعم ومدن جديدة.",
    aboutPinsHeading: "ماذا تعني الدبابيس",
    aboutBadge: "جزء من شبكة K-Wire",
  },
  tr: {
    appSubtitle: "K-pop hac rehberi",
    themeToggleAria: "Koyu modu değiştir",
    langPickerAria: "Dili değiştir",
    searchPlaceholder: "Mekan ara…",
    offlineSaveAria: "Mevcut görünümü çevrimdışı kullanım için kaydet",
    listEmpty: "Aramanızla eşleşen bir mekan bulunamadı.",
    noticeNoVisitKQ: "KQ Entertainment (ATEEZ, xikers) hayranlardan önceden ayarlama yapmadan ofisine gitmemelerini istedi ve yasal işlem uyarısında bulundu; bu yüzden K-Trail'de bu yer için bir pin yok. Lütfen oraya gitmeyin.",
    savedEmpty: "Henüz kaydedilmiş bir mekan yok. Herhangi bir mekandaki yıldız simgesine dokunarak buraya kaydedin.",
    tabMap: "Harita",
    tabList: "Liste",
    tabSaved: "Kayıtlılar",
    tabAbout: "Hakkında",
    sheetDirections: "Yol tarifi",
    sheetSaveDefault: "☆ Kaydet",
    sheetSaveActive: "★ Kaydedildi",
    sheetShare: "🔗 Paylaş",
    sheetLinkMoreInfo: "Daha fazla bilgi",
    installPromptText: "Hızlı, çevrimdışı erişim için K-Trail Seoul'u yükleyin",
    installIOSText: "Bu uygulamayı yükleyin: Paylaş'a dokunun, ardından “Ana Ekrana Ekle”yi seçin",
    installActionLabel: "Yükle",
    installDismissAria: "Kapat",
    toastLinkCopied: "Bağlantı kopyalandı!",
    toastOfflineUnsupported: "Bu tarayıcı çevrimdışı kaydetmeyi desteklemiyor",
    toastSavingProgress: "Çevrimdışı görünüm kaydediliyor… {done}/{total}",
    toastSavedPartial: "{ok}/{total} karo kaydedildi ({failed} başarısız)",
    toastSavedFull: "Çevrimdışı görünüm kaydedildi — {n} karo",
    aboutTitle: "K-Trail Seoul Hakkında",
    aboutP1: "<strong>K-Trail Seoul</strong>, Kore'yi ziyaret eden uluslararası K-pop hayranları için çevrimdışı kullanıma hazır bir hac haritasıdır; <strong>Seul</strong>, <strong>Busan</strong>, <strong>Goyang</strong>, <strong>Incheon</strong> ve <strong>Jeju</strong>'yu kapsar — ajans merkezleri, konser mekanları, kafeler, kültür noktaları ve artık yakındaki konaklama ve yemek mekanları da dahil. Her konum, kamuya açık kaynaklardan araştırılmış ve mümkün olduğunda 2 veya daha fazla kaynakla çapraz kontrol edilmiştir; ancak Kore'nin K-pop haritası hızla değişiyor (ajanslar taşınıyor, mekanlar değişiyor) — yola çıkmadan önce çalışma saatlerini, erişimi ve güncel adresi her zaman tekrar kontrol edin.",
    aboutP2: "İpucu: Harita sekmesinde, Ara'nın yanındaki indirme simgesi, o görünümün harita karolarını çevrimdışı kullanım için kaydeder — metroda veya yurt dışında sinyal kaybetmeden önce işe yarar. OpenStreetMap kullanım politikasına uymak için yalnızca ekranda görünen kısım kaydedilir, tüm şehir değil.",
    aboutP3: "Güncel olmayan veya eksik bir şey mi buldunuz? Bu harita büyümeye devam ediyor — daha fazla konaklama/yemek kapsamı ve ek şehirler planlanıyor.",
    aboutPinsHeading: "İğnelerin anlamı",
    aboutBadge: "K-Wire Network'ün bir parçası",
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
  seoul: { en: "Seoul", ko: "서울", ja: "ソウル", zh: "首尔", es: "Seúl", pt: "Seul", fr: "Séoul", it: "Seoul", id: "Seoul", vi: "Seoul", th: "โซล", hi: "सियोल", ar: "سيول", tr: "Seul" },
  busan: { en: "Busan", ko: "부산", ja: "釜山", zh: "釜山", es: "Busan", pt: "Busan", fr: "Busan", it: "Busan", id: "Busan", vi: "Busan", th: "ปูซาน", hi: "बुसान", ar: "بوسان", tr: "Busan" },
  goyang: { en: "Goyang", ko: "고양", ja: "高陽", zh: "高阳", es: "Goyang", pt: "Goyang", fr: "Goyang", it: "Goyang", id: "Goyang", vi: "Goyang", th: "โกยาง", hi: "गोयांग", ar: "غويانغ", tr: "Goyang" },
  incheon: { en: "Incheon", ko: "인천", ja: "仁川", zh: "仁川", es: "Incheon", pt: "Incheon", fr: "Incheon", it: "Incheon", id: "Incheon", vi: "Incheon", th: "อินชอน", hi: "इंचॉन", ar: "إنتشون", tr: "Incheon" },
  jeju: { en: "Jeju", ko: "제주", ja: "済州", zh: "济州", es: "Jeju", pt: "Jeju", fr: "Jeju", it: "Jeju", id: "Jeju", vi: "Jeju", th: "เจจู", hi: "जेजू", ar: "جيجو", tr: "Jeju" },
};
function tCity(cityKey) {
  const map = CITY_LABELS[cityKey];
  if (!map) return cityKey;
  return map[currentLang] || map.en;
}

// ---- Category chip / legend labels (the short form, keyed by the same
// `key` CATEGORIES already uses in data.js) ----
const CATEGORY_CHIP_LABELS = {
  all: { en: "All", ko: "전체", ja: "すべて", zh: "全部", es: "Todos", pt: "Todos", fr: "Tous", it: "Tutti", id: "Semua", vi: "Tất cả", th: "ทั้งหมด", hi: "सभी", ar: "الكل", tr: "Tümü" },
  agency: { en: "Agencies", ko: "소속사", ja: "事務所", zh: "经纪公司", es: "Agencias", pt: "Agências", fr: "Agences", it: "Agenzie", id: "Agensi", vi: "Công ty quản lý", th: "ค่าย", hi: "एजेंसियाँ", ar: "الوكالات", tr: "Ajanslar" },
  shopping: { en: "Shopping", ko: "쇼핑", ja: "ショッピング", zh: "购物", es: "Compras", pt: "Compras", fr: "Shopping", it: "Shopping", id: "Belanja", vi: "Mua sắm", th: "ช้อปปิ้ง", hi: "शॉपिंग", ar: "التسوق", tr: "Alışveriş" },
  culture: { en: "Culture", ko: "문화", ja: "カルチャー", zh: "文化", es: "Cultura", pt: "Cultura", fr: "Culture", it: "Cultura", id: "Budaya", vi: "Văn hóa", th: "วัฒนธรรม", hi: "संस्कृति", ar: "الثقافة", tr: "Kültür" },
  cafe: { en: "Cafes", ko: "카페", ja: "カフェ", zh: "咖啡馆", es: "Cafeterías", pt: "Cafés", fr: "Cafés", it: "Caffè", id: "Kafe", vi: "Quán cà phê", th: "คาเฟ่", hi: "कैफे", ar: "المقاهي", tr: "Kafeler" },
  venue: { en: "Venues", ko: "공연장", ja: "会場", zh: "场馆", es: "Recintos", pt: "Locais", fr: "Salles", it: "Luoghi", id: "Venue", vi: "Địa điểm", th: "สถานที่จัดงาน", hi: "वेन्यू", ar: "الأماكن", tr: "Mekanlar" },
  stay: { en: "Stay", ko: "숙박", ja: "宿泊", zh: "住宿", es: "Alojamiento", pt: "Hospedagem", fr: "Hébergement", it: "Alloggio", id: "Penginapan", vi: "Chỗ ở", th: "ที่พัก", hi: "ठहरना", ar: "الإقامة", tr: "Konaklama" },
  eat: { en: "Eat", ko: "맛집", ja: "グルメ", zh: "美食", es: "Comer", pt: "Comer", fr: "Manger", it: "Mangiare", id: "Makan", vi: "Ăn uống", th: "ร้านอาหาร", hi: "खाना", ar: "المطاعم", tr: "Yemek" },
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
  "Agency (exterior)": { ko: "소속사 (외관)", ja: "事務所（外観のみ）", zh: "经纪公司（仅外观）", es: "Agencia (exterior)", pt: "Agência (externo)", fr: "Agence (extérieur)", it: "Agenzia (esterno)", id: "Agensi (eksterior)", vi: "Công ty quản lý (bên ngoài)", th: "ค่าย (ภายนอกเท่านั้น)", hi: "एजेंसी (बाहरी भाग)", ar: "وكالة (من الخارج)", tr: "Ajans (dış görünüm)" },
  "Cafe": { ko: "카페", ja: "カフェ", zh: "咖啡馆", es: "Cafetería", pt: "Café", fr: "Café", it: "Caffè", id: "Kafe", vi: "Quán cà phê", th: "คาเฟ่", hi: "कैफे", ar: "مقهى", tr: "Kafe" },
  "Concert / Broadcast": { ko: "공연 / 방송", ja: "コンサート/放送", zh: "演唱会/录制", es: "Concierto / Transmisión", pt: "Show / Transmissão", fr: "Concert / Diffusion", it: "Concerto / Trasmissione", id: "Konser / Siaran", vi: "Concert / Phát sóng", th: "คอนเสิร์ต / ออกอากาศ", hi: "कॉन्सर्ट / प्रसारण", ar: "حفل / بث", tr: "Konser / Yayın" },
  "Concert / Convention": { ko: "공연 / 컨벤션", ja: "コンサート/コンベンション", zh: "演唱会/展会", es: "Concierto / Convención", pt: "Show / Convenção", fr: "Concert / Convention", it: "Concerto / Convention", id: "Konser / Konvensi", vi: "Concert / Hội nghị", th: "คอนเสิร์ต / งานประชุม", hi: "कॉन्सर्ट / कन्वेंशन", ar: "حفل / مؤتمر", tr: "Konser / Kongre" },
  "Concert / Culture": { ko: "공연 / 문화", ja: "コンサート/カルチャー", zh: "演唱会/文化", es: "Concierto / Cultura", pt: "Show / Cultura", fr: "Concert / Culture", it: "Concerto / Cultura", id: "Konser / Budaya", vi: "Concert / Văn hóa", th: "คอนเสิร์ต / วัฒนธรรม", hi: "कॉन्सर्ट / संस्कृति", ar: "حفل / ثقافة", tr: "Konser / Kültür" },
  "Concert Venue": { ko: "공연장", ja: "コンサート会場", zh: "演出场馆", es: "Recinto de conciertos", pt: "Local de shows", fr: "Salle de concert", it: "Luogo per concerti", id: "Venue Konser", vi: "Địa điểm concert", th: "สถานที่จัดคอนเสิร์ต", hi: "कॉन्सर्ट वेन्यू", ar: "قاعة حفلات", tr: "Konser mekanı" },
  "Culture": { ko: "문화", ja: "カルチャー", zh: "文化", es: "Cultura", pt: "Cultura", fr: "Culture", it: "Cultura", id: "Budaya", vi: "Văn hóa", th: "วัฒนธรรม", hi: "संस्कृति", ar: "ثقافة", tr: "Kültür" },
  "Hotel": { ko: "호텔", ja: "ホテル", zh: "酒店", es: "Hotel", pt: "Hotel", fr: "Hôtel", it: "Hotel", id: "Hotel", vi: "Khách sạn", th: "โรงแรม", hi: "होटल", ar: "فندق", tr: "Otel" },
  "Restaurant": { ko: "레스토랑", ja: "レストラン", zh: "餐厅", es: "Restaurante", pt: "Restaurante", fr: "Restaurant", it: "Ristorante", id: "Restoran", vi: "Nhà hàng", th: "ร้านอาหาร", hi: "रेस्तराँ", ar: "مطعم", tr: "Restoran" },
  "Shopping": { ko: "쇼핑", ja: "ショッピング", zh: "购物", es: "Compras", pt: "Compras", fr: "Shopping", it: "Shopping", id: "Belanja", vi: "Mua sắm", th: "ช้อปปิ้ง", hi: "शॉपिंग", ar: "تسوق", tr: "Alışveriş" },
};
function tCategoryLabel(enLabel) {
  if (currentLang === "en") return enLabel;
  const map = CATEGORY_LABEL_TRANSLATIONS[enLabel];
  return (map && map[currentLang]) || enLabel;
}

const LINK_LABEL_TRANSLATIONS = {
  "Check rates": { ko: "요금 확인", ja: "料金を見る", zh: "查看房价", es: "Ver precios", pt: "Ver preços", fr: "Voir les tarifs", it: "Vedi tariffe", id: "Cek tarif", vi: "Xem giá", th: "ดูราคา", hi: "दरें देखें", ar: "التحقق من الأسعار", tr: "Fiyatlara bak" },
  "Search flights": { ko: "항공편 검색", ja: "フライトを検索", zh: "搜索航班", es: "Buscar vuelos", pt: "Buscar voos", fr: "Rechercher des vols", it: "Cerca voli", id: "Cari penerbangan", vi: "Tìm chuyến bay", th: "ค้นหาเที่ยวบิน", hi: "फ्लाइट खोजें", ar: "البحث عن رحلات", tr: "Uçuş ara" },
  "View on map": { ko: "지도에서 보기", ja: "地図で見る", zh: "在地图上查看", es: "Ver en el mapa", pt: "Ver no mapa", fr: "Voir sur la carte", it: "Vedi sulla mappa", id: "Lihat di peta", vi: "Xem trên bản đồ", th: "ดูบนแผนที่", hi: "मैप पर देखें", ar: "عرض على الخريطة", tr: "Haritada gör" },
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
