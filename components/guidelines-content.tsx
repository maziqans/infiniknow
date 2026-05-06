"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Bug,
  Shield,
  Lock,
  Code,
  Clock,
  User,
  ChevronRight,
  BookOpen,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface GuidelineArticle {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  content: string
}

const guidelinesData: Record<string, { title: string; description: string; icon: React.ReactNode; articles: GuidelineArticle[] }> = {
  wapt: {
    title: "WAPT Guidelines",
    description: "Web Application Penetration Testing standards and methodologies",
    icon: <Bug className="h-6 w-6" />,
    articles: [
      {
        id: "wapt-info",
        title: "01. Information Gathering (WSTG-INFO)",
        excerpt: "Techniques for discovering information about the target web application, its architecture, and its environment.",
        author: "OWASP WSTG",
        date: "Latest Version",
        readTime: "15 min read",
        content: `Information gathering is the first and most critical phase of a penetration test. It provides the foundation for all subsequent testing phases by allowing the tester to build a comprehensive profile of the target application.

## Overview
The primary goal of information gathering is to map the target application's attack surface, understand its underlying technologies, and identify potential entry points for further exploitation. A thorough reconnaissance phase often determines the success or failure of the entire penetration test. By analyzing how the application behaves, what frameworks it uses, and how it interacts with the user, security professionals can tailor their attacks to the specific environment.

## Detailed Testing Areas

### Search Engine Discovery
Attackers and testers alike use search engines to discover sensitive information leaked by the application. This includes finding indexed administrative interfaces, backup files, or internal documents that should not be publicly accessible.

### Fingerprinting the Server and Framework
Identifying the exact version of the web server (like Apache or Nginx) and the application framework (like React, Django, or Laravel) allows testers to search for known vulnerabilities and exploits specific to those versions.

### Application Entry Points
Mapping execution paths means finding every single input field, URL parameter, API endpoint, and HTTP header that the application processes. Every entry point is a potential vector for injection attacks.

## Testing Checklist

- [ ] WSTG-INFO-01: Conduct Search Engine Discovery Reconnaissance for Information Leakage
- [ ] WSTG-INFO-02: Fingerprint Web Server
- [ ] WSTG-INFO-03: Review Webserver Metafiles for Information Leakage
- [ ] WSTG-INFO-04: Enumerate Applications on Webserver
- [ ] WSTG-INFO-05: Review Webpage Content for Information Leakage
- [ ] WSTG-INFO-06: Identify Application Entry Points
- [ ] WSTG-INFO-07: Map Execution Paths Through Application
- [ ] WSTG-INFO-08: Fingerprint Web Application Framework
- [ ] WSTG-INFO-09: Fingerprint Web Application
- [ ] WSTG-INFO-10: Map Application Architecture

### Common Tools
1. Nmap
2. Wappalyzer
3. Nikto
4. Burp Suite Spider`,
      },
      {
        id: "wapt-conf",
        title: "02. Configuration & Deployment Mgmt (WSTG-CONF)",
        excerpt: "Testing the web server and application configuration for security misconfigurations.",
        author: "OWASP WSTG",
        date: "Latest Version",
        readTime: "12 min read",
        content: `Misconfigurations at the network, platform, or application level are among the most common vulnerabilities exploited by attackers. Secure configuration management is essential for defense in depth.

## Overview
This phase verifies that the application and its environment are configured securely, following the principle of least privilege. Even the most securely written code can be compromised if the underlying web server or cloud storage bucket is improperly configured. Testers look for forgotten files, default passwords, and overly permissive security headers.

## Core Concepts

### Administrative Interfaces
Administrative panels should never be exposed to the public internet without strict access controls, IP whitelisting, or VPN requirements. Testers actively enumerate directories to find hidden management portals.

### Security Headers
HTTP headers like Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and X-Frame-Options provide modern browsers with instructions on how to handle the application securely. Missing headers leave users vulnerable to Cross-Site Scripting (XSS) and Clickjacking.

### Cloud Storage and File Permissions
Misconfigured AWS S3 buckets or open directory listings on web servers often leak sensitive customer data, source code, or internal company documents.

## Testing Checklist

- [ ] WSTG-CONF-01: Test Network Infrastructure Configuration
- [ ] WSTG-CONF-02: Test Application Platform Configuration
- [ ] WSTG-CONF-03: Test File Extensions Handling for Sensitive Information
- [ ] WSTG-CONF-04: Review Old Backup and Unreferenced Files for Sensitive Information
- [ ] WSTG-CONF-05: Enumerate Infrastructure and Application Admin Interfaces
- [ ] WSTG-CONF-06: Test HTTP Methods
- [ ] WSTG-CONF-07: Test HTTP Strict Transport Security
- [ ] WSTG-CONF-08: Test RIA Cross Domain Policy
- [ ] WSTG-CONF-09: Test File Permission
- [ ] WSTG-CONF-10: Test for Subdomain Takeover
- [ ] WSTG-CONF-11: Test Cloud Storage

### Best Practices
- Disable unnecessary services and ports
- Remove default credentials
- Ensure security headers (HSTS, CSP, X-Frame-Options) are configured properly`,
      },
      {
        id: "wapt-athn",
        title: "04. Authentication Testing (WSTG-ATHN)",
        excerpt: "Evaluating the mechanisms used to verify the identity of a user, service, or application.",
        author: "OWASP WSTG",
        date: "Latest Version",
        readTime: "20 min read",
        content: `Authentication is the critical process of verifying that an individual, entity, or website is exactly who it claims to be. It is the front door to any secure application.

## Overview
Flaws in authentication can allow an attacker to bypass login controls entirely, assume the identity of other users, or completely compromise the administrative functions of the application. A robust authentication mechanism is the foundation of user security.

## Vulnerability Vectors

### Default and Weak Credentials
Many systems are deployed with default usernames and passwords. If not changed, attackers can gain immediate, unrestricted access. Furthermore, failing to enforce strong password policies allows attackers to easily guess user credentials through brute-force attacks.

### Credential Transport
If credentials are transmitted over unencrypted HTTP channels instead of secure HTTPS, anyone monitoring the network traffic can intercept the username and password in plain text.

### Account Lockout Mechanisms
Without a proper account lockout policy (e.g., locking the account after 5 failed attempts), an attacker can continuously attempt to guess a password using automated tools until they succeed.

## Testing Checklist

- [ ] WSTG-ATHN-01: Test for Credentials Transported over an Unencrypted Channel
- [ ] WSTG-ATHN-02: Test for Default Credentials
- [ ] WSTG-ATHN-03: Test for Weak Lock Out Mechanism
- [ ] WSTG-ATHN-04: Test for Bypassing Authentication Schema
- [ ] WSTG-ATHN-05: Test for Vulnerable Remember Password
- [ ] WSTG-ATHN-06: Test for Browser Cache Weaknesses
- [ ] WSTG-ATHN-07: Test for Weak Password Policy
- [ ] WSTG-ATHN-08: Test for Weak Security Question Answer
- [ ] WSTG-ATHN-09: Test for Weak Password Change or Reset Functionalities
- [ ] WSTG-ATHN-10: Test for Weaker Authentication in Alternative Channel`,
      },
      {
        id: "wapt-athz",
        title: "05. Authorization Testing (WSTG-ATHZ)",
        excerpt: "Checking if the application properly enforces access controls and prevents privilege escalation.",
        author: "OWASP WSTG",
        date: "Latest Version",
        readTime: "18 min read",
        content: `Authorization directly follows authentication. While authentication verifies who you are, authorization dictates what you are allowed to see and do within the application.

## Overview
Testing authorization involves verifying that users cannot access resources or perform actions that they are not explicitly permitted to perform. Access control failures are frequently rated as the most critical web application security risk because they often lead directly to data breaches.

## Core Concepts and Escalation Paths

### Horizontal Privilege Escalation
This occurs when a user accesses the resources of another user who has the exact same level of privileges. For example, User A manipulates a URL parameter to view User B's private billing information. This is commonly referred to as Insecure Direct Object References (IDOR).

### Vertical Privilege Escalation
This represents a complete breakdown of roles, where a standard, low-level user manages to access features reserved for administrators or higher-tier users. This could involve accessing a hidden /admin dashboard or modifying a hidden form field to upgrade their own account status.

### Directory Traversal
Attackers manipulate file paths to access files and directories stored outside the intended web root folder. By using dot-dot-slash (../) sequences, an attacker might read sensitive system files, configuration files, or even password hashes directly from the server.

## Testing Checklist

- [ ] WSTG-ATHZ-01: Testing Directory Traversal File Include
- [ ] WSTG-ATHZ-02: Testing for Bypassing Authorization Schema
- [ ] WSTG-ATHZ-03: Testing for Privilege Escalation
- [ ] WSTG-ATHZ-04: Testing for Insecure Direct Object References (IDOR)

## Defense Strategies

- Implement authorization checks at the server level, never trusting client-side hidden fields
- Use indirect object references (like random GUIDs) instead of predictable, sequential database IDs
- Deny access by default and explicitly grant permission to specific roles`,
      },
      {
        id: "wapt-inpv",
        title: "07. Input Validation Testing (WSTG-INPV)",
        excerpt: "Testing how the application handles various types of input to identify injection flaws.",
        author: "OWASP WSTG",
        date: "Latest Version",
        readTime: "25 min read",
        content: `Input validation testing represents the core of traditional application security testing. It operates on a single, fundamental rule: Never trust user input.

## Overview
Failure to properly validate, sanitize, and encode input can lead to a wide variety of devastating vulnerabilities. If an application blindly accepts data from a user and processes it in a database, operating system shell, or web browser, it opens the door to injection attacks.

## Common Injection Vulnerabilities

### Cross-Site Scripting (XSS)
When an application includes untrusted data in a web page without proper validation or escaping, attackers can execute malicious JavaScript in the victim's browser. This can lead to hijacked user sessions, defaced web sites, or redirected users. XSS is divided into Reflected, Stored, and DOM-based variants.

### SQL Injection (SQLi)
SQL Injection occurs when untrusted user input is sent directly to a backend database without being parameterized. This allows attackers to modify the SQL query logic to bypass logins, extract the entire database, modify records, or drop tables completely.

### Command Injection
If an application passes user input directly to the host operating system's command shell (for example, to ping an IP address), an attacker can append their own system commands. This often results in a complete system takeover.

## Testing Checklist

- [ ] WSTG-INPV-01: Testing for Reflected Cross Site Scripting
- [ ] WSTG-INPV-02: Testing for Stored Cross Site Scripting
- [ ] WSTG-INPV-03: Testing for HTTP Verb Tampering
- [ ] WSTG-INPV-04: Testing for HTTP Parameter Pollution
- [ ] WSTG-INPV-05: Testing for SQL Injection
- [ ] WSTG-INPV-06: Testing for LDAP Injection
- [ ] WSTG-INPV-08: Testing for SSI Injection
- [ ] WSTG-INPV-09: Testing for XPath Injection
- [ ] WSTG-INPV-11: Testing for Code Injection
- [ ] WSTG-INPV-12: Testing for Command Injection`,
      },
    ],
  },
  vapt: {
    title: "VAPT Guidelines",
    description: "Vulnerability Assessment and Penetration Testing procedures",
    icon: <Shield className="h-6 w-6" />,
    articles: [
      {
        id: "vapt-1",
        title: "Network Penetration Testing Fundamentals",
        excerpt: "Understanding the basics of network security assessment and penetration testing.",
        author: "Michael Rodriguez",
        date: "Apr 25, 2026",
        readTime: "15 min read",
        content: `Network penetration testing is a critical component of any comprehensive security assessment program.

## Scope Definition

Before beginning any network penetration test, clearly define:
- Target IP ranges and systems
- Testing timeframes
- Rules of engagement
- Emergency contacts

## Reconnaissance Phase

### Passive Reconnaissance
- OSINT gathering
- DNS enumeration
- Network mapping
- Service identification

### Active Reconnaissance
- Port scanning
- Service fingerprinting
- Banner grabbing
- Vulnerability scanning

## Exploitation

### Common Attack Vectors
1. Unpatched services
2. Default credentials
3. Misconfigurations
4. Weak encryption

## Post-Exploitation

- Privilege escalation
- Lateral movement
- Data exfiltration simulation
- Persistence mechanisms`,
      },
    ],
  },
  security: {
    title: "Security Policies",
    description: "Information security policies and compliance requirements",
    icon: <Lock className="h-6 w-6" />,
    articles: [
      {
        id: "sec-1",
        title: "Password Security Best Practices",
        excerpt: "Guidelines for creating and managing secure passwords across the organization.",
        author: "Emily Foster",
        date: "May 2, 2026",
        readTime: "6 min read",
        content: `Strong password practices are fundamental to organizational security.

## Password Requirements

- Minimum 12 characters
- Mix of uppercase and lowercase letters
- Include numbers and special characters
- No common words or patterns

## Password Management

### Do's
- Use a password manager
- Enable MFA wherever possible
- Use unique passwords for each account
- Change passwords after potential compromise

### Don'ts
- Never share passwords
- Don't write passwords down
- Avoid using personal information
- Don't reuse passwords across accounts

## Multi-Factor Authentication

MFA is required for:
- All production systems
- Email access
- VPN connections
- Administrative accounts`,
      },
    ],
  },
  code: {
    title: "Code Standards",
    description: "Secure coding guidelines and development best practices",
    icon: <Code className="h-6 w-6" />,
    articles: [
      {
        id: "code-1",
        title: "Secure Coding Principles",
        excerpt: "Essential security principles every developer should follow when writing code.",
        author: "Ryan Park",
        date: "Apr 30, 2026",
        readTime: "10 min read",
        content: `Secure coding is essential for building robust applications.

## Input Validation

Always validate and sanitize user input:
- Whitelist allowed characters
- Validate data types
- Check length limits
- Encode output appropriately

## Authentication & Authorization

- Implement proper session management
- Use secure password hashing (bcrypt, Argon2)
- Implement rate limiting
- Use parameterized queries

## Error Handling

- Never expose stack traces to users
- Log errors securely
- Implement proper exception handling
- Return generic error messages

## Cryptography

- Use established libraries
- Never implement custom crypto
- Rotate keys regularly
- Use appropriate algorithms`,
      },
    ],
  },
}

interface GuidelinesContentProps {
  guidelineType: "wapt" | "vapt" | "security" | "code"
  onBack: () => void
}

export function GuidelinesContent({ guidelineType, onBack }: GuidelinesContentProps) {
  const [selectedArticle, setSelectedArticle] = useState<GuidelineArticle | null>(null)
  const guideline = guidelinesData[guidelineType]

  const handleArticleClick = (article: GuidelineArticle) => {
    setSelectedArticle(article)
    
    const token = localStorage.getItem("auth_token")
    if (token) {
      try {
        fetch("http://localhost:8000/api/recent-activities/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            title: article.title,
            doc_type: "DOC"
          })
        })
      } catch (e) {
        console.error("Error saving recent document", e)
      }
    }
  }

  if (selectedArticle) {
    return (
      <main key={`article-${selectedArticle.id}`} className="flex-1 bg-background p-6 overflow-y-auto animate-in fade-in duration-500">
        {/* Article Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedArticle(null)}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {guideline.title}
          </Button>
        </div>

        {/* Article Content */}
        <Card className="border-0 card-elevated max-w-4xl">
          <CardContent className="pt-8 pb-12 px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">{selectedArticle.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedArticle.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.date}
                </div>
                <Badge variant="secondary">{selectedArticle.readTime}</Badge>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
                }
                if (paragraph.startsWith('- [ ]') || paragraph.startsWith('- [x]')) {
                  const items = paragraph.split('\n')
                  return (
                    <ul key={index} className="space-y-2 my-4">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-4 h-4 border border-border rounded" />
                          {item.replace('- [ ] ', '').replace('- [x] ', '')}
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (paragraph.startsWith('1. ')) {
                  const items = paragraph.split('\n')
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  )
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n')
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4 text-muted-foreground">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  )
                }
                return <p key={index} className="text-muted-foreground leading-relaxed my-4">{paragraph}</p>
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main key="guideline-list" className="flex-1 bg-background p-6 overflow-y-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
              <div className="p-2 icon-glow-red rounded-lg text-red">
                {guideline.icon}
              </div>
              {guideline.title}
            </h1>
            <p className="text-muted-foreground">
              {guideline.description}
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {guideline.articles.length} Articles
          </Badge>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {guideline.articles.map((article) => (
          <Card
            key={article.id}
            className="border-0 card-elevated cursor-pointer group"
            onClick={() => handleArticleClick(article)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-red transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {article.date}
                    </div>
                    <Badge variant="secondary">{article.readTime}</Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-red group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
