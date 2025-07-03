import { Button } from "@/components/ui/button";
import Image from "next/image";

const username = "aloewright";

async function getGithubUser() {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 * 60 }, // revalidate hourly
    // GitHub API unauthenticated limit is 60/Hr; caching helps
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  return (await res.json()) as {
    avatar_url: string;
    name: string;
    bio: string;
    html_url: string;
  };
}

async function getGithubRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    next: { revalidate: 60 * 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch repositories");
  return (await res.json()) as Array<{
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
  }>;
}

export default async function Home() {
  const [user, repos] = await Promise.all([getGithubUser(), getGithubRepos()]);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 flex flex-col gap-12">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user.avatar_url}
          alt={user.name ?? username}
          width={112}
          height={112}
          className="rounded-full border border-border"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.name ?? username}</h1>
          {user.bio && <p className="text-muted-foreground mt-2 max-w-prose">{user.bio}</p>}
        </div>
      </header>

      {/* Repositories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Repositories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <Button
              asChild
              key={repo.id}
              variant="outline"
              className="justify-start overflow-hidden text-ellipsis whitespace-nowrap"
            >
              <a href={repo.html_url} target="_blank" rel="noreferrer" title={repo.description ?? repo.name}>
                {repo.name}
              </a>
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
}
