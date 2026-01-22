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
    // {
    //   id: "001",
    //   title: "PROJECT_GENESIS",
    //   description: "Initial research framework for narrative AI systems",
    //   category: "AI_RESEARCH",
    //   status: "DEPLOYED",
    //   icon: "cpu",
    // },
    // {
    //   id: "002",
    //   title: "NEURAL_STORYTELLING",
    //   description: "Exploring neural networks in creative writing",
    //   category: "RESEARCH",
    //   status: "RENDERING",
    //   icon: "terminal",
    // },
    // {
    //   id: "003",
    //   title: "DIGITAL_ARCHIVE",
    //   description: "Interactive database of narrative structures",
    //   category: "PROJECT",
    //   status: "LIVE",
    //   icon: "database",
    // },
    // {
    //   id: "004",
    //   title: "VOICE_SYNTHESIS",
    //   description: "Audio synthesis for storytelling applications",
    //   category: "RESEARCH",
    //   status: "COMPILING",
    //   icon: "code",
    // },
    // {
    //   id: "005",
    //   title: "IDENTITY_MATRIX",
    //   description: "Character identity generation system",
    //   category: "PROJECT",
    //   status: "ENCRYPTED",
    //   icon: "lock",
    // },
    // {
    //   id: "006",
    //   title: "DATA_STREAM",
    //   description: "Real-time narrative data processing",
    //   category: "ARCHIVE",
    //   status: "ONLINE",
    //   icon: "network",
    // },
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
      title: "AD_SHIELD_FRONTEND",
      description: "Frontend application for AD Shield security platform",
      category: "PROJECT",
      status: "DEPLOYED",
      icon: "code",
      link: "https://github.com/ilovemysocksmoree/ad-shield-frontend",
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

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="research-projects-container">
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

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No projects found in archive</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default ResearchProjectsPage
