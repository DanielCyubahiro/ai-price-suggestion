import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().
    max(1000, "Description must be at most 1000 characters"),
  brand: z.string().min(2, "Brand is required"),
  category: z.string().min(3, "Category is required"),
  condition: z.string().min(3, "Condition is required"),
  price: z.coerce.number().
    positive("Price must be a positive number").
    min(1, "Price is required")
  //TODO Add imageUrl validation later if you implement uploads
});

export type ListingFormData = z.infer<typeof listingSchema>;