import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './Writeup.css'

const writeups = import.meta.glob('../writeups/*.md', { query: '?raw', import: 'default' })

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

function Writeup() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [frontmatter, setFrontmatter] = useState({})
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const key = `../writeups/${slug}.md`
    if (writeups[key]) {
      writeups[key]().then((raw) => {
        const { data, content } = parseFrontmatter(raw)
        setFrontmatter(data)
        setContent(content)
      })
    } else {
      setNotFound(true)
    }
  }, [slug])

  if (notFound) return <main className="writeup-page"><p>Scroll not found.</p></main>

  return (
    <main className="writeup-page">
      <button className="back-btn" onClick={() => navigate('/')}>← back</button>
      <div className="writeup-meta">
        {frontmatter.ctf && <span className="meta-ctf">{frontmatter.ctf}</span>}
        {frontmatter.category && <span className="tag">{frontmatter.category}</span>}
        {frontmatter.points && <span className="meta-pts">{frontmatter.points} pts</span>}
        {frontmatter.placement && <span className="meta-placement">{frontmatter.placement}</span>}
        {frontmatter.date && <span className="meta-date">{frontmatter.date}</span>}
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </main>
  )
}

export default Writeup
