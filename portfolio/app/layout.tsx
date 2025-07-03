import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const username = "aloewright"
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const profile = await res.json()
    
    return {
      title: `${profile.name || username} - Portfolio`,
      description: profile.bio || `${username}'s GitHub Portfolio`,
      icons: {
        icon: profile.avatar_url,
        shortcut: profile.avatar_url,
        apple: profile.avatar_url,
      },
    }
  } catch {
    return {
      title: `${username} - Portfolio`,
      description: `${username}'s GitHub Portfolio`,
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
