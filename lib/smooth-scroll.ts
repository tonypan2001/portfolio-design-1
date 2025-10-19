export type EasingFunction = (t: number) => number

// Standard easeInOutCubic curve
export const easeInOutCubic: EasingFunction = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

interface ScrollOptions {
  duration?: number
  easing?: EasingFunction
  /**
   * When true (default), honors prefers-reduced-motion and disables animation.
   * Set to false to force smooth scrolling even if the user prefers reduced motion.
   */
  respectReducedMotion?: boolean
}

interface ScrollToElementOptions extends ScrollOptions {
  offset?: number
}

export function smoothScrollTo(targetY: number, options: ScrollOptions = {}) {
  // Cancel any in-flight animation from previous calls
  if (typeof window !== "undefined") {
    // Use a module-scoped handle for the RAF id
  }
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const startY = window.scrollY || window.pageYOffset
  const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  const destination = Math.max(0, Math.min(targetY, maxY))
  const distance = destination - startY

  const respectReduced = options.respectReducedMotion !== false
  const duration = respectReduced && prefersReduced ? 0 : Math.max(0, options.duration ?? 700)
  const ease = options.easing ?? easeInOutCubic

  if (duration === 0 || distance === 0) {
    window.scrollTo(0, destination)
    return
  }

  const startTime = performance.now()

  // Keep a single active RAF loop
  let rafId: number
  ;(window as any).__smoothScrollRAF && cancelAnimationFrame((window as any).__smoothScrollRAF)

  const step = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(1, elapsed / duration)
    const eased = ease(t)
    const y = startY + distance * eased
    window.scrollTo(0, y)
    if (t < 1) {
      rafId = requestAnimationFrame(step)
      ;(window as any).__smoothScrollRAF = rafId
    }
  }

  rafId = requestAnimationFrame(step)
  ;(window as any).__smoothScrollRAF = rafId
}

export function smoothScrollToElement(
  element: HTMLElement,
  options: ScrollToElementOptions = {},
) {
  const rect = element.getBoundingClientRect()
  const absoluteTop = rect.top + (window.scrollY || window.pageYOffset)
  const offset = options.offset ?? 0
  smoothScrollTo(absoluteTop - offset, options)
}
