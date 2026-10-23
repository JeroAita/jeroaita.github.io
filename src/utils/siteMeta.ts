import { site } from '../data/content'

export function applySiteMeta() {
  if (typeof document === 'undefined') return

  document.title = site.title

  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', site.description)

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', site.title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', site.description)

  const favicon = document.getElementById('site-favicon') as HTMLLinkElement | null
  if (favicon) {
    if (site.favicon && site.favicon.trim()) {
      favicon.href = site.favicon
    } else if (site.logo && site.logo.trim()) {
      favicon.href = site.logo
    } else {
      const mark = (site.mark || site.name.slice(0, 2)).toLowerCase()
      const svg = `<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2222%22 fill=%22%23F5C518%22/><text x=%2250%22 y=%2268%22 font-size=%2250%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-weight=%22700%22>${mark}</text></svg>`
      favicon.href = `data:image/svg+xml,${svg}`
    }
  }
}
