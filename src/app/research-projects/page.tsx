"use client"
import React from "react"
import { useConfirmContext } from "../../components/context/ConfirmContext"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import "./style.css"

interface Project {
  id: string
  title: string
  description?: string
  category: string
  status: "DEPLOYED" | "RENDERING" | "LIVE" | "COMPILING" | "ENCRYPTED" | "ONLINE" | "ACTIVE" | "ARCHIVED"
  icon: "cpu" | "terminal" | "database" | "code" | "network" | "lock"
  link?: string
  image?: string
}

interface Certification {
  id: string
  title: string
  description?: string
  category: string
  status: "ACTIVE" | "EXPIRED" | "PENDING" | "VERIFIED"
  icon: "certificate" | "security" | "cloud" | "network" | "ethical" | "compliance"
  link?: string
  image?: string
  date?: string
  issuer?: string
  credentialId?: string
  validUntil?: string
}

const ResearchProjectsPage = ({ }) => {
  const { showConfirmation, setShowConfirmation } = useConfirmContext()

  const handleConfirmationResponse = (confirm) => {
    setShowConfirmation(false)
    if (confirm === true) {
      window.location.reload()
    }
  }

  // Sample projects - replace with your actual projects
  const projects: Project[] = [
    {
      id: "001",
      title: "ADSCANNER",
      description: "Active Directory security scanner built with Go",
      category: "PROJECT",
      status: "ACTIVE",
      icon: "lock",
      link: "https://github.com/ilovemysocksmoree/ADScanner",
    },
    {
      id: "002",
      title: "KageNezumi",
      description: "This is a rat for android.",
      category: "PROJECT",
      status: "LIVE",
      icon: "code",
      link: "https://github.com/ilovemysocksmoree/KageNezumi",
    },
    {
      id: "003",
      title: "ADSCANNER_TS",
      description: "Active Directory scanner implementation in TypeScript",
      category: "PROJECT",
      status: "ACTIVE",
      icon: "terminal",
      link: "https://github.com/ilovemysocksmoree/ADscanner-",
    },
    {
      id: "004",
      title: "MCHATAPP",
      description: "Modern real-time chat application built with Next.js 14, TypeScript, and Tailwind CSS",
      category: "PROJECT",
      status: "LIVE",
      icon: "network",
      link: "https://github.com/ilovemysocksmoree/MChatapp",
    },
    {
      id: "005",
      title: "Vuln-App",
      description: "Frontend application for AD Shield security platform",
      category: "PROJECT",  
      status: "DEPLOYED",
      icon: "code",
      link: "https://github.com/ilovemysocksmoree/Vuln-App",
    },
    {
      id: "006",
      title: "AD-Connector-Core",
      description: "Test repository for ADS development purposes",
      category: "ARCHIVE",
      status: "ARCHIVED",
      icon: "code",
      link: "https://github.com/ilovemysocksmoree/AD-Connector-Core",
    },
    {
      id: "007",
      title: "Automations",
      description: "Automations I have created to boost my efficiency at work.",
      category: "ARCHIVE",
      status: "ARCHIVED",
      icon: "code",
      link: "https://github.com/ilovemysocksmoree/automations",
    },
  ]

  // Sample certifications - replace with your actual certifications
  const certifications: Certification[] = [
    {
      id: "CERT001",
      title: "COMPTIA SECURITY+",
      description: "Core security skills and knowledge required for cybersecurity professionals",
      category: "SECURITY",
      status: "ACTIVE",
      icon: "security",
      link: "#",
      date: "2023-11-15",
      issuer: "CompTIA",
      credentialId: "SEC+123456789",
      validUntil: "2026-11-15",
    },
    {
      id: "CERT002",
      title: "CERTIFIED ETHICAL HACKER",
      description: "Ethical hacking and network security assessment certification",
      category: "ETHICAL HACKING",
      status: "ACTIVE",
      icon: "ethical",
      link: "#",
      date: "2023-09-20",
      issuer: "EC-Council",
      credentialId: "ECC 987654321",
      validUntil: "2025-09-20",
    },
    {
      id: "CERT003",
      title: "AWS CERTIFIED SOLUTIONS ARCHITECT",
      description: "Cloud architecture design and deployment on AWS platform",
      category: "CLOUD",
      status: "ACTIVE",
      icon: "cloud",
      link: "#",
      date: "2023-07-10",
      issuer: "Amazon Web Services",
      credentialId: "AWS-ASA-456789123",
      validUntil: "2026-07-10",
    },
    {
      id: "CERT004",
      title: "CERTIFIED INFORMATION SYSTEMS SECURITY PROFESSIONAL",
      description: "Advanced information security management and governance",
      category: "GOVERNANCE",
      status: "VERIFIED",
      icon: "compliance",
      link: "#",
      date: "2023-05-25",
      issuer: "(ISC)²",
      credentialId: "CISSP-789123456",
      validUntil: "2026-05-25",
    },
    {
      id: "CERT005",
      title: "NETWORK+ CERTIFICATION",
      description: "Networking concepts, infrastructure, and operations",
      category: "NETWORKING",
      status: "ACTIVE",
      icon: "network",
      link: "#",
      date: "2023-03-15",
      issuer: "CompTIA",
      credentialId: "NET+456789123",
      validUntil: "2026-03-15",
    },
    {
      id: "CERT006",
      title: "OFFENSIVE SECURITY CERTIFIED PROFESSIONAL",
      description: "Advanced penetration testing and security assessment",
      category: "PENETRATION TESTING",
      status: "PENDING",
      icon: "certificate",
      link: "#",
      date: "2024-01-10",
      issuer: "Offensive Security",
      credentialId: "OSCP-123456789",
      validUntil: "2027-01-10",
    },
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "cpu":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="4" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
            <path d="M7 7 L13 13 M13 7 L7 13" stroke="currentColor" strokeWidth="1"/>
          </svg>
        )
      case "terminal":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="3" y="5" width="14" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 9 L9 12 L6 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "database":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <ellipse cx="10" cy="5" rx="6" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <ellipse cx="10" cy="10" rx="6" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <ellipse cx="10" cy="15" rx="6" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="4" y1="5" x2="4" y2="15" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="16" y1="5" x2="16" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "code":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M6 6 L3 10 L6 14 M14 6 L17 10 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "lock":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="6" y="9" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 9 L6 6 C6 3.79 7.79 2 10 2 C12.21 2 14 3.79 14 6 L14 9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="13" r="1.5" fill="currentColor"/>
          </svg>
        )
      case "network":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="5" r="2" fill="currentColor"/>
            <circle cx="5" cy="15" r="2" fill="currentColor"/>
            <circle cx="15" cy="15" r="2" fill="currentColor"/>
            <line x1="10" y1="7" x2="5" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="10" y1="7" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="5" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      default:
        return null
    }
  }

  const getCertificationIcon = (iconType: string) => {
    switch (iconType) {
      case "certificate":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M10 14 L10 18 M7 16 L10 18 L13 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 8 L9 10 L13 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        )
      case "security":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M10 2 L16 5 L16 11 C16 15 10 18 10 18 C10 18 4 15 4 11 L4 5 L10 2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case "cloud":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M6 14 C4 14 2 12 2 10 C2 8 4 6 6 6 C6 4 8 2 10 2 C12 2 14 4 14 6 C16 6 18 8 18 10 C18 12 16 14 14 14 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
          </svg>
        )
      case "network":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="5" r="2" fill="currentColor"/>
            <circle cx="5" cy="15" r="2" fill="currentColor"/>
            <circle cx="15" cy="15" r="2" fill="currentColor"/>
            <line x1="10" y1="7" x2="5" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="10" y1="7" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="5" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "ethical":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M10 6 L10 14 M6 10 L14 10" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
          </svg>
        )
      case "compliance":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="4" width="12" height="12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 8 L13 8 M7 12 L13 12" stroke="currentColor" strokeWidth="1"/>
            <circle cx="10" cy="10" r="1" fill="currentColor"/>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="research-projects-container">
          {/* Projects Section */}
          <div className="projects-section">
            {/* Header Section */}
            <div className="projects-header">
              <h1 className="projects-title">./ RESEARCH_PROJECTS</h1>
              <p className="projects-subtitle">// Selected works from the archive</p>
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card"
                  onClick={() => project.link && window.open(project.link, '_blank')}
                  style={{ cursor: project.link ? 'pointer' : 'default' }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <span className="card-id">{project.id}</span>
                    <div className="card-icon">
                      {getIcon(project.icon)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-category">{project.category}</p>
                    {project.description && (
                      <p className="card-description">{project.description}</p>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <span className={`card-status status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="certifications-section">
            {/* Certifications Header */}
            <div className="certifications-header">
              <h2 className="certifications-title">./ CERTIFICATIONS</h2>
              <p className="certifications-subtitle">// Professional certifications and credentials</p>
            </div>

            {/* Certifications Grid */}
            <div className="certifications-grid">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="certification-card"
                  onClick={() => cert.link && window.open(cert.link, '_blank')}
                  style={{ cursor: cert.link ? 'pointer' : 'default' }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <span className="card-id">{cert.id}</span>
                    <div className="card-icon">
                      {getCertificationIcon(cert.icon)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3 className="card-title">{cert.title}</h3>
                    <p className="card-category">{cert.category}</p>
                    {cert.description && (
                      <p className="card-description">{cert.description}</p>
                    )}
                    {(cert.date || cert.issuer || cert.credentialId || cert.validUntil) && (
                      <div className="card-meta">
                        {cert.date && <span className="card-date">{cert.date}</span>}
                        {cert.issuer && <span className="card-issuer">{cert.issuer}</span>}
                        {cert.credentialId && <span className="card-credential-id">{cert.credentialId}</span>}
                        {cert.validUntil && <span className="card-valid-until">Valid until: {cert.validUntil}</span>}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <span className={`card-status cert-status-${cert.status.toLowerCase()}`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty States */}
          {projects.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No projects found in archive</p>
            </div>
          )}
          {certifications.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No certifications found in archive</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default ResearchProjectsPage
