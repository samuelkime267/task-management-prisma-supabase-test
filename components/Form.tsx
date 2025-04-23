import React from "react";
import { cn } from "@/utils";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";

interface formProps extends React.HTMLProps<HTMLFormElement> {
  error?: string | null | undefined;
  success?: string | null | undefined;
  containerClass?: string;
}

const Form = React.forwardRef<HTMLFormElement, formProps>(
  ({ error, children, containerClass, className, success, ...props }, ref) => {
    return (
      <div className={cn("", containerClass)}>
        <div className="w-full mb-4">
          {error && (
            <div className="w-full border border-error flex items-center justify-start gap-2 p-2 bg-error/10 rounded-lg">
              <div className="min-w-6 min-h-6 w-6 h-6">
                <FaInfoCircle className="w-full h-full text-error" />
              </div>
              <p className="text-error font-medium capitalize">{error}</p>
            </div>
          )}
          {success && (
            <div className="w-full border border-success flex items-center justify-start gap-2 p-2 bg-success/10 rounded-lg">
              <div className="min-w-6 min-h-6 w-6 h-6">
                <FaCheckCircle className="w-full h-full text-success" />
              </div>
              <p className="text-success font-medium capitalize">{success}</p>
            </div>
          )}
        </div>

        <form
          ref={ref}
          className={cn("w-full grid grid-cols-1 gap-4", className)}
          {...props}
        >
          {children}
        </form>
      </div>
    );
  }
);

Form.displayName = "Form";

export default Form;
