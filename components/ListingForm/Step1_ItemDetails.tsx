"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import PhotoUpload from "@/components/PhotoUpload";

export default function Step1_ItemDetails() {
  const { control } = useFormContext();

  return (
    <section className="space-y-6 w-[800]">
      <h3 className="text-lg font-semibold mb-4">Item Details</h3>
      <fieldset
        className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-8">
        {/* Title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Title <span
                  className="text-red-500">*</span></FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Provide a clear and concise title for your item.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input placeholder="e.g., Rolex Watch" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Brand */}
        <FormField
          control={control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Brand <span
                  className="text-red-500">*</span></FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Specify the brand of the item.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select onValueChange={field.onChange}
                      defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Louis Vuitton">Louis
                    Vuitton</SelectItem>
                  <SelectItem value="Hermes">Hermes</SelectItem>
                  <SelectItem value="Gucci">Gucci</SelectItem>
                  <SelectItem value="Prada">Prada</SelectItem>
                  <SelectItem value="Chanel">Chanel</SelectItem>
                  <SelectItem value="Dior">Dior</SelectItem>
                  <SelectItem value="Yves Saint Laurent">Yves Saint
                    Laurent</SelectItem>
                  <SelectItem value="Bulgari">Bulgari</SelectItem>
                  <SelectItem value="Rolex">Rolex</SelectItem>
                  <SelectItem value="Cartier">Cartier</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Category */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Category <span
                  className="text-red-500">*</span></FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Select the most appropriate category for your
                      item.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select onValueChange={field.onChange}
                      defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
                  <SelectItem value="Watches">Watches</SelectItem>
                  <SelectItem value="Bags">Bags</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>

      <fieldset
        className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-8">
        {/* Condition */}
        <FormField
          control={control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Condition <span
                  className="text-red-500">*</span></FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Describe the condition of the item.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select onValueChange={field.onChange}
                      defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mint">Mint</SelectItem>
                  <SelectItem value="Like new">Like new</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Target Audience */}
        <FormField
          control={control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Target Audience <span
                  className="text-red-500">*</span></FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Select the most appropriate audience for your
                      item.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select onValueChange={field.onChange}
                      defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="collection"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel>Collection</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle
                      className="ml-1.5 h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Please the collection code e.g. SS25
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input placeholder="Enter collection" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>

      <fieldset
        className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 md:gap-y-8">
        {/* Size Dimensions */}
        <FormField
          control={control}
          name="sizeDimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size/Dimensions</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter size or dimensions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Material */}
        <FormField
          control={control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <FormControl>
                <Input placeholder="Enter material" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color */}
        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Enter color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </fieldset>

      {/* Description */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description <span
              className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Textarea placeholder="Enter description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Photo Uploads */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Upload Photos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PhotoUpload name="photos.front" label="Front-view"/>
          <PhotoUpload name="photos.back" label="Back-view"/>
          <PhotoUpload name="photos.side" label="Side-view"/>
          <PhotoUpload name="photos.logo"
                       label="Close up of the logo"/>
          <PhotoUpload name="photos.material"
                       label="Close up of the material"/>
          <PhotoUpload name="photos.interior"
                       label="Interior view" />
        </div>
      </div>
    </section>
  );
}