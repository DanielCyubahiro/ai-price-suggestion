import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

const fileSchema = z.any().
  refine((files) => !files || files.length === 0 || files?.[0]?.size <=
      MAX_FILE_SIZE,
    `Max file size is 5MB.`).
  refine(
    (files) => !files || files.length === 0 ||
      ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  ).
  nullable().
  optional();

/**
 * Defines the schema for listing data validation.
 * Ensures that listing submissions meet specific criteria for relevant fields.
 */
export const listingSchema = z.object({
  // Step 1: Item Details
  title: z.string().min(1, "A title is required").max(100),
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
    front: fileSchema,
    back: fileSchema,
    side: fileSchema,
    logo: fileSchema,
    material: fileSchema,
    interior: fileSchema
  }).optional(),

  // Step 2: Pricing
  price: z.coerce.number().
    positive("Price must be a positive number.").
    min(1, "Price is required."),
  buyNowPrice: z.coerce.number().
    positive("Buy Now Price must be a positive number.").optional()
});

export type ListingFormData = z.infer<typeof listingSchema>;