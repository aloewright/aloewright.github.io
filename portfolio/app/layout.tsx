import type { Metadata } from "next";
<<<<<<< HEAD
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
=======
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const username = "aloewright";

export const metadata: Metadata = {
  title: `${username} | Portfolio`,
  description: `Projects and repositories by ${username}`,
  icons: {
    icon: `https://avatars.githubusercontent.com/${username}`,
  },
};
>>>>>>> 72aee49 (Create Next.js portfolio with GitHub profile and repository integration)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className="antialiased">
=======
      <head>
        <link rel="icon" href={`https://avatars.githubusercontent.com/${username}`} />
        <title>{metadata.title as string}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
>>>>>>> 72aee49 (Create Next.js portfolio with GitHub profile and repository integration)
        {children}
      </body>
    </html>
  );
}
