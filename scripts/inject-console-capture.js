const fs = require('fs')
const path = require('path')

const outDir = path.join(process.cwd(), '.next')
const scriptTag = '<script src="/dashboard-console-capture.js"></script>'

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  if (content.includes(scriptTag)) return
  const updated = content.replace('</head>', `${scriptTag}</head>`)
  fs.writeFileSync(filePath, updated, 'utf8')
}

function walk(dir) {
  const entries = fs.readdirSync(dir)
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry)
    const stats = fs.statSync(fullPath)
    if (stats.isDirectory()) {
      walk(fullPath)
    } else if (entry.endsWith('.html')) {
      injectScript(fullPath)
    }
  })
}

if (fs.existsSync(outDir)) {
  walk(outDir)
}