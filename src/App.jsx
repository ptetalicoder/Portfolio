import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import { useTheme } from './hooks/useTheme.js'
import { useHashRoute } from './hooks/useHashRoute.js'
import { projects } from './data/resume.js'

export default function App() {
  const { theme, toggle } = useTheme()
  const caseSlug = useHashRoute()
  const caseProject = caseSlug ? projects.find((p) => p.caseStudy?.slug === caseSlug) : null

  // A case study is its own page, not a section of the main one — swap the
  // whole tree so Nav's scroll-spy (which depends on the home page's
  // section ids) never mounts while it's open.
  if (caseProject) {
    return <CaseStudy project={caseProject} theme={theme} onToggleTheme={toggle} />
  }

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
