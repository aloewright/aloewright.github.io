'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, ExternalLink, Star, GitFork, Eye } from 'lucide-react'

interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  location: string
  company: string
  blog: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  topics: string[]
}

const GITHUB_USERNAME = 'aloewright'

export default function Portfolio() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user profile
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        const userData = await userResponse.json()
        setUser(userData)

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`)
        const reposData = await reposResponse.json()
        setRepos(reposData.filter((repo: GitHubRepo) => !repo.name.includes('.github')))
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32 border-4 border-primary">
              <AvatarImage src={user?.avatar_url} alt={user?.name || user?.login} />
              <AvatarFallback>{user?.name?.slice(0, 2) || user?.login?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold mb-2">{user?.name || user?.login}</h1>
              <p className="text-xl text-muted-foreground mb-4">{user?.bio}</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                {user?.location && <span>📍 {user.location}</span>}
                {user?.company && <span>🏢 {user.company}</span>}
                <span>👥 {user?.followers} followers</span>
                <span>📚 {user?.public_repos} repositories</span>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <Button asChild>
                  <a href={user?.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Profile
                  </a>
                </Button>
                {user?.blog && (
                  <Button variant="outline" asChild>
                    <a href={user.blog} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Repositories Grid */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <Card key={repo.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{repo.name}</span>
                    {repo.language && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {repo.language}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="h-12 overflow-hidden">
                    {repo.description || 'No description available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {repo.watchers_count}
                      </span>
                    </div>
                  </div>
                  
                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {repo.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                          +{repo.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" asChild className="flex-1">
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t">
          <p className="text-muted-foreground">
            Built with Next.js, TypeScript, and shadcn/ui
          </p>
        </footer>
      </div>
    </div>
  )
}