import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddItemButton = () => {
  return (
    <Link href="/listings/new">
      <Button variant="outline">Add Item</Button>
    </Link>
  );
};

export default AddItemButton;
