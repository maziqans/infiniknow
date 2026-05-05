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
        id: "wapt-1",
        title: "Introduction to Web Application Penetration Testing",
        excerpt: "Learn the fundamentals of WAPT and why it is essential for securing web applications.",
        author: "Alex Smith",
        date: "May 1, 2026",
        readTime: "8 min read",
        content: `Web Application Penetration Testing (WAPT) is a critical security assessment methodology designed to identify vulnerabilities in web applications before malicious actors can exploit them.

## What is WAPT?

WAPT involves simulating real-world attacks against web applications to discover security weaknesses. This proactive approach helps organizations understand their security posture and remediate issues before they become incidents.

## Key Objectives

1. **Identify Vulnerabilities**: Discover security flaws in application logic, authentication, session management, and data handling.
2. **Assess Risk**: Evaluate the potential impact of discovered vulnerabilities on business operations.
3. **Provide Recommendations**: Deliver actionable remediation guidance to development teams.

## Testing Phases

### 1. Reconnaissance
Gather information about the target application, including technology stack, entry points, and potential attack vectors.

### 2. Scanning
Use automated tools to identify common vulnerabilities and misconfigurations.

### 3. Manual Testing
Perform in-depth manual analysis to discover complex vulnerabilities that automated tools might miss.

### 4. Exploitation
Attempt to exploit identified vulnerabilities to verify their existence and assess impact.

### 5. Reporting
Document all findings with clear severity ratings and remediation recommendations.

## Best Practices

- Always obtain proper authorization before testing
- Document all testing activities thoroughly
- Follow the principle of least privilege
- Report critical findings immediately
- Maintain confidentiality of all discovered vulnerabilities`,
      },
      {
        id: "wapt-2",
        title: "OWASP Top 10 Testing Methodology",
        excerpt: "A comprehensive guide to testing for the OWASP Top 10 vulnerabilities in web applications.",
        author: "Jordan Lee",
        date: "Apr 28, 2026",
        readTime: "12 min read",
        content: `The OWASP Top 10 represents the most critical security risks to web applications. This guide provides testing methodologies for each category.

## A01:2021 - Broken Access Control

### Testing Approach
- Test horizontal privilege escalation
- Verify vertical privilege escalation controls
- Check for IDOR vulnerabilities
- Test force browsing to restricted pages

## A02:2021 - Cryptographic Failures

### Testing Approach
- Verify TLS implementation
- Check for sensitive data exposure
- Test encryption key management
- Analyze data transmission security

## A03:2021 - Injection

### Testing Approach
- Test SQL injection points
- Check for command injection
- Verify LDAP injection controls
- Test XPath injection vulnerabilities

## A04:2021 - Insecure Design

### Testing Approach
- Review security requirements
- Analyze threat modeling
- Check security controls at design level
- Verify secure development practices`,
      },
      {
        id: "wapt-3",
        title: "API Security Testing Checklist",
        excerpt: "Essential checks for securing REST and GraphQL APIs in your applications.",
        author: "Casey Wong",
        date: "Apr 20, 2026",
        readTime: "10 min read",
        content: `API security is crucial in modern web applications. This checklist covers essential testing areas.

## Authentication Testing

- [ ] Test API key handling
- [ ] Verify JWT implementation
- [ ] Check OAuth/OIDC flows
- [ ] Test session management

## Authorization Testing

- [ ] Verify role-based access control
- [ ] Test object-level authorization
- [ ] Check function-level access control
- [ ] Test multi-tenancy isolation

## Input Validation

- [ ] Test for injection vulnerabilities
- [ ] Verify parameter tampering controls
- [ ] Check mass assignment protection
- [ ] Test rate limiting implementation

## Data Protection

- [ ] Verify sensitive data handling
- [ ] Check response filtering
- [ ] Test error handling
- [ ] Verify logging practices`,
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

  if (selectedArticle) {
    return (
      <main className="flex-1 bg-background p-6 overflow-y-auto">
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
    <main className="flex-1 bg-background p-6 overflow-y-auto">
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
            onClick={() => setSelectedArticle(article)}
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
