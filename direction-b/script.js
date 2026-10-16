const MENUS = {
  Vehicle: [
    { label: "Registration", children: ["Registration Renewal", "Registration Reinstatement", "Registration Replacement with Decal", "Registration Refund"] },
    { label: "Plates", children: ["Specialty and Personalized Plates", "Plate Replacement", "Disability Placard Replacement", "Duplicate Plate", "Plate Order Status", "Change Plate Background"] },
    { label: "Permits", children: ["30-Day General Use Permit", "Restricted 3-Day Permit"] },
    { label: "Off-Highway Decals", children: ["Off-Highway Decal Issue/Renewal", "Off-Highway Decal Replacement", "Required Course: Safe & Ethical Riding in Arizona"] },
    { label: "Motor Vehicle Record" },
    { label: "Vehicle Fees/Taxes Paid" },
    { label: "Emissions" },
    { label: "Fleet Management" },
    { label: "Watch Your Car" }
  ],
  "Driver License & ID": [
    { label: "Arizona Travel ID (REAL ID)" },
    { label: "Driver License", children: ["Driver License Application", "Driver License Replacement", "Driver License Renewal", "Driver License Record", "At-home Permit Test"] },
    { label: "Identification Card", children: ["Identification Card Application", "Identification Card Replacement"] },
    { label: "Commercial Driver License (CDL)", children: ["CDL Application", "CDL Replacement", "CDL Renewal", "CDL Medical Status Verification"] },
    { label: "Mobile ID Management" }
  ],
  Title: [
    { label: "Title Viewer" },
    { label: "Title Information (Other Vehicles)" },
    { label: "eTitle Transfer" },
    { label: "Title Replacement" },
    { label: "Sold Notice" },
    { label: "Bill of Sale" }
  ],
  Other: [
    { label: "Change Address" },
    { label: "Aircraft Registration Renewal" },
    { label: "Manage Insurance" },
    { label: "Manage Compliance Issues" },
    { label: "Compliance Issues Timeline" },
    { label: "View Receipts" },
    { label: "Dealer Licensing and Services" },
    { label: "Apply for an Organization Account" }
  ],
  Help: [
    { label: "Schedule an Appointment" },
    { label: "Contact Us" },
    { label: "MVD Invitation Code" },
    { label: "Find an MVD Location" },
    { label: "Provide Feedback" },
    { label: "Report Fraud" },
    { label: "View Video Library" },
    { label: "View Forms" }
  ]
};

const TAB_ORDER = ["Vehicle", "Driver License & ID", "Title", "Voter Registration", "Other", "Help"];
// Top-level nav items that go straight to a page instead of opening a menu.
const NAV_LINKS = {
  "Voter Registration": "https://azmvdnow.gov/guest/customeranonymous/voterregistration"
};

const EXTRA_SERVICES = [
  "Travel ID Application", "New to Arizona", "ADOT Website", "View Plate Gallery",
  "Payment Summary", "Registration Renewal", "Schedule an Appointment"
];

function corpus() {
  const out = [];
  Object.keys(MENUS).forEach(k => MENUS[k].forEach(item => {
    if (item.children) item.children.forEach(c => out.push(c));
    else out.push(item.label);
  }));
  EXTRA_SERVICES.forEach(s => out.push(s));
  Object.keys(NAV_LINKS).forEach(s => out.push(s));
  return out.filter((v, i, a) => a.indexOf(v) === i).sort();
}

const CORPUS = corpus();

// Sample alerts for the wireframe. MVD would publish these from a CMS.
const ALERTS = [
  { id: "vote", title: "Register to vote", body: "Use AZ MVD Now to register to vote or update your voter registration.", linkLabel: "Voter Registration", href: "https://azmvdnow.gov/guest/customeranonymous/voterregistration" },
  { id: "newlook", title: "New Look for AZ MVD Now", body: "We’ve redesigned the homepage to help you find services faster.", linkLabel: "See what’s new", href: "" },
  { id: "placard", title: "New service", body: "You can now replace a disability placard on AZ MVD Now.", linkLabel: "Placard replacement", href: "" }
];
const LANGUAGES = [
  { label: "Select Language", code: "" },
  { label: "English", code: "en" },
  { label: "Español", code: "es" },
  { label: "Français", code: "fr" },
  { label: "中文", code: "zh-CN" }
];

class Component extends DCLogic {
  state = {
    menu: null, sub: null, dismissed: [], alertsOpen: false, view: "home", query: "", submitted: "",
    suggestOpen: false, langOpen: false, lang: "Select Language", toast: "", scrolled: false, menuLeft: 0, subTop: 0, hoverStep: null, hoverTile: null,
    mobileNavOpen: false, mobileTab: null, mobileSub: null, guestAll: false
  };

  searchRef = React.createRef();
  contactRef = React.createRef();
  guestRef = React.createRef();
  headerRef = React.createRef();

  componentDidMount() {
    this._onScroll = () => {
      const past = window.scrollY > Math.max(240, window.innerHeight * 0.55);
      if (past !== this.state.scrolled) this.setState({ scrolled: past });
    };
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this._onScroll();

    this._onDocDown = e => {
      if (!this.state.menu) return;
      if (this.headerRef.current && this.headerRef.current.contains(e.target)) return;
      this.setState({ menu: null, sub: null });
    };
    this._onKey = e => {
      if (e.key === "Escape" && this.state.menu) this.setState({ menu: null, sub: null });
    };
    document.addEventListener("pointerdown", this._onDocDown, true);
    document.addEventListener("keydown", this._onKey);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this._onScroll);
    document.removeEventListener("pointerdown", this._onDocDown, true);
    document.removeEventListener("keydown", this._onKey);
    clearTimeout(this._close);
  }

  match(q) {
    const s = String(q || "").trim().toLowerCase();
    if (!s) return [];
    return CORPUS.filter(name => name.toLowerCase().split(/[\s/(]+/).some(w => w.indexOf(s) === 0));
  }

  dismissAlert(id) {
    const order = ALERTS.filter(a => this.state.dismissed.indexOf(a.id) < 0).map(a => a.id);
    const idx = order.indexOf(id);
    this.setState(s => ({ dismissed: s.dismissed.concat(id) }), () => {
      // Keep keyboard focus in a sensible place after the row disappears.
      const buttons = Array.from(document.querySelectorAll("[data-alert-dismiss]")).filter(b => b.offsetParent);
      const next = buttons[Math.min(idx, buttons.length - 1)] || document.getElementById("heroTitle");
      if (next) next.focus();
    });
  }
  flash(msg) {
    clearTimeout(this._t);
    this.setState({ toast: msg });
    this._t = setTimeout(() => this.setState({ toast: "" }), 1800);
  }

  openTab(name) {
    if (NAV_LINKS[name]) {
      this.setState({ menu: null, sub: null });
      window.open(NAV_LINKS[name], "_blank", "noopener");
      return;
    }
    clearTimeout(this._close);
    const justHovered = Date.now() - (this._hoverAt || 0) < 600;
    this.setState(s => ({ menu: s.menu === name && !justHovered ? null : name, sub: null }));
  }

  _tabEls = {};
  _itemEls = {};
  menuWrapRef = React.createRef();

  componentDidUpdate() {
    const next = {};
    const tab = this._tabEls[this.state.menu];
    if (tab && this.headerRef.current) {
      const left = Math.round(tab.getBoundingClientRect().left - this.headerRef.current.getBoundingClientRect().left);
      if (left !== this.state.menuLeft) next.menuLeft = left;
    }
    const item = this._itemEls[this.state.sub];
    if (item && this.menuWrapRef.current) {
      const top = Math.round(item.getBoundingClientRect().top - this.menuWrapRef.current.getBoundingClientRect().top);
      if (top !== this.state.subTop) next.subTop = top;
    }
    if (Object.keys(next).length) this.setState(next);
  }

  hoverTab(name) {
    clearTimeout(this._close);
    if (NAV_LINKS[name]) {
      if (this.state.menu) this.setState({ menu: null, sub: null });
      return;
    }
    if (this.state.menu !== name) {
      this._hoverAt = Date.now();
      this.setState({ menu: name, sub: null });
    }
  }

  submit(q) {
    const query = String(q == null ? this.state.query : q).trim();
    if (!query) return;
    if (this.searchRef.current) this.searchRef.current.value = query;
    const results = this.match(query);
    this.setState({
      view: results.length ? "results" : "noresults",
      submitted: query, query: query, suggestOpen: false, menu: null, sub: null
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  goHome = () => {
    if (this.searchRef.current) this.searchRef.current.value = "";
    this.setState({ view: "home", query: "", submitted: "", suggestOpen: false, menu: null, sub: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  loadTranslate() {
    if (window.__amnTranslateLoaded) return;
    window.__amnTranslateLoaded = true;
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      } catch (e) {}
    };
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }

  translateTo(code) {
    this.loadTranslate();
    const tries = 40;
    const attempt = n => {
      const sel = document.querySelector("#google_translate_element select");
      if (sel) {
        sel.value = code;
        sel.dispatchEvent(new Event("change", { bubbles: true }));
        return;
      }
      if (n < tries) setTimeout(() => attempt(n + 1), 250);
    };
    attempt(0);
  }

  renderVals() {
    const st = this.state;
    const results = this.match(st.submitted);
    const suggestions = this.match(st.query).slice(0, 8);

    return {
      keyActivate: e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.currentTarget.click(); } },
      searchRef: this.searchRef,
      contactRef: this.contactRef,
      headerRef: this.headerRef,
      guestRef: this.guestRef,
      goHome: this.goHome,

      cancelClose: () => clearTimeout(this._close),
      closeMenu: () => {
        clearTimeout(this._close);
        this._close = setTimeout(() => this.setState({ menu: null, sub: null }), 140);
      },

      tabs: TAB_ORDER.map(label => ({
        label,
        onEnter: () => this.hoverTab(label),
        setRef: el => { this._tabEls[label] = el; },
        underline: st.menu === label ? "underline" : "none",
        ink: "#fff",
        rotate: st.menu === label ? 180 : 0,
        hasMenu: !NAV_LINKS[label],
        onClick: () => this.openTab(label)
      })),

      menuOpen: !!st.menu,
      menuLeft: st.menuLeft || 0,
      subTop: st.subTop || 0,
      menuWrapRef: this.menuWrapRef,
      menuItems: (MENUS[st.menu] || []).map(item => ({
        label: item.label,
        hasChildren: !!item.children,
        rotate: st.sub === item.label ? 270 : 0,
        onEnter: () => this.setState({ sub: item.children ? item.label : null }),
        setRef: el => { this._itemEls[item.label] = el; },
        onClick: () => {
          if (item.children) this.setState(s => ({ sub: s.sub === item.label ? null : item.label }));
          else { this.setState({ menu: null, sub: null }); this.flash(item.label); }
        }
      })),
      subOpen: !!(st.menu && st.sub),
      subItems: (((MENUS[st.menu] || []).find(i => i.label === st.sub) || {}).children || []).map(label => ({
        label,
        onClick: () => { this.setState({ menu: null, sub: null }); this.flash(label); }
      })),

      onSearchInput: e => this.setState({ query: e.target.value, suggestOpen: true }),
      onSearchFocus: () => this.setState({ suggestOpen: true, menu: null, sub: null }),
      onSearchKey: e => {
        if (e.key === "Enter") this.submit();
        if (e.key === "Escape") this.setState({ suggestOpen: false });
      },
      onSearchSubmit: () => this.submit(),
      showSuggest: st.suggestOpen && st.query.trim().length > 0,
      noSuggest: st.suggestOpen && st.query.trim().length > 0 && suggestions.length === 0,
      suggestions: suggestions.map(label => ({ label, onClick: () => this.submit(label) })),

      ...(() => {
        const visible = ALERTS.filter(a => st.dismissed.indexOf(a.id) < 0);
        const multi = visible.length > 1;
        return {
          hasAlerts: visible.length > 0,
          multiAlerts: multi,
          alertCount: visible.length,
          alertsOpen: st.alertsOpen,
          singleAlert: visible.length === 1,
          alertSummary: visible.map(a => a.title).join(" · "),
          alertsHidden: !st.alertsOpen,
          alertsRotate: st.alertsOpen ? 180 : 0,
          alertsToggleLabel: st.alertsOpen ? "Hide alerts" : "View alerts",
          alertsToggleShort: st.alertsOpen ? "Hide" : "View",
          toggleAlerts: () => this.setState(s => ({ alertsOpen: !s.alertsOpen })),
          get firstAlert() { return this.alerts[0]; },
          alerts: visible.map((a, i) => ({
            title: a.title,
            body: a.body,
            linkLabel: a.linkLabel,
            href: a.href,
            noHref: !a.href,
            dismissLabel: "Dismiss alert: " + a.title,
            onDismiss: () => this.dismissAlert(a.id),
            onLink: () => this.flash("Prototype: " + a.linkLabel + " page not built")
          }))
        };
      })(),

      seeMoreLabel: "See More",
      toggleSeeMore: () => {
        if (this.guestRef.current) window.scrollTo({ top: this.guestRef.current.offsetTop - 130, behavior: "smooth" });
      },

      onTile: () => this.flash("Prototype: service page not built"),
      onSignIn: () => this.flash("Prototype: Sign In / Sign Up"),


      tileLeave: () => this.setState({ hoverTile: null }),
      tileEnter0: () => this.setState({ hoverTile: 0 }),
      tileCircle0: st.hoverTile === 0 ? "var(--color-primary-hover)" : "#fff",
      tileIcon0: st.hoverTile === 0 ? "#fff" : "var(--color-primary)",
      tileRing0: "transparent",
      tileScale0: st.hoverTile === 0 ? "scale(1.12)" : "scale(1)",
      tileGlow0: st.hoverTile === 0 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter1: () => this.setState({ hoverTile: 1 }),
      tileCircle1: st.hoverTile === 1 ? "var(--color-primary-hover)" : "#fff",
      tileIcon1: st.hoverTile === 1 ? "#fff" : "var(--color-primary)",
      tileRing1: "transparent",
      tileScale1: st.hoverTile === 1 ? "scale(1.12)" : "scale(1)",
      tileGlow1: st.hoverTile === 1 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter2: () => this.setState({ hoverTile: 2 }),
      tileCircle2: st.hoverTile === 2 ? "var(--color-primary-hover)" : "#fff",
      tileIcon2: st.hoverTile === 2 ? "#fff" : "var(--color-primary)",
      tileRing2: "transparent",
      tileScale2: st.hoverTile === 2 ? "scale(1.12)" : "scale(1)",
      tileGlow2: st.hoverTile === 2 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter3: () => this.setState({ hoverTile: 3 }),
      tileCircle3: st.hoverTile === 3 ? "var(--color-primary-hover)" : "#fff",
      tileIcon3: st.hoverTile === 3 ? "#fff" : "var(--color-primary)",
      tileRing3: "transparent",
      tileScale3: st.hoverTile === 3 ? "scale(1.12)" : "scale(1)",
      tileGlow3: st.hoverTile === 3 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter4: () => this.setState({ hoverTile: 4 }),
      tileCircle4: st.hoverTile === 4 ? "var(--color-primary-hover)" : "#fff",
      tileIcon4: st.hoverTile === 4 ? "#fff" : "var(--color-primary)",
      tileRing4: "transparent",
      tileScale4: st.hoverTile === 4 ? "scale(1.12)" : "scale(1)",
      tileGlow4: st.hoverTile === 4 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter5: () => this.setState({ hoverTile: 5 }),
      tileCircle5: st.hoverTile === 5 ? "var(--color-primary-hover)" : "#fff",
      tileIcon5: st.hoverTile === 5 ? "#fff" : "var(--color-primary)",
      tileRing5: "transparent",
      tileScale5: st.hoverTile === 5 ? "scale(1.12)" : "scale(1)",
      tileGlow5: st.hoverTile === 5 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter10: () => this.setState({ hoverTile: 10 }),
      tileCircle10: st.hoverTile === 10 ? "var(--color-primary-hover)" : "#fff",
      tileIcon10: st.hoverTile === 10 ? "#fff" : "var(--color-primary)",
      tileRing10: "transparent",
      tileScale10: st.hoverTile === 10 ? "scale(1.12)" : "scale(1)",
      tileGlow10: st.hoverTile === 10 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter11: () => this.setState({ hoverTile: 11 }),
      tileCircle11: st.hoverTile === 11 ? "var(--color-primary-hover)" : "#fff",
      tileIcon11: st.hoverTile === 11 ? "#fff" : "var(--color-primary)",
      tileRing11: "transparent",
      tileScale11: st.hoverTile === 11 ? "scale(1.12)" : "scale(1)",
      tileGlow11: st.hoverTile === 11 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter12: () => this.setState({ hoverTile: 12 }),
      tileCircle12: st.hoverTile === 12 ? "var(--color-primary-hover)" : "#fff",
      tileIcon12: st.hoverTile === 12 ? "#fff" : "var(--color-primary)",
      tileRing12: "transparent",
      tileScale12: st.hoverTile === 12 ? "scale(1.12)" : "scale(1)",
      tileGlow12: st.hoverTile === 12 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter13: () => this.setState({ hoverTile: 13 }),
      tileCircle13: st.hoverTile === 13 ? "var(--color-primary-hover)" : "#fff",
      tileIcon13: st.hoverTile === 13 ? "#fff" : "var(--color-primary)",
      tileRing13: "transparent",
      tileScale13: st.hoverTile === 13 ? "scale(1.12)" : "scale(1)",
      tileGlow13: st.hoverTile === 13 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter14: () => this.setState({ hoverTile: 14 }),
      tileCircle14: st.hoverTile === 14 ? "var(--color-primary-hover)" : "#fff",
      tileIcon14: st.hoverTile === 14 ? "#fff" : "var(--color-primary)",
      tileRing14: "transparent",
      tileScale14: st.hoverTile === 14 ? "scale(1.12)" : "scale(1)",
      tileGlow14: st.hoverTile === 14 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter15: () => this.setState({ hoverTile: 15 }),
      tileCircle15: st.hoverTile === 15 ? "var(--color-primary-hover)" : "#fff",
      tileIcon15: st.hoverTile === 15 ? "#fff" : "var(--color-primary)",
      tileRing15: "transparent",
      tileScale15: st.hoverTile === 15 ? "scale(1.12)" : "scale(1)",
      tileGlow15: st.hoverTile === 15 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter16: () => this.setState({ hoverTile: 16 }),
      tileCircle16: st.hoverTile === 16 ? "var(--color-primary-hover)" : "#fff",
      tileIcon16: st.hoverTile === 16 ? "#fff" : "var(--color-primary)",
      tileRing16: "transparent",
      tileScale16: st.hoverTile === 16 ? "scale(1.12)" : "scale(1)",
      tileGlow16: st.hoverTile === 16 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      tileEnter17: () => this.setState({ hoverTile: 17 }),
      tileCircle17: st.hoverTile === 17 ? "var(--color-primary-hover)" : "#fff",
      tileIcon17: st.hoverTile === 17 ? "#fff" : "var(--color-primary)",
      tileRing17: "transparent",
      tileScale17: st.hoverTile === 17 ? "scale(1.12)" : "scale(1)",
      tileGlow17: st.hoverTile === 17 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      benefitScale0: st.hoverStep === 0 ? "scale(1.12)" : "scale(1)",
      benefitScale1: st.hoverStep === 1 ? "scale(1.12)" : "scale(1)",
      benefitScale2: st.hoverStep === 2 ? "scale(1.12)" : "scale(1)",
      benefitScale3: st.hoverStep === 3 ? "scale(1.12)" : "scale(1)",
      benefitGlow0: st.hoverStep === 0 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      benefitGlow1: st.hoverStep === 1 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      benefitGlow2: st.hoverStep === 2 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      benefitGlow3: st.hoverStep === 3 ? "0 0 0 6px rgba(var(--turquoise-300-rgb), 0.18)" : "none",
      benefitInk0: st.hoverStep === 0 ? "var(--color-primary-hover)" : "var(--color-text-primary)",
      benefitInk1: st.hoverStep === 1 ? "var(--color-primary-hover)" : "var(--color-text-primary)",
      benefitInk2: st.hoverStep === 2 ? "var(--color-primary-hover)" : "var(--color-text-primary)",
      benefitInk3: st.hoverStep === 3 ? "var(--color-primary-hover)" : "var(--color-text-primary)",
      benefitEnter0: () => this.setState({ hoverStep: 0 }),
      benefitEnter1: () => this.setState({ hoverStep: 1 }),
      benefitEnter2: () => this.setState({ hoverStep: 2 }),
      benefitEnter3: () => this.setState({ hoverStep: 3 }),
      benefitLeave0: () => this.setState(s => (s.hoverStep === 0 ? { hoverStep: null } : null)),
      benefitLeave1: () => this.setState(s => (s.hoverStep === 1 ? { hoverStep: null } : null)),
      benefitLeave2: () => this.setState(s => (s.hoverStep === 2 ? { hoverStep: null } : null)),
      benefitLeave3: () => this.setState(s => (s.hoverStep === 3 ? { hoverStep: null } : null)),
      contactButtons: [
        { label: "Contact Arizona MVD", detail: "Online, phone, and in-person options", href: "https://azdot.gov/mvd/contact-mvd" },
        { label: "Find an MVD Location", detail: "Offices and Authorized Third Parties", href: "https://azdot.gov/mvd/mvd-hours-and-locations" },
        { label: "View Video Library", detail: "Step-by-step walkthroughs of MVD services", href: "https://azmvdnow.gov/videos" },
        { label: "Provide Feedback", detail: "Tell us about your MVD experience", href: "https://azmvdnow.gov/guest/customeranonymous/survey/search/customer" },
        { label: "Report Fraud", detail: "Submit an incident report to MVD", href: "https://azmvdnow.gov/guest/incidentreport/select" },
        { label: "Visit azdot.gov", detail: "State transportation and travel information", href: "https://azdot.gov/" }
      ],
      footerLinks: [
        { label: "Forms and Publications", href: "https://azdot.gov/mvd/forms-library" },
        { label: "Privacy Statement", href: "https://azdot.gov/privacy-statement#:~:text=Please%20be%20assured%20that%20your,required%20or%20authorized%20by%20law" },
        { label: "Help", href: "#" },
        { label: "Text Message Policy", href: "https://azmvdnow.gov/textmessagepolicy" }
      ],

      isHome: st.view === "home",
      isSearchView: st.view !== "home",
      hasResults: st.view === "results",
      noResults: st.view === "noresults",
      resultsTitle: st.view === "noresults" ? "No Results Found" : "Results",
      resultsSub: st.view === "noresults"
        ? "We couldn’t find a match for " + st.submitted + ". Check your spelling or try a new search term."
        : "We found " + results.length + (results.length === 1 ? " match for " : " matches for ") + st.submitted + ".",
      results: results.map(label => ({ label })),
      frequent: ["Registration Renewal", "Driver License Renewal", "Schedule an Appointment"].map(label => ({
        label, onClick: () => this.submit(label)
      })),

      guestCollapsed: st.guestAll ? "0" : "1",
      guestMoreLabel: st.guestAll ? "View Less" : "View All",
      toggleGuestAll: () => this.setState(s => ({ guestAll: !s.guestAll })),

      mobileNavOpen: st.mobileNavOpen,
      toggleMobileNav: () => this.setState(s => ({ mobileNavOpen: !s.mobileNavOpen, mobileTab: null, mobileSub: null })),
      mobileTabs: TAB_ORDER.map(label => ({
        label,
        ink: st.mobileTab === label ? "var(--color-primary-hover)" : "var(--color-text-primary)",
        rotate: st.mobileTab === label ? 180 : 0,
        open: st.mobileTab === label,
        hasMenu: !NAV_LINKS[label],
        onClick: NAV_LINKS[label]
          ? () => { this.setState({ mobileNavOpen: false, mobileTab: null, mobileSub: null }); window.open(NAV_LINKS[label], "_blank", "noopener"); }
          : () => this.setState(s => ({ mobileTab: s.mobileTab === label ? null : label, mobileSub: null })),
        items: (MENUS[label] || []).map(item => {
          const key = label + "|" + item.label;
          const open = st.mobileSub === key;
          return {
            label: item.label,
            hasChildren: !!item.children,
            rotate: open ? 180 : 0,
            open: open,
            ink: open ? "var(--color-primary-hover)" : "var(--color-text-primary)",
            onClick: item.children
              ? () => this.setState(s => ({ mobileSub: s.mobileSub === key ? null : key }))
              : () => { this.setState({ mobileNavOpen: false, mobileTab: null, mobileSub: null }); this.flash(item.label); },
            children: (item.children || []).map(c => ({
              label: c,
              onClick: () => { this.setState({ mobileNavOpen: false, mobileTab: null, mobileSub: null }); this.flash(c); }
            }))
          };
        })
      })),

      langOpen: st.langOpen,
      langRotate: st.langOpen ? 180 : 0,
      lang: st.lang,
      toggleLang: () => this.setState(s => ({ langOpen: !s.langOpen })),
      languages: LANGUAGES.map(l => ({
        label: l.label,
        onClick: () => { this.setState({ lang: l.label, langOpen: false }); this.translateTo(l.code); }
      })),

      toast: st.toast
    };
  }
}
