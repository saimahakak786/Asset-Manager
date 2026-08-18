import { type FormEvent, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gavel,
  Handshake,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
plp  Scale,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import '@/index.css';

constlxla queryClient = new QueryClient();
const phone = '+919796552984';
const displayPhone = '+91 9796552984';
const whatsappMessage = 'Hello Adv. Saima Hakak, I would like to discuss a legal matter and request a consultation.';
const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

const practiceAreas = [
  ['Civil Litigation', 'Civil suits, recovery matters, injunctions, compensation claims and related civil proceedings.', Scale],
  ['Property & Land Matters', 'Property disputes, land-related matters, documentation and related legal proceedings.', Landmark],
  ['Criminal Law & Defence', 'Criminal complaints, criminal defence and related proceedings.', Gavel],
  ['Bail & Anticipatory Bail', 'Regular bail, anticipatory bail and related applications.', ShieldCheck],
  ['NDPS Matters', 'Legal assistance in matters arising under narcotics and psychotropic substance laws.', BriefcaseBusiness],
  ['Cheque Dishonour', 'Section 138 of the Negotiable Instruments Act, cheque dishonour proceedings and related recovery disputes.', FileCheck2],
  ['Consumer Matters', 'Consumer complaints, deficiency in service, unfair trade practices and compensation claims.', Handshake],
  ['Family & Matrimonial Matters', 'Divorce, matrimonial disputes, maintenance and related family proceedings.', Sparkles],
  ['Domestic Violence Matters', 'Legal assistance in proceedings relating to domestic violence and associated legal remedies.', ShieldCheck],
  ['Child Custody & Guardianship', 'Child custody, guardianship and related family-law proceedings.', Landmark],
  ['Child Rights & Juvenile Justice', 'Legal assistance concerning child protection and juvenile justice matters.', LockKeyhole],
  ['POCSO-Related Proceedings', 'Legal assistance in proceedings involving matters under the POCSO framework.', ShieldCheck],
  ['Legal Notices & Replies', 'Drafting and responding to legal notices and professional legal correspondence.', FileText],
  ['Legal Drafting', 'Drafting of plaints, applications, affidavits, petitions, replies and other legal documents.', ClipboardCheck],
  ['Legal Consultation & Opinions', 'Professional legal consultation, issue analysis and legal opinions based on the facts and documents provided.', Search],
  ['Agreements & Documentation', 'Drafting, review and assistance relating to agreements and legal documentation.', FileCheck2],
  ['Recovery & Compensation Claims', 'Assistance with recovery claims, compensation matters and related proceedings.', ArrowDownRight],
  ['Other Legal & Miscellaneous Matters', 'Legal assistance for matters outside primary categories, subject to consultation and assessment.', BriefcaseBusiness],
] as const;

const matterOptions = [
  'Civil Matter', 'Criminal Matter', 'Bail / Anticipatory Bail', 'NDPS Matter', 'Cheque Dishonour',o
  'Consumer Matter', 'Property / Land', 'Family / Matrimonial', 'Domestic Violence',
  'Child Custody / Guardianship', 'Child Rights / Juvenile Justice', 'Legal Notice',
  'Legal Drafting', 'Legal Consultation', 'Other',
];

const problemOptions = [
  ['I received a legal notice', 'Legal Notice'],
  ['I need bail', 'Bail / Anticipatory Bail'],
  ['I have a cheque dishonour issue', 'Cheque Dishonour'],
  ['I have a property dispute', 'Property / Land'],
  ['I have a consumer complaint', 'Consumer Matter'],
  ['I have a matrimonial / family matter', 'Family / Matrimonial'],
  ['I need a legal document drafted', 'Legal Drafting'],
  ['I need legal consultation', 'Legal Consultation'],
  ['Other legal matter', 'Other'],
] as const;

const services = ['Legal Consultation', 'Legal Opinions', 'Legal Notices', 'Replies to Legal Notices', 'Plaint Drafting', 'Written Statements', 'Applications', 'Affidavits', 'Agreements', 'Document Review', 'Case Preparation', 'Legal Research', 'Litigation Support', 'Recovery & Compensation Matters'];

const insights = [hc
  ['01', 'What to Do After Receiving a Legal Notice', 'A sample starting point for understanding the first practical steps after a notice arrives.'],
  ['02', 'Understanding Cheque Dishonour Proceedings', 'A sample overview of the documents and timelines commonly relevant to a cheque matter.'],
  ['03', 'What Is Anticipatory Bail?', 'A sample explainer on the purpose of anticipatory bail and when to seek legal guidance.'],
  ['04', 'Understanding Consumer Rights', 'A sample guide to identifying a consumer concern and organising supporting information.'],
  ['05', 'Important Considerations Before Filing a Civil Suit', 'A sample checklist for thinking through documents, parties and the relief sought.'],
  ['06', 'Understanding Maintenance Proceedings', 'A sample introduction to the context and considerations around maintenance matters.'],
  ['07', 'What to Know Before Entering Into a Legal Agreement', 'A sample note on reviewing obligations, definitions and practical consequences.'],
];

type EnquiryDetails = {
  name: string;
  phone: string;
  email: string;
  matter: string;
  description: string;
  contact: string;
};

function getEnquiryMessage(details: EnquiryDetails) {
  return [
    'Hello Adv. Saima Hakak,',
    '',
    'I would like to request a legal consultation.',
    '',
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email || 'Not provided'}`,
    `Matter: ${details.matter}`,
    `Preferred contact: ${details.contact}`,
    '',
    'Brief description:',
    details.description,
  ].join('\n');
}

function getEnquiryWhatsAppUrl(details: EnquiryDetails) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(getEnquiryMessage(details))}`;
}

function getEnquiryEmailUrl(details: EnquiryDetails) {
  const subject = `Consultation enquiry — ${details.matter}`;
  return `mailto:advsaima123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getEnquiryMessage(details))}`;
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${window.location.pathname}`);
  }, [title, description]);
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`group flex max-w-[230px] items-center gap-3 ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--primary))]'}`} data-testid="link-brand">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center border ${light ? 'border-[hsl(var(--accent)/.7)]' : 'border-[hsl(var(--accent))]'}`}>
        <span className="font-display text-[1.55rem] leading-none text-[hsl(var(--accent))]">S</span>
      </span>
      <span className="leading-tight">
        <span className="block text-[.68rem] font-bold tracking-[.13em]">SAIMA HAKAK <span className="text-[hsl(var(--accent))]">&</span> ASSOCIATES</span>
        <span className={`mt-1 block text-[.63rem] tracking-[.08em] ${light ? 'text-[hsl(var(--background)/.65)]' : 'text-[hsl(var(--muted-foreground))]'}`}>Advocates &amp; Legal Consultants</span>
      </span>
    </Link>
  );
}

function ContactActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${compact ? 'gap-2' : ''}`}>
      <a href={`tel:${phone}`} className={`inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-sm font-semibold transition ${compact ? 'border-[hsl(var(--primary)/.55)] px-3 text-xs text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))]' : 'border-[hsl(var(--accent)/.65)] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]'}`} data-testid={`link-${compact ? 'cta-' : ''}call`}>
        <Phone size={15} /> <span>Call Now</span>
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm font-semibold transition ${compact ? 'border border-[hsl(var(--primary)/.55)] px-3 text-xs text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))]' : 'bg-[hsl(var(--accent))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--background))]'}`} data-testid={`link-${compact ? 'cta-' : ''}whatsapp`}>
        <MessageCircle size={15} /> <span>WhatsApp</span>
      </a>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['About', '#about'], ['Practice Areas', '#practice'], ['Legal Services', '#services'], ['Why Choose Us', '#why'], ['Legal Insights', '#insights'], ['Contact', '#contact']];
  const getSectionHref = (href: string) => `#${href.replace('#', '')}`;

  const closeMenu = () => setOpen(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[hsl(var(--border)/.65)] bg-[hsl(var(--background)/.92)] backdrop-blur-xl">
      <div className="section-wrap flex h-[74px] items-center justify-between gap-4">
        <Brand />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={getSectionHref(href)} onClick={closeMenu} className="text-[.71rem] font-semibold tracking-[.02em] text-[hsl(var(--muted-foreground))] transition hover:text-[hsl(var(--primary))]" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a href={getSectionHref('#consultation')} onClick={closeMenu} className="hidden min-h-10 items-center gap-2 bg-[hsl(var(--primary))] px-4 text-xs font-semibold text-[hsl(var(--background))] transition hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] md:inline-flex" data-testid="link-header-consultation">
          Book a Consultation <ArrowRight size={14} />
        </a>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center text-[hsl(var(--primary))] lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <div className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] px-5 pb-5 lg:hidden">
        <nav className="section-wrap flex flex-col gap-1 pt-3" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={href} href={getSectionHref(href)} onClick={closeMenu} className="border-b border-[hsl(var(--border)/.65)] py-3 text-sm font-semibold text-[hsl(var(--primary))]" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
          <a href={getSectionHref('#consultation')} onClick={closeMenu} className="mt-3 flex min-h-11 items-center justify-center bg-[hsl(var(--primary))] text-sm font-semibold text-[hsl(var(--background))]" data-testid="link-mobile-consultation">Book a Consultation</a>
        </nav>
      </div>}
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="eyebrow mb-4" data-testid={`text-label-${children.toLowerCase().replaceAll(' ', '-')}`}>{children}</p>;
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--primary))] pt-[74px] text-[hsl(var(--background))]">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 78% 16%, hsl(43 37% 54% / .22), transparent 27%), linear-gradient(110deg, transparent 60%, hsl(42 33% 96% / .04) 60%, transparent 60.2%)' }} />
      <div className="section-wrap relative grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
        <div>
          <div className="animate-rise mb-7 flex items-center gap-3"><span className="h-px w-10 bg-[hsl(var(--accent))]" /><span className="font-mono-custom text-[.65rem] tracking-[.18em] text-[hsl(var(--background)/.7)]">SRINAGAR · JAMMU &amp; KASHMIR</span></div>
          <h1 className="animate-rise-delay-1 max-w-3xl font-display text-[clamp(3.5rem,8vw,7.2rem)] leading-[.86] tracking-[-.04em]">Legal guidance<br /><em className="text-[hsl(var(--accent))]">when you need</em><br />it most.</h1>
          <p className="animate-rise-delay-2 mt-8 max-w-xl text-[1.06rem] leading-8 text-[hsl(var(--background)/.72)]">Professional legal consultation, drafting, case preparation and legal assistance tailored to your legal needs.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#consultation" className="inline-flex min-h-12 items-center gap-2 bg-[hsl(var(--accent))] px-6 text-sm font-bold text-[hsl(var(--primary))] transition hover:bg-[hsl(var(--background))]" data-testid="link-hero-consultation">Book a Consultation <ArrowRight size={16} /></a>
            <a href={`tel:${phone}`} className="inline-flex min-h-12 items-center gap-2 border border-[hsl(var(--background)/.32)] px-6 text-sm font-semibold transition hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-hero-call"><Phone size={16} /> Call Now</a>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-[hsl(var(--background)/.62)] transition hover:text-[hsl(var(--accent))]" data-testid="link-hero-whatsapp"><MessageCircle size={15} /> Chat on WhatsApp <ArrowRight size={14} /></a>
        </div>
        <div className="relative flex min-h-[330px] items-center justify-center lg:min-h-[490px]">
          <div className="absolute h-[310px] w-[310px] rounded-full border border-[hsl(var(--accent)/.3)] lg:h-[430px] lg:w-[430px]" />
          <div className="absolute h-[240px] w-[240px] rounded-full border border-[hsl(var(--background)/.1)] lg:h-[350px] lg:w-[350px]" />
          <div className="relative flex h-[230px] w-[230px] flex-col items-center justify-center border border-[hsl(var(--accent)/.6)] bg-[hsl(var(--primary)/.8)] text-center lg:h-[310px] lg:w-[310px]">
            <Scale size={35} strokeWidth={1} className="mb-5 text-[hsl(var(--accent))]" />
            <span className="font-display text-5xl">S H</span>
            <span className="mt-3 max-w-[160px] font-mono-custom text-[.58rem] uppercase leading-5 tracking-[.18em] text-[hsl(var(--background)/.6)]">A considered approach to every matter</span>
          </div>
          <span className="absolute left-0 top-12 h-2 w-2 bg-[hsl(var(--accent))] lg:left-8" /><span className="absolute bottom-12 right-2 h-2 w-2 bg-[hsl(var(--accent))]" />
        </div>
      </div>
      <div className="section-wrap flex flex-wrap gap-x-10 gap-y-3 border-t border-[hsl(var(--background)/.14)] py-6 text-xs text-[hsl(var(--background)/.5)]">
        <span>Adv. Saima Hakak</span><span>By prior appointment</span><span>Professional · Personal · Confidential</span>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [['01', 'Professional Legal Assistance', 'Clear and practical legal guidance.'], ['02', 'Client-Focused Approach', 'Attention to the facts and circumstances of each matter.'], ['03', 'Careful Case Preparation', 'Structured legal research, drafting and documentation.'], ['04', 'Confidential Consultation', 'Professional handling of client information.']];
  return <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]"><div className="section-wrap grid divide-y divide-[hsl(var(--border))] md:grid-cols-4 md:divide-x md:divide-y-0">{items.map(([num, title, text]) => <div key={num} className="group px-0 py-7 md:px-7 md:py-9 first:md:pl-0" data-testid={`card-trust-${num}`}><span className="font-mono-custom text-[.65rem] text-[hsl(var(--accent))]">{num}</span><h2 className="mt-4 max-w-[180px] text-sm font-bold leading-5">{title}</h2><p className="mt-2 max-w-[210px] text-xs leading-5 text-[hsl(var(--muted-foreground))]">{text}</p></div>)}</div></section>;
}

function About() {
  return <section id="about" className="paper-grid scroll-mt-20 py-24 lg:py-32"><div className="section-wrap grid items-center gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
    <div className="relative mx-auto w-full max-w-[370px]">
      <div className="aspect-[4/5] border border-[hsl(var(--accent)/.7)] bg-[hsl(var(--primary))] p-4">
        <div className="relative flex h-full flex-col items-center justify-center overflow-hidden border border-[hsl(var(--background)/.22)] px-6 text-center text-[hsl(var(--background))]">
          <div className="absolute h-52 w-52 rounded-full border border-[hsl(var(--accent)/.28)]" aria-hidden="true" />
          <div className="absolute h-36 w-36 rounded-full border border-[hsl(var(--accent)/.18)]" aria-hidden="true" />
          <div className="relative mb-7 flex h-24 w-24 items-center justify-center border border-[hsl(var(--accent))]">
            <span className="font-display text-[2.15rem] tracking-[.12em] text-[hsl(var(--accent))]">SHA</span>
          </div>
          <span className="relative font-display text-2xl leading-tight sm:text-3xl">Saima Hakak &amp; Associates</span>
          <span className="relative mt-3 font-mono-custom text-[.58rem] uppercase tracking-[.17em] text-[hsl(var(--background)/.68)]">Advocates &amp; Legal Consultants</span>
        </div>
      </div>
      <div className="absolute -bottom-5 -right-5 hidden bg-[hsl(var(--accent))] px-5 py-4 text-[hsl(var(--primary))] sm:block"><span className="block font-mono-custom text-[.59rem] uppercase tracking-[.14em]">Principal Advocate</span><span className="mt-1 block font-display text-2xl">Adv. Saima Hakak</span></div>
    </div>
    <div><SectionLabel>About the practice</SectionLabel><h2 className="max-w-2xl font-display text-5xl leading-[.98] tracking-[-.025em] md:text-7xl">A steady hand for complex moments.</h2><div className="mt-8 max-w-2xl space-y-5 text-[1rem] leading-8 text-[hsl(var(--muted-foreground))]"><p>Adv. Saima Hakak is a legal professional working across litigation, legal drafting, legal research, case management, client coordination and legal proceedings.</p><p>Saima Hakak &amp; Associates provides considered legal assistance across civil, criminal, family, consumer, property, cheque dishonour, bail, NDPS and other legal matters. Each matter begins with listening carefully to the facts and understanding the practical question beneath them.</p></div><a href="#contact" className="mt-9 inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold text-[hsl(var(--primary))] transition hover:gap-4" data-testid="link-about-contact">Read More About Adv. Saima Hakak <ArrowRight size={16} /></a></div>
  </div></section>;
}

function PracticeAreas() {
  return <section id="practice" className="scroll-mt-20 bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] lg:py-32"><div className="section-wrap"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><SectionLabel>Areas of practice</SectionLabel><h2 className="max-w-2xl font-display text-5xl leading-none md:text-7xl">Find the right<br /><em className="text-[hsl(var(--accent))]">place to begin.</em></h2></div><p className="max-w-xs text-sm leading-6 text-[hsl(var(--background)/.58)]">Relevant legal assistance, thoughtfully matched to the facts and circumstances of your matter.</p></div><div className="mt-14 grid gap-px bg-[hsl(var(--background)/.14)] sm:grid-cols-2 lg:grid-cols-3">{practiceAreas.map(([title, text, Icon], index) => <article key={title} className="group flex min-h-[205px] flex-col bg-[hsl(var(--primary))] p-6 transition hover:bg-[hsl(var(--primary)/.72)] lg:p-7" data-testid={`card-practice-${index}`}><Icon size={23} strokeWidth={1.35} className="text-[hsl(var(--accent))]" /><h3 className="mt-9 max-w-[250px] font-display text-[1.65rem] leading-none">{title}</h3><p className="mt-3 text-xs leading-5 text-[hsl(var(--background)/.57)]">{text}</p><a href="#consultation" className="mt-auto flex items-center gap-2 pt-6 text-[.67rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--accent))] opacity-0 transition group-hover:opacity-100" data-testid={`link-practice-${index}`}>Discuss this matter <ArrowRight size={13} /></a></article>)}</div></div></section>;
}

function ProblemFinder({ onSelect }: { onSelect: (matter: string) => void }) {
  return <section className="paper-grid scroll-mt-20 border-b border-[hsl(var(--border))] py-24 lg:py-32"><div className="section-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24"><div><SectionLabel>Start here</SectionLabel><h2 className="font-display text-5xl leading-[.96] md:text-7xl">What legal help<br /><em className="text-[hsl(var(--accent))]">do you need?</em></h2><p className="mt-6 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">Choose the closest fit. We will take you directly to a consultation enquiry with that matter selected.</p></div><div className="grid gap-3 sm:grid-cols-2">{problemOptions.map(([label, value], index) => <button type="button" key={label} onClick={() => onSelect(value)} className="group flex min-h-[76px] items-center justify-between border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-5 text-left transition hover:-translate-y-0.5 hover:border-[hsl(var(--accent))] hover:shadow-[0_10px_30px_hsl(var(--primary)/.07)]" data-testid={`button-problem-${index}`}><span className="pr-3 text-sm font-semibold">{label}</span><ArrowRight size={16} className="shrink-0 text-[hsl(var(--accent))] transition group-hover:translate-x-1" /></button>)}</div></div></section>;
}

function HowWeHelp() {
  const steps = [['01', 'Tell Us About Your Matter', 'Share the basic details of your legal concern.'], ['02', 'Review & Understand', 'Relevant facts and documents can be reviewed to understand the legal issue.'], ['03', 'Understand Your Options', 'Receive professional guidance regarding possible legal remedies and next steps.'], ['04', 'Legal Assistance', 'Where appropriate, assistance may be provided with consultation, drafting, preparation and legal proceedings.']];
  return <section className="bg-[hsl(var(--secondary))] py-24 lg:py-32"><div className="section-wrap"><div className="max-w-xl"><SectionLabel>Our process</SectionLabel><h2 className="font-display text-5xl leading-none md:text-7xl">Clear steps.<br /><em className="text-[hsl(var(--accent))]">No theatre.</em></h2></div><div className="mt-14 grid gap-10 border-t border-[hsl(var(--border))] pt-8 md:grid-cols-4 md:gap-6">{steps.map(([num, title, text]) => <div key={num} data-testid={`card-step-${num}`}><span className="font-mono-custom text-xs text-[hsl(var(--accent))]">{num}</span><h3 className="mt-5 max-w-[190px] text-lg font-bold leading-5">{title}</h3><p className="mt-3 max-w-[220px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p></div>)}</div></div></section>;
}

function WhyChooseUs() {
  const items = [['Clear Communication', 'Legal issues explained in understandable language.'], ['Attention to Detail', 'Careful consideration of facts, documents and applicable law.'], ['Strategic Preparation', 'Structured preparation for legal drafting and proceedings.'], ['Professionalism', 'Respectful, confidential and client-focused communication.'], ['Personal Attention', 'Every legal matter deserves individual assessment.']];
  return <section id="why" className="scroll-mt-20 bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] lg:py-32"><div className="section-wrap grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><SectionLabel>Why choose us</SectionLabel><h2 className="font-display text-5xl leading-[.95] md:text-7xl">A professional approach to <em className="text-[hsl(var(--accent))]">every legal matter.</em></h2></div><div className="border-t border-[hsl(var(--background)/.2)]">{items.map(([title, text], index) => <div key={title} className="grid gap-4 border-b border-[hsl(var(--background)/.2)] py-6 sm:grid-cols-[55px_1fr_1fr] sm:items-center" data-testid={`card-why-${index}`}><span className="font-mono-custom text-xs text-[hsl(var(--accent))]">0{index + 1}</span><h3 className="text-lg font-bold">{title}</h3><p className="text-sm leading-6 text-[hsl(var(--background)/.57)]">{text}</p></div>)}</div></div></section>;
}

function Services() {
  return <section id="services" className="scroll-mt-20 py-24 lg:py-32"><div className="section-wrap grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24"><div><SectionLabel>Legal services</SectionLabel><h2 className="font-display text-5xl leading-none md:text-7xl">Practical work,<br /><em className="text-[hsl(var(--accent))]">carefully done.</em></h2><p className="mt-7 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">From a first consultation to the documents and preparation that follow, assistance is shaped around your matter.</p></div><div className="grid grid-cols-1 gap-0 border-t border-[hsl(var(--border))] sm:grid-cols-2">{services.map((service, index) => <a href="#consultation" key={service} className="group flex min-h-[62px] items-center justify-between border-b border-[hsl(var(--border))] py-4 text-sm font-semibold transition hover:pl-2" data-testid={`link-service-${index}`}><span>{service}</span><ArrowUpRight size={15} className="text-[hsl(var(--accent))]" /></a>)}</div></div></section>;
}

function Insights() {
  return <section id="insights" className="scroll-mt-20 border-t border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-24 lg:py-32"><div className="section-wrap"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><SectionLabel>Sample content</SectionLabel><h2 className="font-display text-5xl leading-none md:text-7xl">Legal insights<br /><em className="text-[hsl(var(--accent))]">&amp; updates.</em></h2></div><p className="max-w-xs text-xs leading-5 text-[hsl(var(--muted-foreground))]">Sample / placeholder titles for future articles. Legal information is general and not a substitute for advice on a specific matter.</p></div><div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{insights.map(([num, title, text], index) => <article key={title} className={`group flex min-h-[240px] flex-col border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition hover:-translate-y-1 hover:border-[hsl(var(--accent))] ${index === 0 ? 'lg:col-span-2' : ''}`} data-testid={`card-insight-${index}`}><span className="font-mono-custom text-[.63rem] text-[hsl(var(--accent))]">{num} / SAMPLE</span><h3 className="mt-auto font-display text-[1.65rem] leading-[.95]">{title}</h3><p className="mt-3 text-xs leading-5 text-[hsl(var(--muted-foreground))]">{text}</p><span className="mt-5 inline-flex items-center gap-2 text-[.64rem] font-bold uppercase tracking-[.12em] text-[hsl(var(--primary))]">Placeholder article <ArrowRight size={13} /></span></article>)}</div></div></section>;
}

function ConsultationForm({ selectedMatter, onSubmitted }: { selectedMatter: string; onSubmitted: (details: EnquiryDetails) => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', matter: selectedMatter || '', description: '', contact: 'Phone' });
  const [error, setError] = useState('');
  useEffect(() => { if (selectedMatter) setForm((current) => ({ ...current, matter: selectedMatter })); }, [selectedMatter]);
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.matter || !form.description.trim()) { setError('Please complete your name, phone number, matter and a brief description.'); return; }
    setError('');
    onSubmitted({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      matter: form.matter,
      description: form.description.trim(),
      contact: form.contact,
    });
  };
  return <section id="consultation" className="scroll-mt-20 bg-[hsl(var(--primary))] py-24 text-[hsl(var(--background))] lg:py-32"><div className="section-wrap grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24"><div><SectionLabel>Private first conversation</SectionLabel><h2 className="font-display text-5xl leading-[.95] md:text-7xl">Request a<br /><em className="text-[hsl(var(--accent))]">consultation.</em></h2><p className="mt-7 max-w-sm text-sm leading-6 text-[hsl(var(--background)/.62)]">Tell us a little about your legal concern. Consultations are by prior appointment.</p><div className="mt-10 border-l border-[hsl(var(--accent))] pl-5 text-xs leading-6 text-[hsl(var(--background)/.58)]"><LockKeyhole size={16} className="mb-2 text-[hsl(var(--accent))]" />Please do not submit confidential or highly sensitive documents through this initial enquiry form. Detailed documents can be discussed or shared through an appropriate channel after consultation.</div></div><div className="bg-[hsl(var(--background))] p-6 text-[hsl(var(--primary))] sm:p-9">{form.matter && <div className="mb-6 flex items-center gap-2 border border-[hsl(var(--accent)/.5)] bg-[hsl(var(--accent)/.13)] px-4 py-3 text-xs"><Check size={15} className="text-[hsl(var(--accent))]" /> Matter selected: <strong>{form.matter}</strong></div>}<form onSubmit={submit} className="space-y-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold">Full Name *<input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-2 min-h-12 w-full border border-[hsl(var(--border))] bg-transparent px-3 text-sm outline-none transition focus:border-[hsl(var(--accent))]" data-testid="input-full-name" /></label><label className="text-xs font-bold">Phone Number *<input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="mt-2 min-h-12 w-full border border-[hsl(var(--border))] bg-transparent px-3 text-sm outline-none transition focus:border-[hsl(var(--accent))]" data-testid="input-phone" /></label></div><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold">Email Address<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="mt-2 min-h-12 w-full border border-[hsl(var(--border))] bg-transparent px-3 text-sm outline-none transition focus:border-[hsl(var(--accent))]" data-testid="input-email" /></label><label className="text-xs font-bold">Type of Legal Matter *<span className="relative mt-2 block"><select value={form.matter} onChange={(e) => update('matter', e.target.value)} className="min-h-12 w-full appearance-none border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 pr-9 text-sm outline-none transition focus:border-[hsl(var(--accent))]" data-testid="select-legal-matter"><option value="">Select a matter</option>{matterOptions.map((matter) => <option key={matter} value={matter}>{matter}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-4" /></span></label></div><label className="block text-xs font-bold">Brief Description of Matter *<textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={5} placeholder="Share a short, non-confidential summary..." className="mt-2 w-full resize-y border border-[hsl(var(--border))] bg-transparent px-3 py-3 text-sm outline-none transition placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--accent))]" data-testid="textarea-description" /></label><fieldset><legend className="text-xs font-bold">Preferred Contact Method</legend><div className="mt-3 flex flex-wrap gap-3">{['Phone', 'WhatsApp', 'Email'].map((option) => <label key={option} className="flex cursor-pointer items-center gap-2 text-sm"><input type="radio" name="contact" value={option} checked={form.contact === option} onChange={(e) => update('contact', e.target.value)} className="accent-[hsl(var(--accent))]" data-testid={`radio-contact-${option.toLowerCase()}`} />{option}</label>)}</div></fieldset>{error && <p className="border-l-2 border-red-700 px-3 py-2 text-xs text-red-800" role="alert" data-testid="status-form-error">{error}</p>}<button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[hsl(var(--primary))] px-5 text-sm font-bold text-[hsl(var(--background))] transition hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]" data-testid="button-submit-consultation">Request a Consultation <Send size={15} /></button><p className="text-center text-[.67rem] leading-5 text-[hsl(var(--muted-foreground))]">Submitting an enquiry does not by itself create an advocate-client relationship.</p></form></div></div></section>;
}

function Contact() {
  return <section id="contact" className="scroll-mt-20 py-24 lg:py-32"><div className="section-wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24"><div><SectionLabel>Come say hello</SectionLabel><h2 className="font-display text-5xl leading-none md:text-7xl">Contact Saima<br /><em className="text-[hsl(var(--accent))]">Hakak &amp; Associates.</em></h2><div className="mt-10 space-y-6"><div className="flex gap-4"><Phone className="mt-1 text-[hsl(var(--accent))]" size={19} /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Phone / WhatsApp</p><a href={`tel:${phone}`} className="mt-1 block text-lg font-semibold hover:text-[hsl(var(--accent))]" data-testid="link-contact-phone">{displayPhone}</a></div></div><div className="flex gap-4"><Mail className="mt-1 text-[hsl(var(--accent))]" size={19} /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Email</p><a href="mailto:advsaima123@gmail.com" className="mt-1 block text-lg font-semibold hover:text-[hsl(var(--accent))]" data-testid="link-contact-email">advsaima123@gmail.com</a></div></div><div className="flex gap-4"><MapPin className="mt-1 text-[hsl(var(--accent))]" size={19} /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Location</p><p className="mt-1 max-w-sm text-lg leading-7">S.K. Colony, Sector-1, Qamarwari,<br />Srinagar, Jammu &amp; Kashmir, India</p></div></div><div className="flex gap-4"><LockKeyhole className="mt-1 text-[hsl(var(--accent))]" size={19} /><div><p className="text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">Consultations</p><p className="mt-1 text-lg">By prior appointment</p></div></div></div><ContactActions /></div><div className="relative min-h-[390px] overflow-hidden bg-[hsl(var(--primary))] p-8 text-[hsl(var(--background))]"><div className="absolute inset-7 border border-[hsl(var(--accent)/.45)]" /><div className="relative flex h-full flex-col justify-between"><div className="flex justify-between"><span className="font-mono-custom text-[.62rem] uppercase tracking-[.17em] text-[hsl(var(--background)/.6)]">The office</span><MapPin className="text-[hsl(var(--accent))]" size={20} /></div><div><p className="font-display text-5xl leading-[.9]">A thoughtful<br /><em className="text-[hsl(var(--accent))]">conversation</em><br />starts here.</p><div className="mt-8 flex flex-wrap gap-3"><a href="https://www.google.com/maps/search/?api=1&query=S.K.+Colony%2C+Sector-1%2C+Qamarwari%2C+Srinagar%2C+Jammu+%26+Kashmir" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[hsl(var(--background)/.32)] px-4 text-sm font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-directions">Get Directions <ArrowRight size={14} /></a></div></div></div></div></div></section>;
}

function ConsultationConfirmation() {
  return <div className="min-h-[420px] bg-[hsl(var(--background))] px-6 py-12 text-[hsl(var(--primary))] sm:p-12"><div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full border border-[hsl(var(--accent))] text-[hsl(var(--accent))]"><Check size={28} /></div><h2 className="mt-7 font-display text-4xl">Thank you.</h2><p className="mt-3 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]" data-testid="status-form-success">Your enquiry has been received. We will contact you regarding your request.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href={`tel:${phone}`} className="inline-flex min-h-11 items-center gap-2 bg-[hsl(var(--primary))] px-5 text-sm font-bold text-[hsl(var(--background))]" data-testid="link-success-call"><Phone size={15} /> Call Now</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 border border-[hsl(var(--border))] px-5 text-sm font-bold" data-testid="link-success-whatsapp"><MessageCircle size={15} /> WhatsApp</a></div></div></div>;
}

function Footer() {
  return <footer className="bg-[hsl(var(--primary))] py-14 text-[hsl(var(--background))]"><div className="section-wrap"><div className="grid gap-12 border-b border-[hsl(var(--background)/.18)] pb-12 md:grid-cols-[1.3fr_.7fr_.9fr]"><div><Brand light /><p className="mt-6 max-w-xs text-sm leading-6 text-[hsl(var(--background)/.58)]">Professional legal consultation, drafting and legal services with a client-focused approach.</p></div><div><p className="eyebrow">Explore</p><div className="mt-4 grid gap-3 text-sm text-[hsl(var(--background)/.68)]"><a href="/#about" data-testid="link-footer-about">About</a><a href="/#practice" data-testid="link-footer-practice">Practice Areas</a><a href="/#services" data-testid="link-footer-services">Legal Services</a><a href="/#contact" data-testid="link-footer-contact">Contact</a></div></div><div><p className="eyebrow">Contact</p><div className="mt-4 grid gap-3 text-sm text-[hsl(var(--background)/.68)]"><a href={`tel:${phone}`} data-testid="link-footer-phone">{displayPhone}</a><a href="mailto:advsaima123@gmail.com" data-testid="link-footer-email">advsaima123@gmail.com</a><span>Srinagar, Jammu &amp; Kashmir</span></div></div></div><div className="flex flex-col justify-between gap-5 pt-7 text-[.68rem] text-[hsl(var(--background)/.45)] sm:flex-row"><span>© 2026 Saima Hakak &amp; Associates. All Rights Reserved.</span><div className="flex gap-5"><Link href="/privacy" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-privacy">Privacy Policy</Link><Link href="/disclaimer" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-disclaimer">Disclaimer</Link><Link href="/disclaimer" className="hover:text-[hsl(var(--accent))]" data-testid="link-footer-terms">Terms of Use</Link></div></div></div></footer>;
}

function MobileBar() {
  return <div className="fixed inset-x-0 bottom-0 z-50 grid h-14 grid-cols-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--background)/.96)] shadow-[0_-8px_30px_hsl(var(--primary)/.08)] backdrop-blur-md md:hidden"><a href={`tel:${phone}`} className="flex items-center justify-center gap-2 border-r border-[hsl(var(--border))] text-xs font-bold" data-testid="link-mobile-bar-call"><Phone size={15} /> Call</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border-r border-[hsl(var(--border))] text-xs font-bold text-[hsl(var(--primary))]" data-testid="link-mobile-bar-whatsapp"><MessageCircle size={15} /> WhatsApp</a><a href="#consultation" className="flex items-center justify-center gap-2 bg-[hsl(var(--accent))] text-xs font-bold text-[hsl(var(--primary))]" data-testid="link-mobile-bar-consultation"><Send size={15} /> Consult</a></div>;
}

function Home() {
  const [selectedMatter, setSelectedMatter] = useState('');
  const [submitted, setSubmitted] = useState(false);
  usePageMeta('Saima Hakak & Associates | Advocates & Legal Consultants in Srinagar', 'Saima Hakak & Associates provides professional legal consultation, drafting and legal services in Srinagar, Jammu & Kashmir, including civil, criminal, bail, consumer, property, family, cheque dishonour and other legal matters.');
  const selectMatter = (matter: string) => { setSelectedMatter(matter); setSubmitted(false); document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' }); };
  return <><Header /><main><Hero /><TrustStrip /><About /><PracticeAreas /><ProblemFinder onSelect={selectMatter} /><HowWeHelp /><WhyChooseUs /><Services /><Insights /><section className="bg-[hsl(var(--accent))] py-20 text-[hsl(var(--primary))]"><div className="section-wrap flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><SectionLabel>Take the next step</SectionLabel><h2 className="max-w-xl font-display text-5xl leading-none md:text-7xl">Have a legal<br /><em>concern?</em></h2><p className="mt-5 max-w-md text-sm leading-6 text-[hsl(var(--primary)/.72)]">Taking the right legal step often begins with understanding your options. Contact Saima Hakak &amp; Associates to discuss your legal matter and request a consultation.</p></div><div className="flex flex-wrap gap-3"><a href="#consultation" className="inline-flex min-h-12 items-center gap-2 bg-[hsl(var(--primary))] px-6 text-sm font-bold text-[hsl(var(--background))]" data-testid="link-cta-consultation">Book a Consultation <ArrowRight size={16} /></a><ContactActions compact /></div></div></section>{submitted ? <section id="consultation" className="scroll-mt-20 bg-[hsl(var(--primary))] py-20"><div className="section-wrap"><ConsultationConfirmation /></div></section> : <ConsultationForm selectedMatter={selectedMatter} onSubmitted={() => setSubmitted(true)} />}<Contact /></main><Footer /><MobileBar /></>;
}

function LegalPage({ kind }: { kind: 'privacy' | 'disclaimer' }) {
  const isPrivacy = kind === 'privacy';
  usePageMeta(isPrivacy ? 'Privacy Policy | Saima Hakak & Associates' : 'Disclaimer | Saima Hakak & Associates', isPrivacy ? 'Privacy policy for consultation enquiries submitted to Saima Hakak & Associates.' : 'Legal disclaimer for Saima Hakak & Associates, Advocates & Legal Consultants.');
  return <div className="min-h-[100dvh] bg-[hsl(var(--background))]"><Header /><main className="section-wrap max-w-4xl pb-24 pt-36"><SectionLabel>Saima Hakak &amp; Associates</SectionLabel><h1 className="font-display text-6xl leading-none md:text-8xl">{isPrivacy ? 'Privacy policy.' : 'Disclaimer.'}</h1><div className="mt-12 max-w-3xl space-y-8 border-t border-[hsl(var(--border))] pt-8 text-[1rem] leading-8 text-[hsl(var(--muted-foreground))]"><p>{isPrivacy ? 'This privacy policy explains how information shared through a consultation enquiry may be used by Saima Hakak & Associates, Advocates & Legal Consultants.' : 'The information provided on this website is intended for general informational purposes only and should not be construed as legal advice. Viewing or using this website, submitting an enquiry, or communicating through this website does not by itself create an advocate-client relationship. Legal advice depends on the specific facts and circumstances of each matter. No outcome or result is guaranteed.'}</p>{isPrivacy ? <><h2 className="font-display text-3xl text-[hsl(var(--primary))]">Information you choose to share</h2><p>When you submit an enquiry, you may provide your name, phone number, email address, preferred contact method and a brief description of your legal matter. Please do not submit confidential or highly sensitive documents through the initial enquiry form.</p><h2 className="font-display text-3xl text-[hsl(var(--primary))]">How information may be used</h2><p>Information may be used to respond to your consultation request, understand how to contact you and communicate about an appointment or next step. It is not collected for unnecessary purposes.</p><h2 className="font-display text-3xl text-[hsl(var(--primary))]">Questions</h2><p>For questions about this policy, contact <a className="font-semibold text-[hsl(var(--primary))] underline decoration-[hsl(var(--accent))]" href="mailto:advsaima123@gmail.com">advsaima123@gmail.com</a>.</p></> : <><h2 className="font-display text-3xl text-[hsl(var(--primary))]">No automatic relationship</h2><p>Submitting an enquiry or communicating through this website does not by itself create an advocate-client relationship. Any professional engagement depends on a separate consultation and mutual understanding of the relevant terms.</p><h2 className="font-display text-3xl text-[hsl(var(--primary))]">Specific advice</h2><p>Legal advice depends on the facts and circumstances of each matter. Information on this website is not a substitute for advice based on your specific documents and situation.</p></>}</div><Link href="/" className="mt-12 inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold" data-testid="link-back-home"><ArrowRight size={15} className="rotate-180" /> Back to home</Link></main><Footer /><MobileBar /></div>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route path="/disclaimer"><LegalPage kind="disclaimer" /></Route><Route path="/privacy"><LegalPage kind="privacy" /></Route><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
