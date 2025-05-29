import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

const fileSchema = z.any().refine((files) => files?.[0]?.size <= MAX_FILE_SIZE,
  `Max file size is 5MB.`).refine(
  (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  ".jpg, .jpeg, .png and .webp files are accepted."
).nullable().optional();

/**
 * Defines the schema for listing data validation.
 * Ensures that listing submissions meet specific criteria for relevant fields.
 */
export const listingSchema = z.object({
  // Step 1: Item Details
  title: z.string().min(5, "A title is required").max(100),
  category: z.enum(["Jewelry", "Watches", "Bags", "Shoes"],
    { required_error: "Category is required." }),
  sizeDimensions: z.string().optional(),
  brand: z.enum([
    "Louis Vuitton", "Hermes", "Gucci", "Prada", "Chanel",
    "Dior", "Yves Saint Laurent", "Bulgari", "Rolex", "Cartier"
  ], { required_error: "Brand is required." }),
  condition: z.enum(["Mint", "Like new", "Good", "Fair"], {
    required_error: "Condition is required."
  }),
  collection: z.string().max(100).optional(),
  targetAudience: z.enum(["Man", "Women", "Children"], {
    required_error: "Target audience is required."
  }),
  material: z.string().max(100).optional(),
  color: z.string().max(50).optional(),
  description: z.string().
    min(5, "Description must be at least 5 characters.").
    max(1000),
  photos: z.object({
    front: fileSchema.refine(
      val => val !== null && val !== undefined && val?.[0],
      { message: "Front-view photo is required." }),
    back: fileSchema.refine(
      val => val !== null && val !== undefined && val?.[0],
      { message: "Back-view photo is required." }),
    side: fileSchema.refine(
      val => val !== null && val !== undefined && val?.[0],
      { message: "Side-view photo is required." }),
    logo: fileSchema.refine(
      val => val !== null && val !== undefined && val?.[0],
      { message: "Logo close-up is required." }),
    material: fileSchema.refine(
      val => val !== null && val !== undefined && val?.[0],
      { message: "Material close-up is required." }),
    interior: fileSchema.optional()
  }),

  // Step 2: Pricing
  price: z.coerce.number().
    positive("Price must be a positive number.").
    min(1, "Price is required."),
  buyNowPrice: z.coerce.number().
    positive("Buy Now Price must be a positive number.").
    min(1, "Buy Now Price is required.")
});

export type ListingFormData = z.infer<typeof listingSchema>;