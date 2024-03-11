import { resolveHash } from "./lib/urlParameter"
import { ArrowwordSolverConfig } from "./type"

export function getConfig(location: Location) {
  let config = resolveHash<ArrowwordSolverConfig>(location, {
    fr: () => false,
    en: () => false,
    dark: () => false,
    language: ({ en, fr }) => (en() ? "en" : fr() ? "fr" : ""),
  })
  return config
}
