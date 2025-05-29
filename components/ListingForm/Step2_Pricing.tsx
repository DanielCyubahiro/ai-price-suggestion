"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { suggestPriceAction } from "@/app/actions/listingActions"; //
import { useToast } from "@/hooks/use-toast"; //
import { useState } from "react";
import PriceBreakdown from "@/components/PriceBreakdown";
import { ListingFormData } from "@/lib/validators";

export default function Step2_Pricing() {
  const {
    control,
    getValues,
    setValue,
    watch
  } = useFormContext<ListingFormData>();
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);

  const price = watch("price");

  async function handleSuggestPrice() {
    setIsSuggesting(true);
    const itemDetails = {
      title: getValues("title"),
      description: getValues("description"),
      brand: getValues("brand"),
      category: getValues("category"),
      condition: getValues("condition"),
      sizeDimensions: getValues("sizeDimensions"),
      targetAudience: getValues("targetAudience"),
      material: getValues("material"),
      color: getValues("color")
    };

    const result = await suggestPriceAction(itemDetails);
    setIsSuggesting(false);

    if (result.success && result.price) {
      setValue("price", result.price);
      toast({
        title: "Price Suggested!",
        description: `We suggest a price of €${result.price.toFixed(2)}.`
      });
    } else {
      toast({
        title: "Suggestion Failed",
        description: result.error || "Could not suggest a price.",
        variant: "destructive"
      });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        {/* Price */}
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Price (€)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="e.g., 150.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(
                    parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleSuggestPrice}
          disabled={isSuggesting}
          className="w-full sm:w-auto"
        >
          {isSuggesting ? "Thinking..." : "✨ Suggest Price (AI)"}
        </Button>

        {/* Buy Now Price */}
        <FormField
          control={control}
          name="buyNowPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buy Now Price (€) (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="e.g., 200.00"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(
                    parseFloat(e.target.value) || undefined)}
                />
              </FormControl>
              <FormDescription>
                Set a price for immediate purchase, if applicable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="md:col-span-1">
        <PriceBreakdown currentPrice={price || 0} />
      </div>
    </div>
  );
}