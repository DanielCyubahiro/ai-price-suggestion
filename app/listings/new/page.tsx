import ListingForm from '@/components/ListingForm';
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function NewListingPage() {
  const session = await getServerSession(authOptions);


  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/listings/new');
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Listing</h1>
      <ListingForm />
    </div>
  );
}