"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Linkedin, Globe } from "lucide-react"
import Image from "next/image"
import { CodingDays } from "@/components/coding-days"

interface GitHubProfile {
  name: string
  avatar_url: string
  bio: string
  login: string
  html_url: string
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  default_branch: string
  owner: {
    login: string
  }
}

interface RepoWithTitle extends GitHubRepo {
  displayTitle: string
}

export default function Home() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [repos, setRepos] = useState<RepoWithTitle[]>([])
  const [loading, setLoading] = useState(true)

  const username = "aloewright"

  // Extract title from README content
  const extractTitleFromReadme = (content: string): string | null => {
    // Decode base64 content
    const decodedContent = atob(content)
    
    // Look for the first H1 header (# Title or Title\n===)
    const h1Match = decodedContent.match(/^#\s+(.+)$/m) || 
                    decodedContent.match(/^(.+)\n={3,}$/m)
    
    if (h1Match) {
      return h1Match[1].trim()
    }
    
    // If no H1, look for the first H2 header
    const h2Match = decodedContent.match(/^##\s+(.+)$/m) || 
                    decodedContent.match(/^(.+)\n-{3,}$/m)
    
    if (h2Match) {
      return h2Match[1].trim()
    }
    
    return null
  }

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`)
        const profileData = await profileRes.json()
        setProfile(profileData)

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
        const reposData: GitHubRepo[] = await reposRes.json()
        
        // Fetch README for each repo to get titles
        const reposWithTitles = await Promise.all(
          reposData.map(async (repo) => {
            let displayTitle = repo.name
            
            try {
              // Try to fetch README
              const readmeRes = await fetch(
                `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`,
                {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json'
                  }
                }
              )
              
              if (readmeRes.ok) {
                const readmeData = await readmeRes.json()
                const extractedTitle = extractTitleFromReadme(readmeData.content)
                if (extractedTitle) {
                  displayTitle = extractedTitle
                }
              }
            } catch (error) {
              // If README fetch fails, keep using repo name
              console.log(`No README found for ${repo.name}`)
            }
            
            return {
              ...repo,
              displayTitle
            }
          })
        )
        
        setRepos(reposWithTitles)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header/Profile Section */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {profile && (
              <>
                <Image
                  src={profile.avatar_url}
                  alt={profile.name || username}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-border"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold">{profile.name || username}</h1>
                  <p className="text-muted-foreground">@{profile.login}</p>
                  {profile.bio && (
                    <p className="mt-2 text-foreground max-w-2xl">{profile.bio}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4 justify-center md:justify-start">
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">{profile.public_repos}</strong> repositories
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">{profile.followers}</strong> followers
                    </span>
                    <span className="text-sm text-muted-foreground">
                      <strong className="text-foreground">{profile.following}</strong> following
                    </span>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-4 flex gap-2 justify-center md:justify-start">
                    <Button asChild>
                      <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://linkedin.com/in/aloewright" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://aloewright.com" target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Coding Days Card */}
                <div className="mt-6 md:mt-0">
                  <CodingDays username={username} />
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Repositories Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div key={repo.id} className="group">
              <Button
                asChild
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start text-left hover:shadow-lg transition-all"
              >
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full mb-2">
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                        {repo.displayTitle}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    {repo.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-primary/20"></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
