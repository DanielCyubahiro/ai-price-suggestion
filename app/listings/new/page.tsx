import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import MultiStepListingForm
  from "@/components/ListingForm/MultiStepListingForm";

export default async function NewListingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/listings/new");
  }
  return (
    <section>
      <MultiStepListingForm />
    </section>
  );
}