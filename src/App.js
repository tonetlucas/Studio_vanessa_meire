/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect, useRef } from "react";
 
const SERVICES = [
  { category: "Cabelos", items: ["Corte Feminino",, "Escova", "Progressiva", "Hidratação", "Coloração", "Mechas & Luzes", "Cauterização"] },
  { category: "Unhas", items: ["Manicure", "Pedicure", "Gel", "Fibra de Vidro", "Alongamento", "Nail Art"] },
  { category: "Estética", items: ["Limpeza de Pele", "Design de Sobrancelha", "Micropigmentação", "Depilação"] },
  { category: "Especiais", items: ["Dia da Noiva", "Dia da Debutante", "Penteados", "Maquiagem"] },
];
 
const NAV_LINKS = ["Início", "Sobre", "Serviços", "Contato"];
 
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Início");
  const [activeCategory, setActiveCategory] = useState(0);
  const [visible, setVisible] = useState({});
  const sectionsRef = useRef({});
  const observerRef = useRef(null);
 
  const [form, setForm] = useState({ nome: "", whatsapp: "", servico: "", mensagem: "" });
  const [formError, setFormError] = useState("");
 
  const handleForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });
 
  const enviarWhatsApp = () => {
    if (!form.nome.trim() || !form.servico) {
      setFormError("Por favor, preencha seu nome e escolha um serviço. 💕");
      return;
    }
    setFormError("");
    const msg = `Olá Studio Vanessa Meire, tudo bem? 😊 Me chamo *${form.nome.trim()}*. Gostaria de fazer *${form.servico}*${form.mensagem.trim() ? ` — ${form.mensagem.trim()}` : ""}. Há algum horário disponível?`;
    const url = `https://wa.me/5543991274703?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };
 
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((prev) => ({ ...prev, [e.target.id]: true }));
            if (e.target.dataset.section) setActiveSection(e.target.dataset.section);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-animate], [data-section]").forEach((el) => {
      observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);
 
  const scrollTo = (section) => {
    const map = { Início: "hero", Sobre: "sobre", Serviços: "servicos", Contato: "contato" };
    document.getElementById(map[section])?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --rose:    #d3af37;
          --rose-light: #e8aab6;
          --rose-pale: #f7eaec;
          --gold:    #c9a96e;
          --gold-light: #e8d5b5;
          --cream:   #fdf8f5;
          --dark:    #2a1f24;
          --muted:   #7a6670;
          --white:   #ffffff;
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'Jost', sans-serif; background: var(--cream); color: var(--dark); overflow-x: hidden; }

        /* ── HEADER ── */
        header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 5%;
          display: flex; align-items: center; justify-content: space-between;
          height: 70px;
          transition: background .4s, box-shadow .4s, height .4s;
        }
        header.scrolled {
          background: rgba(253,248,245,.95);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 24px rgba(200,121,138,.12);
          height: 60px;
        }

        .logo {
          display: flex; flex-direction: column; line-height: 1;
          text-decoration: none;
        }
        .logo-top { font-family: 'Jost', sans-serif; font-weight: 300; font-size: .65rem; letter-spacing: .3em; color: var(--gold); text-transform: uppercase; }
        .logo-main { font-family: 'Cormorant Garamond', serif; font-size: 1.45rem; font-weight: 600; color: var(--dark); letter-spacing: .05em; }
        .logo-sub { font-family: 'Jost', sans-serif; font-weight: 300; font-size: .6rem; letter-spacing: .25em; color: var(--muted); text-transform: uppercase; margin-top: 1px; }

        /* Desktop nav */
        nav.desktop { display: flex; gap: 2rem; align-items: center; }
        nav.desktop a {
          font-family: 'Jost', sans-serif; font-weight: 400; font-size: .8rem;
          letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
          text-decoration: none; cursor: pointer;
          position: relative; padding-bottom: 3px;
          transition: color .3s;
        }
        nav.desktop a::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 100%;
          height: 1px; background: var(--rose);
          transition: right .3s;
        }
        nav.desktop a:hover, nav.desktop a.active { color: var(--dark); }
        nav.desktop a:hover::after, nav.desktop a.active::after { right: 0; }

        .cta-btn {
          background: var(--rose); color: var(--white);
          border: none; border-radius: 50px;
          padding: .55rem 1.4rem; font-family: 'Jost', sans-serif;
          font-size: .78rem; letter-spacing: .15em; text-transform: uppercase;
          cursor: pointer; transition: background .3s, transform .2s;
          text-decoration: none;
        }
        .cta-btn:hover { background: var(--dark); transform: translateY(-1px); }

        /* Hamburger */
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
        .hamburger span {
          display: block; width: 24px; height: 1.5px; background: var(--dark);
          transition: transform .35s, opacity .3s;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu */
        .mobile-menu {
          position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
          background: var(--cream); z-index: 999;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem;
          transform: translateX(100%); transition: transform .4s cubic-bezier(.77,0,.18,1);
        }
        .mobile-menu.open { transform: translateX(0); }
        .mobile-menu a {
          font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300;
          color: var(--dark); text-decoration: none; letter-spacing: .06em;
          transition: color .3s; cursor: pointer;
        }
        .mobile-menu a:hover { color: var(--rose); }
        .mobile-menu .cta-btn { font-size: .9rem; padding: .75rem 2rem; }

        /* ── HERO ── */
        #hero {
          min-height: 100svh;
          background: linear-gradient(160deg, #fff5f7 0%, var(--cream) 55%, #fdf4ec 100%);
          display: flex; flex-direction: column; justify-content: center;
          padding: 100px 5% 60px;
          position: relative; overflow: hidden;
        }
        .hero-ornament {
          position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
          width: min(520px, 65vw); height: min(520px, 65vw);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,121,138,.14) 0%, rgba(232,170,182,.06) 60%, transparent 75%);
          pointer-events: none;
        }
        .hero-ornament2 {
          position: absolute; left: -40px; bottom: 5%;
          width: min(220px, 40vw); height: min(220px, 40vw);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,169,110,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: .6rem;
          font-family: 'Jost', sans-serif; font-size: .7rem; letter-spacing: .3em;
          text-transform: uppercase; color: var(--rose); margin-bottom: 1.2rem;
          opacity: 0; transform: translateY(20px); animation: fadeUp .8s .2s forwards;
        }
        .hero-tag::before { content: ''; display: block; width: 28px; height: 1px; background: var(--rose); }
        h1.hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 300; line-height: .95; color: var(--dark);
          opacity: 0; animation: fadeUp .9s .4s forwards;
        }
        h1.hero-name span { color: var(--rose); font-style: italic; display: block; }
        .hero-desc {
          max-width: 440px; margin-top: 1.8rem;
          font-size: .95rem; font-weight: 300; line-height: 1.75; color: var(--muted);
          opacity: 0; animation: fadeUp .9s .6s forwards;
        }
        .hero-actions {
          display: flex; gap: 1rem; margin-top: 2.5rem; flex-wrap: wrap;
          opacity: 0; animation: fadeUp .9s .8s forwards;
        }
        .btn-outline {
          background: transparent; color: var(--dark);
          border: 1px solid rgba(42,31,36,.25); border-radius: 50px;
          padding: .55rem 1.4rem; font-family: 'Jost', sans-serif;
          font-size: .78rem; letter-spacing: .15em; text-transform: uppercase;
          cursor: pointer; transition: border-color .3s, color .3s;
          text-decoration: none;
        }
        .btn-outline:hover { border-color: var(--rose); color: var(--rose); }
        .hero-scroll {
          position: absolute; bottom: 2rem; left: 5%;
          display: flex; align-items: center; gap: .6rem;
          font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted);
          opacity: 0; animation: fadeUp .9s 1.2s forwards;
        }
        .scroll-line {
          width: 36px; height: 1px; background: var(--muted);
          animation: scrollPulse 2s 1.5s infinite;
        }
        @keyframes scrollPulse { 0%,100%{width:36px} 50%{width:56px} }

        /* ── SOBRE ── */
        #sobre {
          padding: 100px 5%;
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
        }
        .sobre-img-wrap {
          position: relative;
          opacity: 0; transform: translateX(-40px); transition: opacity .9s, transform .9s;
        }
        .sobre-img-wrap.vis { opacity: 1; transform: translateX(0); }
        .sobre-img-card {
          background: url(img/noiva-salao.jpeg);
          width: 100%;
          background-size: contain;
          background-size: 100% 100%;
          background-size: cover;
          background-position: center;
          border-radius: 4px 40px 4px 40px;
          aspect-ratio: 3/4; max-width: 380px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden; position: relative;
        }
        .sobre-img-card svg { width: 100%; opacity: .35; }
        .sobre-badge {
          position: absolute; bottom: -20px; right: -20px;
          background: var(--rose); color: var(--white); border-radius: 50%;
          width: 90px; height: 90px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 600;
          box-shadow: 0 8px 24px rgba(200,121,138,.4);
        }
        .sobre-badge small { font-family: 'Jost', sans-serif; font-size: .5rem; letter-spacing: .15em; font-weight: 300; }
        .sobre-content { opacity: 0; transform: translateX(40px); transition: opacity .9s .2s, transform .9s .2s; }
        .sobre-content.vis { opacity: 1; transform: translateX(0); }
        .section-eyebrow {
          font-family: 'Jost', sans-serif; font-size: .7rem; letter-spacing: .3em;
          text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: .6rem;
          margin-bottom: 1rem;
        }
        .section-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: var(--gold); }
        h2.section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 300; line-height: 1.1; color: var(--dark);
          margin-bottom: 1.5rem;
        }
        h2.section-title em { color: var(--rose); font-style: italic; }
        .sobre-text { font-size: .92rem; font-weight: 300; line-height: 1.85; color: var(--muted); margin-bottom: 1rem; }
        .sobre-stats {
          display: flex; gap: 2.5rem; margin-top: 2.5rem;
          padding-top: 2rem; border-top: 1px solid rgba(200,121,138,.2);
        }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 300; color: var(--rose); }
        .stat-label { font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); font-weight: 300; }

        /* ── SERVIÇOS ── */
        #servicos {
          padding: 100px 5%;
          background: linear-gradient(180deg, var(--dark) 0%, #1a1218 100%);
        }
        .serv-header { text-align: center; margin-bottom: 3.5rem; }
        .serv-header .section-eyebrow { justify-content: center; color: var(--cream); }
        .serv-header .section-eyebrow::before { background: var(--rose); }
        .serv-header h2 { color: var(--white); }
        .serv-header h2 em { color: var(--rose); }

        .serv-tabs {
          display: flex; gap: .5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 3rem;
          opacity: 0; transform: translateY(20px); transition: opacity .7s .1s, transform .7s .1s;
        }
        .serv-tabs.vis { opacity: 1; transform: translateY(0); }
        .serv-tab {
          background: transparent; border: 1px solid rgba(255,255,255,.15);
          color: rgba(255,255,255,.5); border-radius: 50px;
          padding: .45rem 1.2rem; font-family: 'Jost', sans-serif;
          font-size: .75rem; letter-spacing: .15em; text-transform: uppercase;
          cursor: pointer; transition: all .3s;
        }
        .serv-tab.active, .serv-tab:hover {
          background: var(--rose); border-color: var(--rose); color: var(--white);
        }

        .serv-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1px;
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px; overflow: hidden;
          opacity: 0; transform: translateY(30px); transition: opacity .7s .3s, transform .7s .3s;
        }
        .serv-grid.vis { opacity: 1; transform: translateY(0); }
        .serv-item {
          padding: 1.8rem 1.5rem;
          background: rgba(255,255,255,.02);
          font-family: 'Jost', sans-serif; font-weight: 300;
          font-size: .85rem; letter-spacing: .05em; color: rgba(255,255,255,.7);
          cursor: default; transition: background .3s, color .3s;
          display: flex; align-items: center; gap: .7rem;
        }
        .serv-item::before { content: '✦'; font-size: .5rem; color: var(--rose); opacity: .7; flex-shrink: 0; }
        .serv-item:hover { background: rgba(200,121,138,.15); color: var(--white); }

        .serv-cta { text-align: center; margin-top: 3rem; }
        .serv-cta p { color: rgba(255,255,255,.4); font-size: .8rem; letter-spacing: .15em; text-transform: uppercase; margin-bottom: 1.2rem; }

         /* ── CONTATO ── */
        #contato {
          padding: 100px 5%;
          background: var(--rose-pale);
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
        }
        .contato-left { opacity: 0; transform: translateY(30px); transition: opacity .9s, transform .9s; }
        .contato-left.vis { opacity: 1; transform: translateY(0); }
        .contato-right { opacity: 0; transform: translateY(30px); transition: opacity .9s .2s, transform .9s .2s; }
        .contato-right.vis { opacity: 1; transform: translateY(0); }
        .contact-card {
          background: var(--white); border-radius: 16px;
          padding: 2rem; margin-bottom: 1rem;
          display: flex; gap: 1rem; align-items: flex-start;
          box-shadow: 0 4px 24px rgba(200,121,138,.08);
          transition: transform .3s, box-shadow .3s;
        }
        .contact-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(200,121,138,.15); }
        .contact-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--rose-pale); display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .contact-label { font-size: .7rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: .3rem; }
        .contact-value { font-size: .92rem; color: var(--dark); font-weight: 400; }
 
        .form-group { margin-bottom: 1.2rem; }
        .form-group label { display: block; font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: .5rem; }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%; padding: .85rem 1rem;
          border: 1px solid rgba(200,121,138,.2); border-radius: 8px;
          background: var(--white); font-family: 'Jost', sans-serif;
          font-size: .9rem; color: var(--dark); outline: none;
          transition: border-color .3s;
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--rose); }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-group select { appearance: none; }

        /* ── FOOTER ── */
        footer {
          background: var(--dark); color: rgba(255,255,255,.5);
          padding: 3rem 5%;
          display: flex; flex-wrap: wrap; gap: 1.5rem;
          align-items: center; justify-content: space-between;
        }
        .footer-logo .logo-main { color: var(--white); font-size: 1.1rem; }
        .footer-logo .logo-top, .footer-logo .logo-sub { color: rgba(255,255,255,.35); }
        .footer-links { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .footer-links a { font-size: .75rem; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.4); text-decoration: none; transition: color .3s; cursor: pointer; }
        .footer-links a:hover { color: var(--rose-light); }
        .footer-copy { font-size: .72rem; letter-spacing: .05em; }
        .footer-social { display: flex; gap: .8rem; }
        .social-btn {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,.5); font-size: .9rem;
          cursor: pointer; transition: border-color .3s, color .3s, background .3s;
          text-decoration: none;
        }
        .social-btn:hover { border-color: var(--rose); color: var(--white); background: var(--rose); }

        /* ── ANIMATIONS ── */
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          nav.desktop { display: none; }
          .hamburger { display: flex; }
          #sobre { grid-template-columns: 1fr; gap: 3rem; }
          .sobre-img-wrap { display: flex; justify-content: center; }
          .sobre-img-card { max-width: 280px; }
          .sobre-badge { width: 72px; height: 72px; font-size: 1.2rem; bottom: -14px; right: -14px; }
          .sobre-stats { gap: 1.5rem; }
          #contato { grid-template-columns: 1fr; gap: 3rem; }
          footer { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .footer-links { gap: 1rem; }
          .hero-scroll { display: none; }
        }
        @media (max-width: 480px) {
          .hero-actions { flex-direction: column; align-items: flex-start; }
          .hero-actions .cta-btn, .hero-actions .btn-outline { width: fit-content; }
        }

        /* WhatsApp FAB */
        .wa-fab {
          position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999;
          width: 56px; height: 56px; border-radius: 50%;
          background: #25d366; color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,.45);
          text-decoration: none; font-size: 1.6rem;
          transition: transform .3s, box-shadow .3s;
          animation: fabPop .6s 2s both;
        }
        .wa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,.6); }
        @keyframes fabPop { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* HEADER */}
      <header className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo" onClick={() => scrollTo("Início")}>
          <span className="logo-top">Studio</span>
          <span className="logo-main">Vanessa Meire</span>
          <span className="logo-sub">Beleza & Estética</span>
        </a>

        <nav className="desktop">
          {NAV_LINKS.map((l) => (
            <a href="#" key={l} className={activeSection === l ? "active" : ""} onClick={() => scrollTo(l)}>{l}</a>
          ))}
          <a className="cta-btn" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer">Agendar</a>
        </nav>

        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l} onClick={() => scrollTo(l)}>{l}</a>
        ))}
        <a className="cta-btn" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer">Agendar Agora</a>
      </div>

      {/* HERO */}
      <section id="hero" data-section="Início">
        <div className="hero-ornament" />
        <div className="hero-ornament2" />
        <p className="hero-tag">Salão & Estética</p>
        <h1 className="hero-name">
          Studio<span>Vanessa Meire</span>
        </h1>
        <p className="hero-desc">
          Um espaço dedicado à sua beleza e bem-estar. Técnicas exclusivas, atendimento personalizado e resultados que encantam.
        </p>
        <div className="hero-actions">
          <a className="cta-btn" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
          <button className="btn-outline" onClick={() => scrollTo("Serviços")}>Ver Serviços</button>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Role para baixo
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" data-section="Sobre">
        <div
          id="sobre-img"
          data-animate
          className={`sobre-img-wrap ${visible["sobre-img"] ? "vis" : ""}`}
        >
          <div className="sobre-img-card">
            <svg viewBox="0 0 120 160" fill="none">
            
            </svg>
            <div className="sobre-badge">
              10+<small>anos</small>
            </div>
          </div>
        </div>

        <div
          id="sobre-text"
          data-animate
          className={`sobre-content ${visible["sobre-text"] ? "vis" : ""}`}
        >
          <p className="section-eyebrow">Quem somos</p>
          <h2 className="section-title">Arte &amp;<br /><em>Dedicação</em></h2>
          <p className="sobre-text">
            O Studio Vanessa Meire nasceu do amor pela arte da beleza. Com mais de 10 anos de experiência, Vanessa Meire construiu um espaço onde cada cliente recebe atenção exclusiva e um resultado que vai além do esperado.
          </p>
          <p className="sobre-text">
            Nossa equipe é treinada nas técnicas mais modernas do mercado, sempre com foco no cuidado, na elegância e no bem-estar de cada pessoa que entra pelo nosso salão.
          </p>
          <div className="sobre-stats">
            <div>
              <div className="stat-num">10+</div>
              <div className="stat-label">Anos de experiência</div>
            </div>
            <div>
              <div className="stat-num">2k+</div>
              <div className="stat-label">Clientes atendidas</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" data-section="Serviços">
        <div className="serv-header">
          <p className="section-eyebrow">O que oferecemos</p>
          <h2 className="section-title">Nossos <em>Serviços</em></h2>
        </div>

        <div
          id="serv-tabs"
          data-animate
          className={`serv-tabs ${visible["serv-tabs"] ? "vis" : ""}`}
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.category}
              className={`serv-tab ${activeCategory === i ? "active" : ""}`}
              onClick={() => setActiveCategory(i)}
            >
              {s.category}
            </button>
          ))}
        </div>

        <div
          id="serv-grid"
          data-animate
          className={`serv-grid ${visible["serv-grid"] ? "vis" : ""}`}
          key={activeCategory}
        >
          {SERVICES[activeCategory].items.map((item) => (
            <div key={item} className="serv-item">{item}</div>
          ))}
        </div>

        <div className="serv-cta">
          <p>Consulte disponibilidade e valores</p>
          <a className="cta-btn" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer">Falar com a equipe</a>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" data-section="Contato">
        <div
          id="cont-info"
          data-animate
          className={`contato-left ${visible["cont-info"] ? "vis" : ""}`}
        >
          <p className="section-eyebrow">Fale conosco</p>
          <h2 className="section-title">Agende seu<br /><em>Horário</em></h2>
          <p style={{ fontSize: ".92rem", color: "var(--muted)", fontWeight: 300, lineHeight: 1.75, marginBottom: "2rem" }}>
            Entre em contato pelo WhatsApp ou preencha o formulário ao lado. Respondemos rapidinho! 💕
          </p>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <div>
              <div className="contact-label">Endereço</div>
              <div className="contact-value">Rua Ver. Benjamin Constant, 330 — Centro, Jacarezinho, PR</div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <div>
              <div className="contact-label">WhatsApp</div>
              <div className="contact-value">(43) 9 9127-4703</div>
            </div>
          </div>
          <div className="contact-card">
            <div className="contact-icon">🕐</div>
            <div>
              <div className="contact-label">Horário de Atendimento</div>
              <div className="contact-value">Seg–Sex: 9h às 18h · Sáb: 8h às 13h</div>
            </div>
          </div>
          <div className="contact-card">
           <a href="https://www.instagram.com/studio_vanessa_meire"><div className="contact-icon">📸</div></a>
            <div>
              <div className="contact-label">Instagram</div>
              <div className="contact-value">@studio_vanessa_meire</div>
            </div>
          </div>
        </div>

       
        <div
          id="cont-form"
          data-animate
          className={`contato-right ${visible["cont-form"] ? "vis" : ""}`}
        >
          <div style={{ background: "var(--white)", borderRadius: 16, padding: "2.5rem", boxShadow: "0 4px 32px rgba(200,121,138,.1)" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, marginBottom: "1.5rem", color: "var(--dark)" }}>Mensagem Rápida</h3>
            <div className="form-group">
              <label>Seu nome *</label>
              <input name="nome" type="text" placeholder="Como podemos te chamar?" value={form.nome} onChange={handleForm} />
            </div>
            <div className="form-group">
              <label>WhatsApp</label>
              <input name="whatsapp" type="tel" placeholder="(43) 9 9999-9999" value={form.whatsapp} onChange={handleForm} />
            </div>
            <div className="form-group">
              <label>Serviço desejado *</label>
              <select name="servico" value={form.servico} onChange={handleForm}>
                <option value="">Selecione um serviço...</option>
                {SERVICES.map((s) => s.items.map((item) => (
                  <option key={item} value={item}>{s.category} — {item}</option>
                )))}
              </select>
            </div>
            <div className="form-group">
              <label>Mensagem (opcional)</label>
              <textarea name="mensagem" placeholder="Alguma dúvida ou pedido especial?" value={form.mensagem} onChange={handleForm} />
            </div>
 
            {formError && (
              <p style={{ color: "var(--rose)", fontSize: ".8rem", marginBottom: "1rem" }}>{formError}</p>
            )}
 
            {form.nome && form.servico && (
              <div style={{
                background: "var(--rose-pale)", borderRadius: 10, padding: "1rem 1.2rem",
                marginBottom: "1.2rem", fontSize: ".82rem", color: "var(--muted)",
                lineHeight: 1.6, borderLeft: "3px solid var(--rose)"
              }}>
                <strong style={{ color: "var(--rose)", display: "block", marginBottom: ".3rem", fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase" }}>
                  📱 Prévia da mensagem
                </strong>
                Olá Studio Vanessa Meire, tudo bem? 😊 Me chamo <strong>{form.nome}</strong>. Gostaria de fazer <strong>{form.servico}</strong>{form.mensagem ? ` — ${form.mensagem}` : ""}. Há algum horário disponível?
              </div>
            )}
 
            <button className="cta-btn" onClick={enviarWhatsApp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", width: "100%", padding: ".85rem" }}>
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Enviar pelo WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo logo">
          <span className="logo-top">Studio</span>
          <span className="logo-main">Vanessa Meire</span>
          <span className="logo-sub">Beleza & Estética</span>
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((l) => <a key={l} onClick={() => scrollTo(l)}>{l}</a>)}
        </div>
        <div className="footer-social">
          <a className="social-btn" href="https://www.instagram.com/studio_vanessa_meire" target="_blank" rel="noreferrer">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a className="social-btn" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Studio Vanessa Meire · Todos os direitos reservados</div>
      </footer>

      {/* WhatsApp FAB */}
      <a className="wa-fab" href="https://wa.me/5543991274703" target="_blank" rel="noreferrer" title="Falar no WhatsApp">
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
    </>
  );
}