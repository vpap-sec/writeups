import './Projects.css'

const projects = [
  {
    name: 'The Archive',
    description: 'Personal CTF writeup and projects portfolio built with React and Vite.',
    stack: ['React', 'Vite', 'Markdown'],
    repo: 'https://github.com/vpap-sec/writeups',
    status: 'active',
  },
]

function Scores() {
  return (
    <main className="projects-page">
      <div className="projects-header">
        <p className="projects-eyebrow">— works & research —</p>
        <h1>Projects</h1>
      </div>

      <div className="ornament">— ✦ —</div>

      <div className="projects-list">
        {projects.map((p) => (
          <div className="project-card" key={p.name}>
            <div className="project-top">
              <span className="project-name">{p.name}</span>
              <span className={`project-status ${p.status}`}>{p.status}</span>
            </div>
            <p className="project-desc">{p.description}</p>
            <div className="project-bottom">
              <div className="project-stack">
                {p.stack.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="project-link">
                  repo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Scores
