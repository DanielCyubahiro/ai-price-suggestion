"use server";

import prisma from "@/lib/prisma";
import { ListingFormData, listingSchema } from "@/lib/validators";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { Listing } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnvVariable } from "@/lib/utils";

/**
 * Fetches an AI-suggested price for a given item based on its details.
 * This function constructs a prompt for the Gemini API model and parses its response.
 *
 * @param item - An object containing item details (title, description, brand, category, condition).
 * Excludes the 'price' field as this is what the function aims to determine.
 * @returns A promise that resolves to a suggested numerical price.
 * @throws Error if the Gemini API call fails or returns an unexpected response.
 */
async function getAISuggestedPrice(item: Omit<ListingFormData, "price">): Promise<number> {
  const genAI = new GoogleGenerativeAI(getEnvVariable("GEMINI_API_KEY"));
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are a pricing expert for vintage luxury second-hand items especially from Moroccan origin.
    Suggest a fair market price based on the following details:
    
    Title: ${item.title}
    Description: ${item.description}
    Brand: ${item.brand}
    Category: ${item.category}
    Condition: ${item.condition}
    
    Consider:
    - Current market trends for similar items
    - Rarity and desirability of the brand
    - Item condition (mint, excellent, good, fair)
    - Recent sales of similar items
    
    Return only the numerical price value without any currency symbols or text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textOutput = response.text();

    const priceMatch = textOutput.match(/\d+(\.\d+)?/);
    if (priceMatch && priceMatch[0]) {
      return Number(priceMatch[0]);
    } else {
      console.error(
        "Gemini API did not return a valid numerical price. Output:",
        textOutput);
      throw new Error("Failed to parse price from AI suggestion.");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(
      `Gemini API error: ${error instanceof Error ? error.message : String(
        error)}`);
  }
}

// --- Suggest Price Action ---
/**
 * Server Action to get an AI-suggested price for an item.
 * Requires user authentication.
 *
 * @param item - The item details (excluding price) for which to suggest a price.
 * @returns A promise resolving to an object with success status, suggested price, or an error message.
 */
export async function suggestPriceAction(item: Omit<ListingFormData, "price">): Promise<{
  success: boolean;
  price?: number;
  error?: string
}> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Authentication required." };
  }

  try {
    const price = await getAISuggestedPrice(item);
    return { success: true, price };
  } catch (error) {
    console.error("AI Price Suggestion Error:", error);
    return { success: false, error: "Failed to get AI suggestion." };
  }
}

// --- Create Listing Action ---
/**
 * Server Action to create a new listing.
 * Requires user authentication and validates the provided listing data.
 * Revalidates relevant paths upon successful creation.
 *
 * @param data - The listing data conforming to ListingFormData.
 * @returns A promise resolving to an object with success status, new listing ID, or an error message.
 */
export async function createListingAction(data: ListingFormData): Promise<{
  success: boolean;
  listingId?: string;
  error?: string
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, error: "Authentication required." };
  }

  const validation = listingSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, error: "Invalid data provided." };
  }

  const {
    title,
    description,
    brand,
    category,
    condition,
    price
  } = validation.data;

  try {
    const newListing = await prisma.listing.create({
      data: {
        title,
        description,
        brand,
        category,
        condition,
        price,
        userId: session.user.id
      }
    });

    revalidatePath("/");

    return { success: true, listingId: newListing.id };
  } catch (error) {
    console.error("Create Listing Error:", error);
    return {
      success: false,
      error: "Database error. Failed to create listing."
    };
  }
}

/**
 * Server Action to fetch listings for the authenticated user.
 * @returns A promise resolving to an object with success status, listings array, or an error message.
 */
export async function getListingsAction(): Promise<{
  success: boolean;
  listings?: Listing[];
  error?: string;
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, error: "Authentication required." };
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { success: true, listings };
  } catch (error) {
    console.error("Error fetching listings:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to fetch listings." };
  }
}