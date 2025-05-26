import Link from "next/link";
import { authOptions } from "@/auth";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b">
      <div
        className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold">
          <Image
            src={"trendies-logo.svg"}
            alt={"logo"} width={150}
            height={150}
          />
        </Link>
        <nav className="flex items-center space-x-4">
          {session?.user ? (
            <>
              <Link href="/listings/new">
                <Button variant="outline">Sell Item</Button>
              </Link>
              <span className="text-sm">Welcome, {session.user.name?.split(
                " ")[0]}!</span>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </nav>
      </div>
    </header>
  );
}