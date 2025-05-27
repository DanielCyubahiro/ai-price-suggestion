import ListingsTable from "@/components/ListingsTable";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container mx-auto py-8 px-4">
      {session?.user ? (
        <ListingsTable />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Welcome to Trendies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Your exclusive marketplace for luxury second-hand Moroccan items.
          </p>
          <Link href="/api/auth/signin">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              Sign In to View & Sell Items
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
}