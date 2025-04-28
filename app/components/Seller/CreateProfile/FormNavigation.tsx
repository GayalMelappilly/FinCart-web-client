// components/seller/FormNavigation.tsx
interface FormNavigationProps {
    step: number;
    nextStep: (e: React.MouseEvent) => void;
    prevStep: () => void;
    isSubmitting: boolean;
  }
  
  export default function FormNavigation({
    step,
    nextStep,
    prevStep,
    isSubmitting
  }: FormNavigationProps) {
    return (
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        
        <div className="flex-1"></div>
        
        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        )}
      </div>
    );
  }