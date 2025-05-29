import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name}
              className={cn(stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative")}>
            {currentStep > step.id ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">{step.name} - Completed</span>
                </div>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center"
                     aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-primary"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary"
                        aria-hidden="true" />
                  <span className="sr-only">{step.name} - Current</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center"
                     aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step.name} - Upcoming</span>
                </div>
              </>
            )}
            <p
              className="absolute -bottom-6 -translate-x-1/4 whitespace-nowrap text-sm text-muted-foreground pt-1">
              {step.name}
            </p>
          </li>
        ))}
      </ol>
    </nav>
  );
}