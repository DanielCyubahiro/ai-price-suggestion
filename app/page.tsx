import ListingsTable from "@/components/ListingsTable";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

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
            <br />
            Sign In to View & Sell Items
          </p>
        </div>
      )}
    </main>
  );
}