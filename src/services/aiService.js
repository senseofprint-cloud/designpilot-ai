// ---------------------------------------------------------------------------
// Mock "AI" service.
//
// Every function here simulates a network/AI call (delay + realistic mock
// output) with the exact return shape a real API integration should match.
// To connect a real provider: keep each function's signature and return
// shape, and replace the body with a fetch()/SDK call. Nothing in the UI
// layer needs to change.
// ---------------------------------------------------------------------------

import { STYLE_VOCAB, gradAt } from '../data/mockData.js'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const CONCEPT_NAMES = ['Bold Statement', 'Clean & Confident', 'Warm Editorial', 'Vivid Energy', 'Quiet Luxury']

/**
 * generateDesign(brief)
 * brief: { business, category, audience, platform, contentType, campaign, message, style }
 * Resolves: { concepts: Array<{ id, name, gradient, headline, subheadline, cta, palette, typography, style }> }
 */
export async function generateDesign(brief) {
  await wait(1800)
  const vocab = STYLE_VOCAB[brief.style] || STYLE_VOCAB.Modern
  const concepts = CONCEPT_NAMES.slice(0, 4).map((name, i) => ({
    id: `concept_${Date.now()}_${i}`,
    name,
    gradient: gradAt(i),
    headline: brief.message || `${brief.business || 'Your Brand'} has something new`,
    subheadline: `${brief.business || 'Your Brand'} · ${vocab.layout}`,
    cta: pickCta(brief.contentType),
    palette: vocab.colors,
    typography: vocab.font,
    style: brief.style || 'Modern',
    platform: brief.platform || 'Instagram'
  }))
  return { concepts }
}

function pickCta(contentType) {
  const map = {
    Sale: 'Shop the Sale', 'Promotional post': 'Learn More', 'Product post': 'Shop Now',
    Announcement: 'Read More', Event: 'Save Your Spot', 'Educational post': 'Learn More',
    Quote: 'Share This', Hiring: 'Apply Now', Story: 'Swipe Up', Advertisement: 'Get Started'
  }
  return map[contentType] || 'Learn More'
}

/**
 * analyzeDesign(file)
 * file: File | null (unused by the mock, real API would upload it)
 * Resolves: {
 *   scores: { typography, colorHarmony, spacing, visualHierarchy, readability, ctaVisibility } // 0-100
 *   working: string[]
 *   improve: string[]
 *   notes: string[]
 * }
 */
export async function analyzeDesign(_file) {
  await wait(1400)
  return {
    scores: {
      typography: 82,
      colorHarmony: 91,
      spacing: 68,
      visualHierarchy: 74,
      readability: 88,
      ctaVisibility: 61
    },
    working: ['Strong color consistency', 'Clear headline', 'Good image quality'],
    improve: ['Weak CTA hierarchy', 'Uneven spacing', 'Secondary text contrast'],
    notes: [
      'Your headline has good visibility, but the CTA is competing with the background.',
      'Increase spacing between the product image and the headline.',
      'The color palette is strong but the secondary text has insufficient contrast.'
    ]
  }
}

/**
 * improveDesign(analysis)
 * Resolves: { headline, subheadline, cta, gradient, notes: string[] }
 */
export async function improveDesign(_analysis) {
  await wait(1200)
  return {
    headline: 'Same Story, Clearer Hierarchy',
    subheadline: 'CTA contrast increased · Spacing rebalanced · Secondary text darkened',
    cta: 'Shop Now',
    gradient: 'grad-cool',
    notes: [
      'CTA button contrast raised against the background',
      'Headline-to-image spacing increased by 24px',
      'Secondary text darkened for AA contrast compliance'
    ]
  }
}

/**
 * generateBrandKit(brief)
 * brief: { business, industry, audience, personality, style }
 * Resolves: { palette: {primary,secondary,accent,background,text} (hex),
 *             typography: {heading, body, accent},
 *             personalityTags: string[],
 *             visualDirection: { imageStyle, layoutStyle, shapeLanguage, iconStyle, socialStyle } }
 */
export async function generateBrandKit(brief) {
  await wait(1600)
  const palettes = [
    { primary: '#7C3AED', secondary: '#2563EB', accent: '#EC4899', background: '#FBFAFF', text: '#0F1226' },
    { primary: '#EC4899', secondary: '#F97316', accent: '#7C3AED', background: '#FFF9FB', text: '#0F1226' },
    { primary: '#06B6D4', secondary: '#2563EB', accent: '#84CC16', background: '#F5FDFF', text: '#0F1226' }
  ]
  const palette = palettes[(brief.business?.length || 0) % palettes.length]
  return {
    palette,
    typography: { heading: 'Space Grotesk', body: 'Inter', accent: 'Space Grotesk (light, wide-tracked)' },
    personalityTags: (brief.personality || 'Modern, Confident, Friendly, Premium').split(',').map((s) => s.trim()).filter(Boolean),
    visualDirection: {
      imageStyle: 'Bright, natural lighting; candid over staged; consistent warm color grade',
      layoutStyle: 'Rounded geometry, soft shadows, gradient accents used sparingly',
      shapeLanguage: 'Soft rounded corners, circular accent marks',
      iconStyle: 'Line icons, 1.5px stroke, rounded joins',
      socialStyle: 'Consistent color-blocked cover, one focal image per post'
    }
  }
}

/**
 * generateCampaign(name, business)
 * Resolves: { pieces: Array<{ id, tag, headline, gradient }> }
 */
export async function generateCampaign(name, business) {
  await wait(1700)
  const pieces = [
    { tag: 'Instagram Post', headline: name },
    { tag: 'Instagram Story', headline: `${name} · 24h only` },
    { tag: 'Facebook Post', headline: `Celebrate with ${business}` },
    { tag: 'LinkedIn Post', headline: `${business} launches ${name}` },
    { tag: 'Ad Banner', headline: `${name} — Shop Now` }
  ]
  return { pieces: pieces.map((p, i) => ({ id: `piece_${i}`, gradient: gradAt(i), ...p })) }
}

/**
 * generateDesignIdeas(brief)
 * Resolves: { concepts: Array<{ name, description, colors, typography, layout, headline, cta }> }
 */
export async function generateDesignIdeas(brief) {
  await wait(1500)
  return {
    concepts: [
      {
        name: 'Bold Product Focus',
        description: `A direction built around: "${brief}"`,
        colors: 'Deep espresso brown, cream, one burnt-orange accent',
        typography: 'Heavy geometric sans headline, light serif details',
        layout: 'Large centered product shot, headline stacked below',
        headline: 'Your Morning, Reinvented',
        cta: 'Order Now'
      },
      {
        name: 'Minimal Premium',
        description: `A quieter take on: "${brief}"`,
        colors: 'Off-white, charcoal, one muted sage accent',
        typography: 'Thin modern sans, wide letter-spacing',
        layout: 'Generous negative space, small logo mark top-left',
        headline: 'Quiet Mornings, Bold Flavor',
        cta: 'Learn More'
      },
      {
        name: 'Young & Energetic',
        description: `A high-energy take on: "${brief}"`,
        colors: 'Bright yellow, hot pink, sky blue',
        typography: 'Rounded bold sans, playful and chunky',
        layout: 'Diagonal color blocks, oversized accent shapes',
        headline: 'Fuel Up. Show Up.',
        cta: 'Try It Today'
      },
      {
        name: 'Luxury Editorial',
        description: `An elevated take on: "${brief}"`,
        colors: 'Black, gold-foil accent, warm cream',
        typography: 'High-contrast serif headline, light sans body',
        layout: 'Magazine-style grid with a thin dividing rule',
        headline: 'Crafted in Every Cup',
        cta: 'Discover More'
      }
    ]
  }
}

/**
 * generateCopy(brief)
 * Resolves: { headlines: string[], ctas: string[] }
 */
export async function generateCopy(brief) {
  await wait(1000)
  return {
    headlines: [
      'Summer Just Got Cheaper',
      brief ? brief.charAt(0).toUpperCase() + brief.slice(1) : 'Something New Just Dropped',
      'Step Into Savings',
      "You'll Wonder Why You Waited"
    ],
    ctas: ['Shop the Sale', 'Claim Your Discount', 'Get Yours Now']
  }
}

/**
 * askAssistant(question)
 * Resolves: string (assistant reply)
 */
export async function askAssistant(question) {
  await wait(650)
  const key = question.toLowerCase().trim()
  const canned = {
    'what colors work for a luxury fashion brand?':
      'Lean on deep, saturated tones — black, navy or emerald — paired with one metallic or muted accent like gold or blush. Keep the palette to 2–3 colors so it reads as considered, not busy.',
    'give me 5 cta ideas.':
      '1. Shop the Edit\n2. Claim Your Spot\n3. See What\'s New\n4. Start Free\n5. Reserve Yours',
    'make this design more professional.':
      "I'd tighten the palette to two tones plus a neutral, switch to a single clean sans-serif, and increase the spacing around your logo and CTA — professional designs favor restraint over decoration.",
    'create a modern campaign concept.':
      "Try a single bold color block behind a short, punchy headline, one clear product shot, and a high-contrast CTA — modern campaigns tend to say less, louder."
  }
  return canned[key] || "Good question — I'd keep the palette to 2–3 colors, use one clear focal point, and make sure your CTA stands out above everything else on the page."
}
