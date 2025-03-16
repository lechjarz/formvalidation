import { Maybe } from "../components/types";
import { Validator } from "./validatorTypes";

export const passwordStrengthValidatorMessage = 'Pasword At least 5 characters long, \n Contains at least one letter (A-Z or a-z), \n Contains at least one digit (0-9)';

export const passwordStrengthValidator: Validator<Maybe<string>>  = {
    validate :(password: Maybe<string>): boolean => {
        if(!password){
            return false;
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        return passwordRegex.test(password);
    },
    message: passwordStrengthValidatorMessage,
}