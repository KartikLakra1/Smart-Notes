"use client";

import { useAuth } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
export default function DashboardPage() {
  const { userId } = useAuth();

  return (
    <div className="p-6">
      <SignedIn>
        <Card className="max-w-md mx-auto">
  <CardContent>
    <h1 className="text-xl font-semibold mb-2">Welcome, {userId}</h1>
    {/* Notes list will go here */}
  </CardContent>
</Card>
      </SignedIn>

      <SignedOut>
        <div className="text-center">
          <p>You are signed out. Please sign in to access the dashboard.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </div>
  );
}
