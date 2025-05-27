import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { getListingsAction } from "@/app/actions/listingActions";
import AddItemButton from "@/components/Buttons/AddItemButton";

export default async function ListingsTable() {
  const { listings, error, success } = await getListingsAction();

  if (!success || error) {
    return <p className="text-center text-red-500">Error: {error ||
      "Could not load listings."}</p>;
  }

  return (
    <section className="mt-8 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Listings</h2>
      {listings?.length === 0 ? (
        <section className={"flex flex-col items-center justify-center gap-7"}>
          <p className="text-gray-500">You haven&#39;t created any
            listings yet. Sell your first item!
          </p>
          <AddItemButton />
        </section>
      ) : (
        <>
          <div className={"flex justify-end mb-8"}>
            <AddItemButton />
          </div>
          <Table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <TableCaption
              className="py-4 text-sm text-gray-500 dark:text-gray-400">
              A list of your recent luxury item listings.
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-[25%]">Title</TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Brand</TableHead>
                <TableHead
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Condition</TableHead>
                <TableHead
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price
                  (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody
              className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {listings?.map((listing) => (
                <TableRow key={listing.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{listing.title}</TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{listing.category}</TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{listing.brand}</TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{listing.condition}</TableCell>
                  <TableCell
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-right">{listing.price?.toFixed(
                    2) ?? "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </section>
  );
}