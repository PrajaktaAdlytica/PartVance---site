import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, NavLink, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Database,
  Factory,
  FileSearch,
  Gauge,
  Globe2,
  LockKeyhole,
  Menu,
  Network,
  PackageCheck,
  SearchCheck,
  ShieldAlert,
  Truck,
  Warehouse,
  Wrench,
  X,
} from "lucide-react";
import "./styles.css";

const products = [
  {
    name: "Forecast",
    path: "/forecast",
    accent: "blue",
    icon: BarChart3,
    summary: "Intermittent demand forecasting, min/max policies, and excess stock detection.",
  },
  {
    name: "Risk",
    path: "/risk",
    accent: "amber",
    icon: ShieldAlert,
    summary: "Criticality, stockout exposure, supplier volatility, and mitigation actions.",
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    accent: "green",
    icon: SearchCheck,
    summary: "EU supplier discovery, qualification, lead-time reliability, and alternatives.",
  },
];

const useCases = [
  {
    title: "Manufacturing plants",
    copy: "Keep production equipment covered without overfilling storerooms.",
    icon: Factory,
    products: "Forecast + Risk + Suppliers",
  },
  {
    title: "Fleet operators",
    copy: "Plan parts availability across vehicles, depots, and service schedules.",
    icon: Truck,
    products: "Forecast + Risk",
  },
  {
    title: "Warehouses",
    copy: "Protect conveyors, robotics, and handling systems from spare parts delays.",
    icon: Warehouse,
    products: "Risk + Suppliers",
  },
  {
    title: "Maintenance teams",
    copy: "Link work orders, asset criticality, and part availability into one risk view.",
    icon: Wrench,
    products: "Risk + Forecast",
  },
  {
    title: "Procurement teams",
    copy: "Compare suppliers, track lead-time volatility, and reduce emergency sourcing.",
    icon: Network,
    products: "Suppliers + Forecast",
  },
];

const systems = ["SAP", "Microsoft Dynamics", "Oracle", "Infor", "IBM Maximo", "Fiix", "MaintainX", "CSV/API"];

const ease = [0.16, 1, 0.3, 1];

const companyLinks = {
  dlabs: "https://d-labs-site.vercel.app/companies",
  linkedin: "https://www.linkedin.com/company/partvance/",
  crunchbase: "https://www.crunchbase.com/organization/partvance",
};

const pageMeta = {
  "/": ["PartVance | AI spare parts intelligence", "PartVance is an AI spare parts intelligence platform for forecasting, risk scoring, and supplier intelligence."],
  "/news/funding-announcement": ["PartVance secures $580K in funding from Dlabs", "PartVance has secured $580K in funding from Dlabs. Announcement dated Jun 30, 2026."],
};

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = pageMeta[pathname] || ["PartVance | AI spare parts intelligence", "Industrial supply-chain intelligence for spare parts forecasting, risk, and suppliers."];
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [pathname]);
  return null;
}

function ExternalLink({ href, children, className = "", ...props }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...props}>
      {children}
    </a>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function Button({ children, to = "/demo", variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants = {
    primary: "bg-primary text-white shadow-[0_10px_24px_rgba(0,99,81,0.18)] hover:bg-teal focus-visible:outline-primary",
    secondary: "border border-hairline-strong bg-white text-primary hover:bg-primary-soft focus-visible:outline-primary",
    dark: "bg-white text-primary-deep hover:bg-primary-soft focus-visible:outline-white",
    ghost: "text-primary hover:text-teal focus-visible:outline-primary",
    glass: "liquid-glass-strong text-white hover:bg-white/10 focus-visible:outline-white",
  };
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} to={to} {...props}>
      {children}
    </Link>
  );
}

function BackgroundShapes({ className = "" }) {
  return (
    <div className={`background-shapes ${className}`} aria-hidden="true">
      <span className="shape shape-one" />
      <span className="shape shape-two" />
      <span className="shape shape-three" />
      <span className="shape shape-four" />
      <span className="shape-line line-one" />
      <span className="shape-line line-two" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const dropdowns = {
    products,
    solutions: useCases.map((item) => ({
      name: item.title,
      path: "/use-cases",
      summary: item.copy,
      icon: item.icon,
    })),
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/82 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="PartVance home">
          <img src="/brand/partvance-logo.svg" alt="PartVance" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {["products", "solutions"].map((key) => (
            <div key={key} className="relative" onMouseEnter={() => setOpen(key)} onMouseLeave={() => setOpen(null)}>
              <button className="nav-link">
                {key === "products" ? "Product" : "Solutions"}
                <ChevronDown className="h-4 w-4" />
              </button>
              {open === key && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease }}
                  className="absolute left-0 top-full w-[760px] rounded-[28px] border border-hairline bg-white p-7 shadow-[0_24px_70px_rgba(16,35,31,0.16)]"
                >
                  <div className="grid grid-cols-[1.4fr_0.8fr] gap-8">
                    <div className="grid gap-3">
                      {dropdowns[key].map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.name} to={item.path} className="group flex gap-4 rounded-2xl p-3 hover:bg-canvas-soft">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                              <Icon className="h-5 w-5" />
                            </span>
                            <span>
                              <span className="block font-semibold text-ink group-hover:text-primary">{item.name}</span>
                              <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.summary}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="rounded-[24px] bg-canvas-soft p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Pilot path</p>
                      <h3 className="mt-4 text-2xl font-semibold leading-tight text-ink">
                        Start with one site, one part family, or one supplier risk.
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                        Upload an export from ERP or CMMS and see the first forecast, risk, and sourcing opportunities.
                      </p>
                      <Button to="/demo" className="mt-6">
                        Plan a pilot <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
          {[
            ["Platform", "/products"],
            ["Use Cases", "/use-cases"],
            ["Pricing", "/pricing"],
            ["Resources", "/resources"],
            ["News", "/news/funding-announcement"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([label, to]) => (
            <NavLink key={label} to={to} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/signin" className="text-sm font-semibold text-ink-secondary hover:text-primary">
            Sign In
          </Link>
          <Button to="/demo">Request demo</Button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-white text-ink lg:hidden"
          onClick={() => setMobile(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-primary-deep/40 p-4 backdrop-blur-sm lg:hidden"
        >
          <motion.div
            initial={{ y: -16 }}
            animate={{ y: 0 }}
            className="rounded-[28px] bg-white p-5 shadow-[0_24px_70px_rgba(16,35,31,0.22)]"
          >
            <div className="flex items-center justify-between">
              <img src="/brand/partvance-logo.svg" alt="PartVance" className="h-10" />
              <button className="rounded-full p-2" onClick={() => setMobile(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 grid gap-2">
              {[...products.map((p) => [p.name, p.path]), ["Use Cases", "/use-cases"], ["Integrations", "/integrations"], ["Pricing", "/pricing"], ["News", "/news/funding-announcement"], ["About", "/about"], ["Contact", "/contact"], ["Sign In", "/signin"]].map(([label, to]) => (
                <Link key={label} to={to} onClick={() => setMobile(false)} className="rounded-xl px-3 py-3 font-semibold text-ink hover:bg-canvas-soft">
                  {label}
                </Link>
              ))}
              <Button to="/demo" className="mt-3" onClick={() => setMobile(false)}>
                Request demo
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}

function Typewriter({ text, delay = 0, speed = 0.012, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={false}
      animate={inView ? "visible" : "rest"}
      variants={{ rest: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: speed, delayChildren: delay } } }}
    >
      {text.split("").map((char, index) => (
        <motion.span key={`${char}-${index}`} variants={{ rest: { opacity: 1 }, visible: { opacity: 1 } }}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  useEffect(() => {
    if (!inView || !ref.current) return undefined;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [decimals, inView, prefix, suffix, value]);
  return <span ref={ref}>{`${prefix}${value.toFixed(decimals)}${suffix}`}</span>;
}

function HeroDashboard() {
  const [active, setActive] = useState("Forecast");
  const rows = [
    ["Hydraulic valve HV-22", "Plant Krakow", "18 days", "High", "Backup supplier"],
    ["Servo drive AX-8", "Fleet depot", "42 days", "Critical", "Raise safety"],
    ["Conveyor bearing C-19", "Poznan DC", "9 days", "Medium", "Transfer stock"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease }}
      className="hero-dashboard"
    >
      <div className="dashboard-top">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime">Live spare parts command</p>
          <h3 className="mt-2 text-xl font-semibold text-white">PartVance Intelligence Layer</h3>
        </div>
        <div className="flex gap-2">
          {products.map((product) => (
            <button
              key={product.name}
              className={`dashboard-tab ${active === product.name ? "active" : ""}`}
              onClick={() => setActive(product.name)}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="dashboard-panel">
          <div className="flex items-start justify-between">
            <div>
              <p className="panel-label">Recommended action</p>
              <h4 className="mt-2 text-2xl font-semibold text-ink">Reduce overstock without raising risk</h4>
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-deep">Forecast</span>
          </div>
          <div className="mt-8 h-44">
            <div className="chart-grid">
              {[18, 36, 24, 58, 44, 72, 63, 88].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 16 }}
                  animate={{ height }}
                  transition={{ duration: 1.2, delay: index * 0.07, repeat: Infinity, repeatType: "mirror", repeatDelay: 1.8, ease: "easeInOut" }}
                  className={`chart-bar ${index > 4 ? "forecast" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["28%", "stock value at risk"],
              ["€1.4M", "excess opportunity"],
              ["12", "urgent supplier alerts"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-hairline bg-canvas-soft p-3">
                <p className="font-mono text-lg font-semibold text-ink">{value}</p>
                <p className="mt-1 text-xs text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="dashboard-card risk-card"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4DB] text-risk">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8A5A00]">Risk alert</p>
                <p className="font-semibold text-ink">Servo drive AX-8 may stock out before planned shutdown.</p>
              </div>
            </div>
          </motion.div>
          <div className="dashboard-card">
            <p className="panel-label">Supplier alternatives</p>
            <div className="mt-4 grid gap-3">
              {["Wroclaw Drives", "Baltic Motion", "Silesia Parts"].map((supplier, index) => (
                <div key={supplier} className="flex items-center justify-between rounded-xl bg-canvas-soft px-3 py-2">
                  <span className="font-medium text-ink">{supplier}</span>
                  <span className="font-mono text-sm text-primary">{[94, 89, 81][index]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/8 text-white/60">
            <tr>
              {["Part", "Site", "Lead time", "Risk", "Recommendation"].map((head) => (
                <th key={head} className="px-4 py-3 font-medium">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-white/10 text-white/84">
                {row.map((cell, index) => (
                  <td key={cell} className={`px-4 py-3 ${index === 3 ? "font-semibold text-lime" : ""}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function TrustedByMarquee() {
  const trusted = [
    ["SAP", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/sap.svg"],
    ["Microsoft", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoft.svg"],
    ["Oracle", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/oracle.svg"],
    ["IBM", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ibm.svg"],
    ["Siemens", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/siemens.svg"],
    ["Salesforce", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/salesforce.svg"],
    ["Microsoft Excel", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftexcel.svg"],
    ["Power BI", "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/powerbi.svg"],
  ];
  return (
    <section className="trusted-strip" aria-label="Trusted by section">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <p className="trusted-label">Built around systems industrial teams already use</p>
          <div className="trusted-marquee">
            <div className="trusted-track">
              {[...trusted, ...trusted].map(([name, logo], index) => (
                <span key={`${name}-${index}`} className="trusted-logo-pill">
                  <img src={logo} alt={`${name} logo`} loading="lazy" />
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForecastProductVisual() {
  const bars = [32, 44, 38, 56, 48, 72, 64, 86, 78, 92];
  return (
    <motion.div className="product-visual forecast-visual" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
      <div className="product-visual-top">
        <div>
          <p className="product-visual-label">Forecast model</p>
          <h3>Demand curve and stock policy</h3>
        </div>
        <span className="status-pill">6 wk pilot</span>
      </div>
      <div className="forecast-chart">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            initial={{ height: 18 }}
            whileInView={{ height }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.04, ease: "easeOut" }}
            className={index > 5 ? "projected" : ""}
          />
        ))}
      </div>
      <div className="forecast-policy-grid">
        {[
          ["Min stock", "14", "Raise by 3"],
          ["Reorder", "22", "Next PO window"],
          ["Excess risk", "€84k", "Transfer candidate"],
        ].map(([label, value, note]) => (
          <div key={label}>
            <p>{label}</p>
            <strong>{value}</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>
      <div className="recommendation-line">
        <CheckCircle2 className="h-5 w-5" />
        <span>Recommended: rebalance 18 slow movers before next purchase cycle.</span>
      </div>
    </motion.div>
  );
}

function RiskProductVisual() {
  const cells = [
    "low", "medium", "medium", "high",
    "low", "medium", "high", "critical",
    "medium", "high", "critical", "critical",
  ];
  return (
    <motion.div className="product-visual risk-visual" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
      <div className="product-visual-top">
        <div>
          <p className="product-visual-label">Risk scoring</p>
          <h3>Criticality by asset and lead time</h3>
        </div>
        <span className="status-pill amber">3 urgent</span>
      </div>
      <div className="risk-matrix">
        {cells.map((level, index) => (
          <motion.span
            key={`${level}-${index}`}
            className={`risk-cell ${level}`}
            animate={level === "critical" ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
            transition={{ duration: 2.2, repeat: level === "critical" ? Infinity : 0, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className="risk-list">
        {[
          ["Servo drive AX-8", "Critical", "Raise safety stock"],
          ["PLC module P-14", "High", "Qualify backup"],
          ["Pump seal kit S-2", "Medium", "Monitor lead time"],
        ].map(([part, level, action]) => (
          <div key={part}>
            <span>{part}</span>
            <strong>{level}</strong>
            <p>{action}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SuppliersProductVisual() {
  return (
    <motion.div className="product-visual suppliers-visual" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }}>
      <div className="product-visual-top">
        <div>
          <p className="product-visual-label">Supplier intelligence</p>
          <h3>Alternatives ranked by fit and reliability</h3>
        </div>
        <span className="status-pill">EU network</span>
      </div>
      <div className="supplier-network">
        <div className="supplier-node main-node">
          <PackageCheck className="h-6 w-6" />
          <span>Critical bearing C-19</span>
        </div>
        {[
          ["Wroclaw Drives", "94%", "12 days"],
          ["Baltic Motion", "89%", "18 days"],
          ["Silesia Parts", "81%", "21 days"],
        ].map(([name, score, lead], index) => (
          <motion.div
            key={name}
            className={`supplier-node supplier-${index}`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>{name}</span>
            <strong>{score}</strong>
            <p>{lead}</p>
          </motion.div>
        ))}
      </div>
      <div className="recommendation-line">
        <CheckCircle2 className="h-5 w-5" />
        <span>Recommended: approve Wroclaw Drives as backup supplier.</span>
      </div>
    </motion.div>
  );
}

function ProductVisual({ type }) {
  if (type === "Risk") return <RiskProductVisual />;
  if (type === "Suppliers") return <SuppliersProductVisual />;
  return <ForecastProductVisual />;
}

function SignInTrustPanel() {
  return (
    <aside className="signin-trust-panel" aria-label="PartVance workspace security">
      <BackgroundShapes />
      <div className="relative z-10">
        <div className="signin-trust-header">
          <LockKeyhole className="h-8 w-8 text-lime" />
          <span>Secure industrial workspace</span>
        </div>
        <h2>Pick up where your operations team left off.</h2>
        <div className="signin-workspace-list">
          {[
            ["Krakow Plant", "Forecast review", "12 actions"],
            ["Poznan DC", "Stockout watchlist", "3 alerts"],
            ["Fleet Depot", "Supplier backup", "7 options"],
          ].map(([site, workflow, count]) => (
            <div key={site}>
              <span>{site}</span>
              <p>{workflow}</p>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
        <div className="signin-security-row">
          {["SSO ready", "Role access", "GDPR-aware"].map((item) => (
            <span key={item}>
              <CheckCircle2 className="h-4 w-4" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CinematicEntry() {
  const sectionRef = useRef(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeBeat = videoTime < 0.65 ? -1 : videoTime < 2.75 ? 0 : videoTime < 5.15 ? 1 : 2;
  const beats = [
    <>Too much stock.<br /><em>Not enough certainty.</em></>,
    <>The line stops for the one part<br className="cinematic-desktop-break" /> that is not there.</>,
    <>PartVance knows <em>which one.</em></>,
  ];

  const skipIntro = () => {
    window.scrollTo({
      top: sectionRef.current?.offsetHeight || window.innerHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="cinematic-entry" aria-label="PartVance cinematic introduction">
      <video
        className={`cinematic-entry-video ${videoReady ? "is-ready" : ""}`}
        src="/media/partvance-entry.mp4"
        poster="/media/partvance-cinematic-master.png"
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        onTimeUpdate={(event) => setVideoTime(event.currentTarget.currentTime)}
      />
      <div className="cinematic-entry-shade" aria-hidden="true" />

      <div className="cinematic-entry-content">
        <div className="cinematic-entry-topbar">
          <div className="cinematic-entry-brand">
            <img src="/brand/partvance-mark.svg" alt="" aria-hidden="true" />
            <span>PartVance</span>
          </div>
          <button type="button" onClick={skipIntro}>Skip intro</button>
        </div>

        <div className="cinematic-story">
          <motion.p
            className="cinematic-story-label"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
          >
            Industrial spare parts intelligence
          </motion.p>
          <div className="cinematic-story-lines" aria-live="polite">
            {beats.map((beat, index) => (
              <motion.h1
                key={index}
                aria-hidden={activeBeat !== index}
                animate={{
                  opacity: activeBeat === index ? 1 : 0,
                  y: activeBeat === index ? 0 : index < activeBeat ? -34 : 34,
                  filter: activeBeat === index ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: reducedMotion ? 0 : 0.72, ease }}
              >
                {beat}
              </motion.h1>
            ))}
          </div>
        </div>

        <button type="button" className="cinematic-scroll-cue" onClick={skipIntro}>
          <span>Scroll to enter</span>
          <span className="cinematic-progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${Math.max(0.04, Math.min(videoTime / 8, 1))})` }} />
          </span>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7FAF8_0%,#FFFFFF_68%)] pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_20%_18%,rgba(111,223,84,0.22),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(77,101,255,0.14),transparent_30%)]" />
      <div className="container-grid relative">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-3 py-2 text-sm font-semibold text-primary shadow-card">
            <span className="h-2 w-2 rounded-full bg-lime" />
            AI spare parts intelligence for industrial teams
          </div>
          <h1 className="mt-7 text-[clamp(2.75rem,7vw,5.85rem)] font-semibold leading-[0.95] text-ink">
            Stop <span className="hero-keyword">overstocking</span> spare parts. Stop{" "}
            <span className="hero-keyword">missing</span> them during{" "}
            <span className="hero-keyword">breakdowns</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-secondary">
            Forecast demand, score downtime risk, and find reliable EU suppliers from one intelligence layer built for factories, fleets, warehouses, and maintenance teams.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/demo">
              Request demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/products" variant="secondary">
              Explore products
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-ink-muted">
            {["No ERP replacement", "EU supplier context", "Starts from exports"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
        <div className="mt-12 lg:mt-0">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

function DarkProblemSection() {
  const painCards = [
    ["Expensive overstock", "Capital gets trapped in slow-moving parts that sit unused for years.", Boxes],
    ["Downtime risk", "Critical components are unavailable exactly when equipment fails.", Gauge],
    ["Supplier uncertainty", "Lead times, substitutions, and supplier availability shift without warning.", Globe2],
    ["Fragmented data", "ERP, CMMS, spreadsheets, and site knowledge rarely agree.", Database],
  ];
  return (
    <section className="bg-[#06243A] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow-dark">All-in-one, built for results</p>
          <h2 className="mt-5 text-4xl font-semibold text-white lg:text-6xl">
            Spare parts planning is stuck between too much stock and too much risk.
          </h2>
          <div className="mx-auto mt-6 h-px max-w-lg bg-[#64C7F5]" />
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {painCards.map(([title, copy, Icon], index) => (
            <motion.article
              key={title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease }}
              className="group min-h-[360px] rounded-[34px] border border-lime/80 bg-[#06243A] p-8 transition hover:-translate-y-1 hover:bg-[#07304D]"
            >
              <Icon className="h-16 w-16 text-white" strokeWidth={1.5} />
              <h3 className="mt-12 text-2xl font-semibold leading-tight text-lime">{title}</h3>
              <p className="mt-8 text-lg leading-relaxed text-white/78">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductSuite() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Product suite</p>
          <h2>One platform for spare parts forecasting, risk, and supplier intelligence.</h2>
          <p>
            PartVance brings together spare parts, assets, usage, purchasing, suppliers, and lead-time signals so each team works from the same operational view.
          </p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.article
                key={product.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.08, ease }}
                className={`product-card product-${product.accent}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-current shadow-card">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold text-ink">PartVance {product.name}</h3>
                <p className="mt-4 text-base leading-relaxed text-ink-secondary">{product.summary}</p>
                <ul className="mt-7 space-y-3 text-sm text-ink-secondary">
                  {[
                    "Works with ERP, CMMS, and spreadsheet exports",
                    "Shows recommendations, not just dashboards",
                    "Designed for multi-site industrial teams",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to={product.path} className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
                  Explore {product.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FundingAnnouncement() {
  return (
    <section id="funding-announcement" className="funding-section" aria-labelledby="funding-announcement-title">
      <div className="container">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease }}
          className="funding-panel"
        >
          <div className="funding-panel-copy">
            <div className="funding-meta">
              <span className="eyebrow eyebrow-dark">Funding announcement</span>
              <time dateTime="2026-06-30"><CalendarDays className="h-4 w-4" />Jun 30, 2026</time>
            </div>
            <h2 id="funding-announcement-title">PartVance secures $580K in funding from Dlabs.</h2>
            <p>
              PartVance is part of Dlabs’ global portfolio of companies building industrial supply-chain intelligence for complex operating environments.
            </p>
            <div className="funding-actions">
              <ExternalLink href={companyLinks.dlabs} className="funding-primary-link">
                View Dlabs portfolio <ArrowUpRight className="h-4 w-4" />
              </ExternalLink>
              <Link to="/news/funding-announcement" className="funding-secondary-link">
                Read announcement <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="funding-proof" aria-label="Funding summary">
            <span>Backed by</span>
            <strong>Dlabs</strong>
            <div>
              <p>$580K</p>
              <span>Funding announced<br />Jun 30, 2026</span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    [30, "%", "Potential inventory reduction"],
    [6, "wk", "Focused pilot window"],
    [12, "", "High-risk parts surfaced"],
    [24, "/7", "Continuous supplier monitoring"],
    [3, "x", "Faster risk review cycles"],
  ];
  return (
    <section id="stats" className="overflow-hidden border-y border-white/10 bg-[#061F33] px-6 py-20 text-white md:px-12 lg:px-[120px] lg:py-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-16 lg:flex-row lg:gap-[120px]">
        <motion.div
          className="flex-1"
          initial={false}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } }}
        >
          <h2 className="max-w-2xl text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.05]">
            <Typewriter text="Reduce working capital " delay={0} />
            <span className="font-serif italic font-normal text-lime">
              <Typewriter text="without increasing risk" delay={0.25} />
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
            <Typewriter
              text="Start with one site or part family. Surface excess stock, supplier exposure, and critical parts that need action before the next breakdown."
              delay={0.1}
            />
          </p>
          <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-[max-content_max-content] md:gap-x-16 lg:gap-x-24">
            {stats.map(([value, suffix, label], index) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
                className="flex flex-col"
              >
                <span className="font-serif text-5xl font-normal text-lime lg:text-[64px]">
                  <AnimatedCounter value={value} suffix={suffix} />
                </span>
                <span className="mt-3 max-w-[180px] text-xs font-bold uppercase tracking-[0.14em] text-white/44">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div className="stats-orbit">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.8 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`orbit-card orbit-${index}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{product.name}</span>
                </motion.div>
              );
            })}
            <img src="/brand/partvance-mark.svg" alt="" className="h-32 w-32" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    ["Connect", "Import spare parts, usage, stock, work orders, purchase orders, and suppliers."],
    ["Model", "Analyze intermittent demand, criticality, lead-time volatility, and site usage."],
    ["Recommend", "Reduce excess, rebalance sites, raise safety stock, or qualify backup suppliers."],
    ["Monitor", "Keep forecasts, risk scores, and supplier signals updated as data changes."],
  ];
  return (
    <section className="section bg-canvas-soft">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-4 text-4xl font-semibold text-ink lg:text-6xl">Connect your existing data. Get operational recommendations.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
              PartVance is designed to add intelligence on top of ERP, CMMS, EAM, procurement tools, and spreadsheets.
            </p>
          </div>
          <div className="rounded-[36px] bg-white p-4 shadow-panel">
            <div className="data-layer">
              <div className="grid gap-3">
                {["ERP", "CMMS", "EAM", "Purchasing", "CSV"].map((source) => (
                  <span key={source} className="source-pill">{source}</span>
                ))}
              </div>
              <div className="intelligence-core">
                <img src="/brand/partvance-mark.svg" alt="" />
                <span>PartVance intelligence layer</span>
              </div>
              <div className="grid gap-3">
                {["Forecast", "Risk", "Suppliers"].map((target) => (
                  <span key={target} className="target-pill">{target}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, copy], index) => (
            <article key={title} className="workflow-step-card rounded-2xl border border-hairline bg-white p-6">
              <span className="font-mono text-sm font-bold text-primary">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesBento() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Use cases</p>
          <h2>Built for the teams that keep operations moving.</h2>
          <p>From production lines to fleet depots and warehouse automation, PartVance maps spare parts decisions to real workflows.</p>
        </div>
        <div className="use-case-grid mt-14 grid gap-5 md:grid-cols-10">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            const layout = [
              "md:col-span-6 md:row-span-2 bento-featured",
              "md:col-span-4 bento-compact",
              "md:col-span-4 bento-compact",
              "md:col-span-5",
              "md:col-span-5",
            ][index];
            return (
              <motion.article
                key={item.title}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.05, ease }}
                className={`bento-card ${layout}`}
              >
                <div className="relative z-10">
                  <Icon className="h-9 w-9 text-lime" />
                  <h3 className="mt-10 text-3xl font-semibold leading-tight text-white">{item.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-white/78">{item.copy}</p>
                  <p className="mt-8 text-sm font-semibold text-lime">{item.products}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    ["Anna Kowalska", "Maintenance Reliability Lead, packaging manufacturer", "PartVance showed us which critical spares were creating risk, and which slow movers could be safely reduced."],
    ["Marek Zielinski", "Procurement Manager, industrial fleet operator", "The supplier view turned emergency sourcing into a weekly planning conversation instead of a last-minute scramble."],
    ["Elena Hoffmann", "Operations Director, EU distribution network", "We finally had maintenance, procurement, and finance looking at the same spare parts decisions."],
  ];
  return (
    <section className="testimonial-section">
      <div className="container relative">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>Built for believable industrial outcomes.</h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:items-stretch">
          {quotes.map(([name, role, quote], index) => (
            <motion.article
              key={name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08, ease }}
              className={`testimonial-card ${index === 1 ? "featured" : ""}`}
            >
              <div className="testimonial-avatar">
                <span>{name.split(" ").map((n) => n[0]).join("")}</span>
              </div>
              <h3>{name}</h3>
              <p className="role">{role}</p>
              <p className="quote">"{quote}"</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntegrationsPreview() {
  const dataFeeds = ["Parts master", "Stock levels", "Work orders", "Purchase orders", "Supplier lead times"];
  const outcomes = [
    ["Forecast", "min/max and excess stock"],
    ["Risk", "criticality and stockout exposure"],
    ["Suppliers", "backup options and lead-time signals"],
  ];
  return (
    <section className="section integration-section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Integrations</p>
            <h2 className="mt-4 text-4xl font-semibold text-ink lg:text-6xl">Connect messy systems. Return decisions teams can use.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-secondary">
              PartVance pulls spare parts signals from ERP, CMMS, purchasing, and spreadsheets, then turns them into forecast, risk, and supplier recommendations.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                ["01", "Start with exports or APIs from the systems you already use."],
                ["02", "Normalize parts, assets, suppliers, usage, stock, and lead-time fields."],
                ["03", "Send recommended actions back to maintenance, procurement, and planning teams."],
              ].map(([step, copy]) => (
                <div key={step} className="integration-proof">
                  <span>{step}</span>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <Button to="/integrations" className="mt-8" variant="secondary">
              Review data requirements <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="integration-map">
            <div className="integration-map-row source-row">
              {systems.slice(0, 6).map((system) => (
                <div key={system} className="integration-system-card">
                  {system}
                </div>
              ))}
            </div>
            <div className="integration-data-row">
              {dataFeeds.map((feed) => (
                <span key={feed}>{feed}</span>
              ))}
            </div>
            <div className="integration-core-node">
              <div className="flex items-center gap-3">
                <img src="/brand/partvance-mark.svg" alt="" />
                <div>
                  <p>PartVance data model</p>
                  <span>cleans, links, scores, and monitors spare parts decisions</span>
                </div>
              </div>
            </div>
            <div className="integration-outcomes">
              {outcomes.map(([title, copy]) => (
                <div key={title} className="integration-outcome-card">
                  <CheckCircle2 className="h-5 w-5" />
                  <div>
                    <p>{title}</p>
                    <span>{copy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    ["Pilot", "One site or part family", "Best for proving value from exports."],
    ["Scale", "Multi-site intelligence", "Best for teams aligning maintenance, finance, and procurement."],
    ["Network", "Supplier risk layer", "Best for regional sourcing and supplier resilience."],
  ];
  return (
    <section className="section bg-white" id="pricing">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Pricing</p>
          <h2>Demo-led pricing for industrial rollout paths.</h2>
          <p>Start narrow, prove value, then expand across sites, systems, and supplier workflows.</p>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map(([name, title, copy], index) => (
            <article key={name} className={`pricing-card ${index === 1 ? "highlight" : ""}`}>
              <p className="text-sm font-bold uppercase tracking-[0.16em]">{name}</p>
              <h3 className="mt-5 text-3xl font-semibold">{title}</h3>
              <p className="mt-4 leading-relaxed opacity-75">{copy}</p>
              <ul className="mt-8 space-y-3 text-sm">
                {["Data readiness review", "Product workflow demo", "Pilot success metrics"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button to="/demo" variant={index === 1 ? "dark" : "secondary"} className="mt-8 w-full">
                Request pricing
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ["What systems does PartVance connect with?", "ERP, CMMS, EAM, procurement systems, spreadsheets, and CSV exports. Full API integration is useful, but not required for an initial pilot."],
    ["Do we need clean spare parts data before starting?", "No. PartVance is designed to work with imperfect industrial data and can help identify duplicates, missing fields, inconsistent naming, and supplier gaps."],
    ["Can PartVance work without full ERP integration?", "Yes. Teams can start with structured exports from ERP, CMMS, purchasing, or inventory systems, then move toward deeper integration later."],
    ["How is spare parts risk calculated?", "Risk can combine part criticality, asset importance, current stock, usage history, supplier lead time, supplier reliability, substitution options, and downtime impact."],
    ["Can Suppliers help find EU or Poland-based alternatives?", "Yes. The Suppliers module emphasizes local and regional supplier discovery, qualification, and monitoring for industrial spare parts."],
  ];
  return (
    <section className="section faq-section">
      <BackgroundShapes />
      <div className="container relative z-10">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2>Questions industrial teams ask before starting.</h2>
        </div>
        <div className="faq-panel mx-auto mt-12 max-w-4xl divide-y divide-hairline rounded-[28px] border border-hairline bg-white">
          {faqs.map(([question, answer], index) => (
            <button key={question} className="block w-full px-6 py-6 text-left" onClick={() => setOpen(open === index ? -1 : index)}>
              <span className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold text-ink">{question}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === index ? "rotate-180" : ""}`} />
              </span>
              {open === index && (
                <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 block max-w-3xl text-base leading-relaxed text-ink-secondary">
                  {answer}
                </motion.span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFooter() {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";
    let cancelled = false;
    let hlsInstance;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return undefined;
    }
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      hlsInstance = new Hls();
      hlsInstance.loadSource(src);
      hlsInstance.attachMedia(video);
    });
    return () => {
      cancelled = true;
      if (hlsInstance) hlsInstance.destroy();
    };
  }, []);
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-center text-white md:px-16 lg:px-24">
      <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-x-0 top-0 z-[1] h-[220px] bg-gradient-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-[220px] bg-gradient-to-t from-black to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <h2 className="font-serif text-5xl italic leading-[0.9] md:text-7xl">
          See which spare parts are costing you money or putting uptime at risk.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-white/64 md:text-lg">
          Start with one site, one part category, or one operational workflow. We will map the data and show the first recommendations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button to="/demo" variant="glass">
            Request demo <ArrowUpRight className="h-5 w-5" />
          </Button>
          <Button to="/contact" variant="dark">
            Talk to an expert <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <footer className="relative z-10 mx-auto mt-28 max-w-[1240px] border-t border-white/10 pt-8">
        <div className="grid gap-10 text-left lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" aria-label="PartVance home" className="footer-logo-link">
              <img src="/brand/partvance-mark.svg" alt="" className="footer-logo-mark" />
              <span>PartVance</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/48">
              AI spare parts intelligence for factories, fleets, warehouses, and maintenance teams.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/48">
              2086 Charles Boulevard, Sliema, NO SLM 1000, Malta
              <br />
              Phone: 1444 5745
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              [
                "Products",
                [
                  ["Forecast", "/forecast"],
                  ["Risk", "/risk"],
                  ["Suppliers", "/suppliers"],
                ],
              ],
              [
                "Solutions",
                [
                  ["Manufacturing", "/use-cases"],
                  ["Fleets", "/use-cases"],
                  ["Warehouses", "/use-cases"],
                ],
              ],
              [
                "Company",
                [
                  ["About", "/about"],
                  ["News", "/news/funding-announcement"],
                  ["Contact", "/contact"],
                  ["Request demo", "/demo"],
                ],
              ],
              [
                "Legal",
                [
                  ["Privacy", "/privacy"],
                  ["Terms", "/terms"],
                  ["GDPR", "/gdpr"],
                ],
              ],
            ].map(([group, links]) => (
              <div key={group}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">{group}</p>
                <div className="mt-4 grid gap-3">
                  {links.map(([label, to]) => (
                    <Link key={label} to={to} className="text-sm text-white/58 hover:text-white">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-4 text-xs text-white/36 md:flex-row">
          <p>© 2026 PartVance. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <span>Backed by Dlabs · $580K funding</span>
            <ExternalLink href={companyLinks.dlabs} className="footer-external-link">Dlabs portfolio</ExternalLink>
            <ExternalLink href={companyLinks.linkedin} className="footer-external-link">LinkedIn</ExternalLink>
            <ExternalLink href={companyLinks.crunchbase} className="footer-external-link">Crunchbase</ExternalLink>
          </div>
        </div>
      </footer>
    </section>
  );
}

function Home() {
  return (
    <>
      <CinematicEntry />
      <Hero />
      <TrustedByMarquee />
      <DarkProblemSection />
      <ProductSuite />
      <FundingAnnouncement />
      <StatsSection />
      <WorkflowSection />
      <UseCasesBento />
      <Testimonials />
      <IntegrationsPreview />
      <Pricing />
      <FAQ />
      <CtaFooter />
    </>
  );
}

function PageHero({ eyebrow, title, copy, children }) {
  return (
    <section className="bg-canvas-soft pt-32">
      <div className="container pb-16 pt-12">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.03] text-ink lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-secondary">{copy}</p>
        {children}
      </div>
    </section>
  );
}

function ProductPage({ type }) {
  const data = {
    Forecast: {
      eyebrow: "PartVance Forecast",
      title: "Forecast spare parts demand that does not behave like normal inventory.",
      copy: "Plan intermittent, slow-moving, and critical spare parts with recommendations for min/max levels, excess stock, transfers, and reorder timing.",
      icon: BarChart3,
      bullets: ["Intermittent demand forecasting", "Stock policy recommendations", "Excess and dead stock detection", "Multi-site visibility"],
    },
    Risk: {
      eyebrow: "PartVance Risk",
      title: "Know which spare parts put uptime at risk.",
      copy: "Score risk across parts, assets, suppliers, stock levels, and lead times so teams can act before breakdowns escalate.",
      icon: ShieldAlert,
      bullets: ["Criticality scoring", "Stockout exposure", "Supplier risk signals", "Mitigation recommendations"],
    },
    Suppliers: {
      eyebrow: "PartVance Suppliers",
      title: "Find and monitor reliable suppliers for critical spare parts.",
      copy: "Discover EU and Poland-based supplier alternatives, compare reliability, track lead-time risk, and connect supplier decisions to uptime.",
      icon: SearchCheck,
      bullets: ["Supplier discovery", "Supplier profiles", "Alternative recommendations", "Lead-time tracking"],
    },
  }[type];
  const Icon = data.icon;
  return (
    <>
      <PageHero eyebrow={data.eyebrow} title={data.title} copy={data.copy}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/demo">Request {type} demo</Button>
          <Button to="/products" variant="secondary">View suite</Button>
        </div>
      </PageHero>
      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Icon className="h-14 w-14 text-primary" />
            <h2 className="mt-6 text-4xl font-semibold text-ink">Core capabilities</h2>
            <div className="mt-8 grid gap-4">
              {data.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 rounded-2xl border border-hairline bg-canvas-soft p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="font-semibold text-ink">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
          <ProductVisual type={type} />
        </div>
      </section>
      <WorkflowSection />
      <CtaFooter />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Three products. One spare parts intelligence layer." copy="Forecast demand, prioritize risk, and improve supplier decisions using the operational data your teams already have.">
        <Button to="/demo" className="mt-8">Plan a pilot</Button>
      </PageHero>
      <ProductSuite />
      <WorkflowSection />
      <CtaFooter />
    </>
  );
}

function UseCasesPage() {
  return (
    <>
      <PageHero eyebrow="Use cases" title="Spare parts intelligence for teams that cannot afford avoidable downtime." copy="From production lines to vehicle fleets and warehouse automation, PartVance helps operational teams make better spare parts decisions." />
      <UseCasesBento />
      <Testimonials />
      <CtaFooter />
    </>
  );
}

function IntegrationsPage() {
  return (
    <>
      <PageHero eyebrow="Integrations" title="Add intelligence without replacing your current systems." copy="PartVance connects to ERP, CMMS, EAM, procurement tools, spreadsheets, and APIs to create a practical spare parts intelligence layer." />
      <IntegrationsPreview />
      <section className="section bg-white">
        <div className="container grid gap-6 md:grid-cols-3">
          {["Role-based access", "Secure transfer", "Clear data ownership"].map((title) => (
            <article key={title} className="rounded-2xl border border-hairline p-6">
              <LockKeyhole className="h-8 w-8 text-primary" />
              <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-ink-secondary">Built for operational data workflows with GDPR-aware handling and practical IT review paths.</p>
            </article>
          ))}
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function ResourcesPage() {
  const groups = ["MRO spare parts forecasting", "How to reduce overstock safely", "Supplier lead-time risk checklist", "Criticality scoring glossary"];
  return (
    <>
      <PageHero eyebrow="Resources" title="Practical guides for spare parts planning, risk, and supplier intelligence." copy="Learn how industrial teams reduce overstock, avoid stockouts, and improve supplier resilience." />
      <section className="section bg-white">
        <div className="container">
          <Link to="/news/funding-announcement" className="resource-announcement-card">
            <div>
              <span>Company news · Jun 30, 2026</span>
              <h2>PartVance secures $580K in funding from Dlabs.</h2>
            </div>
            <ArrowRight className="h-6 w-6" />
          </Link>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
          {groups.map((title) => (
            <article key={title} className="rounded-2xl border border-hairline p-7 hover:bg-canvas-soft">
              <FileSearch className="h-8 w-8 text-primary" />
              <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-ink-secondary">A practical playbook for maintenance, procurement, and operations leaders.</p>
            </article>
          ))}
          </div>
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Building the intelligence layer for industrial spare parts." copy="We help factories, fleets, warehouses, and maintenance teams make better decisions about the parts that keep operations running." />
      <section className="section bg-white">
        <div className="container">
          <div className="credibility-record">
            <div>
              <p className="eyebrow">Company record</p>
              <h2>Backed by Dlabs</h2>
              <p>$580K funding · Announced Jun 30, 2026</p>
            </div>
            <div className="credibility-links">
              <ExternalLink href={companyLinks.dlabs}>Dlabs portfolio <ArrowUpRight className="h-4 w-4" /></ExternalLink>
              <ExternalLink href={companyLinks.linkedin}>LinkedIn <ArrowUpRight className="h-4 w-4" /></ExternalLink>
              <ExternalLink href={companyLinks.crunchbase}>Crunchbase <ArrowUpRight className="h-4 w-4" /></ExternalLink>
            </div>
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {["Our mission", "Why now", "EU focus"].map((title, index) => (
            <article key={title} className="rounded-2xl border border-hairline p-7">
              <h3 className="text-2xl font-semibold text-ink">{title}</h3>
              <p className="mt-4 leading-relaxed text-ink-secondary">
                {[
                  "Make spare parts planning more predictive, less reactive, and easier to coordinate across teams.",
                  "Lead-time volatility, aging equipment, and rising inventory costs require better decision intelligence.",
                  "PartVance is designed around European industrial operations, regional supplier networks, and practical data handling.",
                ][index]}
              </p>
            </article>
          ))}
          </div>
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function FundingAnnouncementPage() {
  return (
    <>
      <article className="news-article">
        <header className="news-article-hero">
          <div className="container">
            <Link to="/resources" className="news-back-link">News <ArrowRight className="h-4 w-4" /></Link>
            <div className="news-article-meta">
              <span className="eyebrow eyebrow-dark">Funding announcement</span>
              <time dateTime="2026-06-30">Jun 30, 2026</time>
            </div>
            <h1>PartVance secures $580K in funding from Dlabs.</h1>
            <p>PartVance has secured $580K in funding from Dlabs.</p>
          </div>
        </header>
        <div className="container news-article-body">
          <div className="news-article-copy">
            <p className="news-lede">
              PartVance is part of Dlabs’ global portfolio of companies building industrial supply-chain intelligence for complex operating environments.
            </p>
            <div className="news-fact-row" aria-label="Announcement facts">
              <div><span>Company</span><strong>PartVance</strong></div>
              <div><span>Investor</span><strong>Dlabs</strong></div>
              <div><span>Funding</span><strong>$580K</strong></div>
              <div><span>Announced</span><strong>Jun 30, 2026</strong></div>
            </div>
            <div className="news-links-panel">
              <h2>Company links</h2>
              <p>Follow PartVance and view the approved public company records.</p>
              <div>
                <ExternalLink href={companyLinks.dlabs}>View Dlabs portfolio <ArrowUpRight className="h-4 w-4" /></ExternalLink>
                <ExternalLink href={companyLinks.linkedin}>PartVance on LinkedIn <ArrowUpRight className="h-4 w-4" /></ExternalLink>
                <ExternalLink href={companyLinks.crunchbase}>PartVance on Crunchbase <ArrowUpRight className="h-4 w-4" /></ExternalLink>
              </div>
            </div>
          </div>
        </div>
      </article>
      <CtaFooter />
    </>
  );
}

function LeadForm({ mode = "demo" }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="rounded-[28px] border border-hairline bg-white p-6 shadow-panel"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {["Name", "Work email", "Company", "Role", "Country", mode === "demo" ? "Current systems" : "Interest area"].map((field) => (
          <label key={field} className="grid gap-2 text-sm font-semibold text-ink">
            {field}
            <input className="form-input" required={field !== "Current systems"} placeholder={field === "Work email" ? "you@company.com" : field} />
          </label>
        ))}
      </div>
      <label className="mt-4 grid gap-2 text-sm font-semibold text-ink">
        Main challenge
        <textarea className="form-input min-h-[120px]" placeholder="Overstock, stockouts, supplier delays, poor data, multi-site visibility..." />
      </label>
      <button className="interactive-button mt-6 min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white hover:bg-teal" type="submit">
        {mode === "demo" ? "Request demo" : "Send message"}
      </button>
      {sent && <p className="mt-4 rounded-xl bg-primary-soft px-4 py-3 text-sm font-semibold text-primary-deep">Thanks. This form is wired for the prototype and ready for backend connection.</p>}
    </form>
  );
}

function DemoPage() {
  return (
    <>
      <PageHero eyebrow="Request demo" title="See what PartVance can find in your spare parts data." copy="Book a demo focused on your current systems, sites, parts categories, and operational risks." />
      <section className="section bg-canvas-soft">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[28px] bg-primary-deep p-8 text-white">
            <ClipboardCheck className="h-10 w-10 text-lime" />
            <h2 className="mt-6 text-3xl font-semibold">What happens next</h2>
            <ol className="mt-6 grid gap-4 text-white/78">
              {["We review your use case.", "We map relevant data sources.", "We show the product workflow.", "We discuss a practical pilot scope."].map((step) => (
                <li key={step} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-lime" />{step}</li>
              ))}
            </ol>
          </div>
          <LeadForm />
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us about spare parts forecasting, risk, or suppliers." copy="Share your current challenge and we will help identify the best next step." />
      <section className="section bg-canvas-soft">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] bg-white p-8">
            <Building2 className="h-10 w-10 text-primary" />
            <h2 className="mt-6 text-3xl font-semibold text-ink">Good reasons to contact us</h2>
            <ul className="mt-6 grid gap-3 text-ink-secondary">
              {["Reduce spare parts overstock.", "Investigate recurring stockouts.", "Find backup suppliers for critical parts.", "Pilot one site or part category."].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary" />{item}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-muted">2086 Charles Boulevard, Sliema, NO SLM 1000, Malta · Phone: 1444 5745 · hello@partvance.com</p>
          </div>
          <LeadForm mode="contact" />
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Start with a focused spare parts intelligence pilot."
        copy="PartVance pricing is scoped around sites, part families, data sources, and the workflows your team wants to improve first."
      />
      <Pricing />
      <FAQ />
      <CtaFooter />
    </>
  );
}

function SimpleInfoPage({ eyebrow, title, copy }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} copy={copy} />
      <section className="section bg-white">
        <div className="container max-w-3xl">
          <div className="rounded-[28px] border border-hairline bg-canvas-soft p-8">
            <h2 className="text-3xl font-semibold text-ink">A practical policy placeholder for launch readiness.</h2>
            <p className="mt-4 leading-relaxed text-ink-secondary">
              This page is included so every footer destination resolves cleanly during the prototype stage. It is ready for legal, privacy, and security content before production launch.
            </p>
            <Button to="/contact" variant="secondary" className="mt-8">
              Contact PartVance
            </Button>
          </div>
        </div>
      </section>
      <CtaFooter />
    </>
  );
}

function SignInPage() {
  return (
    <section className="min-h-screen bg-canvas-soft pt-32">
      <div className="container grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
        <div className="rounded-[28px] border border-hairline bg-white p-8 shadow-panel">
          <img src="/brand/partvance-logo.svg" alt="PartVance" className="h-12" />
          <h1 className="mt-10 text-4xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-3 text-ink-secondary">Sign in to your spare parts intelligence workspace.</p>
          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold text-ink">Email<input className="form-input" placeholder="you@company.com" /></label>
            <label className="grid gap-2 text-sm font-semibold text-ink">Password<input className="form-input" type="password" placeholder="••••••••" /></label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-muted"><input type="checkbox" /> Remember me</label>
              <a href="#" className="font-semibold text-primary">Forgot password?</a>
            </div>
            <button className="interactive-button min-h-11 rounded-full bg-primary px-5 font-semibold text-white">Sign in</button>
            <button type="button" className="interactive-button secondary min-h-11 rounded-full border border-hairline bg-white px-5 font-semibold text-ink">Continue with SSO</button>
          </form>
        </div>
        <SignInTrustPanel />
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageMetadata />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/forecast" element={<ProductPage type="Forecast" />} />
        <Route path="/risk" element={<ProductPage type="Risk" />} />
        <Route path="/suppliers" element={<ProductPage type="Suppliers" />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/news/funding-announcement" element={<FundingAnnouncementPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/privacy"
          element={<SimpleInfoPage eyebrow="Privacy" title="Privacy for industrial data workflows." copy="PartVance is designed for GDPR-aware evaluation paths, clear data ownership, and controlled access to operational information." />}
        />
        <Route
          path="/terms"
          element={<SimpleInfoPage eyebrow="Terms" title="Terms for using the PartVance prototype." copy="Commercial terms are finalized during pilot scoping and production onboarding with each customer." />}
        />
        <Route
          path="/gdpr"
          element={<SimpleInfoPage eyebrow="GDPR" title="GDPR-aware handling for EU industrial teams." copy="PartVance is planned around European data handling expectations, least-privilege access, and practical data review workflows." />}
        />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")).render(<App />);
