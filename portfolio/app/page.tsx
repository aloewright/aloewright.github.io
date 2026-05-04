import Image from "next/image";
import { Github, Linkedin, Globe, Star, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const username = "aloewright";

const FEATURED_REPOS = [
  "spooool",
  "harborline",
  "post-pilot",
  "alexometer",
  "book-cook",
] as const;

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  tech: string[];
};

type GithubUser = {
  avatar_url: string;
  name: string;
  bio: string;
  html_url: string;
};

const FALLBACK_USER: GithubUser = {
  avatar_url: `https://avatars.githubusercontent.com/${username}`,
  name: "Alex Wright",
  bio: "Building local-first apps and Cloudflare-native tools.",
  html_url: `https://github.com/${username}`,
};

const FALLBACK_REPO_META: Record<
  (typeof FEATURED_REPOS)[number],
  Omit<Repo, "id" | "html_url" | "name">
> = {
  spooool: {
    description:
      "A YouTube alternative built entirely on Cloudflare infrastructure — Workers for API/frontend, R2 for storage, Stream for encoding/delivery, D1 for metadata, Durable Objects for state.",
    stargazers_count: 3,
    language: "TypeScript",
    tech: [
      "TypeScript",
      "React",
      "Vite",
      "Hono",
      "Cloudflare Workers",
      "Cloudflare R2",
      "Cloudflare D1",
      "Cloudflare Stream",
      "Durable Objects",
    ],
  },
  harborline: {
    description:
      "Local-first Apple AI operator for iPhone, iPad, and Mac — built on Foundation Models and App Intents.",
    stargazers_count: 0,
    language: "Swift",
    tech: [
      "Swift",
      "SwiftUI",
      "iOS",
      "macOS",
      "Foundation Models",
      "App Intents",
    ],
  },
  "post-pilot": {
    description:
      "A curated library of author-voice specifications for AI agents. Cloudflare Worker (Hono + Drizzle/D1) serving a React + TanStack Router catalog, with AI Gateway-routed generation and deterministic rubric scoring.",
    stargazers_count: 1,
    language: "TypeScript",
    tech: [
      "TypeScript",
      "React",
      "Vite",
      "Hono",
      "Tailwind CSS",
      "TanStack Router",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Drizzle ORM",
    ],
  },
  alexometer: {
    description:
      "Inspect any website's design — extract colors, fonts, spacing, SVGs, Lottie, and export to code.",
    stargazers_count: 0,
    language: "TypeScript",
    tech: ["TypeScript", "React", "Tailwind CSS"],
  },
  "book-cook": {
    description:
      "Solo-author SaaS that takes a book from market research to a launch-ready Kindle and Audible release. Cloudflare Workers + D1/KV/R2, Better Auth, and an Editorial Assistant chat agent.",
    stargazers_count: 0,
    language: "TypeScript",
    tech: [
      "TypeScript",
      "React",
      "Vite",
      "Hono",
      "BlockNote",
      "TanStack Router",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Cloudflare R2",
      "Drizzle ORM",
      "Better Auth",
    ],
  },
};

async function getGithubUser(): Promise<GithubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 60 * 60 },
    });
    if (!res.ok) return FALLBACK_USER;
    return (await res.json()) as GithubUser;
  } catch {
    return FALLBACK_USER;
  }
}

async function getFeaturedRepos(): Promise<Repo[]> {
  const results = await Promise.all(
    FEATURED_REPOS.map(async (name, index): Promise<Repo> => {
      const meta = FALLBACK_REPO_META[name];
      const fallback: Repo = {
        id: index,
        name,
        html_url: `https://github.com/${username}/${name}`,
        ...meta,
      };
      try {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${name}`,
          { next: { revalidate: 60 * 60 } },
        );
        if (!res.ok) return fallback;
        const live = (await res.json()) as Omit<Repo, "tech">;
        return { ...live, tech: meta.tech };
      } catch {
        return fallback;
      }
    }),
  );
  return results;
}

export default async function Home() {
  const [user, repos] = await Promise.all([
    getGithubUser(),
    getFeaturedRepos(),
  ]);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-8 sm:py-12 flex flex-col gap-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <header
        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 fade-in-up"
        style={{ animationDelay: "60ms" }}
      >
        <Image
          src={user.avatar_url}
          alt={user.name ?? username}
          width={96}
          height={96}
          className="rounded-full"
          style={{ border: "1px solid var(--n-color-border)" }}
          priority
        />
        <div className="text-center sm:text-left flex-1 min-w-0">
          <h1
            className="font-semibold tracking-tight"
            style={{
              fontSize: "var(--n-font-size-xxxl)",
              lineHeight: "var(--n-line-height-heading)",
              color: "var(--n-color-text)",
            }}
          >
            {user.name ?? username}
          </h1>
          {user.bio && (
            <p
              className="mt-3 max-w-prose mx-auto sm:mx-0"
              style={{
                color: "var(--n-color-text-weak)",
                fontSize: "var(--n-font-size-l)",
              }}
            >
              {user.bio}
            </p>
          )}
          <nav className="flex flex-wrap justify-center sm:justify-start gap-2 mt-5">
            <SocialLink
              href={user.html_url}
              icon={<Github className="h-4 w-4" />}
              label="GitHub"
            />
            <SocialLink
              href="https://linkedin.com/in/aloewright"
              icon={<Linkedin className="h-4 w-4" />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://aloewright.com"
              icon={<Globe className="h-4 w-4" />}
              label="Website"
            />
          </nav>
        </div>
      </header>

      <section
        className="fade-in-up"
        style={{ animationDelay: "180ms" }}
        aria-labelledby="featured"
      >
        <SectionHeading id="featured" eyebrow="Selected work">
          Featured projects
        </SectionHeading>
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {repos.map((repo) => (
            <li key={repo.id}>
              <RepoCard repo={repo} />
            </li>
          ))}
        </ul>
      </section>

      <footer
        className="pt-6 fade-in-up"
        style={{
          animationDelay: "260ms",
          borderTop: "1px solid var(--n-color-border)",
          color: "var(--n-color-text-weaker)",
          fontSize: "var(--n-font-size-s)",
        }}
      >
        Built with Next.js. Styled with design tokens inspired by{" "}
        <a
          href="https://nordhealth.design/start"
          target="_blank"
          rel="noreferrer"
        >
          Nord Design System
        </a>
        .
      </footer>
    </main>
  );
}

function SectionHeading({
  id,
  eyebrow,
  children,
}: {
  id?: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="uppercase tracking-wider"
        style={{
          fontSize: "var(--n-font-size-xs)",
          color: "var(--n-color-text-weaker)",
          fontWeight: "var(--n-font-weight-active)",
        }}
      >
        {eyebrow}
      </span>
      <h2
        id={id}
        className="font-semibold"
        style={{
          fontSize: "var(--n-font-size-xxl)",
          lineHeight: "var(--n-line-height-heading)",
          color: "var(--n-color-text)",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 transition-colors"
      style={{
        height: "32px",
        padding: "0 var(--n-space-m)",
        borderRadius: "var(--n-border-radius)",
        border: "1px solid var(--n-color-border)",
        background: "var(--n-color-surface)",
        color: "var(--n-color-text)",
        fontSize: "var(--n-font-size-m)",
        fontWeight: "var(--n-font-weight-active)",
        textDecoration: "none",
        transition: "var(--n-transition-quickly)",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
      style={{
        padding: "var(--n-space-m)",
        background: "var(--n-color-surface)",
        borderRadius: "var(--n-border-radius)",
        boxShadow: "var(--n-box-shadow-card)",
        transition: "var(--n-transition-slowly)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="truncate"
          style={{
            color: "var(--n-color-text-link)",
            fontWeight: "var(--n-font-weight-heading)",
            fontSize: "var(--n-font-size-l)",
          }}
        >
          {repo.name}
        </h3>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--n-color-text-weaker)" }}
        />
      </div>
      {repo.description && (
        <p
          className="mt-2 line-clamp-3"
          style={{
            color: "var(--n-color-text-weak)",
            fontSize: "var(--n-font-size-m)",
            lineHeight: "var(--n-line-height)",
          }}
        >
          {repo.description}
        </p>
      )}
      {repo.tech.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {repo.tech.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>
      )}
      {repo.stargazers_count > 0 && (
        <div
          className="mt-3 flex items-center gap-3"
          style={{
            fontSize: "var(--n-font-size-s)",
            color: "var(--n-color-text-weaker)",
          }}
        >
          <span className="inline-flex items-center gap-1">
            <Star className="h-3 w-3" />
            {repo.stargazers_count}
          </span>
        </div>
      )}
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "24px",
        padding: "0 var(--n-space-s)",
        borderRadius: "var(--n-border-radius-pill)",
        background: "var(--n-color-status-neutral-weak)",
        color: "var(--n-color-text)",
        fontSize: "var(--n-font-size-s)",
        fontWeight: "var(--n-font-weight-active)",
        border: "1px solid var(--n-color-border)",
      }}
    >
      {children}
    </span>
  );
}

