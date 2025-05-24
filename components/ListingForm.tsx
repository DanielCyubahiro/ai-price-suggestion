"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listingSchema, ListingFormData } from "@/lib/validators";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { createListingAction, suggestPriceAction } from "@/app/actions/listingActions";

export default function ListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      brand: "",
      category: "",
      condition: "",
      price: 0,
    },
  });

  async function onSubmit(values: ListingFormData) {
    setIsSubmitting(true);
    const result = await createListingAction(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Success!",
        description: "Your listing has been created.",
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create listing.",
        variant: "destructive",
      });
    }
  }

  async function handleSuggestPrice() {
    setIsSuggesting(true);
    const currentData = form.getValues();
    const result = await suggestPriceAction({
      title: currentData.title,
      description: currentData.description,
      brand: currentData.brand,
      category: currentData.category,
      condition: currentData.condition,
    });
    setIsSuggesting(false);

    if (result.success && result.price) {
      form.setValue('price', result.price); // Set the suggested price
      toast({
        title: "Price Suggested!",
        description: `We suggest a price of €${result.price.toFixed(2)}.`,
      });
    } else {
      console.log(result);
      toast({
        title: "Suggestion Failed",
        description: result.error || "Could not suggest a price.",
        variant: "destructive",
      });
    }
  }


  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Sell Your Luxury Item</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Vintage Chanel Flap Bag" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the item's history, condition, and features..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Brand */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Chanel, Hermes, Rolex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Handbag, Watch, Jewelry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Condition */}
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Pristine, Excellent, Very Good" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (€)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Enter your price or let AI suggest" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormDescription>
                    Click below for an AI suggestion.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleSuggestPrice}
                disabled={isSuggesting || isSubmitting}
              >
                {isSuggesting ? "Thinking..." : "✨ Suggest Price (AI)"}
              </Button>
              <Button type="submit" disabled={isSubmitting || isSuggesting}>
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}