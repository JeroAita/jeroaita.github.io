import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const DIST = path.resolve('dist/images')

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...await walk(p))
    else files.push(p)
  }
  return files
}

function getOptions(filePath) {
  const rel = path.relative(DIST, filePath)
  const parts = rel.split(path.sep)
  const top = parts[0] || ''
  const ext = path.extname(filePath).toLowerCase()

  if (top === 'fotografia') {
    if (ext === '.jpg' || ext === '.jpeg') {
      return { max: 2400, format: 'jpeg', quality: 90 }
    }
    if (ext === '.png') {
      return { max: 2400, format: 'png' }
    }
  }
  if (top === 'sobre-mi' || top === 'ingenieria') {
    if (ext === '.jpg' || ext === '.jpeg') {
      return { max: 2000, format: 'jpeg', quality: 90 }
    }
    if (ext === '.png') {
      return { max: 2000, format: 'png' }
    }
  }
  if (top === 'portafolio') {
    if (ext === '.jpg' || ext === '.jpeg') {
      return { max: 1600, format: 'jpeg', quality: 88 }
    }
    if (ext === '.png') {
      return { max: 2000, format: 'png' }
    }
  }
  if (ext === '.jpg' || ext === '.jpeg') {
    return { max: 2000, format: 'jpeg', quality: 90 }
  }
  if (ext === '.png') {
    return { max: 2000, format: 'png' }
  }
  return null
}

async function run() {
  try {
    const files = await walk(DIST)
    let totalBefore = 0
    let totalAfter = 0
    for (const f of files) {
      const opts = getOptions(f)
      if (!opts) continue
      const buf = await fs.readFile(f)
      totalBefore += buf.length
      let img = sharp(buf, { failOn: 'none' }).rotate()
      const meta = await img.metadata()
      const w = meta.width || 0
      const h = meta.height || 0
      const max = Math.max(w, h)
      if (max > opts.max) {
        if (w >= h) img = img.resize({ width: opts.max, withoutEnlargement: true })
        else img = img.resize({ height: opts.max, withoutEnlargement: true })
      }
      let out
      if (opts.format === 'jpeg') {
        out = await img.jpeg({ quality: opts.quality, progressive: true, mozjpeg: true }).toBuffer()
      } else if (opts.format === 'png') {
        out = await img.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
      } else {
        out = buf
      }
      totalAfter += out.length
      if (out.length < buf.length) {
        await fs.writeFile(f, out)
      }
    }
    const saved = totalBefore - totalAfter
    const pct = totalBefore ? Math.round((saved / totalBefore) * 100) : 0
    console.log(`[optimize-images] ${Math.round(totalBefore/1024)}KB -> ${Math.round(totalAfter/1024)}KB (-${pct}%)`)
  } catch (e) {
    console.warn('[optimize-images] skipped:', e.message)
  }
}

run()
