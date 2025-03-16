import { emailValidator } from "../validators/emailValidator";
import { passwordStrengthValidator } from "../validators/passwordStrengthValidator";
import { requiredValidator } from "../validators/requiredValidator";
import { ValidatorConfig } from "../validators/validatorTypes";
import { UserData } from "./types";

export const userValidationConfig : ValidatorConfig<UserData> = {
    ['firstName']: [requiredValidator],
    ['lastName']: [requiredValidator],
    ['email']: [requiredValidator, emailValidator],
    ['password']: [requiredValidator, passwordStrengthValidator]
} 