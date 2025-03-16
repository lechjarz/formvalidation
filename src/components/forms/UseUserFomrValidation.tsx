import { useMemo } from "react";
import { Maybe, UserData } from "../types";
import { ValidatorConfig } from "../../validators/validatorTypes";
import { formValidator } from "../../validators/formValidator";

interface UserFormValidationResult {
  isUserFormValid: boolean;
  firstNameValidationError: Maybe<string>;
  lastNameValidationError: Maybe<string>;
  emailValidationError: Maybe<string>;
  passwordValidationError: Maybe<string>;
}

export const useUserFormValidation = (
  formData: UserData,
  config: ValidatorConfig<UserData>,
  startValidation: boolean
): UserFormValidationResult => {
  const { isFormValid, getValidationMessage } = useMemo(() => {
    if (!startValidation) {
      return {
        isFormValid: false,
        getValidationMessage: () => undefined,
      };
    }
    return formValidator(formData, config);
  }, [formData, config, startValidation]);

  return {
    isUserFormValid: isFormValid,
    firstNameValidationError: getValidationMessage("firstName"),
    lastNameValidationError: getValidationMessage("lastName"),
    emailValidationError: getValidationMessage("email"),
    passwordValidationError: getValidationMessage("password"),
  };
};
