'use server';

import prisma from '@/lib/prisma';
import {ListingFormData, listingSchema} from '@/lib/validators';
import {authOptions} from '@/auth';
import {revalidatePath} from 'next/cache';
import {getServerSession} from 'next-auth';

/**
 * Fetches an AI-suggested price for a given item based on its details.
 * This function constructs a prompt for a Groq API model and parses its response.
 *
 * @param item - An object containing item details (title, description, brand, category, condition).
 * Excludes the 'price' field as this is what the function aims to determine.
 * @returns A promise that resolves to a suggested numerical price.
 * @throws Error if the Groq API call fails or returns an unexpected response.
 */
async function getAISuggestedPrice(item: Omit<ListingFormData, 'price'>): Promise<number> {
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

  const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {role: 'system', content: 'You are a pricing assistant.'},
            {role: 'user', content: prompt},
          ],
          temperature: 0.7,
        }),
      },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error: ${errorText}`);
  }

  const data = await response.json();
  const textOutput = data.choices?.[0]?.message?.content || '';
  return textOutput.match(/\d+/)?.[0] || 'N/A';
}

// --- Suggest Price Action ---
export async function suggestPriceAction(item: Omit<ListingFormData, 'price'>): Promise<{
  success: boolean;
  price?: number;
  error?: string
}> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {success: false, error: 'Authentication required.'};
  }

  try {
    const price = await getAISuggestedPrice(item);
    return {success: true, price};
  } catch (error) {
    console.error('AI Price Suggestion Error:', error);
    return {success: false, error: 'Failed to get AI suggestion.'};
  }
}

// --- Create Listing Action ---
export async function createListingAction(data: ListingFormData): Promise<{
  success: boolean;
  listingId?: string;
  error?: string
}> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {success: false, error: 'Authentication required.'};
  }

  const validation = listingSchema.safeParse(data);

  if (!validation.success) {
    return {success: false, error: 'Invalid data provided.'};
  }

  const {
    title,
    description,
    brand,
    category,
    condition,
    price,
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
        userId: session.user.id,
      },
    });

    revalidatePath('/');
    revalidatePath('/listings/new');

    return {success: true, listingId: newListing.id};
  } catch (error) {
    console.error('Create Listing Error:', error);
    return {
      success: false,
      error: 'Database error. Failed to create listing.',
    };
  }
}