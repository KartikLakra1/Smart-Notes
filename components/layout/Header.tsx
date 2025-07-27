'use client';

import Link from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="border-b shadow-sm sticky top-0 z-50 bg-white dark:bg-black">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold">
          🧠Smart Notes
        </Link>

        <nav className="flex gap-4 items-center">
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
