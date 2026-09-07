import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, Palette, Stethoscope, Megaphone, Lightbulb, PenTool,
  ChevronDown, Check
} from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import TemplateCard from '../components/TemplateCard.jsx'
import { TEMPLATES, TESTIMONIALS, PRICING_PLANS, FAQS } from '../data/mockData.js'
import { useToast } from '../context/ToastContext.jsx'

const FEATURES = [
  { icon: Sparkles, grad: 'grad-primary', title: 'AI Design Generator', body: 'Answer a few quick questions about your brand and campaign — get back ready-to-use design concepts, styled and sized for your platform.' },
  { icon: Palette, grad: 'grad-warm', title: 'AI Brand Kit', body: 'A full color palette, font pairing and visual direction built around your brand personality — the foundation every future design pulls from.' },
  { icon: Stethoscope, grad: 'grad-cool', title: 'Design Doctor', body: 'Upload something you already made. Get a scored breakdown of typography, hierarchy and contrast, plus exactly what to fix first.' },
  { icon: Megaphone, grad: 'grad-vivid', title: 'Social Campaign Builder', body: 'Turn one campaign idea into a matched set — Instagram post, story, Facebook post, LinkedIn post and ad banner — in one pass.' },
  { icon: Lightbulb, grad: 'grad-fresh', title: 'AI Design Ideas', body: 'Stuck on direction? Describe what you need in plain language and get back several distinct creative concepts to choose from.' },
  { icon: PenTool, grad: 'grad-dark', title: 'AI Copy Assistant', body: 'Headlines, captions and CTAs that match the tone of your brand — generated alongside every design, never an afterthought.' }
]

const HOW_STEPS = [
  { n: 1, title: 'Tell us your brand', body: 'Business type, audience and personality — takes under a minute.' },
  { n: 2, title: 'Pick platform & style', body: 'Instagram, LinkedIn, ads or web — choose the look that fits.' },
  { n: 3, title: 'AI builds concepts', body: 'Watch DesignPilot reason through layout, color and type live.' },
  { n: 4, title: 'Refine & export', body: "Edit, regenerate variations, and download what's ready to post." }
]

export default function Landing() {
  const { showToast } = useToast()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="overflow-x-hidden">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-brand-bg/85 backdrop-blur-md border-b border-brand-borderSoft">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between px-7 py-4">
          <div className="flex items-center gap-2.5 font-display font-bold text-[19px]">
            <span className="w-[34px] h-[34px] rounded-[10px] grad-primary relative flex-shrink-0">
              <span className="absolute inset-0 m-auto w-3.5 h-3.5 bg-white rounded-[4px] rotate-45" />
            </span>
            DesignPilot AI
          </div>
          <div className="hidden md:flex gap-8 text-[14.5px] font-medium text-brand-navySoft">
            <a href="#features" className="hover:text-brand-purple">Features</a>
            <a href="#how" className="hover:text-brand-purple">How it works</a>
            <a href="#pricing" className="hover:text-brand-purple">Pricing</a>
            <a href="#faq" className="hover:text-brand-purple">FAQ</a>
          </div>
          <div className="flex gap-3 items-center">
            <Link to="/app/dashboard"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link to="/app/dashboard"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-14 px-6 text-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[420px] h-[420px] rounded-full bg-brand-purple opacity-50 blur-[70px] -top-40 -left-28 animate-float" />
          <div className="absolute w-[380px] h-[380px] rounded-full bg-brand-cyan opacity-50 blur-[70px] -top-20 -right-36 animate-float" style={{ animationDelay: '-4s' }} />
          <div className="absolute w-[320px] h-[320px] rounded-full bg-brand-pink opacity-50 blur-[70px] -bottom-44 left-[38%] animate-float" style={{ animationDelay: '-8s' }} />
        </div>

        <div className="relative z-10 max-w-[760px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-border pl-2 pr-4 py-1.5 rounded-full text-[13.5px] font-semibold shadow-soft mb-7">
            <span className="w-[22px] h-[22px] rounded-full grad-warm flex items-center justify-center text-[11px]">✨</span>
            AI design consultant for small teams
          </div>
          <h1 className="text-4xl md:text-[58px] leading-[1.06] font-bold mb-5">
            Turn Your Ideas Into{' '}
            <span className="bg-clip-text text-transparent grad-vivid" style={{ WebkitBackgroundClip: 'text' }}>
              Designs That Get Noticed.
            </span>
          </h1>
          <p className="text-lg text-brand-navySoft max-w-[560px] mx-auto mb-9 leading-relaxed">
            Your AI-powered design assistant for branding, social media creatives and marketing content.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap mb-16">
            <Link to="/app/create"><Button size="lg">Create My First Design</Button></Link>
            <a href="#features"><Button size="lg" variant="ghost">Explore Features</Button></a>
          </div>
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto p-5 bg-gradient-to-b from-white to-[#F7F5FF] border border-brand-border rounded-[28px] shadow-lifted">
          <div className="flex gap-2 mb-4 pl-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-border" /><span className="w-2.5 h-2.5 rounded-full bg-brand-border" /><span className="w-2.5 h-2.5 rounded-full bg-brand-border" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {[
              { g: 'grad-vivid', tag: 'Instagram · Sale', head: 'Summer Refresh, 30% Off Everything', foot: '✨ Generated in 4s' },
              { g: 'grad-cool', tag: 'LinkedIn · Post', head: "We're Hiring Product Designers", foot: '✨ Brand-matched' },
              { g: 'grad-warm', tag: 'Facebook · Event', head: 'Join Our Launch Night, Sept 12', foot: '✨ 4 variations' },
              { g: 'grad-dark', tag: 'Story · Quote', head: '"Good design is invisible."', foot: '✨ Editorial style' }
            ].map((c, i) => (
              <div key={i} className={`rounded-2xl p-4 min-h-[180px] flex flex-col justify-between text-white shadow-card ${c.g}`}>
                <div className="text-[11px] font-bold uppercase tracking-wide opacity-85">{c.tag}</div>
                <div className="font-display font-bold text-[17px] leading-tight">{c.head}</div>
                <div className="text-[11px] opacity-85">{c.foot}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-11 flex-wrap py-14 opacity-55 font-display font-bold text-[15px] text-brand-navySoft">
          <span>Brewline Coffee</span><span>Nordic&amp;Co</span><span>Studio Verve</span><span>Marlowe Realty</span><span>Kindred Goods</span>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[600px] mx-auto text-center mb-14">
            <div className="text-brand-purple font-bold text-sm mb-2.5">WHAT YOU GET</div>
            <h2 className="text-[38px] font-bold mb-3.5">Six tools. One design brain.</h2>
            <p className="text-brand-navySoft text-[16.5px] leading-relaxed">DesignPilot studies your brand, then acts as your consultant, your creative team and your critic — so you never stare at a blank canvas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-brand-border rounded-xl2 p-7 transition-transform hover:-translate-y-1 hover:shadow-card">
                <div className={`w-[46px] h-[46px] rounded-[13px] flex items-center justify-center text-white mb-4.5 ${f.grad}`}>
                  <f.icon size={21} />
                </div>
                <h3 className="text-[19px] font-semibold mb-2">{f.title}</h3>
                <p className="text-brand-navySoft text-[14.5px] leading-relaxed m-0">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 bg-[#F7F5FF]">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[600px] mx-auto text-center mb-14">
            <div className="text-brand-purple font-bold text-sm mb-2.5">THE WORKFLOW</div>
            <h2 className="text-[38px] font-bold">From blank page to on-brand design in minutes</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-9 md:gap-0">
            {HOW_STEPS.map((s, i) => (
              <div key={s.n} className="flex-1 relative px-5 text-center">
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-[26px] right-[-10px] w-[calc(100%-32px)] h-0.5" style={{ backgroundImage: 'repeating-linear-gradient(90deg,#E8E5F6 0 8px,transparent 8px 14px)' }} />
                )}
                <div className="relative z-10 w-[52px] h-[52px] rounded-full grad-primary text-white font-display font-bold flex items-center justify-center mx-auto mb-4 text-lg">{s.n}</div>
                <h4 className="text-[16.5px] font-semibold mb-2">{s.title}</h4>
                <p className="text-[13.5px] text-brand-navySoft m-0">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN DOCTOR SPOTLIGHT */}
      <section className="py-20 px-6">
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-brand-purple font-bold text-sm mb-2.5">DESIGN DOCTOR</div>
            <h2 className="text-[32px] font-bold mb-4">An honest second opinion on every design</h2>
            <p className="text-brand-navySoft text-[15.5px] leading-relaxed mb-6">Upload anything you've made — DesignPilot scores it across six dimensions and tells you exactly what to fix first, in plain language.</p>
            <ul className="space-y-2.5 mb-7">
              {['Typography, contrast & spacing scored instantly', 'Clear "what\'s working" vs "what needs work"', 'One-click improved version'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="w-5 h-5 rounded-full bg-brand-lime/20 text-brand-lime flex items-center justify-center flex-shrink-0"><Check size={13} /></span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/app/doctor"><Button variant="dark">Try Design Doctor</Button></Link>
          </div>
          <div className="bg-white border border-brand-border rounded-xl2 p-6 shadow-card">
            {[['Typography', 82], ['Color Harmony', 91], ['Spacing', 68], ['CTA Visibility', 61]].map(([label, val]) => (
              <div key={label} className="mb-4 last:mb-0">
                <div className="flex justify-between text-sm font-semibold mb-1.5"><span>{label}</span><span className={val >= 80 ? 'text-brand-lime' : val >= 60 ? 'text-brand-orange' : 'text-brand-pink'}>{val}%</span></div>
                <div className="h-2 rounded-full bg-brand-borderSoft overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${val}%`, background: val >= 80 ? '#84CC16' : val >= 60 ? '#F97316' : '#EC4899' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="py-20 px-6 bg-[#F7F5FF]">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[600px] mx-auto text-center mb-12">
            <div className="text-brand-purple font-bold text-sm mb-2.5">TEMPLATE LIBRARY</div>
            <h2 className="text-[38px] font-bold mb-3.5">Or start from something already working</h2>
            <p className="text-brand-navySoft text-[16.5px]">Hundreds of categorized starting points across social, marketing, events and more.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEMPLATES.slice(0, 4).map((t) => (
              <TemplateCard key={t.id} template={t} onUse={() => showToast(`Loaded "${t.name}" — sign in to keep editing`)} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/app/templates"><Button variant="ghost">Browse all templates</Button></Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[600px] mx-auto text-center mb-12">
            <div className="text-brand-purple font-bold text-sm mb-2.5">LOVED BY CREATORS &amp; TEAMS</div>
            <h2 className="text-[38px] font-bold">Real teams, real design output</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white border border-brand-border rounded-xl2 p-6">
                <p className="text-[14.5px] leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full grad-primary text-white flex items-center justify-center font-display font-bold text-sm">{t.name[0]}</div>
                  <div>
                    <div className="text-[13.5px] font-semibold">{t.name}</div>
                    <div className="text-[12px] text-brand-navySoft">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6 bg-[#F7F5FF]">
        <div className="max-w-[1180px] mx-auto">
          <div className="max-w-[600px] mx-auto text-center mb-14">
            <div className="text-brand-purple font-bold text-sm mb-2.5">PRICING</div>
            <h2 className="text-[38px] font-bold mb-3.5">Simple plans that grow with you</h2>
            <p className="text-brand-navySoft text-[16.5px]">Start free. Upgrade when the AI becomes part of your daily workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-start">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl2 p-7 border ${plan.highlighted ? 'grad-primary text-white border-transparent shadow-lifted md:-translate-y-3' : 'bg-white border-brand-border'}`}
              >
                <div className={`text-sm font-bold mb-1 ${plan.highlighted ? 'text-white/85' : 'text-brand-purple'}`}>{plan.name}</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[34px] font-display font-bold">{plan.price}</span>
                  <span className={`text-sm mb-1.5 ${plan.highlighted ? 'text-white/75' : 'text-brand-navySoft'}`}>{plan.period}</span>
                </div>
                <p className={`text-[13.5px] mb-5 ${plan.highlighted ? 'text-white/85' : 'text-brand-navySoft'}`}>{plan.tagline}</p>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <Check size={15} className={plan.highlighted ? 'text-white' : 'text-brand-lime'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/app/dashboard">
                  <Button block variant={plan.highlighted ? 'dark' : 'primary'} className={plan.highlighted ? '!bg-white !text-brand-navy' : ''}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-brand-purple font-bold text-sm mb-2.5">FAQ</div>
            <h2 className="text-[34px] font-bold">Questions, answered</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <div key={item.q} className="bg-white border border-brand-border rounded-xl2 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-[15px]"
                >
                  {item.q}
                  <ChevronDown size={18} className={`transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180 text-brand-purple' : 'text-brand-navySoft'}`} />
                </button>
                {openFaq === i && <p className="px-5 pb-4.5 text-sm text-brand-navySoft leading-relaxed m-0">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6">
        <div className="max-w-[1180px] mx-auto">
          <div className="relative overflow-hidden rounded-[28px] bg-brand-navy text-white text-center py-16 px-8">
            <div className="absolute inset-0 grad-vivid opacity-20" />
            <div className="relative">
              <h2 className="text-[34px] font-bold mb-3.5 text-white">Ready to make your first on-brand design?</h2>
              <p className="text-[#C9CBE8] mb-7">No design experience required. Your first concept is free.</p>
              <Link to="/app/create"><Button size="lg" className="!bg-white !text-brand-navy">Create My First Design</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-borderSoft py-9 px-6">
        <div className="max-w-[1180px] mx-auto flex justify-between items-center flex-wrap gap-3 text-[13.5px] text-brand-navySoft">
          <div className="flex items-center gap-2.5 font-display font-bold text-[15px] text-brand-navy">
            <span className="w-[26px] h-[26px] rounded-lg grad-primary" />
            DesignPilot AI
          </div>
          <div>© 2026 DesignPilot AI. All designs generated for demonstration.</div>
        </div>
      </footer>
    </div>
  )
}
