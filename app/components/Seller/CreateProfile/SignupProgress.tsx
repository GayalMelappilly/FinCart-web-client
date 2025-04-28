// components/seller/SignupProgress.tsx
import { cn } from "@/app/utils/clsx";
import React from "react";

interface SignupProgressProps {
  step: number;
}

export default function SignupProgress({ step }: SignupProgressProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center w-full max-w-2xl">
        {[1, 2, 3].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full",
                step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-300"
              )}
            >
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div
                className={cn(
                  "flex-1 h-1",
                  step > stepNumber ? "bg-blue-600" : "bg-gray-300"
                )}
              />
            )}
          </React.Fragment>
        ))}

      </div>
    </div>
  );
}