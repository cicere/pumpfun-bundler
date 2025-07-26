// Image assets for the PumpFun Bundler application
export const images = {
  // BBB Mascot expressions
  mascot: {
    logo: '/images/BBB-LOGO.PNG',
    cool: '/images/BBB-COOL.PNG',
    cute: '/images/BBB-CUTE.PNG',
    mad: '/images/BBB-MAD.PNG',
    ok: '/images/BBB-OK.PNG',
    peaceout: '/images/BBB-PEACEOUT.PNG',
    sad: '/images/BBB-SAD.PNG',
    satisfied: '/images/BBB-SATISFIED.PNG',
    shocked: '/images/BBB-SCHOCKED.PNG',
    surprised: '/images/BBB-SURPRISED.PNG',
    waveWink: '/images/BBB-WAVE-WINK.PNG',
  },
  // Additional images
  misc: {
    image1: '/images/ChatGPT Image Jul 26, 2025, 12_10_03 AM.PNG',
    image2: '/images/ChatGPT Image Jul 26, 2025, 12_10_05 AM.PNG',
    image3: '/images/ChatGPT Image Jul 26, 2025, 12_10_08 AM.PNG',
  }
} as const

// Helper type for mascot expressions
export type MascotExpression = keyof typeof images.mascot

// Helper function to get mascot image by expression
export const getMascotImage = (expression: MascotExpression): string => {
  return images.mascot[expression]
}

// Helper function to get random mascot expression
export const getRandomMascotExpression = (): string => {
  const expressions = Object.keys(images.mascot) as MascotExpression[]
  const randomIndex = Math.floor(Math.random() * expressions.length)
  return images.mascot[expressions[randomIndex]]
}
