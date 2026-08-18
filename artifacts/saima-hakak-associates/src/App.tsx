import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Award, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [selectedMatter, setSelectedMatter] = useState<string>('General Consultation');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    matter: 'General Consultation',
    contact: 'email', // Options: 'email', 'whatsapp', 'phone'
    description: ''
  });

  const getEnquiryWhatsAppUrl = (details: typeof form) => {
    const text = `Hello Advocate Saima, I would like to book a consultation regarding ${details.matter}.\n\nName: ${details.name}\nPhone: ${details.phone}\nEmail: ${details.email}\nDetails: ${details.description}`;
    return `https://wa.me/919906669911?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedPreference = form.contact; // 'email', 'whatsapp', or 'phone'

    // 1. Submit data to Web3Forms so you ALWAYS receive an email notification in your inbox
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '52dedc2a-f1dc-48b3-b696-3395a936bd8f',
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          matter: form.matter,
          contact_preference: selectedPreference,
          message: form.description.trim(),
          subject: `New Legal Consultation Enquiry: ${form.matter}`
        })
      });
    } catch (err) {
      console.error('Web3Forms submit error:', err);
    }

    setLoading(false);
    setSubmitted(true);

    const details = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      matter: form.matter,
      contact: form.contact,
      description: form.description.trim()
    };

    // 2. Action based on user's selection:
    if (selectedPreference === 'whatsapp') {
      // Opens WhatsApp only when explicitly selected
      window.open(getEnquiryWhatsAppUrl(details), '_blank');
    } else if (selectedPreference === 'phone') {
      // Triggers direct phone call on mobile devices
      window.location.href = `tel:+919906669911`;
    }
    // If 'email' is selected, it stops here and shows the "Thank You" message without opening WhatsApp!
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="text-amber-500 h-8 w-8" />
            <div>
              <h1 className="text-xl font-serif font-bold tracking-wide">Adv. Saima Hakak</h1>
              <p className="text-xs text-slate-400">High Court Advocate & Legal Consultant</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 items-center font-medium text-slate-300 text-sm">
            <a href="#about" className="hover:text-amber-500 transition-colors">About</a>
            <a href="#practices" className="hover:text-amber-500 transition-colors">Practice Areas</a>
            <a href="#consultation" className="hover:text-amber-500 transition-colors">Consultation</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Contact</a>
            <a 
              href="#consultation" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg transition-colors font-semibold"
            >
              Book Consultation
            </a>
          </nav>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-6 flex flex-col gap-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-amber-500">About</a>
            <a href="#practices" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-amber-500">Practice Areas</a>
            <a href="#consultation" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-amber-500">Consultation</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-amber-500">Contact</a>
            <a 
              href="#consultation" 
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg text-center font-semibold"
            >
              Book Consultation
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Legal Advocacy & Advisory
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold leading-tight mb-6">
              Dedicated Protection for Your Legal Rights & Interests.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Providing strategic, result-oriented legal counsel and courtroom representation across Civil, Criminal, Constitutional, and Family Law matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#consultation" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-600/20"
              >
                Book a Consultation <ArrowRight size={18} />
              </a>
              <a 
                href="https://wa.me/919906669911" 
                target="_blank" 
                rel="noreferrer"
                className="border border-slate-700 hover:border-slate-500 text-slate-300 px-6 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={18} className="text-emerald-500" /> Direct WhatsApp
              </a>
            </div>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 space-y-6">
            <h3 className="text-xl font-serif font-semibold text-amber-500 border-b border-slate-700 pb-3">Why Choose Our Practice</h3>
            <div className="flex items-start gap-4">
              <ShieldCheck className="text-amber-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-slate-200">Ethical & Transparent</h4>
                <p className="text-sm text-slate-400">Clear legal assessments with complete transparency at every procedural stage.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="text-amber-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-slate-200">Strategic Litigation</h4>
                <p className="text-sm text-slate-400">Meticulously researched and prepared legal representations tailored to your case.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-amber-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-semibold text-slate-200">Prompt Case Handling</h4>
                <p className="text-sm text-slate-400">Responsive updates and timely court filings to safeguard your deadlines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practices" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Practice Areas</h2>
            <p className="text-slate-600">Comprehensive legal expertise across specialized domains of law.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Civil Litigation', desc: 'Property disputes, contract enforcement, recovery suits, injunctions, and appellate representation.' },
              { title: 'Criminal Defense', desc: 'Bail matters, criminal trials, quashing of FIRs, revisional applications, and appellate defense.' },
              { title: 'Family & Matrimonial Law', desc: 'Divorce proceedings, child custody, maintenance, alimony, and domestic violence protection.' },
              { title: 'Constitutional & Writs', desc: 'Writ petitions before the High Court for enforcement of fundamental rights and statutory remedies.' },
              { title: 'Property & Land Matters', desc: 'Title verification, land acquisition disputes, partition suits, and revenue court litigation.' },
              { title: 'Corporate & Commercial', desc: 'Legal drafting, contract vetting, business agreements, and commercial dispute resolution.' },
            ].map((practice, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setSelectedMatter(practice.title);
                  setForm(f => ({ ...f, matter: practice.title }));
                  document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Briefcase className="text-amber-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{practice.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{practice.desc}</p>
                <span className="text-amber-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book for this area <ArrowRight size={14} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Consultation Form */}
      <section id="consultation" className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Schedule a Consultation</h2>
            <p className="text-slate-400">Select your preferred contact method below to submit your enquiry.</p>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="text-emerald-500 mx-auto h-16 w-16" />
                <h3 className="text-2xl font-serif font-bold text-white">Consultation Requested</h3>
                <p className="text-slate-300 max-w-md mx-auto">
                  Thank you! Your details have been received via email. Adv. Saima Hakak's office will contact you shortly.
                </p>
                <button 
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', phone: '', email: '', matter: 'General Consultation', contact: 'email', description: '' });
                  }}
                  className="mt-4 text-amber-500 underline text-sm hover:text-amber-400"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={form.phone} 
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                      placeholder="+91 Mobile number"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                      placeholder="email@domain.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Legal Matter Category</label>
                    <select 
                      value={form.matter} 
                      onChange={e => setForm({ ...form, matter: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="General Consultation">General Consultation</option>
                      <option value="Civil Litigation">Civil Litigation</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Family & Matrimonial Law">Family & Matrimonial Law</option>
                      <option value="Constitutional & Writs">Constitutional & Writs</option>
                      <option value="Property & Land Matters">Property & Land Matters</option>
                      <option value="Corporate & Commercial">Corporate & Commercial</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Contact Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-3">
                    Preferred Contact Method *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'email', label: 'Email Only' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                      { id: 'phone', label: 'Direct Phone' }
                    ].map(option => (
                      <label 
                        key={option.id}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
                          form.contact === option.id 
                            ? 'bg-amber-600/20 border-amber-500 text-amber-400' 
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="contact" 
                          value={option.id}
                          checked={form.contact === option.id}
                          onChange={e => setForm({ ...form, contact: e.target.value })}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">Brief Summary of the Matter *</label>
                  <textarea 
                    required 
                    rows={4}
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                    placeholder="Provide a brief background of the legal guidance or representation required..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-amber-600/20 disabled:opacity-50"
                >
                  {loading ? 'Submitting Details...' : 'Submit Consultation Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg mb-4">
              <Scale className="text-amber-500" /> Adv. Saima Hakak
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              High Court Advocate providing dedicated legal representation, legal advisory, and dispute resolution services.
            </p>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold mb-4">Direct Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Phone className="text-amber-500" size={16} /> +91 9906669911
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-amber-500" size={16} /> advsaima123@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="text-amber-500" size={16} /> High Court Complex, Jammu & Kashmir
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif font-semibold mb-4">Legal Disclaimer</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              In accordance with the Bar Council of India rules, this website is intended solely for informational purposes and does not constitute advertisement or solicitation of legal work.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 text-xs text-center text-slate-600">
          © {new Date().getFullYear()} Adv. Saima Hakak. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
