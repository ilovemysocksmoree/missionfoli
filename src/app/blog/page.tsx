"use client"
import React from "react"
import { useConfirmContext } from "../../components/context/ConfirmContext"
import Layout from "../../components/layout/Layout"
import Sidebar from "../../components/sideBar"
import "./style.css"

interface BlogPost {
  id: string
  title: string
  description?: string
  category: string
  status: "PUBLISHED" | "DRAFT" | "FEATURED" | "ARCHIVED"
  icon: "pen" | "book" | "code" | "globe" | "shield" | "terminal"
  link?: string
  image?: string
  date?: string
  readTime?: string
}

interface Documentation {
  id: string
  title: string
  description?: string
  category: string
  status: "COMPLETED" | "IN_PROGRESS" | "REVIEWED" | "SUBMITTED"
  icon: "book" | "document" | "research" | "academic" | "thesis" | "report"
  link?: string
  image?: string
  date?: string
  pages?: string
  course?: string
}

const BlogPage = ({ }) => {
  const { showConfirmation, setShowConfirmation } = useConfirmContext()

  const handleConfirmationResponse = (confirm) => {
    setShowConfirmation(false)
    if (confirm === true) {
      window.location.reload()
    }
  }

  // Sample documentation - replace with your actual college documentation
  const documentation: Documentation[] = [
    {
      id: "DOC001",
      title: "NETWORK SECURITY PROTOCOLS",
      description: "Comprehensive analysis of modern network security protocols and their implementation in enterprise environments",
      category: "SECURITY",
      status: "COMPLETED",
      icon: "document",
      link: "#",
      date: "2023-12-15",
      pages: "45 pages",
      course: "CS 425 - Network Security",
    },
    {
      id: "DOC002", 
      title: "CRYPTOGRAPHY FUNDAMENTALS",
      description: "Research paper on symmetric and asymmetric cryptographic algorithms with practical implementations",
      category: "CRYPTOGRAPHY",
      status: "REVIEWED",
      icon: "research",
      link: "#",
      date: "2023-11-20",
      pages: "38 pages",
      course: "CS 415 - Cryptography",
    },
    {
      id: "DOC003",
      title: "PENETRATION TESTING FRAMEWORK",
      description: "Documentation of systematic penetration testing methodologies and vulnerability assessment frameworks",
      category: "TESTING",
      status: "COMPLETED",
      icon: "report",
      link: "#",
      date: "2023-10-10",
      pages: "52 pages",
      course: "CS 435 - Ethical Hacking",
    },
    {
      id: "DOC004",
      title: "SECURITY POLICY ARCHITECTURE",
      description: "Thesis on designing comprehensive security policies for modern organizational infrastructure",
      category: "POLICY",
      status: "SUBMITTED",
      icon: "thesis",
      link: "#",
      date: "2023-09-25",
      pages: "67 pages",
      course: "CS 450 - Security Management",
    },
    {
      id: "DOC005",
      title: "MALWARE ANALYSIS TECHNIQUES",
      description: "Technical documentation on static and dynamic malware analysis methodologies and tools",
      category: "ANALYSIS",
      status: "COMPLETED",
      icon: "academic",
      link: "#",
      date: "2023-08-15",
      pages: "41 pages",
      course: "CS 445 - Malware Analysis",
    },
    {
      id: "DOC006",
      title: "INCIDENT RESPONSE PROTOCOLS",
      description: "Documentation of incident response procedures and security breach management frameworks",
      category: "RESPONSE",
      status: "IN_PROGRESS",
      icon: "book",
      link: "#",
      date: "2023-07-30",
      pages: "28 pages",
      course: "CS 440 - Incident Response",
    },
  ]
  const blogPosts: BlogPost[] = [
    {
      id: "001",
      title: "Inside the Phishing Lab: 5 Surprising Truths About Modern Social Engineering Simulations",
      description: "Deep dive into modern phishing tool for email exploitation",
      category: "SECURITY",
      status: "PUBLISHED",
      icon: "shield",
      link: "https://medium.com/@karmacharyadiya02/inside-the-phishing-lab-5-surprising-truths-about-modern-social-engineering-simulations-d383382335ef",
      date: "2026-01-30",
      readTime: "5 min",
    },
    {
      id: "002", 
      title: "ACTIVE DIRECTORY EXPLOITATION",
      description: "Comprehensive guide to Active Directory vulnerabilities and defensive strategies",
      category: "RESEARCH",
      status: "FEATURED",
      icon: "terminal",
      link: "https://medium.com/@yourusername/active-directory-exploitation-comprehensive-guide-to-vulnerabilities",
      date: "2024-01-10",
      readTime: "12 min",
    },
    {
      id: "003",
      title: "SECURITY POLICY ARCHITECTURE",
      description: "Building robust security policies from the ground up - a systematic approach",
      category: "FRAMEWORK",
      status: "PUBLISHED",
      icon: "book",
      link: "https://medium.com/@yourusername/security-policy-architecture-building-robust-policies-systematically",
      date: "2024-01-05",
      readTime: "6 min",
    },
    {
      id: "004",
      title: "PAYLOAD CRAFTING TECHNIQUES",
      description: "Advanced payload development for security testing and vulnerability assessment",
      category: "TECHNICAL",
      status: "DRAFT",
      icon: "code",
      link: "https://medium.com/@yourusername/payload-crafting-techniques-advanced-development-for-security-testing",
      date: "2024-01-01",
      readTime: "10 min",
    },
    {
      id: "005",
      title: "VENDOR SECURITY COMMUNICATION",
      description: "Best practices for responsible disclosure and vendor coordination in security research",
      category: "ETHICS",
      status: "PUBLISHED",
      icon: "globe",
      link: "https://medium.com/@yourusername/vendor-security-communication-best-practices-for-responsible-disclosure",
      date: "2023-12-28",
      readTime: "8 min",
    },
    {
      id: "006",
      title: "MALWARE ANALYSIS WORKFLOW",
      description: "Systematic approach to malware reverse engineering and threat intelligence gathering",
      category: "REVERSE ENGINEERING",
      status: "FEATURED",
      icon: "pen",
      link: "https://medium.com/@yourusername/malware-analysis-workflow-systematic-reverse-engineering-approach",
      date: "2023-12-25",
      readTime: "15 min",
    },
  ]

  const getDocumentationIcon = (iconType: string) => {
    switch (iconType) {
      case "document":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="3" width="12" height="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1"/>
          </svg>
        )
      case "research":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M10 6 L10 14 M6 10 L14 10" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="2" fill="currentColor"/>
          </svg>
        )
      case "academic":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M3 7 L10 3 L17 7 L17 13 L10 17 L3 13 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M10 3 L10 17" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 7 L10 11 L17 7" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "thesis":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="3" width="12" height="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 7 L13 7 M7 10 L13 10 M7 13 L11 13" stroke="currentColor" strokeWidth="1"/>
            <circle cx="15" cy="5" r="2" fill="currentColor"/>
          </svg>
        )
      case "report":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="3" y="5" width="14" height="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 9 L9 12 L6 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "book":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="3" width="12" height="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1"/>
          </svg>
        )
      default:
        return null
    }
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "pen":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M3 17 L3 14 L13 4 L16 7 L6 17 L3 17" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M13 4 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )
      case "book":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <rect x="4" y="3" width="12" height="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="7" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1"/>
            <line x1="7" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1"/>
          </svg>
        )
      case "code":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M6 6 L3 10 L6 14 M14 6 L17 10 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )
      case "globe":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <ellipse cx="10" cy="10" rx="3" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 2 Q10 10 10 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        )
      case "shield":
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="terminal-icon">
            <path d="M10 2 L16 5 L16 11 C16 15 10 18 10 18 C10 18 4 15 4 11 L4 5 L10 2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
      default:
        return null
    }
  }

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="blog-container">
          {/* Blog Posts Section */}
          <div className="blog-section">
            {/* Header Section */}
            <div className="blog-header">
              <h1 className="blog-title">./ BLOG_ARCHIVE</h1>
              <p className="blog-subtitle">// Security research insights and technical writings</p>
            </div>

            {/* Blog Posts Grid */}
            <div className="blog-grid">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="blog-card"
                  onClick={() => post.link && window.open(post.link, '_blank')}
                  style={{ cursor: post.link ? 'pointer' : 'default' }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <span className="card-id">{post.id}</span>
                    <div className="card-icon">
                      {getIcon(post.icon)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3 className="card-title">{post.title}</h3>
                    <p className="card-category">{post.category}</p>
                    {post.description && (
                      <p className="card-description">{post.description}</p>
                    )}
                    {(post.date || post.readTime) && (
                      <div className="card-meta">
                        {post.date && <span className="card-date">{post.date}</span>}
                        {post.readTime && <span className="card-read-time">{post.readTime}</span>}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <span className={`card-status status-${post.status.toLowerCase()}`}>
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation Section */}
          <div className="documentation-section">
            {/* Documentation Header */}
            <div className="documentation-header">
              <h2 className="documentation-title">./ COLLEGE_DOCUMENTATION</h2>
              <p className="documentation-subtitle">// Academic research and technical documentation from college</p>
            </div>

            {/* Documentation Grid */}
            <div className="documentation-grid">
              {documentation.map((doc) => (
                <div
                  key={doc.id}
                  className="documentation-card"
                  onClick={() => doc.link && window.open(doc.link, '_blank')}
                  style={{ cursor: doc.link ? 'pointer' : 'default' }}
                >
                  {/* Card Header */}
                  <div className="card-header">
                    <span className="card-id">{doc.id}</span>
                    <div className="card-icon">
                      {getDocumentationIcon(doc.icon)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="card-content">
                    <h3 className="card-title">{doc.title}</h3>
                    <p className="card-category">{doc.category}</p>
                    {doc.description && (
                      <p className="card-description">{doc.description}</p>
                    )}
                    {(doc.date || doc.pages || doc.course) && (
                      <div className="card-meta">
                        {doc.date && <span className="card-date">{doc.date}</span>}
                        {doc.pages && <span className="card-pages">{doc.pages}</span>}
                        {doc.course && <span className="card-course">{doc.course}</span>}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="card-footer">
                    <span className={`card-status doc-status-${doc.status.toLowerCase().replace('_', '-')}`}>
                      {doc.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty States */}
          {blogPosts.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No blog posts found in archive</p>
            </div>
          )}
          {documentation.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No documentation found in archive</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage
