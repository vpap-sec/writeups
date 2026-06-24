import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Home.css'

const writeupsGlob = import.meta.glob('../writeups/*.md', { query: '?raw', import: 'default' })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^"(.*)"$/, '$1')
    }
  })

  return { data, content: match[2] }
}

function Home() {
  const [writeups, setWriteups] = useState([])

  useEffect(() => {
    const load = async () => {
      const entries = await Promise.all(
        Object.entries(writeupsGlob).map(async ([path, loader]) => {
          const raw = await loader()
          const { data } = parseFrontmatter(raw)
          const slug = path.split('/').pop().replace('.md', '')
          return { slug, ...data }
        })
      )
      setWriteups(entries)
    }
    load()
  }, [])

  return (
    <main className="home">
      <div className="home-header">
        <p className="home-eyebrow">— field notes —</p>
        <h1>The Hunter's Archive</h1>
        <p className="home-sub">seek answers in the old blood · ctf writeups</p>
      </div>

      <div className="ornament">— ✦ —</div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-value">{writeups.length}</span>
          <span className="stat-label">scrolls</span>
        </div>
        <div className="stat">
          <span className="stat-value">{new Set(writeups.map(w => w.ctf)).size}</span>
          <span className="stat-label">hunts</span>
        </div>
        <div className="stat">
          <span className="stat-value">{writeups.find(w => w.placement)?.placement ?? '—'}</span>
          <span className="stat-label">best rank</span>
        </div>
      </div>

      <div className="ornament">— ✦ —</div>

      <div className="writeup-list">
        {writeups.map((w) => (
          <Link to={`/writeup/${w.slug}`} key={w.slug} className="writeup-card">
            <div className="card-left">
              <span className="card-title">{w.title}</span>
              <span className="card-ctf">{w.ctf}</span>
              <div className="card-meta">
                <span className="tag">{w.category}</span>
                <span className="card-pts">{w.points} pts</span>
                <span className="card-date">{w.date}</span>
              </div>
            </div>
            <div className="card-right">
              {w.placement && <span className="card-placement">{w.placement}</span>}
              <span className="card-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default Home
