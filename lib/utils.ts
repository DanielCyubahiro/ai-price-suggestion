import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, resolving Tailwind CSS conflicts.
 *
 * @param inputs - An array of class values (strings, arrays, or objects).
 * @returns A string of combined and merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Retrieves an environment variable by its name.
 * Throws an error if the environment variable is not set.
 *
 * @param name - The name of the environment variable.
 * @returns The value of the environment variable.
 * @throws Error if the environment variable is missing.
 */
export const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};
