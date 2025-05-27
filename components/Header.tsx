import Link from "next/link";
import { authOptions } from "@/auth";
import SignInButton from "@/components/Buttons/SignInButton";
import SignOutButton from "@/components/Buttons/SignOutButton";
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
            src={"/trendies-logo.svg"}
            alt={"logo"}
            width={150}
            height={50}
            className="w-32 md:w-40"
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {session?.user ? (
            <>
              <p className="sm:text-sm xs:block">
                Hi, {session.user.name?.split(" ")[0]}!
              </p>
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