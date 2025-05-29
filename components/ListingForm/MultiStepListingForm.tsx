"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListingFormData, listingSchema } from "@/lib/validators";
import { useToast } from "@/hooks/use-toast";
import { createListingAction } from "@/app/actions/listingActions";
import { useRouter } from "next/navigation";

import Stepper from "@/components/Stepper";
import Step1_ItemDetails from "@/components/ListingForm/Step1_ItemDetails";
import Step2_Pricing from "@/components/ListingForm/Step2_Pricing";
import Step3_Documents from "@/components/ListingForm/Step3_Documents";
import Step4_Availability from "@/components/ListingForm/Step4_Availability";
import Step5_Review from "@/components/ListingForm/Step5_Review";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

const STEPS = [
  { id: 1, name: "Details" },
  { id: 2, name: "Pricing" },
  { id: 3, name: "Documents" },
  { id: 4, name: "Availability" },
  { id: 5, name: "Review" }
];

const stepFields: Record<number, (keyof ListingFormData)[]> = {
  1: ["title", "category", "brand", "condition", "targetAudience",
    "description"],
  2: ["price"],
};

export default function MultiStepListingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // We'll need a more complex schema or per-step validation later
  const methods = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    mode: "onChange",
    defaultValues: {
      category: undefined,
      title: "",
      sizeDimensions: "",
      brand: undefined,
      condition: undefined,
      collection: "",
      targetAudience: undefined,
      material: "",
      color: "",
      description: "",
      photos: {
        front: null,
        back: null,
        side: null,
        logo: null,
        material: null,
        interior: null
      },
      price: undefined,
      buyNowPrice: undefined
    }
  });

  const { handleSubmit, trigger } = methods;

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    let isValid = true;

    if (fieldsToValidate && fieldsToValidate.length > 0) {
      isValid = await trigger(fieldsToValidate, { shouldFocus: true });
    }

    if (!isValid) {
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  async function processSubmit(values: ListingFormData) {
    setIsSubmitting(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { photos, ...valuesWithoutPhotos } = values;

    const result = await createListingAction(valuesWithoutPhotos);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: "Success!",
        description: "Your listing has been created."
      });
      router.push("/");
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to create listing.",
        variant: "destructive"
      });
    }
  }

  return (
    <TooltipProvider>
      <FormProvider {...methods}>
        <div className="max-w-4xl mx-auto p-4 flex flex-col items-center gap-7">
          <Stepper steps={STEPS} currentStep={currentStep} />
          <form onSubmit={handleSubmit(processSubmit)} className="mt-8 space-y-8">
            {currentStep === 1 && <Step1_ItemDetails />}
            {currentStep === 2 && <Step2_Pricing />}
            {currentStep === 3 && <Step3_Documents />}
            {currentStep === 4 && <Step4_Availability />}
            {currentStep === 5 && <Step5_Review />}

            <div className="flex justify-between mt-12 pt-6 border-t">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handleBack}
                        disabled={isSubmitting}>
                  Back
                </Button>
              )}
              {currentStep < STEPS.length ? (
                <Button type="button" onClick={handleNext}
                        disabled={isSubmitting} className="ml-auto">
                  Next: {STEPS[currentStep]?.name || ""}
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}
                        className="ml-auto">
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </FormProvider>
    </TooltipProvider>
  );
}