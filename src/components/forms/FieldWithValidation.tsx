import { ReactNode } from "react";
import { Maybe } from "../types";

interface FieldWithValidationProps {
  validationError: Maybe<string>;
  children: ReactNode;
}

export const FieldWithValidation = ({
  validationError,
  children,
}: FieldWithValidationProps) => {
  return (
    <div className="field">
      {children}
      {validationError && <p>{validationError}</p>}
    </div>
  );
};
