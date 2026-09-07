// Static reference data used across the app. Kept separate from aiService.js
// so "real" catalog data (templates, option lists) is easy to tell apart
// from mock AI *generation* logic.

export const GRADIENTS = ['grad-primary', 'grad-cool', 'grad-warm', 'grad-vivid', 'grad-fresh', 'grad-dark']
export const gradAt = (i) => GRADIENTS[i % GRADIENTS.length]

export const PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'YouTube', 'Website', 'Advertisement']

export const CONTENT_TYPES = [
  'Promotional post', 'Product post', 'Sale', 'Announcement', 'Event',
  'Educational post', 'Quote', 'Hiring', 'Story', 'Advertisement'
]

export const STYLES = ['Minimal', 'Luxury', 'Bold', 'Modern', 'Corporate', 'Creative', 'Elegant', 'Playful']

export const STYLE_VOCAB = {
  Minimal: { colors: 'Off-white, charcoal, one muted accent', font: 'Thin modern sans, wide letter-spacing', layout: 'Generous negative space, single focal point' },
  Luxury: { colors: 'Deep jewel tone, black, gold accent', font: 'High-contrast serif headline, light sans body', layout: 'Symmetrical, editorial grid, thin dividing rules' },
  Bold: { colors: 'High-contrast color block, black anchor', font: 'Heavy geometric sans, oversized', layout: 'Diagonal blocks, confident scale' },
  Modern: { colors: 'Cool gradient, crisp white', font: 'Clean geometric sans throughout', layout: 'Sharp grid, angular accents' },
  Corporate: { colors: 'Muted trust-building blues and greys', font: 'Neutral sans, consistent weight', layout: 'Structured grid, clear hierarchy' },
  Creative: { colors: 'Playful mixed palette', font: 'Expressive display pairing', layout: 'Asymmetric, hand-crafted feel' },
  Elegant: { colors: 'Soft neutrals, single muted accent', font: 'Refined serif or light sans', layout: 'Ample breathing room, centered' },
  Playful: { colors: 'Bright accent pops, rounded palette', font: 'Rounded bold sans', layout: 'Rounded shapes, friendly composition' }
}

export const TEMPLATE_CATEGORIES = [
  'All', 'Social Media', 'Business', 'Marketing', 'Events',
  'Restaurant', 'Fashion', 'Real Estate', 'Technology', 'Education', 'Personal Brand'
]

export const TEMPLATES = [
  { id: 't1', name: 'Flash Sale Grid', category: 'Social Media', style: 'Bold', gradient: 0 },
  { id: 't2', name: 'Minimal Product Ad', category: 'Marketing', style: 'Minimal', gradient: 1 },
  { id: 't3', name: 'Corporate Deck Cover', category: 'Business', style: 'Corporate', gradient: 2 },
  { id: 't4', name: 'Launch Night Invite', category: 'Events', style: 'Elegant', gradient: 3 },
  { id: 't5', name: 'Buy One Get One', category: 'Marketing', style: 'Playful', gradient: 4 },
  { id: 't6', name: 'Open House Flyer', category: 'Real Estate', style: 'Modern', gradient: 5 },
  { id: 't7', name: 'Weekend Specials Board', category: 'Restaurant', style: 'Creative', gradient: 1 },
  { id: 't8', name: 'Drop Teaser Post', category: 'Fashion', style: 'Bold', gradient: 2 },
  { id: 't9', name: 'Product Launch Banner', category: 'Technology', style: 'Modern', gradient: 0 },
  { id: 't10', name: 'Enrollment Open Post', category: 'Education', style: 'Corporate', gradient: 3 },
  { id: 't11', name: 'Personal Brand Header', category: 'Personal Brand', style: 'Elegant', gradient: 4 },
  { id: 't12', name: 'Weekly Promo Story', category: 'Social Media', style: 'Playful', gradient: 5 },
  { id: 't13', name: 'New Menu Announcement', category: 'Restaurant', style: 'Bold', gradient: 2 },
  { id: 't14', name: 'Season Lookbook Cover', category: 'Fashion', style: 'Luxury', gradient: 4 },
  { id: 't15', name: 'App Update Spotlight', category: 'Technology', style: 'Modern', gradient: 1 },
  { id: 't16', name: 'Webinar Signup', category: 'Education', style: 'Minimal', gradient: 0 }
]

export const TESTIMONIALS = [
  { name: 'Amara Whitfield', role: 'Founder, Kindred Goods', quote: 'We went from a blank canvas to a full week of social posts in one afternoon. It actually sounds like our brand.' },
  { name: 'Diego Fuentes', role: 'Marketing Lead, Nordic&Co', quote: 'Design Doctor caught contrast issues our whole team had missed for months.' },
  { name: 'Priya Ramanathan', role: 'Freelance Social Manager', quote: 'I run five client accounts. The brand kits keep every single one visually consistent.' }
]

export const PRICING_PLANS = [
  { name: 'Starter', price: '$0', period: '/mo', tagline: 'Try the core workflow', features: ['5 AI designs / month', '1 brand kit', 'Design Doctor (3 scans)', 'Community templates'], cta: 'Start free', highlighted: false },
  { name: 'Pro', price: '$29', period: '/mo', tagline: 'For creators & small teams', features: ['Unlimited AI designs', '5 brand kits', 'Unlimited Design Doctor', 'Full template library', 'Social campaign packs'], cta: 'Start free trial', highlighted: true },
  { name: 'Studio', price: '$79', period: '/mo', tagline: 'For agencies & marketing teams', features: ['Everything in Pro', 'Unlimited brand kits', 'Team workspace', 'Priority AI generation', 'Client project folders'], cta: 'Talk to us', highlighted: false }
]

export const FAQS = [
  { q: 'Do I need any design experience?', a: 'No. DesignPilot is built for non-designers — you answer a few plain-language questions and the AI handles layout, color and type decisions.' },
  { q: 'Can I edit what the AI generates?', a: 'Yes. Every generated concept opens in the Workspace, where you can adjust text, colors, and regenerate variations.' },
  { q: 'Is my data saved if I refresh the page?', a: 'Yes — saved projects, brand kits and campaigns persist in your browser via localStorage in this demo build.' },
  { q: 'Can this connect to a real AI API later?', a: 'Yes. All generation logic lives in one service file (src/services/aiService.js) so it can be swapped for a live API without touching the UI.' }
]

export const DOCTOR_CATEGORIES = [
  { key: 'typography', label: 'Typography' },
  { key: 'colorHarmony', label: 'Color Harmony' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'visualHierarchy', label: 'Visual Hierarchy' },
  { key: 'readability', label: 'Readability' },
  { key: 'ctaVisibility', label: 'CTA Visibility' }
]

export const AI_ASSISTANT_SUGGESTIONS = [
  'What colors work for a luxury fashion brand?',
  'Give me 5 CTA ideas.',
  'Make this design more professional.',
  'Create a modern campaign concept.'
]
