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

const BlogPage = ({ }) => {
  const { showConfirmation, setShowConfirmation } = useConfirmContext()

  const handleConfirmationResponse = (confirm) => {
    setShowConfirmation(false)
    if (confirm === true) {
      window.location.reload()
    }
  }

  // Sample blog posts - replace with your actual blog content
  const blogPosts: BlogPost[] = [
    {
      id: "001",
      title: "PENETRATION TESTING METHODOLOGIES",
      description: "Deep dive into modern penetration testing frameworks and methodologies for enterprise security assessments",
      category: "SECURITY",
      status: "PUBLISHED",
      icon: "shield",
      link: "#",
      date: "2024-01-15",
      readTime: "8 min",
    },
    {
      id: "002", 
      title: "ACTIVE DIRECTORY EXPLOITATION",
      description: "Comprehensive guide to Active Directory vulnerabilities and defensive strategies",
      category: "RESEARCH",
      status: "FEATURED",
      icon: "terminal",
      link: "#",
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
      link: "#",
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
      link: "#",
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
      link: "#",
      date: "2023-12-28",
      readTime: "7 min",
    },
    {
      id: "006",
      title: "ADVERSARIAL TEST CASES",
      description: "Designing comprehensive test scenarios to validate security controls and defenses",
      category: "TESTING",
      status: "ARCHIVED",
      icon: "pen",
      link: "#",
      date: "2023-12-20",
      readTime: "9 min",
    },
  ]

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

          {/* Empty State */}
          {blogPosts.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">// No blog posts found in archive</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default BlogPage
