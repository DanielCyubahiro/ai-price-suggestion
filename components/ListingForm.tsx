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
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListingFormData, listingSchema } from "@/lib/validators";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  createListingAction,
  suggestPriceAction
} from "@/app/actions/listingActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

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
      price: undefined,
    }
  });

  async function onSubmit(values: ListingFormData) {
    setIsSubmitting(true);
    const result = await createListingAction(values);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Success!",
        description: "Your listing has been created."
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create listing.",
        variant: "destructive"
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
      condition: currentData.condition
    });
    setIsSuggesting(false);

    if (result.success && result.price) {
      form.setValue("price", result.price); // Set the suggested price
      toast({
        title: "Price Suggested!",
        description: `We suggest a price of €${result.price.toFixed(2)}.`
      });
    } else {
      console.log(result);
      toast({
        title: "Suggestion Failed",
        description: result.error || "Could not suggest a price.",
        variant: "destructive"
      });
    }
  }

  return (
    <TooltipProvider>
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <fieldset className="md:grid md:grid-cols-2 md:gap-x-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Title</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle
                              className="ml-1.5 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Provide a clear and concise title for your item.
                              <br/>
                              Mention key features or the type of item.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g., Berber Rug" {...field} />
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
                      <div className="flex items-center">
                        <FormLabel>Brand</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle
                              className="ml-1.5 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Specify the brand of the item.
                              <br/>
                              If it&#39;s an artisanal or unbranded, you can state that.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="e.g., Artisanal"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>

              <fieldset className="md:grid md:grid-cols-2 md:gap-x-6">
                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Category</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle
                              className="ml-1.5 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Select the most appropriate category for your
                              item (e.g., Home Decor, Fashion, Jewelry).
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g., Moroccan Rugs" {...field} />
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
                      <div className="flex items-center">
                        <FormLabel>Condition</FormLabel>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle
                              className="ml-1.5 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Describe the condition of the item (e.g.,
                              Pristine, Excellent, Very Good, Good, Fair).
                              <br/>
                              Please provide information about any wear or imperfections.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <FormControl>
                        <Input placeholder="e.g., Excellent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Description</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle
                            className="ml-1.5 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Provide a detailed description. Include the item&#39;s
                            story, unique features, materials, dimensions, and
                            any notable details or imperfections.
                            <br/>
                            For Moroccan items, mention origin or specific craft style if
                            known.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Handwoven wool rug from the Atlas Mountains..."
                        {...field}
                      />
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
                    <div className="flex items-center">
                      <FormLabel>Price (€)</FormLabel>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle
                            className="ml-1.5 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Enter your desired price in Euros.
                            <br/>
                            You can also use the AI suggestion feature below.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 150.00"
                        {...field}
                        value={field.value ?? ""}
                      />
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

                <div className={"flex gap-2"}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isSubmitting || isSuggesting}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}